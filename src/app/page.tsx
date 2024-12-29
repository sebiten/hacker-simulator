"use client";
import { useEffect, useState } from "react";

interface Data {
  location: string;
  ip: string;
  isp: string;
  os: string;
  browser: string;
  time: string;
  referrer: string;
  screen: string;
  language: string;
}

export default function Home() {
  const [data, setData] = useState<Data>({
    location: "Detectando...",
    ip: "Detectando...",
    isp: "Detectando...",
    os: "Detectando...",
    browser: "Detectando...",
    time: "",
    referrer: "Detectando...",
    screen: "Detectando...",
    language: "Detectando...",
  });

  const [passwords, setPasswords] = useState<string[]>([]);
  const [countdown, setCountdown] = useState<number>(10);

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
    const screenResolution = `${window.screen.width}x${window.screen.height}`;
    const language = navigator.language || "No detectado";

    // Obtener localización por IP
    fetch("https://ipapi.co/json/")
      .then((res) => res.json())
      .then((locationData) => {
        setData((prev) => ({
          ...prev,
          location: `${locationData.city}, ${locationData.country_name}`,
          ip: locationData.ip,
          isp: locationData.org,
        }));
      })
      .catch(() => {
        setData((prev) => ({
          ...prev,
          location: "No se pudo detectar",
          ip: "Desconocida",
          isp: "Desconocido",
        }));
      });

    // Simular contraseñas hackeadas
    const fakePasswords = Array.from({ length: 5 }, () =>
      Math.random().toString(36).slice(-8)
    );
    setPasswords(fakePasswords);

    // Actualizar el estado con OS, Browser, Screen y Language
    setData((prev) => ({
      ...prev,
      os,
      browser,
      screen: screenResolution,
      language,
      referrer: document.referrer || "Sin historial detectado",
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

    // Cuenta regresiva
    const countdownInterval = setInterval(() => {
      setCountdown((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => {
      clearInterval(interval); // Limpiar interval de la hora
      clearInterval(countdownInterval); // Limpiar interval de la cuenta regresiva
    };
  }, []);

  return (
    <div className="h-screen flex flex-col justify-center items-center bg-black text-green-500">
      <h1 className="text-4xl mb-6 animate-pulse">⚠️ Sistema comprometido ⚠️</h1>
      <div className="text-lg space-y-4">
        <p>
          📍 Ubicación: <span className="font-bold">{data.location}</span>
        </p>
        <p>
          🔗 Dirección IP: <span className="font-bold">{data.ip}</span>
        </p>
        <p>
          📡 Proveedor de Internet: <span className="font-bold">{data.isp}</span>
        </p>
        <p>
          💻 Sistema Operativo: <span className="font-bold">{data.os}</span>
        </p>
        <p>
          🌐 Navegador: <span className="font-bold">{data.browser}</span>
        </p>
        <p>
          🖥️ Resolución de pantalla: <span className="font-bold">{data.screen}</span>
        </p>
        <p>
          🌐 Idioma del sistema: <span className="font-bold">{data.language}</span>
        </p>
        <p>
          🕵️ Último sitio visitado: <span className="font-bold">{data.referrer}</span>
        </p>
        <p>
          🕒 Hora actual: <span className="font-bold">{data.time || "Detectando..."}</span>
        </p>
      </div>
      <div className="mt-6">
        <h2 className="text-xl">🔒 Contraseñas comprometidas:</h2>
        <ul className="mt-2 space-y-1">
          {passwords.map((pass, index) => (
            <li key={index} className="font-bold">
              {`• ${pass}`}
            </li>
          ))}
        </ul>
      </div>
      <div className="mt-6 text-red-500 font-bold text-xl">
        ⚠️ Bloqueo del sistema en: {countdown} segundos
      </div>
      <p className="mt-10 text-sm text-gray-400 animate-bounce">
        Relájate, esto es solo una broma. 😄
      </p>
    </div>
  );
}
