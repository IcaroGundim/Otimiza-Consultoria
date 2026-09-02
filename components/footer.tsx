import Link from "next/link";
import { Logo } from "./logo";

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
          {/* Lockup principal, com o descritor. O manual fecha a versão full
              abaixo de 40px de "O": o descritor sai a 21,4% da altura da
              marca, então 26px o deixariam em 5,6px e ilegível. Em 44/56px
              ele cai em 9,4/12px.

              A linha "Ciência de dados..." que ficava aqui saiu: com o
              descritor em corpo legível eram dois subtítulos empilhados, e a
              área de respiro do manual — margem igual à altura do "O" — não
              cabia entre eles. */}
          <Logo variant="full" className="[--mark:44px] md:[--mark:56px]" />
          <a
            href="mailto:contato@otimizaconsultoria.com.br"
            className="inline-block font-mono text-xs text-foreground/60 mt-12 md:mt-16 underline underline-offset-4 decoration-border transition-colors duration-300 ease-out hover:text-primary hover:decoration-primary focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
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
        <p className="font-mono text-[11px] text-muted/70">
          © {new Date().getFullYear()} Otimiza Consultoria Econômica.
        </p>
        <p className="font-mono text-[11px] text-muted/70">
          Economia regional, município a município.
        </p>
      </div>
    </footer>
  );
}
