import type { Metadata } from "next";
import { Figtree, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";
import { ScrollReveal } from "@/components/scroll-reveal";

// Manual de Marca, 04 Tipografia: Figtree nos títulos e no wordmark,
// Roboto Mono na assinatura, rótulos e números.
const figtree = Figtree({
  variable: "--font-figtree",
  subsets: ["latin"],
  weight: ["400", "600", "900"],
  style: ["normal", "italic"],
});

const robotoMono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
  weight: ["400", "500", "700"],
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
        className={`${figtree.variable} ${robotoMono.variable} antialiased`}
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
