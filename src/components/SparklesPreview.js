"use client";
import React, { useState, useEffect } from "react";
import { SparklesCore } from "./ui/sparkles";

export function SparklesPreview() {
  const [title, setTitle] = useState("Traductor");
  const [fade, setFade] = useState(true);

  const titles = [
    "Translator", // Inglés
    "Traducteur", // Francés
    "Traduttore", // Italiano
    "Übersetzer", // Alemán
    "Переводчик", // Ruso
    "번역기", // Coreano
    "翻訳者", // Japonés
    "ترجمة", // Árabe
    "Traductor", // Español
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setTitle((prevTitle) => {
          const currentIndex = titles.indexOf(prevTitle);
          const nextIndex = (currentIndex + 1) % titles.length;
          return titles[nextIndex];
        });

        setFade(true);
      }, 500);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-full w-full flex flex-col items-center justify-center overflow-hidden rounded-md">
      <h1
        className={`text-6xl lg:text-9xl font-bold text-center text-white relative z-20 transition-opacity duration-1000 ${
          fade ? "opacity-100" : "opacity-0"
        }`}>
        {title}
      </h1>
      <div className="w-[20rem] md:w-[30rem] h-40 relative">
        {/* Gradients */}
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-[2px] w-3/4 blur-sm" />
        <div className="absolute inset-x-20 top-0 bg-gradient-to-r from-transparent via-indigo-500 to-transparent h-px w-3/4" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-[5px] w-1/4 blur-sm" />
        <div className="absolute inset-x-60 top-0 bg-gradient-to-r from-transparent via-sky-500 to-transparent h-px w-1/4" />

        {/* Core component */}
        <SparklesCore
          background="transparent"
          minSize={0.1}
          maxSize={0.5}
          particleDensity={500}
          className="w-[30rem] h-[130px]"
          particleColor="#FFFFFF"
        />

        {/* Radial Gradient to prevent sharp edges */}
        <div className="absolute inset-0 w-full h-full [mask-image:radial-gradient(350px_200px_at_top,transparent_20%,white)]"></div>
      </div>
    </div>
  );
}
