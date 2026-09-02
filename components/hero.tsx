"use client";

import Link from "next/link";
import { FeaturedWork } from "./featured-work";
import { GL } from "./gl";
import { Button } from "./ui/button";
import { useState } from "react";
import { Leva } from "leva";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <section id="inicio" className="flex flex-col min-h-svh justify-between relative z-10">
      <GL hovering={hovering} />
      <Leva hidden />

      <div className="container pb-16 pt-32 md:pt-40 lg:pt-0 mt-auto -translate-y-8 lg:-translate-y-40 relative">
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,520px)] lg:items-center lg:gap-16">
          <div className="text-center lg:text-left">
            <h1
              data-reveal
              className="text-5xl sm:text-6xl md:text-7xl font-display font-semibold text-balance"
            >
              Economia regional, <i className="font-normal">município a município</i>
            </h1>
            <p
              data-reveal
              style={{ "--reveal-delay": "90ms" } as React.CSSProperties}
              className="font-mono text-sm sm:text-base text-foreground/70 text-balance mt-8 max-w-[700px] mx-auto lg:mx-0"
            >
              Ciência de dados, machine learning e geoprocessamento para
              governos e empresas. Trabalhamos com as bases públicas nacionais e
              com dados levantados em campo.
            </p>

            <div
              data-reveal
              style={{ "--reveal-delay": "180ms" } as React.CSSProperties}
            >
              <Link className="contents max-sm:hidden" href="/#contato">
                <Button
                  className="mt-14"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  [Falar com a Otimiza]
                </Button>
              </Link>
              <Link className="contents sm:hidden" href="/#contato">
                <Button
                  size="sm"
                  className="mt-14"
                  onMouseEnter={() => setHovering(true)}
                  onMouseLeave={() => setHovering(false)}
                >
                  [Falar com a Otimiza]
                </Button>
              </Link>
            </div>
          </div>

          <div
            data-reveal
            style={{ "--reveal-delay": "270ms" } as React.CSSProperties}
          >
            <FeaturedWork />
          </div>
        </div>
      </div>
    </section>
  );
}
