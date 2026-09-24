"use client";

import { works, type WorkType } from "@/lib/content";
import { cn } from "@/lib/utils";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Filter = "todos" | WorkType;

const filters: { id: Filter; label: string }[] = [
  { id: "todos", label: "Todos" },
  { id: "dashboard", label: "Dashboards" },
  { id: "pesquisa", label: "Pesquisas" },
  { id: "mapa", label: "Mapas" },
];

const COUNT_MS = 1100;

/**
 * Conta de 0 até `value` quando `run` muda para um valor novo. Com movimento
 * reduzido, mostra o valor final direto.
 */
function useCountUp(value: number, run: number) {
  const [shown, setShown] = useState(value);

  useEffect(() => {
    if (run === 0) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let frame = 0;
    let start = 0;
    const tick = (now: number) => {
      start ||= now;
      const t = still ? 1 : Math.min(1, (now - start) / COUNT_MS);
      setShown(Math.round(value * (1 - Math.pow(1 - t, 3))));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [value, run]);

  return shown;
}

function Figure({ value, label, run }: { value: number; label: string; run: number }) {
  const shown = useCountUp(value, run);
  return (
    <div className="absolute right-6 bottom-5 flex flex-col items-end gap-1.5">
      <span className="font-display font-black text-6xl leading-none tracking-[-0.035em] tabular-nums">
        {shown}
      </span>
      <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-[#A3A099]">
        {label}
      </span>
    </div>
  );
}

/**
 * Trabalhos realizados: filtro por tipo e cards-link. Os cards entram em
 * sequência a cada filtro, e o número grande conta a partir de zero quando a
 * seção aparece na tela ou quando o filtro muda.
 */
export function TrabalhosRealizados() {
  const [filter, setFilter] = useState<Filter>("todos");
  const [run, setRun] = useState(0);
  // Na primeira exibição quem anima é o reveal do grid; os cards só entram
  // em sequência depois de uma troca de filtro.
  const [filtered, setFiltered] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);

  // A primeira contagem começa junto com o reveal do grid (mesmos limiares
  // do ScrollReveal), enquanto ele ainda está transparente — assim a volta
  // do valor para zero não aparece.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        setRun((n) => n || 1);
        observer.disconnect();
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  const pick = (id: Filter) => {
    if (id === filter) return;
    setFilter(id);
    setFiltered(true);
    setRun((n) => n + 1);
  };

  const visible = works.filter((w) => filter === "todos" || w.type === filter);

  return (
    <section id="trabalhos" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p
              data-reveal
              className="font-mono font-medium text-xs uppercase tracking-[0.16em] text-primary"
            >
              Trabalhos
            </p>
            <h2
              data-reveal
              style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
              className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-balance mt-4"
            >
              Trabalhos realizados
            </h2>
          </div>
          <div
            data-reveal
            style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            role="group"
            aria-label="Filtrar trabalhos"
            className="flex flex-wrap gap-2.5"
          >
            {filters.map((f) => {
              const on = f.id === filter;
              const count =
                f.id === "todos"
                  ? works.length
                  : works.filter((w) => w.type === f.id).length;
              return (
                <button
                  key={f.id}
                  type="button"
                  aria-pressed={on}
                  onClick={() => pick(f.id)}
                  className={cn(
                    "inline-flex h-11 items-center gap-2.5 rounded-full border px-[18px] font-mono text-[13px] tracking-[0.06em] cursor-pointer transition-[background-color,border-color,color,transform] duration-[240ms] ease-out active:scale-[0.97] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
                    on
                      ? "border-foreground bg-foreground text-ink"
                      : "border-border bg-background/50 backdrop-blur-sm text-foreground/80 hover:border-[#5A5A5A]"
                  )}
                >
                  {f.label}
                  <span
                    className={cn(
                      "text-[11px] transition-colors duration-[240ms]",
                      on ? "text-[#6B6B6B]" : "text-muted"
                    )}
                  >
                    {count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        <div
          ref={gridRef}
          data-reveal
          style={{ "--reveal-delay": "240ms" } as React.CSSProperties}
          className="grid gap-6 mt-10 md:grid-cols-2 lg:grid-cols-3 items-start"
        >
          {visible.map((work, i) => {
            const external = /^https?:/.test(work.href) || work.href.endsWith(".pdf");
            return (
              <div
                // A chave inclui o filtro: o card remonta e refaz a entrada.
                key={`${filter}-${work.type}`}
                style={{ "--stagger": `${i * 80}ms` } as React.CSSProperties}
                className={cn(
                  filtered &&
                    "[animation:otz-card_620ms_var(--ease-out-expo)_var(--stagger)_both]"
                )}
              >
                <a
                  href={work.href}
                  {...(external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="group flex flex-col overflow-hidden rounded-[4px] border border-border bg-ink/70 backdrop-blur-sm transition-[border-color,transform,box-shadow] duration-[300ms,420ms,420ms] ease-(--ease-out-expo) hover:-translate-y-1 hover:border-primary/55 hover:shadow-[0_24px_48px_rgba(0,0,0,0.45)] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                >
                  <div className="relative h-60 overflow-hidden border-b border-border bg-ink">
                    {work.type === "mapa" ? (
                      <Image
                        src="/mapa-potencialidades-acre.png"
                        alt="Mapa de Potencialidades do Acre: as cinco regionais com as cadeias produtivas de cada município"
                        width={2340}
                        height={1655}
                        sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                        className="size-full object-cover transition-transform duration-[900ms] ease-(--ease-out-expo) group-hover:scale-[1.04]"
                      />
                    ) : (
                      <>
                        {/* A trama de meio-tom da marca, abrindo da esquerda
                            para a direita. */}
                        <div
                          aria-hidden
                          className="absolute -inset-3 bg-[radial-gradient(circle,var(--foreground)_1.4px,transparent_1.7px)] bg-size-[9px_9px] [mask-image:linear-gradient(90deg,rgba(0,0,0,0.9)_0%,rgba(0,0,0,0.35)_45%,transparent_85%)] transition-transform duration-[900ms] ease-(--ease-out-expo) group-hover:-translate-x-[9px]"
                        />
                        {work.figure ? (
                          <Figure
                            value={work.figure.value}
                            label={work.figure.label}
                            run={run}
                          />
                        ) : (
                          work.figureLabel && (
                            <span className="absolute right-6 bottom-5 font-mono text-[11px] uppercase tracking-[0.16em] text-[#A3A099]">
                              {work.figureLabel}
                            </span>
                          )
                        )}
                      </>
                    )}
                  </div>
                  <div className="flex min-h-[300px] flex-col gap-3.5 p-7">
                    <span className="font-mono text-[11px] uppercase tracking-[0.16em] text-primary">
                      {work.label}
                    </span>
                    <span className="font-display font-semibold text-2xl md:text-[26px] leading-[1.15]">
                      {work.title}
                    </span>
                    <span className="font-mono text-sm leading-[1.65] text-foreground/70">
                      {work.description}
                    </span>
                    <span className="mt-auto border-t border-border pt-4 font-mono text-xs tracking-[0.08em] text-[#A3A099]">
                      {work.meta}
                    </span>
                    <span className="inline-flex items-center gap-2 font-mono text-xs uppercase text-muted transition-colors duration-300 group-hover:text-primary">
                      {work.cta}
                      <ArrowUpRight
                        aria-hidden
                        size={14}
                        className="transition-transform duration-300 ease-(--ease-out-expo) group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      />
                    </span>
                  </div>
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
