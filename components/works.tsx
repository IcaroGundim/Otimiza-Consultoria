import Image from "next/image";
import { Pill } from "./pill";
import { Button } from "./ui/button";

const MAP_PDF = "/mapa-potencialidades-acre.pdf";

// Cadeias produtivas conforme a legenda do próprio mapa.
const chains = [
  "Açaí",
  "Cacau",
  "Café",
  "Castanha",
  "Madeira",
  "Mandioca",
  "Pecuária Leiteira",
  "Turismo",
];

export function Works() {
  return (
    <section id="trabalhos" className="bg-sage-50 py-section">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
          <div data-reveal>
            <Pill className="mb-6">TRABALHOS</Pill>
            <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl md:text-5xl">
              Produtos analíticos desenvolvidos para instituições do Acre.
            </h2>
          </div>
        </div>

        <article
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="mt-12 overflow-hidden rounded-card border border-sage-200 bg-paper"
        >
          {/* O mapa é denso: em tela ele funciona como chamada, e o PDF é
              onde de fato se lê. Por isso a imagem inteira abre o arquivo. */}
          <a
            href={MAP_PDF}
            target="_blank"
            rel="noopener noreferrer"
            className="group block focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
          >
            <Image
              src="/mapa-potencialidades-acre.png"
              alt="Mapa de Potencialidades do Acre: as cinco regionais do estado — Juruá, Tarauacá-Envira, Purus, Baixo Acre e Alto Acre — com as cadeias produtivas de cada município e os eixos rodoviários e hidroviários."
              width={2340}
              height={1655}
              priority={false}
              sizes="(min-width: 1536px) 1400px, (min-width: 1024px) 90vw, 100vw"
              className="h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
            />
          </a>

          <div className="grid gap-10 border-t border-sage-200 p-7 md:p-10 lg:grid-cols-[1.2fr_1fr] lg:gap-16 lg:p-12">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.18em] text-terracotta">
                Cartografia econômica
              </p>
              <h3 className="mt-4 font-display text-2xl text-balance md:text-3xl">
                Acre — Mapa de Potencialidades
              </h3>
              <p className="mt-5 max-w-[58ch] text-base text-pretty text-foreground/70">
                Mapeamento das cadeias produtivas com potencial de
                desenvolvimento nas cinco regionais do estado, cruzando a
                produção agropecuária e extrativa dos 22 municípios com os
                principais eixos rodoviários e hidroviários do Acre.
              </p>

              <Button asChild variant="ghost" size="sm" className="mt-8">
                <a href={MAP_PDF} target="_blank" rel="noopener noreferrer">
                  Abrir o mapa em PDF
                </a>
              </Button>
            </div>

            <dl className="space-y-6">
              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
                  Realização
                </dt>
                <dd className="mt-2 text-sm text-foreground/70">
                  Sebrae, Otimiza Consultoria e Fórum Empresarial de Inovação e
                  Desenvolvimento
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
                  Cadeias mapeadas
                </dt>
                <dd className="mt-3 flex flex-wrap gap-2">
                  {chains.map((chain) => (
                    <span
                      key={chain}
                      className="rounded-full border border-sage-200 bg-sage-50 px-3 py-1 text-xs text-foreground/70"
                    >
                      {chain}
                    </span>
                  ))}
                </dd>
              </div>

              <div>
                <dt className="font-mono text-xs uppercase tracking-[0.14em] text-ink/60">
                  Fonte dos dados
                </dt>
                <dd className="mt-2 text-sm text-foreground/70">
                  IBGE — Produção Agrícola Municipal (PAM), Produção da Extração
                  Vegetal e da Silvicultura (PEVS) e Pesquisa da Pecuária
                  Municipal (PPM)
                </dd>
              </div>
            </dl>
          </div>
        </article>
      </div>
    </section>
  );
}
