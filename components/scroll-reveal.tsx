"use client";

import { useEffect } from "react";

/**
 * Observa uma única vez todos os `[data-reveal]` da página e marca cada um com
 * `data-revealed` quando entra na viewport — o resto é CSS (ver globals.css).
 *
 * Montado uma vez no layout em vez de envolver cada seção: as seções seguem
 * sendo server components e nenhum wrapper extra entra no DOM.
 */
export function ScrollReveal() {
  useEffect(() => {
    const elements = Array.from(
      document.querySelectorAll<HTMLElement>("[data-reveal]")
    );

    const revealAll = () => {
      for (const el of elements) el.dataset.revealed = "";
    };

    // Sem IntersectionObserver, mostra tudo de uma vez em vez de esconder.
    if (typeof IntersectionObserver === "undefined") {
      revealAll();
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          (entry.target as HTMLElement).dataset.revealed = "";
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1, rootMargin: "0px 0px -10% 0px" }
    );

    for (const el of elements) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return null;
}
