const mapStats = [
  { value: "22", label: "municípios mapeados" },
  { value: "05", label: "regionais do estado" },
  { value: "02", label: "modais de escoamento" },
];

export function ReferenceWork() {
  return (
    <section id="referencia" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <div
          data-reveal
          className="border border-border bg-ink/45 backdrop-blur-sm p-7 md:p-10 lg:p-12"
        >
          <div className="grid lg:grid-cols-2 gap-10 lg:gap-14">
            <div>
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                Trabalho de referência
              </p>
              <h2 className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-balance mt-4">
                O trabalho que melhor mostra o método.
              </h2>

              <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-border pt-6">
                {mapStats.map((stat) => (
                  <div key={stat.label} className="flex flex-col">
                    <dt className="order-2 font-mono text-[11px] uppercase tracking-[0.18em] text-muted mt-2">
                      {stat.label}
                    </dt>
                    <dd className="order-1 font-display font-semibold text-3xl md:text-4xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <a
                href="/mapa-potencialidades-acre.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block font-mono text-xs uppercase text-muted mt-10 transition-colors duration-300 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
              >
                [Abrir o mapa em alta resolução]
              </a>
            </div>

            <div>
              <p className="font-mono text-sm sm:text-base text-foreground/70 text-pretty">
                No Mapa de Potencialidades do Acre, feito com o Sebrae e o Fórum
                Empresarial, cruzamos a produção agropecuária e extrativa dos 22
                municípios do estado com a malha rodoviária e hidroviária.
              </p>
              <p className="font-mono text-sm sm:text-base text-foreground/70 mt-5 text-pretty">
                O desenho não é específico daquele recorte. As bases são
                nacionais e o método não muda quando o mapa muda.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
