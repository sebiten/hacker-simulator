import type { Metadata } from "next";
import { VT323, Roboto_Mono } from "next/font/google"; // Usa VT323 y una fuente secundaria
import "./globals.css";

const vt323 = VT323({
  variable: "--font-vt323", // Variable CSS personalizada
  subsets: ["latin"],
  weight: "400", // La fuente VT323 tiene solo peso 400
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono", // Fuente monoespaciada secundaria
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Sistema comprometido",
  description: "asd",
  icons: {
    icon: "/hacked.png", // Cambia el icono según tu diseño
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${vt323.variable} ${robotoMono.variable} antialiased bg-black text-green-500`}
      >
        {children}
      </body>
    </html>
  );
}
