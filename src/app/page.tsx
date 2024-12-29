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
  const [countdown, setCountdown] = useState<number>(20);
  const [hackingMessages, setHackingMessages] = useState<string[]>([]);
  const [isJokeRevealed, setIsJokeRevealed] = useState<boolean>(false);

  useEffect(() => {
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

    const fakePasswords = Array.from({ length: 5 }, () =>
      Math.random().toString(36).slice(-8)
    );
    setPasswords(fakePasswords);

    setData((prev) => ({
      ...prev,
      os,
      browser,
      screen: screenResolution,
      language,
      referrer: document.referrer || "Sin historial detectado",
    }));

    const updateTime = () => {
      setData((prev) => ({
        ...prev,
        time: new Date().toLocaleTimeString(),
      }));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);

    const countdownInterval = setInterval(() => {
      setCountdown((prev) => {
        if (prev === 1) {
          clearInterval(countdownInterval);
          setIsJokeRevealed(true);
        }
        return prev > 0 ? prev - 1 : 0;
      });
    }, 1000);

    const hackingMessagesInterval = setInterval(() => {
      setHackingMessages((prev) => [
        ...prev,
        `Extrayendo datos sensibles... ${Math.random().toString(36).slice(-8)}`,
      ]);
    }, 1500);

    return () => {
      clearInterval(interval);
      clearInterval(countdownInterval);
      clearInterval(hackingMessagesInterval);
    };
  }, []);

  return (
    <div
      className={`h-screen flex flex-col justify-center items-center ${
        isJokeRevealed ? "bg-green-900 text-white" : "bg-black text-green-500"
      }`}
    >
      {!isJokeRevealed ? (
        <>
          <h1 className="text-5xl mb-6 animate-pulse text-red-500">
             ¡ALERTA! SISTEMA COMPROMETIDO
          </h1>
          <div className="text-lg space-y-4">
            <p>
               <span className="font-bold text-red-500">Ubicación:</span>{" "}
              <span>{data.location}</span>
            </p>
            <p>
               <span className="font-bold text-red-500">Dirección IP:</span>{" "}
              <span>{data.ip}</span>
            </p>
            <p>
               <span className="font-bold text-red-500">Proveedor de Internet:</span>{" "}
              <span>{data.isp}</span>
            </p>
            <p>
               <span className="font-bold text-red-500">Sistema Operativo:</span>{" "}
              <span>{data.os}</span>
            </p>
            <p>
               <span className="font-bold text-red-500">Navegador:</span>{" "}
              <span>{data.browser}</span>
            </p>
            <p>
               <span className="font-bold text-red-500">Resolución de pantalla:</span>{" "}
              <span>{data.screen}</span>
            </p>
            <p>
               <span className="font-bold text-red-500">Idioma:</span>{" "}
              <span>{data.language}</span>
            </p>
          </div>
          <div className="mt-6">
            <h2 className="text-xl text-red-500">🔒 Contraseñas comprometidas:</h2>
            <ul className="mt-2 space-y-1">
              {passwords.map((pass, index) => (
                <li key={index} className="font-bold">
                  {`• ${pass}`}
                </li>
              ))}
            </ul>
          </div>
          <div className="mt-6 text-red-500 font-bold text-xl">
             BLOQUEO EN: {countdown} SEGUNDOS
          </div>
          <div className="mt-6 text-sm space-y-1">
            {hackingMessages.map((msg, index) => (
              <p key={index} className=" text-yellow-500">
                {msg}
              </p>
            ))}
          </div>
        </>
      ) : (
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-6">¡Es solo una broma! 😄</h1>
          <p className="text-lg">
            Tu sistema no está comprometido. Esto fue una simulación para asustarte un poco.
          </p>
        </div>
      )}
    </div>
  );
}
