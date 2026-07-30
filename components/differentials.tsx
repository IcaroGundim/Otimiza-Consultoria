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
    <section id="diferenciais" className="py-section">
      <div className="container">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr] lg:gap-20">
          <div data-reveal>
            <Pill className="mb-6">DIFERENCIAIS</Pill>
            <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl md:text-5xl">
              Credibilidade técnica com aplicação prática para contextos
              públicos e empresariais.
            </h2>
          </div>

          <div>
            {differentials.map((item, index) => (
              <article
                key={item.title}
                data-reveal
                style={
                  { "--reveal-delay": `${index * 110}ms` } as React.CSSProperties
                }
                className="grid gap-3 border-t border-sage-200 py-7 last:pb-0 sm:grid-cols-[1fr_1.15fr] sm:gap-10"
              >
                <div className="flex items-start gap-3">
                  <span
                    aria-hidden
                    className="mt-3 inline-block size-1.5 shrink-0 rounded-full bg-terracotta"
                  />
                  <h3 className="font-display text-2xl text-balance">
                    {item.title}
                  </h3>
                </div>
                <p className="max-w-[52ch] text-sm text-pretty text-foreground/70">
                  {item.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
