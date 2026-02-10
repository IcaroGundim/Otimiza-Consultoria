import type { Metadata } from "next";
import { Geist_Mono } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/header";

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
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
  generator: "v0.app",
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
        <Header />
        {children}
      </body>
    </html>
  );
}
