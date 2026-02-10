import { Pill } from "./pill";

export function AcreExpertise() {
  return (
    <section id="acre" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <div className="border border-border bg-black/45 backdrop-blur-sm p-7 md:p-10 lg:p-12">
          <Pill className="mb-6">ESPECIALIZAÇÃO NO ACRE</Pill>

          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <h2 className="font-sentient text-3xl sm:text-4xl md:text-5xl text-balance">
                Conhecimento aprofundado da conjuntura econômica e social do
                estado.
              </h2>
            </div>

            <div>
              <p className="font-mono text-sm sm:text-base text-foreground/70 text-pretty">
                Nossa atuação combina leitura de cenário, modelagem quantitativa
                e inteligência territorial para apoiar decisões que exigem visão
                local e consistência metodológica.
              </p>
              <p className="font-mono text-sm sm:text-base text-foreground/70 mt-5 text-pretty">
                Trabalhamos ao lado de instituições públicas e organizações
                privadas na estruturação de diagnósticos, estudos e estratégias
                orientadas por evidências para o desenvolvimento do Acre.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
