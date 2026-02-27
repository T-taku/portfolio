import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
  metadataBase: new URL("https://t-taku.app"),
  title: {
    default: "Takuma Tateishi Portfolio",
    template: "%s | Takuma Tateishi Portfolio",
  },
  description: "My Portfolio from 2026",
  openGraph: {
    title: "Takuma Tateishi Portfolio",
    description: "My Portfolio from 2026",
    url: "https://t-taku.app",
    siteName: "Takuma Tateishi Portfolio",
    locale: "ja_JP",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Takuma Tateishi Portfolio",
    description: "My Portfolio from 2026",
    creator: "@T_taku0427",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja" className="scroll-smooth">
      <body className={`${cabinetGrotesk.variable}`}>{children}</body>
    </html>
  );
}
