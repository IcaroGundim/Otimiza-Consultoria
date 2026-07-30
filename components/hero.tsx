import Link from "next/link";
import { ContourField } from "./contour-field";
import { FeaturedWork } from "./featured-work";
import { Pill } from "./pill";
import { Button } from "./ui/button";

export function Hero() {
  return (
    <section
      id="inicio"
      className="relative isolate flex min-h-[92svh] flex-col justify-center overflow-hidden bg-[radial-gradient(130%_75%_at_50%_0%,var(--sage-50),transparent_70%)] pt-28 pb-section md:pt-32"
    >
      <ContourField />

      {/* z-10 explícito em vez de z-index negativo no canvas: ordenação
          garantida, sem depender das regras de pintura de índice negativo. */}
      <div className="container relative z-10">
        <Pill className="mb-8" data-reveal>
          OTIMIZA CONSULTORIA ECONÔMICA
        </Pill>

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:items-center lg:gap-20">
          <h1
            data-reveal
            style={{ "--reveal-delay": "80ms" } as React.CSSProperties}
            className="font-display text-5xl leading-[1.05] tracking-[-0.01em] text-balance sm:text-6xl md:text-7xl"
          >
            Inteligência econômica para{" "}
            <i className="italic">decisões estratégicas</i> no Acre
          </h1>

          <div>
            <div
              data-reveal
              style={{ "--reveal-delay": "200ms" } as React.CSSProperties}
            >
              <p className="max-w-[46ch] text-base text-pretty text-foreground/70 sm:text-lg">
                Transformamos dados econômicos e sociais em evidências
                acionáveis para instituições governamentais e empresariais que
                lideram o desenvolvimento do Estado do Acre.
              </p>

              <Button
                asChild
                size="sm"
                className="mt-8 sm:h-12 sm:px-7 sm:text-base"
              >
                <Link href="/#contato">Falar com a Otimiza</Link>
              </Button>
            </div>

            <div
              data-reveal
              style={{ "--reveal-delay": "320ms" } as React.CSSProperties}
              className="mt-10"
            >
              <FeaturedWork />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
