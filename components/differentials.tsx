const differentials = [
  {
    title: "Distância importa",
    description:
      "Há municípios sem acesso rodoviário permanente, onde o transporte é fluvial e sazonal. Modelo que ignora isso erra o custo de qualquer política.",
  },
  {
    title: "A fonte vem junto",
    description:
      "Cada número entregue traz a base de origem, o ano e o recorte usado. Sem isso não dá para auditar o resultado.",
  },
  {
    title: "Cadeia por cadeia",
    description:
      "Açaí e café não respondem às mesmas alavancas, e a mesma cadeia muda de comportamento de uma região para outra. As recomendações mudam junto.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <h2
          data-reveal
          className="font-sentient text-3xl sm:text-4xl md:text-5xl max-w-3xl text-balance"
        >
          Nenhum território cabe na própria média.
        </h2>
        <p
          data-reveal
          style={{ "--reveal-delay": "60ms" } as React.CSSProperties}
          className="font-mono text-sm sm:text-base text-foreground/70 mt-6 max-w-2xl text-pretty"
        >
          Três princípios atravessam todos os trabalhos — do levantamento em
          campo à defesa dos resultados.
        </p>

        {/* Linhas, e não um segundo grid de três cards: a seção de serviços
            logo acima já usa esse formato. O painel revela inteiro — escalonar
            as linhas separaria o conteúdo da borda que as contém. */}
        <div
          data-reveal
          style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
          className="border border-border bg-black/40 backdrop-blur-sm mt-12 px-6 md:px-8"
        >
          {differentials.map((item, index) => (
            <article
              key={item.title}
              data-last={index === differentials.length - 1 || undefined}
              className="border-b border-border data-last:border-b-0 grid gap-3 py-7 md:grid-cols-[3.5rem_minmax(0,260px)_1fr] md:gap-12 md:py-8"
            >
              <p className="font-mono text-xs text-primary tracking-[0.14em] md:pt-2">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-sentient text-2xl text-balance">
                {item.title}
              </h3>
              <p className="font-mono text-sm text-foreground/70 max-w-[70ch] text-pretty">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
