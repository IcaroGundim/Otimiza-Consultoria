import type { Metadata } from "next";
import Script from "next/script";
import { Geist_Mono, Instrument_Serif, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ScrollReveal } from "@/components/scroll-reveal";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Instrument Serif só existe em peso 400 (normal + itálico).
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: "Otimiza Consultoria Econômica",
  description:
    "Consultoria especializada em análise da conjuntura econômica e social do Acre, com econometria, geoprocessamento e pesquisas eleitorais.",
  openGraph: {
    title: "Otimiza Consultoria Econômica",
    description:
      "Dados e evidências para decisões estratégicas de instituições públicas e empresas no Acre.",
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
    // As variáveis de fonte ficam no <html> (= :root) e não no <body>:
    // o `@theme` declara --font-sans: var(--font-inter) em :root, e ali a
    // referência precisa resolver, senão a declaração font-family do body
    // é inválida e o texto corrido cai na fonte padrão do navegador.
    <html
      lang="pt-BR"
      className={`${inter.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <head>
        {process.env.NODE_ENV === "development" && (
          <Script
            src="//unpkg.com/react-grab/dist/index.global.js"
            crossOrigin="anonymous"
            strategy="beforeInteractive"
          />
        )}
      </head>
      <body className="antialiased" suppressHydrationWarning>
        {/* Sem JS o reveal nunca dispara, então o estado inicial é anulado. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ScrollReveal />
        <Header />
        {children}
      </body>
    </html>
  );
}
