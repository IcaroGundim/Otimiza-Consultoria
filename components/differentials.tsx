import { Pill } from "./pill";

const differentials = [
  {
    title: "Foco Regional no Acre",
    description:
      "Leitura contextualizada da realidade econômica e social local, com sensibilidade territorial e institucional.",
  },
  {
    title: "Métodos Técnicos Consistentes",
    description:
      "Integração de econometria, geoprocessamento e pesquisa aplicada para análises confiáveis e defensáveis.",
  },
  {
    title: "Decisão com Evidências",
    description:
      "Tradução de resultados analíticos em direcionamentos claros para planejamento, priorização e execução.",
  },
];

export function Differentials() {
  return (
    <section id="diferenciais" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <Pill className="mb-6">DIFERENCIAIS</Pill>
        <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl max-w-3xl text-balance">
          Credibilidade técnica com aplicação prática para contextos públicos e
          empresariais.
        </h2>

        <div className="grid md:grid-cols-3 gap-5 mt-12">
          {differentials.map((item) => (
            <article
              key={item.title}
              className="border border-border bg-black/40 backdrop-blur-sm px-6 py-7"
            >
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block size-2 rounded-full bg-primary shadow-glow shadow-primary/40" />
                <h3 className="font-sentient text-2xl text-balance">{item.title}</h3>
              </div>
              <p className="font-mono text-sm text-foreground/70 text-pretty">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
