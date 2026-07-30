import Image from "next/image";
import Link from "next/link";
import { Button } from "./ui/button";

const MAP_PDF = "/mapa-potencialidades-acre.pdf";

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

/**
 * Chamada compacta do trabalho em destaque, no fim do hero.
 * A versão completa (mapa em tamanho grande e metadados) vive em <Works />.
 */
export function FeaturedWork() {
  return (
    // @container: o card mora numa coluna estreita do hero, então ele precisa
    // reagir à própria largura, não à da viewport.
    <div className="@container rounded-card border border-sage-200 bg-paper p-5">
      <div className="grid gap-5 @lg:grid-cols-[minmax(0,220px)_1fr] @lg:items-center @lg:gap-6">
        <Link
          href="/#trabalhos"
          aria-label="Ver o Mapa de Potencialidades do Acre"
          className="group block overflow-hidden rounded-field border border-sage-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta"
        >
          <Image
            src="/mapa-potencialidades-acre.png"
            alt="Miniatura do Mapa de Potencialidades do Acre, com as cinco regionais do estado e suas cadeias produtivas."
            width={2340}
            height={1655}
            sizes="(min-width: 1024px) 220px, (min-width: 640px) 60vw, 90vw"
            className="h-auto w-full transition-opacity duration-300 group-hover:opacity-90"
          />
        </Link>

        <div>
          <h2 className="font-display text-2xl leading-[1.15] text-balance text-terracotta">
            Mapa de Potencialidades do Acre
          </h2>

          <p className="mt-2 max-w-[44ch] text-sm text-pretty text-foreground/70">
            Cadeias produtivas e infraestrutura nas cinco regionais do estado.
          </p>

          <ul className="mt-4 flex flex-wrap gap-1.5">
            {chains.map((chain) => (
              <li
                key={chain}
                className="rounded-full border border-sage-200 bg-sage-50 px-2.5 py-1 text-[11px] text-foreground/70"
              >
                {chain}
              </li>
            ))}
          </ul>

          <div className="mt-5 flex flex-wrap gap-2">
            <Button asChild size="sm">
              <Link href="/#trabalhos">Visualizar</Link>
            </Button>
            <Button asChild size="sm" variant="ghost">
              <a href={MAP_PDF} target="_blank" rel="noopener noreferrer">
                Abrir PDF
              </a>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
