import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  axes: ["opsz"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "Aurum OOH — Conectando Marcas ao Seu Público",
  description: "A solução completa em mídia Out of Home (OOH) com o alcance que sua campanha precisa.",
  openGraph: {
    title: "Aurum OOH — Conectando Marcas ao Seu Público",
    description: "A solução completa em mídia Out of Home (OOH) com o alcance que sua campanha precisa.",
    url: "https://aurumooh.com.br",
    siteName: "Aurum OOH",
    images: [
      {
        url: "https://aurumooh.com.br/og-image.png",
        width: 1200,
        height: 630,
        alt: "Aurum OOH Mídia Exterior",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}

