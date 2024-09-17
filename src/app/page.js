"use client";

import Finder from "@/components/finder";
import { useState } from "react";
import diccionarioBase from "@/data/diccionario";
import { SparklesPreview } from "@/components/SparklesPreview";
import Footer from "@/components/Footer";

export default function Home() {
  const [palabra, setPalabra] = useState(null);
  const [traduccion, setTraduccion] = useState("");
  const [significado, setSignificado] = useState("");
  const [buscado, setBuscado] = useState(false);
  const [miDiccionario, setMiDiccionario] = useState(diccionarioBase);
  const [sugerencias, setSugerencias] = useState([]);

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
    const umbral = 2;
    const palabrasDiccionario = Object.keys(miDiccionario);
    const sugerencias = palabrasDiccionario.filter(
      (palabraDic) => distanciaLevenshtein(palabraBuscada, palabraDic) <= umbral
    );
    return sugerencias;
  }

  function handleTranslate() {
    if (!palabra) return;
    const palabraNormalizada = palabra.toLowerCase();
    const resultado = miDiccionario[palabraNormalizada];
    setBuscado(true);

    if (resultado) {
      setTraduccion(resultado);
      setSugerencias([]);
    } else {
      setTraduccion(null);
      const posiblesSugerencias = buscarSugerencias(palabraNormalizada);
      setSugerencias(posiblesSugerencias);
    }
  }

  function handleAdd() {
    const significadoNormalizado = significado.toLowerCase();
    const palabraNormalizada = palabra.toLowerCase();

    setMiDiccionario((prevDiccionario) => ({
      ...prevDiccionario,
      [palabraNormalizada]: significadoNormalizado,
      [significadoNormalizado]: palabraNormalizada,
    }));

    setTraduccion(significado);
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
            <Finder setPalabra={setPalabra} />
            <button
              className="text-gray-100 rounded-r-lg bg-blue-600 py-2 px-3 border-2 border-blue-600/[0.3] flex items-center "
              onClick={handleTranslate}>
              Traducir{" "}
              <span>
                <svg
                  className="ml-2"
                  xmlns="http://www.w3.org/2000/svg"
                  width="1em"
                  height="1em"
                  viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="m12.87 15.07l-2.54-2.51l.03-.03A17.5 17.5 0 0 0 14.07 6H17V4h-7V2H8v2H1v1.99h11.17C11.5 7.92 10.44 9.75 9 11.35C8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5l3.11 3.11zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2zm-2.62 7l1.62-4.33L19.12 17z"
                  />
                </svg>
              </span>
            </button>
          </div>

          {traduccion ? (
            <div className="text-gray-100 mt-12 text-center">
              <h2 className="text-4xl font-bold">Traducción encontrada:</h2>
              <p className="mt-4 text-3xl font-light">{traduccion}</p>
            </div>
          ) : (
            buscado && (
              <div className="text-gray-100 mt-12 text-center font-light">
                {sugerencias.length > 0 && (
                  <div>
                    <p className="mt-4 text-lg">
                      ¿Quisiste decir:{" "}
                      {sugerencias.map((sug, idx) => (
                        <button
                          key={idx}
                          className="text-blue-400"
                          // onClick={() => {
                          //   setPalabra(sug);
                          //   handleTranslate();
                          // }}
                        >
                          {sug}
                          {idx < sugerencias.length - 1 ? ", " : ""}
                        </button>
                      ))}
                      ?
                    </p>
                  </div>
                )}

                <h2 className="text-4xl font-bold mt-8">
                  No se encontró traducción
                </h2>

                <div className="flex justify-center">
                  <div>
                    <input
                      className="text-gray-100 flex w-[400px] py-2 px-3 border-2 border-gray-100/[0.3] rounded-lg bg-transparent mt-12"
                      type="text"
                      label="text"
                      placeholder="Ingresa el significado"
                      onChange={(e) => setSignificado(e.target.value)}
                      required={true}
                    />
                    <button
                      className="mt-8 py-2 px-3 border-2 border-blue-500/[0.8] rounded-lg transition-all duration-300 hover:bg-blue-500/[0.8]"
                      onClick={handleAdd}>
                      Agregar
                    </button>
                  </div>
                </div>
              </div>
            )
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
