import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Sidemenu from "./components/_ui/Sidemenu";
import Footer from "./components/_ui/Footer";

const cabinetGrotesk = localFont({
  src: [
    { path: "./fonts/CabinetGrotesk-Thin.otf", weight: "100", style: "thin" },
    { path: "./fonts/CabinetGrotesk-Extralight.otf", weight: "200", style: "extralight" },
    { path: "./fonts/CabinetGrotesk-Light.otf", weight: "300", style: "light" },
    { path: "./fonts/CabinetGrotesk-Regular.otf", weight: "400", style: "normal" },
    { path: "./fonts/CabinetGrotesk-Medium.otf", weight: "500", style: "medium" },
    { path: "./fonts/CabinetGrotesk-Bold.otf", weight: "700", style: "bold" },
    { path: "./fonts/CabinetGrotesk-Extrabold.otf", weight: "800", style: "extrabold" },
    { path: "./fonts/CabinetGrotesk-Black.otf", weight: "900", style: "black" },
  ],
  variable: "--font-cabinet-grotesk",
});

export const metadata: Metadata = {
  title: "Takuma Tateishi Portfolio",
  description: "My Portfolio from 2026",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body
        className={`${cabinetGrotesk.variable}`}
      >
        <Sidemenu />
        <main className="lg:pl-[248px]">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
