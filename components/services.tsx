import { Pill } from "./pill";

const services = [
  {
    title: "Econometria Aplicada",
    description:
      "Modelos econométricos para projetar cenários, avaliar políticas públicas e orientar decisões com maior precisão técnica.",
  },
  {
    title: "Geoprocessamento",
    description:
      "Análises territoriais e mapeamento de indicadores para identificar dinâmicas regionais e oportunidades estratégicas no Acre.",
  },
  {
    title: "Pesquisas Eleitorais",
    description:
      "Estudos quantitativos e qualitativos para leitura de opinião pública, comportamento eleitoral e tendências de voto.",
  },
];

export function Services() {
  return (
    <section id="servicos" className="bg-sage-50 py-section">
      <div className="container">
        <div className="grid gap-8 lg:grid-cols-[1.35fr_1fr] lg:items-end lg:gap-20">
          <div data-reveal>
            <Pill className="mb-6">SERVIÇOS</Pill>
            <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl md:text-5xl">
              Metodologias robustas para decisões econômicas e sociais
              orientadas por evidências.
            </h2>
          </div>
          <p
            data-reveal
            style={{ "--reveal-delay": "120ms" } as React.CSSProperties}
            className="max-w-[46ch] text-base text-pretty text-foreground/70 lg:pb-2"
          >
            Atuamos com desenho analítico rigoroso e comunicação acessível para
            transformar dados complexos em inteligência prática para governo e
            empresas.
          </p>
        </div>

        <div className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {services.map((service, index) => (
            <article
              key={service.title}
              data-reveal
              style={{ "--reveal-delay": `${index * 110}ms` } as React.CSSProperties}
              className="group rounded-card border border-sage-200 bg-paper p-7 transition-[border-color,translate] duration-300 ease-out hover:-translate-y-1 hover:border-terracotta/40 md:p-8"
            >
              <p className="mb-6 font-mono text-xs tracking-[0.18em] text-terracotta">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-display text-2xl text-balance md:text-[1.75rem]">
                {service.title}
              </h3>
              <p className="mt-4 text-sm text-pretty text-foreground/70">
                {service.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
