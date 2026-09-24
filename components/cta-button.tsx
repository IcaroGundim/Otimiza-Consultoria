"use client";

import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useRef } from "react";

const CELL = 4; // passo da grade de bolinhas, em px CSS
const RADIUS = 1.25;
const FRAME_MS = 220;
const REROLL = 0.22; // fração das bolinhas que se sorteia de novo por quadro
const GRAIN = "#FFF7CF";

interface CtaButtonProps {
  href: string;
  children: React.ReactNode;
  size?: "sm" | "lg";
  className?: string;
  onClick?: () => void;
}

/**
 * CTA amarelo com trama viva: bolinhas creme acendem ao acaso sobre um campo
 * de densidade que deriva devagar pelo botão (dither aleatório, não
 * ordenado). Cada quadro só re-sorteia parte das bolinhas; as outras seguram
 * o estado, então cada uma vive cerca de um segundo e o movimento fica calmo.
 *
 * Desenha num <canvas> e não em SVG de propósito: são ~100 bolinhas trocando
 * de estado quatro vezes por segundo, e passar isso por estado React
 * re-renderizaria o header inteiro a cada quadro.
 */
export function CtaButton({
  href,
  children,
  size = "sm",
  className,
  onClick,
}: CtaButtonProps) {
  const rootRef = useRef<HTMLAnchorElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hotRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!root || !canvas || !ctx) return;

    let cols = 0;
    let rows = 0;
    let grid = new Uint8Array(0);
    let tick = 0;

    const resize = () => {
      const { width, height } = root.getBoundingClientRect();
      const dpr = window.devicePixelRatio || 1;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.ceil(width / CELL);
      rows = Math.ceil(height / CELL);
      grid = new Uint8Array(cols * rows);
      step(1);
    };

    const step = (reroll: number) => {
      const t = tick * 0.03;
      const boost = hotRef.current ? 1.5 : 1;
      ctx.clearRect(0, 0, cols * CELL, rows * CELL);
      ctx.fillStyle = GRAIN;
      ctx.beginPath();
      for (let iy = 0; iy < rows; iy++) {
        for (let ix = 0; ix < cols; ix++) {
          const i = iy * cols + ix;
          const x = ix * CELL + CELL / 2;
          const y = iy * CELL + CELL / 2;
          if (Math.random() < reroll) {
            const wave = Math.sin(
              x * 0.045 - t * 1.7 + Math.sin(y * 0.11 + t * 0.9) * 1.4
            );
            const tone = (0.1 + 0.16 * (0.5 + 0.5 * wave)) * boost;
            grid[i] = Math.random() < tone ? 1 : 0;
          }
          if (grid[i]) {
            ctx.moveTo(x + RADIUS, y);
            ctx.arc(x, y, RADIUS, 0, Math.PI * 2);
          }
        }
      }
      ctx.fill();
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(root);

    // Com movimento reduzido a trama fica, mas parada no primeiro quadro.
    const still = window.matchMedia("(prefers-reduced-motion: reduce)");
    let timer: number | undefined;
    const start = () => {
      if (timer || still.matches) return;
      timer = window.setInterval(() => {
        if (document.hidden) return;
        tick += 1;
        step(REROLL);
      }, FRAME_MS);
    };
    const stop = () => {
      window.clearInterval(timer);
      timer = undefined;
    };
    const onMotionChange = () => (still.matches ? stop() : start());

    start();
    still.addEventListener("change", onMotionChange);

    return () => {
      stop();
      observer.disconnect();
      still.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <Link
      ref={rootRef}
      href={href}
      onClick={onClick}
      onMouseEnter={() => (hotRef.current = true)}
      onMouseLeave={() => (hotRef.current = false)}
      className={cn(
        "group relative inline-flex items-center justify-center overflow-hidden whitespace-nowrap rounded-[2px] bg-primary px-[18px] font-mono font-medium tracking-[0.08em] text-[#0B0B0B] transition-[background-color,transform] duration-150 ease-out hover:bg-[#FFD83A] active:translate-y-px focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary",
        size === "lg" ? "h-[52px] text-sm" : "h-11 text-[13px]",
        className
      )}
    >
      <canvas
        ref={canvasRef}
        aria-hidden
        className="pointer-events-none absolute inset-0 size-full opacity-80 transition-opacity duration-200 group-hover:opacity-100"
      />
      <span className="relative">{children}</span>
    </Link>
  );
}
