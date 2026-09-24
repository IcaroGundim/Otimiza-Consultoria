"use client";

import { MAP_PDF, selectService, services, works } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowUpRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
import { CtaButton } from "./cta-button";
import { Logo } from "./logo";
import { MobileMenu } from "./mobile-menu";

type Panel = "servicos" | "trabalhos";

const PANEL_WIDTH: Record<Panel, number> = { servicos: 880, trabalhos: 460 };
const EDGE = 16; // folga mínima entre o painel e a borda da janela

const linkClass =
  "uppercase inline-block font-mono text-foreground/60 hover:text-foreground duration-150 transition-colors ease-out";

const isExternal = (href: string) => /^https?:/.test(href) || href.endsWith(".pdf");

export const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState<Panel | null>(null);
  // `shown` é o último painel aberto: ao fechar, o painel some no lugar em vez
  // de voltar para a posição do outro. `opens` remonta a lista a cada
  // abertura, o que refaz a entrada escalonada dos itens.
  const [shown, setShown] = useState<Panel>("servicos");
  const [opens, setOpens] = useState(0);
  const [geometry, setGeometry] = useState({ left: 0, width: 0, height: 0 });

  const sentinelRef = useRef<HTMLDivElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const triggerRefs = useRef<Record<Panel, HTMLButtonElement | null>>({
    servicos: null,
    trabalhos: null,
  });
  const contentRefs = useRef<Record<Panel, HTMLDivElement | null>>({
    servicos: null,
    trabalhos: null,
  });

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

  // O painel é um só e muda de posição, largura e altura entre os dois
  // conteúdos. Centraliza sob o gatilho e respeita a borda da janela.
  const measure = useCallback(() => {
    const bar = barRef.current;
    const trigger = triggerRefs.current[shown];
    const content = contentRefs.current[shown];
    if (!bar || !trigger || !content) return;

    const barBox = bar.getBoundingClientRect();
    const triggerBox = trigger.getBoundingClientRect();
    const width = Math.min(PANEL_WIDTH[shown], barBox.width - EDGE * 2);
    const center = triggerBox.left - barBox.left + triggerBox.width / 2;
    const left = Math.min(
      Math.max(center - width / 2, EDGE),
      barBox.width - width - EDGE
    );
    setGeometry({ left, width, height: content.offsetHeight });
  }, [shown]);

  useLayoutEffect(() => {
    measure();
    const observer = new ResizeObserver(measure);
    for (const el of Object.values(contentRefs.current)) {
      if (el) observer.observe(el);
    }
    if (barRef.current) observer.observe(barRef.current);
    return () => observer.disconnect();
  }, [measure]);

  // Fecha com Esc e com clique fora do header.
  useEffect(() => {
    if (!open) return;

    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      triggerRefs.current[open]?.focus();
      setOpen(null);
    };
    const onPointer = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpen(null);
    };

    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPointer);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [open]);

  const toggle = (panel: Panel) => {
    if (open === panel) {
      setOpen(null);
      return;
    }
    setShown(panel);
    setOpen(panel);
    setOpens((n) => n + 1);
  };

  const close = () => setOpen(null);

  const trigger = (panel: Panel, label: string) => {
    const active = open === panel;
    return (
      <button
        ref={(el) => {
          triggerRefs.current[panel] = el;
        }}
        type="button"
        aria-expanded={active}
        aria-controls="header-panel"
        onClick={() => toggle(panel)}
        className={cn(
          "relative inline-flex items-center gap-2 uppercase font-mono cursor-pointer transition-colors duration-200 ease-out",
          active ? "text-foreground" : "text-foreground/60 hover:text-foreground"
        )}
      >
        {label}
        <ChevronDown
          aria-hidden
          size={14}
          strokeWidth={2}
          className={cn(
            "transition-transform duration-300 ease-(--ease-out-expo)",
            active && "rotate-180"
          )}
        />
        <span
          aria-hidden
          className={cn(
            "absolute left-0 right-0 -bottom-2 h-px bg-primary origin-left transition-transform duration-300 ease-(--ease-out-expo)",
            active ? "scale-x-100" : "scale-x-0"
          )}
        />
      </button>
    );
  };

  const stagger = (i: number, base = 60, gap = 35) =>
    ({ "--stagger": `${base + i * gap}ms` }) as React.CSSProperties;

  const isServ = shown === "servicos";

  return (
    <>
      <div
        ref={sentinelRef}
        aria-hidden
        className="absolute top-0 left-0 h-8 w-px pointer-events-none"
      />

      <div
        ref={barRef}
        className={cn(
          "fixed z-50 top-0 left-0 w-full transition-[padding,background-color,border-color] duration-300 ease-out border-b",
          scrolled || open
            ? "py-4 md:py-5 bg-background/80 backdrop-blur-md border-border"
            : "pt-8 md:pt-14 pb-4 border-transparent"
        )}
      >
        <header className="flex items-center justify-between container">
          <Link href="/#inicio" aria-label="Ir para o início da página">
            <Logo variant="compact" className="[--mark:22px] md:[--mark:26px]" />
          </Link>
          <nav
            aria-label="Principal"
            className="flex max-lg:hidden absolute left-1/2 -translate-x-1/2 items-center justify-center gap-x-10"
          >
            <Link className={linkClass} href="/#inicio">
              Início
            </Link>
            {trigger("servicos", "Serviços")}
            {trigger("trabalhos", "Trabalhos")}
            <Link className={linkClass} href="/#diferenciais">
              Diferenciais
            </Link>
            <Link className={linkClass} href="/#contato">
              Contato
            </Link>
          </nav>
          <CtaButton href="/#contato" className="max-lg:hidden">
            Falar com a Otimiza
          </CtaButton>
          <MobileMenu />
        </header>

        <div
          id="header-panel"
          ref={panelRef}
          inert={!open}
          className="absolute max-lg:hidden overflow-hidden rounded-[4px] border border-border bg-ink shadow-[0_32px_64px_rgba(0,0,0,0.55)] origin-top"
          style={{
            top: "calc(100% + 8px)",
            left: geometry.left,
            width: geometry.width,
            height: geometry.height + 2,
            opacity: open ? 1 : 0,
            transform: open ? "none" : "translateY(-8px) scale(0.985)",
            visibility: open ? "visible" : "hidden",
            transition: [
              "left 380ms var(--ease-out-expo)",
              "width 380ms var(--ease-out-expo)",
              "height 380ms var(--ease-out-expo)",
              "opacity 200ms ease-out",
              "transform 320ms var(--ease-out-expo)",
              `visibility 0ms linear ${open ? "0ms" : "220ms"}`,
            ].join(", "),
          }}
        >
          <div
            ref={(el) => {
              contentRefs.current.servicos = el;
            }}
            inert={!isServ}
            className="absolute top-0 left-0 grid w-full grid-cols-[minmax(0,1fr)_260px] transition-[opacity,transform] duration-[220ms,380ms] ease-(--ease-out-expo)"
            style={{
              opacity: isServ ? 1 : 0,
              transform: isServ ? "none" : "translateX(-40px)",
            }}
          >
            <div key={`s${opens}`} className="grid grid-cols-2 gap-1 p-3">
              {services.map((service, i) => (
                <Link
                  key={service.num}
                  href="/#servicos"
                  onClick={() => {
                    selectService(i);
                    close();
                  }}
                  style={stagger(i)}
                  className="group grid grid-cols-[36px_minmax(0,1fr)] gap-x-2 gap-y-1 rounded-[2px] px-3.5 py-4 transition-colors duration-150 ease-out hover:bg-[#1B1B1B] focus-visible:bg-[#1B1B1B] focus-visible:outline-none [animation:otz-drop_420ms_var(--ease-out-expo)_var(--stagger)_both]"
                >
                  <span className="row-span-2 pt-1 font-mono text-[11px] tracking-[0.14em] text-muted transition-colors duration-150 group-hover:text-primary group-focus-visible:text-primary">
                    {service.num}
                  </span>
                  <span className="font-display font-semibold text-[17px]">
                    {service.short}
                  </span>
                  <span className="font-mono text-xs leading-[1.55] text-[#A3A099]">
                    {service.summary}
                  </span>
                </Link>
              ))}
            </div>
            <div
              key={`f${opens}`}
              style={stagger(0, 140)}
              className="flex flex-col gap-3.5 border-l border-border p-5 [animation:otz-drop_520ms_var(--ease-out-expo)_var(--stagger)_both]"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                Trabalho em destaque
              </span>
              <Image
                src="/mapa-potencialidades-acre.png"
                alt="Mapa de Potencialidades do Acre com as cinco regionais do estado"
                width={2340}
                height={1655}
                sizes="220px"
                className="h-[150px] w-full rounded-[2px] object-cover"
              />
              <span className="font-display font-semibold text-[17px] leading-tight">
                Mapa de Potencialidades do Acre
              </span>
              <span className="font-mono text-xs leading-[1.55] text-[#A3A099]">
                Cadeias produtivas e infraestrutura nas cinco regionais.
              </span>
              <a
                href={MAP_PDF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                className="mt-auto font-mono text-xs uppercase text-muted transition-colors duration-150 hover:text-foreground"
              >
                [Abrir PDF]
              </a>
            </div>
            <div className="col-span-2 flex items-center justify-between border-t border-border px-6 py-4 font-mono text-xs tracking-[0.06em]">
              <span className="text-[#A3A099]">
                Do desenho da amostra à defesa dos resultados.
              </span>
              <Link
                href="/#servicos"
                onClick={close}
                className="uppercase text-primary transition-colors duration-150 hover:text-foreground"
              >
                [Ver todos os serviços]
              </Link>
            </div>
          </div>

          <div
            ref={(el) => {
              contentRefs.current.trabalhos = el;
            }}
            inert={isServ}
            className="absolute top-0 left-0 flex w-full flex-col p-2 transition-[opacity,transform] duration-[220ms,380ms] ease-(--ease-out-expo)"
            style={{
              opacity: isServ ? 0 : 1,
              transform: isServ ? "translateX(40px)" : "none",
            }}
          >
            <div key={`t${opens}`} className="flex flex-col">
              {works.map((work, i) => (
                <a
                  key={work.title}
                  href={work.href}
                  {...(isExternal(work.href)
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  onClick={close}
                  style={stagger(i, 60, 45)}
                  className="group grid grid-cols-[minmax(0,1fr)_20px] items-center gap-x-4 gap-y-1.5 rounded-[2px] p-4 transition-colors duration-150 ease-out hover:bg-[#1B1B1B] focus-visible:bg-[#1B1B1B] focus-visible:outline-none [animation:otz-drop_420ms_var(--ease-out-expo)_var(--stagger)_both]"
                >
                  <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                    {work.shortLabel}
                  </span>
                  <ArrowUpRight
                    aria-hidden
                    size={16}
                    className="row-span-2 text-[#A3A099] transition-transform duration-200 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                  <span className="font-display font-semibold text-[17px]">
                    {work.title}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
