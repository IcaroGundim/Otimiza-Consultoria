import Link from "next/link";

const navItems = [
  { label: "Início", href: "/#inicio" },
  { label: "Serviços", href: "/#servicos" },
  { label: "Diferenciais", href: "/#diferenciais" },
  { label: "Trabalhos", href: "/#trabalhos" },
  { label: "Contato", href: "/#contato" },
];

export function Footer() {
  return (
    <footer className="relative z-10 py-10 border-t border-border/80">
      <div className="container grid gap-8 md:grid-cols-[1fr_auto] md:items-start">
        <div>
          <p className="font-sentient text-lg">Otimiza Consultoria Econômica</p>
          <p className="font-mono text-xs sm:text-sm text-foreground/50 mt-2 max-w-md text-pretty">
            Ciência de dados, machine learning e geoprocessamento.
          </p>
          <a
            href="mailto:contato@otimizaconsultoria.com.br"
            className="inline-block font-mono text-xs text-foreground/60 mt-4 underline underline-offset-4 decoration-border transition-colors duration-300 ease-out hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
          >
            contato@otimizaconsultoria.com.br
          </a>
        </div>

        <nav
          aria-label="Navegação do rodapé"
          className="flex flex-wrap gap-x-6 gap-y-2 font-mono text-xs sm:text-sm text-foreground/60"
        >
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="transition-colors duration-300 ease-out hover:text-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="container mt-10 pt-6 border-t border-border/50 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <p className="font-mono text-[11px] text-foreground/40">
          © {new Date().getFullYear()} Otimiza Consultoria Econômica.
        </p>
        <p className="font-mono text-[11px] text-foreground/40">
          Economia regional, município a município.
        </p>
      </div>
    </footer>
  );
}
