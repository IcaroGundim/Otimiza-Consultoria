"use client";

import { useEffect, useRef } from "react";

const LINES = 34;
const STEP = 8; // px entre vértices de cada curva
const ACCENT_EVERY = 6; // a cada N linhas, uma em terracota

/**
 * Campo de curvas de nível animadas para o fundo do hero.
 *
 * Todas as linhas compartilham o mesmo campo de altura h(x, t), com amplitude
 * crescente de cima para baixo — é isso que faz elas se aninharem como curvas
 * de nível em vez de ondular soltas.
 *
 * Canvas 2D, sem dependências. Pausa quando sai da viewport e não anima com
 * `prefers-reduced-motion: reduce` (nesse caso desenha um quadro estático).
 */
export function ContourField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // green-800, não sage-200: sage-200 sobre branco dá ~1,15:1 de contraste
    // e as curvas somem. green-800 com alpha baixo dá o mesmo tom "claro"
    // mas continua legível.
    const styles = getComputedStyle(document.documentElement);
    const line = styles.getPropertyValue("--green-800").trim() || "#33422c";
    const accent = styles.getPropertyValue("--terracotta").trim() || "#aa412a";

    let width = 0;
    let height = 0;
    let frame = 0;
    let time = 0;

    const reduceMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    // Campo de altura compartilhado: três senoides de períodos incomensuráveis,
    // para o padrão não se repetir de forma perceptível.
    const field = (x: number, t: number) => {
      const u = x / width;
      return (
        Math.sin(u * 6.2 + t * 0.42) * 26 +
        Math.sin(u * 11.7 - t * 0.31) * 13 +
        Math.sin(u * 19.3 + t * 0.57) * 6
      );
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (let i = 0; i < LINES; i++) {
        const ratio = i / (LINES - 1);
        const baseY = height * (0.08 + ratio * 0.94);
        // Linhas de baixo oscilam mais: dá sensação de profundidade.
        const depth = 0.25 + ratio * 1.15;
        const isAccent = i % ACCENT_EVERY === ACCENT_EVERY - 1;

        ctx.beginPath();
        for (let x = -STEP; x <= width + STEP; x += STEP) {
          const y = baseY - field(x, time + i * 0.09) * depth;
          if (x <= -STEP) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Mais opacas embaixo, onde a curva tem mais presença.
        // Estes dois ranges são o principal botão de "intensidade" do efeito.
        ctx.globalAlpha = isAccent ? 0.3 + ratio * 0.35 : 0.18 + ratio * 0.45;
        ctx.strokeStyle = isAccent ? accent : line;
        ctx.lineWidth = isAccent ? 1.5 : 1;
        ctx.stroke();
      }

      ctx.globalAlpha = 1;
    };

    const loop = () => {
      time += 0.006;
      draw();
      frame = requestAnimationFrame(loop);
    };

    const start = () => {
      if (reduceMotion || frame) return;
      frame = requestAnimationFrame(loop);
    };

    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
    };

    resize();
    draw();
    if (!reduceMotion) start();

    // ResizeObserver em vez de window.resize: o hero também muda de altura
    // quando o texto reflui (troca de fonte, mudança de orientação).
    const resizeObserver = new ResizeObserver(() => {
      resize();
      draw();
    });
    resizeObserver.observe(canvas);

    // Não gasta bateria animando fora da tela.
    const visibilityObserver = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) start();
      else stop();
    });
    visibilityObserver.observe(canvas);

    return () => {
      stop();
      resizeObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="pointer-events-none absolute inset-0 z-0 h-full w-full [mask-image:linear-gradient(to_bottom,transparent,#000_14%,#000_88%,transparent)]"
    />
  );
}
