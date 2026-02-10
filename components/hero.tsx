"use client";

import Link from "next/link";
import { GL } from "./gl";
import { Pill } from "./pill";
import { Button } from "./ui/button";
import { useState } from "react";
import { Leva } from "leva";

export function Hero() {
  const [hovering, setHovering] = useState(false);
  return (
    <section id="inicio" className="flex flex-col h-svh justify-between relative z-10">
      <GL hovering={hovering} />
      <Leva hidden />

      <div className="pb-16 mt-auto -translate-y-10 md:-translate-y-12 text-center relative">
        <Pill className="mb-6">OTIMIZA CONSULTORIA ECONÔMICA</Pill>
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-sentient">
          Inteligência econômica para <br />
          <i className="font-light">decisões estratégicas</i> no Acre
        </h1>
        <p className="font-mono text-sm sm:text-base text-foreground/70 text-balance mt-8 max-w-[700px] mx-auto px-4">
          Transformamos dados econômicos e sociais em evidências acionáveis para
          instituições governamentais e empresariais que lideram o
          desenvolvimento do Estado do Acre.
        </p>

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
    </section>
  );
}
