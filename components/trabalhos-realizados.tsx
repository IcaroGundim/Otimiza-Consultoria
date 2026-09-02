const DASHBOARD_URL = "https://forumdoacre.vercel.app/";
const PESQUISA_URL =
  "https://drive.google.com/drive/folders/1RnPrnfBJh_uD_DqTRpBUnyd6ivk__iGr";

const trabalhos = [
  {
    href: DASHBOARD_URL,
    label: "Dashboard interativo",
    title: "Painel Municipal Integrado",
    description:
      "Indicadores econômicos do Mapa de Potencialidades do Acre, município a município, em um painel navegável.",
    cta: "[Abrir dashboard]",
  },
  {
    href: PESQUISA_URL,
    label: "Pesquisa 2026",
    title: "Ambiente de Negócios do Acre",
    description:
      "Diagnóstico e percepções empresariais: 586 empresas ouvidas em 12 municípios, com o Índice de Ambiente de Negócios (IAN) em sete dimensões — crédito, inovação, infraestrutura, clima e mercado.",
    cta: "[Abrir pesquisa]",
  },
];

/**
 * Seção de trabalhos realizados: cards-link no mesmo padrão visual do resto
 * do site (borda, blur, hover com primary).
 */
export function TrabalhosRealizados() {
  return (
    <section id="trabalhos" className="relative z-10 py-20 md:py-28">
      <div className="container">
        <h2
          data-reveal
          className="font-display font-semibold text-3xl sm:text-4xl md:text-5xl text-balance"
        >
          Trabalhos realizados
        </h2>

        <div className="grid md:grid-cols-2 gap-5 mt-12">
          {trabalhos.map((trabalho, index) => (
            <a
              key={trabalho.href}
              href={trabalho.href}
              target="_blank"
              rel="noopener noreferrer"
              data-reveal
              style={
                { "--reveal-delay": `${index * 120}ms` } as React.CSSProperties
              }
              className="group block border border-border bg-ink/45 backdrop-blur-sm p-6 md:p-8 text-left transition-colors duration-300 ease-out hover:border-primary/50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-primary">
                {trabalho.label}
              </p>
              <h3 className="font-display font-semibold text-2xl mt-3 text-balance">
                {trabalho.title}
              </h3>
              <p className="font-mono text-sm text-foreground/70 mt-3 text-pretty">
                {trabalho.description}
              </p>
              <p className="font-mono text-xs uppercase text-muted mt-6 transition-colors duration-300 ease-out group-hover:text-primary">
                {trabalho.cta}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
