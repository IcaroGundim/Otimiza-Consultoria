import { Pill } from "./pill";

export function AcreExpertise() {
  return (
    // Reescopa o acento: `@theme inline` faz text-terracotta emitir
    // `color: var(--terracotta)`, então redefinir a variável aqui troca o
    // acento de toda a faixa escura sem tocar nos componentes filhos.
    <section
      id="acre"
      className="bg-ink py-section text-paper [--terracotta:var(--terracotta-light)]"
    >
      <div className="container">
        <Pill className="mb-8" data-reveal>
          ESPECIALIZAÇÃO NO ACRE
        </Pill>

        <div className="grid gap-10 lg:grid-cols-[1.15fr_1fr] lg:gap-20">
          <div data-reveal style={{ "--reveal-delay": "80ms" } as React.CSSProperties}>
            <h2 className="font-display text-3xl leading-[1.1] text-balance sm:text-4xl md:text-5xl lg:text-6xl">
              Conhecimento aprofundado da conjuntura econômica e social do
              estado.
            </h2>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            className="max-w-[58ch]"
          >
            <p className="text-base text-pretty text-paper/70 sm:text-lg">
              Nossa atuação combina leitura de cenário, modelagem quantitativa e
              inteligência territorial para apoiar decisões que exigem visão
              local e consistência metodológica.
            </p>
            <p className="mt-5 text-base text-pretty text-paper/70 sm:text-lg">
              Trabalhamos ao lado de instituições públicas e organizações
              privadas na estruturação de diagnósticos, estudos e estratégias
              orientadas por evidências para o desenvolvimento do Acre.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
