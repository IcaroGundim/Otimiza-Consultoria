"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";
import { Button } from "./ui/button";

const menuItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Trabalhos", href: "/#trabalhos" },
  { label: "Acre", href: "/#acre" },
  { label: "Contato", href: "/#contato" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed top-0 left-0 z-50 w-full border-b transition-colors duration-200",
        scrolled
          ? "border-sage-200 bg-paper/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <header className="container flex h-20 items-center justify-between md:h-24">
        <Link href="/#inicio" aria-label="Ir para o início da página">
          <Logo className="text-ink" />
        </Link>
        <nav className="absolute left-1/2 flex -translate-x-1/2 items-center justify-center gap-x-7 max-lg:hidden">
          {menuItems.map((item) => (
            <Link
              className="inline-block font-mono text-xs uppercase tracking-[0.14em] text-ink/60 transition-colors duration-150 ease-out hover:text-ink"
              href={item.href}
              key={item.label}
            >
              {item.label}
            </Link>
          ))}
        </nav>
        <Button asChild size="sm" variant="secondary" className="max-lg:hidden">
          <Link href="/#contato">Contato</Link>
        </Button>
        <MobileMenu />
      </header>
    </div>
  );
};
