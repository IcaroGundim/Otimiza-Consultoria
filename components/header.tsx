"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

const menuItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Trabalhos", href: "/#trabalhos" },
  { label: "Contato", href: "/#contato" },
];

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const sentinelRef = useRef<HTMLDivElement>(null);

  // Sentinela em vez de listener de scroll: o `overflow-x: hidden` do body faz
  // dele o container de rolagem, então window.scrollY não acompanha a página.
  useEffect(() => {
    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="absolute top-0 left-0 h-8 w-px pointer-events-none"
      />

      <div
        className={cn(
          "fixed z-50 top-0 left-0 w-full transition-[padding,background-color,border-color] duration-300 ease-out border-b",
          scrolled
            ? "py-4 md:py-5 bg-background/80 backdrop-blur-md border-border"
            : "pt-8 md:pt-14 pb-4 border-transparent"
        )}
      >
        <header className="flex items-center justify-between container">
          <Link href="/#inicio" aria-label="Ir para o início da página">
            <Logo variant="compact" className="[--mark:22px] md:[--mark:26px]" />
          </Link>
          <nav className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10">
            {menuItems.map((item) => (
              <Link
                className="uppercase inline-block font-mono text-foreground/60 hover:text-foreground/100 duration-150 transition-colors ease-out"
                href={item.href}
                key={item.label}
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <Link
            className="uppercase max-lg:hidden transition-colors ease-out duration-150 font-mono text-primary hover:text-primary/80"
            href="/#contato"
          >
            Contato
          </Link>
          <MobileMenu />
        </header>
      </div>
    </>
  );
};
