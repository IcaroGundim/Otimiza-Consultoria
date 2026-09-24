"use client";

import { prefillContact, SELECT_SERVICE_EVENT, services } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";

const ROW = 68; // altura de cada aba, em px; o indicador desliza de ROW em ROW

export function Services() {
  const [selected, setSelected] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);

  // O dropdown do header e o menu mobile pedem uma frente específica.
  useEffect(() => {
    const onSelect = (event: Event) => {
      const index = (event as CustomEvent<number>).detail;
      if (index >= 0 && index < services.length) setSelected(index);
    };
    window.addEventListener(SELECT_SERVICE_EVENT, onSelect);
    return () => window.removeEventListener(SELECT_SERVICE_EVENT, onSelect);
  }, []);

  // Setas movem entre as abas, como pede o padrão de tablist.
  const onKeyDown = (event: React.KeyboardEvent) => {
    const keys: Record<string, number> = {
      ArrowDown: 1,
      ArrowRight: 1,
      ArrowUp: -1,
      ArrowLeft: -1,
    };
    let next: number | undefined;
    if (event.key in keys) {
      next = (selected + keys[event.key] + services.length) % services.length;
    } else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = services.length - 1;
    if (next === undefined) return;
    event.preventDefault();
    setSelected(next);
    tabRefs.current[next]?.focus();
  };

  const current = services[selected];
  const enter = (delay: number) =>
    ({ "--stagger": `${delay}ms` }) as React.CSSProperties;

  return (
    <section id="servicos" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <p
          data-reveal
          className="font-mono font-medium text-xs uppercase tracking-[0.16em] text-primary"
        >
          Serviços
        </p>
        <h2
          data-reveal
          style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
          className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl max-w-4xl text-balance mt-4"
        >
          Seis frentes de trabalho, do desenho da amostra à defesa dos
          resultados.
        </h2>

        <div
          data-reveal
          style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
          className="grid gap-6 lg:gap-8 mt-12 lg:grid-cols-[minmax(0,400px)_minmax(0,1fr)] xl:grid-cols-[440px_minmax(0,1fr)]"
        >
          <div
            role="tablist"
            aria-orientation="vertical"
            aria-label="Serviços"
            onKeyDown={onKeyDown}
            className="relative flex flex-col self-start border-t border-border bg-background/45 backdrop-blur-sm"
          >
            <div
              aria-hidden
              className="absolute inset-x-0 top-0 bg-ink transition-transform duration-[420ms] ease-(--ease-out-expo)"
              style={{ height: ROW, transform: `translateY(${selected * ROW}px)` }}
            >
              <div className="absolute left-0 top-0 bottom-px w-0.5 bg-primary" />
            </div>
            {services.map((service, i) => {
              const active = i === selected;
              return (
                <button
                  key={service.num}
                  ref={(el) => {
                    tabRefs.current[i] = el;
                  }}
                  id={`servico-tab-${i}`}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  aria-controls="servico-painel"
                  tabIndex={active ? 0 : -1}
                  onClick={() => setSelected(i)}
                  style={{ height: ROW }}
                  className="group relative grid grid-cols-[52px_minmax(0,1fr)_20px] items-center gap-2 border-b border-border px-5 text-left cursor-pointer focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-primary"
                >
                  <span
                    className={cn(
                      "font-mono text-[11px] tracking-[0.14em] transition-colors duration-[240ms]",
                      active ? "text-primary" : "text-muted"
                    )}
                  >
                    {service.num}
                  </span>
                  <span
                    className={cn(
                      "font-display font-semibold text-lg md:text-[19px] truncate transition-colors duration-[240ms]",
                      active
                        ? "text-foreground"
                        : "text-foreground/60 group-hover:text-foreground"
                    )}
                  >
                    {service.short}
                  </span>
                  <ArrowRight
                    aria-hidden
                    size={18}
                    className={cn(
                      "text-primary transition-[opacity,transform] duration-[240ms,420ms] ease-(--ease-out-expo)",
                      active ? "opacity-100" : "opacity-0 -translate-x-2"
                    )}
                  />
                </button>
              );
            })}
          </div>

          {/* A chave troca a cada aba: o painel remonta e refaz a entrada. */}
          <div
            key={selected}
            id="servico-painel"
            role="tabpanel"
            aria-labelledby={`servico-tab-${selected}`}
            className="relative overflow-hidden flex flex-col gap-7 border border-border bg-ink/80 backdrop-blur-sm rounded-[4px] p-7 md:px-14 md:py-13 min-h-[420px]"
          >
            <span
              aria-hidden
              className="absolute right-6 md:right-10 top-2 font-display font-black text-[140px] md:text-[200px] leading-none tracking-[-0.04em] text-[#1A1A1A] [animation:otz-numeral_700ms_var(--ease-out-expo)_both]"
            >
              {current.num}
            </span>
            <span
              style={enter(0)}
              className="otz-enter relative font-mono text-xs tracking-[0.14em] text-muted"
            >
              {current.num} de VI
            </span>
            <h3
              style={enter(40)}
              className="otz-enter relative font-display font-black text-3xl md:text-[44px] leading-[1.05] tracking-[-0.035em] max-w-[560px] text-balance"
            >
              {current.title}
            </h3>
            <p
              style={enter(90)}
              className="otz-enter relative font-mono text-sm md:text-base leading-[1.7] text-foreground/70 max-w-[640px] text-pretty"
            >
              {current.description}
            </p>
            <div className="relative flex flex-col gap-3">
              <span
                style={enter(130)}
                className="otz-enter font-mono text-[11px] uppercase tracking-[0.16em] text-muted"
              >
                Inclui
              </span>
              <ul className="flex flex-wrap gap-2">
                {current.tags.map((tag, i) => (
                  <li
                    key={tag}
                    style={enter(150 + i * 40)}
                    className="otz-enter inline-flex h-[30px] items-center rounded-[2px] border border-[#2E2E2E] px-3 font-mono text-xs tracking-[0.06em] text-[#D6D2C8]"
                  >
                    {tag}
                  </li>
                ))}
              </ul>
            </div>
            <div
              style={enter(150 + current.tags.length * 40)}
              className="otz-enter relative mt-auto flex flex-wrap items-center gap-x-8 gap-y-4"
            >
              <Link
                className="contents"
                href="/#contato"
                onClick={() => prefillContact(selected)}
              >
                <Button size="sm">[Falar sobre este serviço]</Button>
              </Link>
              <Link
                href="/#trabalhos"
                className="font-mono text-[13px] uppercase text-muted transition-colors duration-150 hover:text-primary"
              >
                [Ver trabalhos]
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
