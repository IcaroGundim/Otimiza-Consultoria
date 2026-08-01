import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ScrollReveal } from "@/components/scroll-reveal";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Otimiza Consultoria Econômica",
  description:
    "Ciência de dados, machine learning e geoprocessamento para governos e empresas. Trabalhamos com as bases públicas nacionais e com dados levantados em campo.",
  openGraph: {
    title: "Otimiza Consultoria Econômica",
    description:
      "Ciência de dados, machine learning e geoprocessamento para governos e empresas.",
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
    <html lang="pt-BR">
      <body
        className={`${geistMono.variable} antialiased`}
        suppressHydrationWarning
      >
        {/* Sem JS o observer nunca roda, e o conteúdo ficaria invisível. */}
        <noscript>
          <style>{`[data-reveal]{opacity:1!important;transform:none!important}`}</style>
        </noscript>

        <Header />
        {children}
        <ScrollReveal />
      </body>
    </html>
  );
}
