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
    <section id="servicos" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <Pill className="mb-6">SERVIÇOS</Pill>
        <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl max-w-4xl text-balance">
          Metodologias robustas para decisões econômicas e sociais orientadas por
          evidências.
        </h2>
        <p className="font-mono text-sm sm:text-base text-foreground/70 mt-6 max-w-3xl text-balance">
          Atuamos com desenho analítico rigoroso e comunicação acessível para
          transformar dados complexos em inteligência prática para governo e
          empresas.
        </p>

        <div className="grid gap-4 md:gap-6 mt-12 md:grid-cols-3">
          {services.map((service, index) => (
            <article
              key={service.title}
              className="border border-border bg-black/45 backdrop-blur-sm p-6 md:p-7"
            >
              <p className="font-mono text-xs text-primary mb-5">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="font-sentient text-2xl text-balance">
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
