"use client";

import { selectService, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import { CtaButton } from "./cta-button";

interface MobileMenuProps {
  className?: string;
}

const rowClass =
  "flex items-baseline py-4 border-b border-[#1E1E1E] font-display font-black text-[30px] tracking-[-0.035em] text-foreground";

const subscribeNoop = () => () => {};

export const MobileMenu = ({ className }: MobileMenuProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  // Remonta a lista a cada abertura, o que refaz a entrada escalonada.
  const [opens, setOpens] = useState(0);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const navRef = useRef<HTMLElement>(null);
  // O portal só existe no cliente.
  const mounted = useSyncExternalStore(
    subscribeNoop,
    () => true,
    () => false
  );

  const toggle = () => {
    if (!isOpen) setOpens((n) => n + 1);
    setIsOpen((open) => !open);
  };

  const close = () => setIsOpen(false);

  // Com o menu aberto: trava a rolagem da página, Esc fecha e o foco vai
  // para o primeiro link.
  useEffect(() => {
    if (!isOpen) return;

    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    navRef.current?.querySelector<HTMLElement>("a, button")?.focus();

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      setIsOpen(false);
      buttonRef.current?.focus();
    };
    document.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  // Fecha se a janela passar para o layout de desktop.
  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 1024px)");
    const onChange = () => desktop.matches && setIsOpen(false);
    desktop.addEventListener("change", onChange);
    return () => desktop.removeEventListener("change", onChange);
  }, []);

  const row = (i: number) =>
    ({
      "--stagger": `${120 + i * 55}ms`,
    }) as React.CSSProperties;

  const line =
    "absolute left-[11px] h-0.5 rounded-[1px] bg-foreground transition-[transform,opacity,width] duration-[380ms] ease-(--ease-out-expo)";

  // O painel vai para o body num portal: o `backdrop-filter` do header vira
  // bloco de contenção de filhos `fixed`, e o painel ficaria preso nele.
  const panel = (
    <div
      inert={!isOpen}
      aria-hidden={!isOpen}
      className="lg:hidden fixed inset-0 z-40 bg-background"
      style={{
        clipPath: isOpen ? "inset(0 0 0 0)" : "inset(0 0 100% 0)",
        visibility: isOpen ? "visible" : "hidden",
        transition: `clip-path 560ms var(--ease-out-expo), visibility 0ms linear ${isOpen ? "0ms" : "560ms"}`,
      }}
    >
      <nav
        ref={navRef}
        id="mobile-menu"
        aria-label="Menu"
        key={opens}
        className="container flex h-full flex-col pt-28 pb-8 overflow-y-auto"
      >
        <Link
          href="/#inicio"
          onClick={close}
          style={row(0)}
          className={cn(rowClass, "[animation:otz-rise_560ms_var(--ease-out-expo)_var(--stagger)_both]")}
        >
          Início
        </Link>

        <div
          style={row(1)}
          className="border-b border-[#1E1E1E] [animation:otz-rise_560ms_var(--ease-out-expo)_var(--stagger)_both]"
        >
          <button
            type="button"
            aria-expanded={servicesOpen}
            aria-controls="mobile-services"
            onClick={() => setServicesOpen((open) => !open)}
            className={cn(rowClass, "w-full border-b-0 text-left cursor-pointer")}
          >
            <span className="grow">Serviços</span>
            <ChevronDown
              aria-hidden
              size={20}
              className={cn(
                "self-center transition-transform duration-[380ms] ease-(--ease-out-expo)",
                servicesOpen && "rotate-180"
              )}
            />
          </button>
          <div
            id="mobile-services"
            inert={!servicesOpen}
            className="grid transition-[grid-template-rows] duration-[460ms] ease-(--ease-out-expo)"
            style={{ gridTemplateRows: servicesOpen ? "1fr" : "0fr" }}
          >
            <div className="min-h-0 overflow-hidden">
              <ul key={String(servicesOpen)} className="flex flex-col pb-3.5">
                {services.map((service, i) => (
                  <li
                    key={service.num}
                    style={{ "--stagger": `${80 + i * 35}ms` } as React.CSSProperties}
                    className={cn(
                      servicesOpen &&
                        "[animation:otz-slide_420ms_var(--ease-out-expo)_var(--stagger)_both]"
                    )}
                  >
                    <Link
                      href="/#servicos"
                      onClick={() => {
                        selectService(i);
                        close();
                      }}
                      className="flex min-h-11 items-baseline gap-3 py-2.5 font-mono text-sm text-foreground/85 transition-colors duration-150 hover:text-foreground"
                    >
                      <span className="w-6 text-[10px] tracking-[0.14em] text-muted">
                        {service.num}
                      </span>
                      {service.short}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <Link
          href="/#trabalhos"
          onClick={close}
          style={row(2)}
          className={cn(rowClass, "[animation:otz-rise_560ms_var(--ease-out-expo)_var(--stagger)_both]")}
        >
          Trabalhos
        </Link>
        <Link
          href="/#diferenciais"
          onClick={close}
          style={row(3)}
          className={cn(rowClass, "[animation:otz-rise_560ms_var(--ease-out-expo)_var(--stagger)_both]")}
        >
          Diferenciais
        </Link>

        <div
          style={row(4)}
          className="mt-auto flex flex-col gap-4 pt-10 [animation:otz-rise_560ms_var(--ease-out-expo)_var(--stagger)_both]"
        >
          <CtaButton href="/#contato" size="lg" onClick={close} className="w-full">
            Falar com a Otimiza
          </CtaButton>
          <a
            href="mailto:contato@otimizaconsultoria.com.br"
            className="text-center font-mono text-xs text-[#A3A099] transition-colors duration-150 hover:text-foreground"
          >
            contato@otimizaconsultoria.com.br
          </a>
        </div>
      </nav>
    </div>
  );

  return (
    <>
      <button
        ref={buttonRef}
        type="button"
        onClick={toggle}
        aria-expanded={isOpen}
        aria-controls="mobile-menu"
        aria-label={isOpen ? "Fechar menu" : "Abrir menu"}
        className={cn(
          "lg:hidden relative size-11 rounded-[2px] border border-border cursor-pointer",
          className
        )}
      >
        <span
          aria-hidden
          className={line}
          style={{
            top: 14,
            width: 20,
            transform: isOpen ? "translateY(6px) rotate(45deg)" : "none",
          }}
        />
        <span
          aria-hidden
          className={cn(line, "origin-left")}
          style={{
            top: 20,
            width: 20,
            opacity: isOpen ? 0 : 1,
            transform: isOpen ? "scaleX(0.2)" : "none",
          }}
        />
        <span
          aria-hidden
          className={line}
          style={{
            top: 26,
            width: isOpen ? 20 : 14,
            transform: isOpen ? "translateY(-6px) rotate(-45deg)" : "none",
          }}
        />
      </button>
      {mounted && createPortal(panel, document.body)}
    </>
  );
};
