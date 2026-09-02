const romanNumerals = [
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
] as const;

function toRoman(value: number) {
  let remaining = value;
  let result = "";

  for (const [number, symbol] of romanNumerals) {
    while (remaining >= number) {
      result += symbol;
      remaining -= number;
    }
  }

  return result;
}

const services = [
  {
    title: "Ciência de Dados",
    description:
      "Integração e limpeza de bases públicas dispersas — IBGE, RAIS, Datasus, portais de transparência — em indicadores comparáveis entre municípios.",
  },
  {
    title: "Machine Learning",
    description:
      "Modelos preditivos e de agrupamento: projeção de demanda, classificação de risco e segmentação de municípios por perfil produtivo.",
  },
  {
    title: "Geoprocessamento",
    description:
      "Cartografia temática e análise espacial: onde está a produção e por onde ela escoa.",
  },
  {
    title: "Dashboards Interativos",
    description:
      "Painéis onde o dado é explorado e explicado: filtros por recorte e período, séries que atualizam na mesma tela e a leitura pronta para quem decide.",
  },
  {
    title: "Pesquisas Eleitorais",
    description:
      "Intenção de voto, rejeição e avaliação de gestão. Cada número sai com plano amostral, recorte e margem de erro declarados.",
  },
  {
    title: "Capacitação e Treinamento em Análise de Dados",
    description:
      "Oficinas e trilhas formativas para equipes técnicas e gestores: leitura crítica de indicadores, Excel avançado, SQL, visualização e comunicação de dados.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <h2
          data-reveal
          className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl max-w-4xl text-balance"
        >
          Seis frentes de trabalho, do desenho da amostra à defesa dos
          resultados.
        </h2>

        <div className="grid gap-4 md:gap-6 mt-12 md:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              style={
                { "--reveal-delay": `${index * 90}ms` } as React.CSSProperties
              }
              className="border border-border bg-ink/45 backdrop-blur-sm p-6 md:p-7"
            >
              <p className="font-mono text-xs text-muted tracking-[0.14em] mb-5">
                {toRoman(index + 1)}
              </p>
              <h3 className="font-display font-semibold text-2xl text-balance">
                {service.title}
              </h3>
              <p className="font-mono text-sm text-foreground/70 mt-4 text-pretty">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
