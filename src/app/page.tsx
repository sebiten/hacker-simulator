"use client"
import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState({
    location: "Detectando...",
    os: "Detectando...",
    browser: "Detectando...",
    time: "",
  });

  useEffect(() => {
    // Obtener datos del navegador
    const userAgent = window.navigator.userAgent;
    const os = /Windows/.test(userAgent)
      ? "Windows"
      : /Mac/.test(userAgent)
      ? "MacOS"
      : /Linux/.test(userAgent)
      ? "Linux"
      : "Otro";
    const browser = /Chrome/.test(userAgent)
      ? "Chrome"
      : /Firefox/.test(userAgent)
      ? "Firefox"
      : /Safari/.test(userAgent)
      ? "Safari"
      : "Otro";

    // Obtener localización por IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((locationData) => {
        setData((prev) => ({
          ...prev,
          location: `${locationData.city}, ${locationData.country_name}`,
        }));
      })
      .catch(() => {
        setData((prev) => ({
          ...prev,
          location: "No se pudo detectar",
        }));
      });

    // Actualizar el estado con OS y Browser
    setData((prev) => ({
      ...prev,
      os,
      browser,
    }));

    // Actualizar la hora en el cliente
    const updateTime = () => {
      setData((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    };
    updateTime(); // Inicializar la hora
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval); // Limpiar interval
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center">
      <h1 className="text-4xl mb-6 animate-pulse">⚠️ Sistema comprometido ⚠️</h1>
      <div className="text-lg space-y-4">
        <p>📍 Ubicación: <span className="font-bold">{data.location}</span></p>
        <p>💻 Sistema Operativo: <span className="font-bold">{data.os}</span></p>
        <p>🌐 Navegador: <span className="font-bold">{data.browser}</span></p>
        <p>🕒 Hora actual: <span className="font-bold">{data.time || "Detectando..."}</span></p>
      </div>
      <p className="mt-10 text-sm text-gray-400 animate-bounce">
        Tranqui, esto es solo una broma. 😄
      </p>
    </div>
  );
}
