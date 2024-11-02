"use client";

import Finder from "@/components/finder";
import { useEffect, useState } from "react";
import diccionarioBase from "@/data/diccionario";
import { SparklesPreview } from "@/components/SparklesPreview";
import Footer from "@/components/Footer";

export default function Home() {
  const umbralLevenshtein = 1;
  const [palabra, setPalabra] = useState("");
  const [traduccion, setTraduccion] = useState("");
  const [significado, setSignificado] = useState("");
  const [categoria, setCategoria] = useState("");
  const [colorCategoria, setColorCategoria] = useState("");
  const [buscado, setBuscado] = useState(false);
  const [miDiccionario, setMiDiccionario] = useState(diccionarioBase);
  const [sugerencias, setSugerencias] = useState([]);
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState("");
  const [hayTraducciones, setHayTraducciones] = useState(false);

  // Añadir nuevos estados para listas
  const [palabras, setPalabras] = useState([]);
  const [traducciones, setTraducciones] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [coloresCategorias, setColoresCategorias] = useState([]);

  useEffect(() => {
    handleTranslate();
  }, [palabra]);

  // useEffect(() => {
  //   console.log(hayTraducciones);
  // }, [hayTraducciones]);

  useEffect(() => {
    if (palabra == "") {
      setTraduccion("");
      setCategoria("");
      setSugerencias([]);
      setHayTraducciones(false);
      setTraducciones([]);
      setCategorias([]);
      setColoresCategorias([]);
      setPalabras([]);
      setBuscado(false);
    }
  }, [palabra]);

  useEffect(() => {
    if (categoria == "sustantivo") {
      setColorCategoria("text-green-500");
    } else if (categoria == "adjetivo") {
      setColorCategoria("text-blue-500");
    } else if (categoria == "articulo") {
      setColorCategoria("text-yellow-500");
    } else if (categoria == "pronombre") {
      setColorCategoria("text-red-500");
    } else if (categoria == "verbo") {
      setColorCategoria("text-purple-500");
    } else if (categoria == "adverbio") {
      setColorCategoria("text-pink-500");
    } else if (categoria == "preposicion") {
      setColorCategoria("text-indigo-500");
    } else if (categoria == "conjuncion") {
      setColorCategoria("text-gray-500");
    } else if (categoria == "interjección") {
      setColorCategoria("text-blue-500");
    }
  }, [categoria]);

  function distanciaLevenshtein(str1, str2) {
    const matriz = Array(str2.length + 1)
      .fill(null)
      .map(() => Array(str1.length + 1).fill(null));

    for (let i = 0; i <= str1.length; i += 1) {
      matriz[0][i] = i;
    }

    for (let j = 0; j <= str2.length; j += 1) {
      matriz[j][0] = j;
    }

    for (let j = 1; j <= str2.length; j += 1) {
      for (let i = 1; i <= str1.length; i += 1) {
        const costoSubstitucion = str1[i - 1] === str2[j - 1] ? 0 : 1;
        matriz[j][i] = Math.min(
          matriz[j][i - 1] + 1, // Inserción
          matriz[j - 1][i] + 1, // Eliminación
          matriz[j - 1][i - 1] + costoSubstitucion // Sustitución
        );
      }
    }

    return matriz[str2.length][str1.length];
  }

  function buscarSugerencias(palabraBuscada) {
    const umbral = umbralLevenshtein;
    const palabrasDiccionario = Object.keys(miDiccionario);
    const sugerencias = palabrasDiccionario.filter(
      (palabraDic) => distanciaLevenshtein(palabraBuscada, palabraDic) <= umbral
    );
    return sugerencias.length > 0 ? sugerencias : null;
  }

  function handleTranslate() {
    if (!palabra) return;
    const palabrasIngresadas = palabra.toLowerCase().split(" ");
    const nuevasTraducciones = [];
    const nuevasCategorias = [];
    const nuevosColores = [];
    const nuevasSugerencias = [];
    setBuscado(true);

    palabrasIngresadas.forEach((palabraActual) => {
      const resultado = miDiccionario[palabraActual];
      if (resultado) {
        nuevasTraducciones.push(resultado.traduccion);
        nuevasCategorias.push(resultado.categoria);
        nuevosColores.push(obtenerColorCategoria(resultado.categoria));
        nuevasSugerencias.push(null);
      } else {
        const sugerencia = buscarSugerencias(palabraActual);
        if (sugerencia) {
          nuevasTraducciones.push(palabraActual);
          nuevasCategorias.push(null);
          nuevosColores.push("text-gray-100 line-through");
          nuevasSugerencias.push(sugerencia);
        } else {
          nuevasTraducciones.push(palabraActual);
          nuevasCategorias.push(null);
          nuevosColores.push("text-gray-100 line-through");
          nuevasSugerencias.push([]);
        }
      }
    });

    setPalabras(palabrasIngresadas);
    setTraducciones(nuevasTraducciones);
    setCategorias(nuevasCategorias);
    setColoresCategorias(nuevosColores);
    setSugerencias(nuevasSugerencias);

    const hayTraducciones = nuevasTraducciones.some(
      (traduccion) => miDiccionario[traduccion]
    );
    setHayTraducciones(hayTraducciones);
  }

  function obtenerColorCategoria(categoria) {
    if (categoria == "sustantivo") {
      return "text-green-500";
    } else if (categoria == "adjetivo") {
      return "text-blue-500";
    } else if (categoria == "articulo") {
      return "text-yellow-500";
    } else if (categoria == "pronombre") {
      return "text-red-500";
    } else if (categoria == "verbo") {
      return "text-purple-500";
    } else if (categoria == "adverbio") {
      return "text-pink-500";
    } else if (categoria == "preposicion") {
      return "text-indigo-500";
    } else if (categoria == "conjuncion") {
      return "text-gray-500";
    } else if (categoria == "interjección") {
      return "text-blue-500";
    }
  }

  function handleAdd() {
    const significadoNormalizado = significado.toLowerCase();
    const palabraNormalizada = palabra.toLowerCase();

    setMiDiccionario((prevDiccionario) => ({
      ...prevDiccionario,
      [palabraNormalizada]: {
        traduccion: significadoNormalizado,
        categoria: categoriaSeleccionada,
      },
      [significadoNormalizado]: {
        traduccion: palabraNormalizada,
        categoria: categoriaSeleccionada,
      },
    }));

    setTraduccion(significadoNormalizado);
    setSignificado("");
    setCategoria(categoriaSeleccionada);
  }

  return (
    <div className="absolute inset-0 -z-10 max-h-full max-w-full bg-gray-950 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]">
      <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-blue-400 opacity-20 blur-[100px]"></div>

      <div className="min-h-screen flex justify-center items-center">
        <div>
          <div>
            <SparklesPreview />
          </div>
          <div className="flex justify-center">
            <Finder
              setPalabra={setPalabra}
              palabra={palabra}
            />
          </div>

          {traducciones.length > 0 && (
            <div className="text-gray-100 mt-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold">
                Traducción encontrada:
              </h2>
              <p className="mt-4 text-2xl md:text-3xl font-light text-white">
                {traducciones.map((traduccion, index) => (
                  <span
                    key={index}
                    className={` ${coloresCategorias[index]} mr-2`}>
                    {traduccion}
                  </span>
                ))}
              </p>

              {/* Mostrar sugerencias si las hay */}
              {sugerencias.some((sug) => sug && sug.length > 0) && (
                <div className="mt-6">
                  <h3 className="text-xl font-bold">Sugerencias:</h3>
                  <p className="mt-2 text-lg">
                    {palabras.map((palabraOriginal, index) => (
                      <span key={index}>
                        {sugerencias[index] && sugerencias[index].length > 0 ? (
                          <span>
                            {"¿Quisiste decir "}
                            {sugerencias[index].map((sug, idx) => (
                              <button
                                key={idx}
                                className="text-blue-400 mr-1"
                                onClick={() => {
                                  // Reemplazar la palabra original por la sugerida y volver a traducir
                                  const nuevasPalabras = [...palabras];
                                  nuevasPalabras[index] = sug;
                                  setPalabra(nuevasPalabras.join(" "));
                                }}>
                                {sug}
                              </button>
                            ))}
                            {"?"}
                          </span>
                        ) : null}{" "}
                      </span>
                    ))}
                  </p>
                </div>
              )}
            </div>
          )}

          {!hayTraducciones && buscado && (
            <div className="text-gray-100 mt-12 text-center font-light">
              {/* {sugerencias.length > 0 && (
                <div>
                  <p className="mt-4 text-lg">
                    ¿Quisiste decir:{" "}
                    {sugerencias.map((sug, idx) => (
                      <button
                        key={idx}
                        className="text-blue-400"
                        onClick={() => {
                          setPalabra(sug);
                          // handleTranslate();
                        }}>
                        {sug}
                        {idx < sugerencias.length - 1 ? ", " : ""}
                      </button>
                    ))}
                    ?
                  </p>
                </div>
              )} */}

              <h2 className="text-3xl md:text-4xl font-bold mt-8">
                No se encontró traducción
              </h2>

              <div className="flex justify-center space-x-6 mt-12">
                <input
                  className="text-gray-100 flex w-[250px] md:w-[400px] h-[44px]  py-2 px-3 border-2 border-gray-100/[0.3] rounded-lg bg-transparent "
                  type="text"
                  label="text"
                  placeholder="Ingresa el significado"
                  onChange={(e) => setSignificado(e.target.value)}
                  required={true}
                />
                <select
                  className="text-gray-100 flex w-[250px] md:w-[400px] h-[44px]  py-2 px-3 border-2 border-gray-100/[0.3] rounded-lg bg-transparent"
                  value={categoriaSeleccionada}
                  onChange={(e) => setCategoriaSeleccionada(e.target.value)}
                  required={true}>
                  <option
                    value=""
                    disabled={true}>
                    Selecciona una categoría
                  </option>
                  <option value="sustantivo">Sustantivo</option>
                  <option value="adjetivo">Adjetivo</option>
                  <option value="artículo">Artículo</option>
                  <option value="pronombre">Pronombre</option>
                  <option value="verbo">Verbo</option>
                  <option value="adverbio">Adverbio</option>
                  <option value="preposición">Preposición</option>
                  <option value="conjunción">Conjunción</option>
                  <option value="interjección">Interjección</option>
                </select>
              </div>
              <button
                className="mt-8 py-2 px-3 border-2 border-blue-500/[0.8] rounded-lg transition-all duration-300 hover:bg-blue-500/[0.8]"
                onClick={handleAdd}
                disabled={!significado || !categoriaSeleccionada}>
                Agregar
              </button>
            </div>
          )}
          {/* {categoria == "" ? null : (
            <div className="flex justify-center items-center mt-6">
              <p
                className={`text-gray-100 w-auto text-lg p-2 rounded-lg  ${colorCategoria}`}>
                {categoria}
              </p>
            </div>
          )} */}
          <div className="flex space-x-2 mt-6 mb-12">
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <p className="text-gray-100">sustantivo</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-gray-100">adjetivo</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <p className="text-gray-100">artículo</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <p className="text-gray-100">pronombre</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
              <p className="text-gray-100">verbo</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-pink-500 rounded-full"></div>
              <p className="text-gray-100">adverbio</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
              <p className="text-gray-100">preposición</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
              <p className="text-gray-100">conjunción</p>
            </div>
            <div className="flex justify-center items-center space-x-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <p className="text-gray-100">interjección</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
