import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/aurum/Header";
import { Footer } from "@/components/aurum/Footer";
import { getSiteLinks } from "@/lib/cms";

// Header/Footer buscam contact_link/app_link no Supabase — revalida
// periodicamente em vez de congelar no build.
export const revalidate = 300;

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

const SITE_URL = "https://aurumooh.com.br";
const TITLE = "Aurum OOH — Conectando Marcas ao Seu Público";
const DESCRIPTION = "A solução completa em mídia Out of Home (OOH) com o alcance que sua campanha precisa.";

export const metadata: Metadata = {
  // Domínio ainda não está apontado/ativo (confirmado com o cliente em
  // 16/09) — mantido como valor final pretendido, já que é o que resolve
  // as URLs relativas de OG/sitemap/robots corretamente quando apontar.
  metadataBase: new URL(SITE_URL),
  title: TITLE,
  description: DESCRIPTION,
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: TITLE,
    description: DESCRIPTION,
    url: SITE_URL,
    siteName: "Aurum OOH",
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
  },
};

// Structured data (schema.org LocalBusiness) — mesmos dados já exibidos no
// Footer (telefone/e-mail/endereço), sem inventar nada novo.
const LOCAL_BUSINESS_JSON_LD = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Aurum OOH",
  description: DESCRIPTION,
  url: SITE_URL,
  telephone: "+55-11-94477-4353",
  email: "comercial@aurumooh.com.br",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Rua Francelino Rodrigues, 178 - Vl São Sebastião",
    addressLocality: "Mogi das Cruzes",
    addressRegion: "SP",
    addressCountry: "BR",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { contactLink, appLink } = await getSiteLinks();
  return (
    <html
      lang="pt-BR"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col pt-[76px]">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(LOCAL_BUSINESS_JSON_LD) }}
        />
        <Header contactLink={contactLink} appLink={appLink} />
        <main className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer contactLink={contactLink} appLink={appLink} />
      </body>
    </html>
  );
}

