import Image from "next/image";

const MAP_PDF = "/mapa-potencialidades-acre.pdf";

/**
 * Chamada compacta do trabalho em destaque, ao lado do título do hero.
 * O mapa é denso demais para ser lido em miniatura: aqui ele funciona como
 * capa, e o PDF é onde de fato se lê.
 */
export function FeaturedWork() {
  return (
    <a
      href={MAP_PDF}
      target="_blank"
      rel="noopener noreferrer"
      className="group block border border-border bg-ink/45 backdrop-blur-sm p-3 text-left transition-colors duration-300 ease-out hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
    >
      <Image
        src="/mapa-potencialidades-acre.png"
        alt="Mapa de Potencialidades do Acre: as cinco regionais do estado — Juruá, Tarauacá-Envira, Purus, Baixo Acre e Alto Acre — com as cadeias produtivas de cada município e os eixos rodoviários e hidroviários."
        width={2340}
        height={1655}
        priority
        sizes="(min-width: 1024px) 520px, (min-width: 640px) 60vw, 90vw"
        className="h-auto w-full transition-opacity duration-300 ease-out group-hover:opacity-90"
      />

      <div className="px-1 pt-4 pb-1">
        <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
          Trabalho em destaque
        </p>
        <h2 className="font-display font-semibold text-xl mt-2 text-balance">
          Mapa de Potencialidades do Acre
        </h2>
        <p className="font-mono text-xs text-foreground/70 mt-2 text-pretty">
          Cadeias produtivas e infraestrutura nas cinco regionais do estado.
        </p>
        <p className="font-mono text-xs uppercase text-muted mt-4 transition-colors duration-300 ease-out group-hover:text-primary">
          [Abrir PDF]
        </p>
      </div>
    </a>
  );
}
