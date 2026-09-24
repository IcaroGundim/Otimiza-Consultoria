import { cn } from "@/lib/utils";

/**
 * Marca Otimiza, conforme o Manual de Marca v1 (ago 2026).
 *
 * São três elementos: o "O" de rede neural, o wordmark "timiza" e o ponto
 * vermelho. A rede se abre à esquerda em nós e conexões e fecha em massa
 * sólida à direita — dado bruto que vira decisão.
 *
 * O wordmark é texto vivo (Figtree 900) e não um SVG importado de propósito:
 * um `<img src="*.svg">` é um documento isolado, sem acesso às webfonts da
 * página, e "timiza" cairia na sans genérica. Os arquivos de `public/marca/`
 * existem para uso externo — impressão, e-mail, terceiros.
 *
 * Toda a escala deriva de `--mark`, a altura do "O": o manual define área de
 * respiro e proporções em função dela. Como é CSS var, o tamanho pode variar
 * por breakpoint sem duplicar o componente.
 */

const RATIO = {
  svg: 1.02, // caixa do símbolo, com folga para o stroke
  word: 1 / 0.715, // corpo do wordmark
  dot: 0.203, // diâmetro do ponto, sobre o corpo do wordmark
  sub: 0.153, // corpo do descritor
  subGap: 0.075,
} as const;

// Malha da rede neural do O, na mesma semente do arquivo "Otimiza Logo" do
// Claude Design: toda instância desenha a mesma rede. Calculada uma vez no
// carregamento do módulo. Só entram nós e ligações perto da faixa do anel;
// o resto seria recortado pela máscara de qualquer jeito.
const MESH = (() => {
  let seed = 20260812;
  const rnd = () => (seed = (seed * 1664525 + 1013904223) >>> 0) / 4294967296;
  const step = 15;
  const all: { x: number; y: number; r: number }[] = [];
  for (let gx = -12; gx <= 228; gx += step) {
    for (let gy = -12; gy <= 228; gy += step) {
      all.push({
        x: +(gx + (rnd() - 0.5) * step * 0.75).toFixed(2),
        y: +(gy + (rnd() - 0.5) * step * 0.75).toFixed(2),
        r: +(2.0 + rnd() * 1.6).toFixed(2),
      });
    }
  }
  const fromCenter = (x: number, y: number) => Math.hypot(x - 108, y - 108);
  const edges: [number, number, number, number][] = [];
  for (let i = 0; i < all.length; i++) {
    for (let j = i + 1; j < all.length; j++) {
      const a = all[i];
      const b = all[j];
      if (Math.hypot(a.x - b.x, a.y - b.y) < step * 1.5 && rnd() < 0.92) {
        const mid = fromCenter((a.x + b.x) / 2, (a.y + b.y) / 2);
        if (mid >= 44 && mid <= 122) edges.push([a.x, a.y, b.x, b.y]);
      }
    }
  }
  const nodes = all.filter((n) => {
    const d = fromCenter(n.x, n.y);
    return d >= 50 && d <= 116;
  });
  return { nodes, edges };
})();

type LogoVariant = "full" | "compact" | "symbol";

interface LogoProps {
  /** `full` traz o descritor; `compact` é o topo de site; `symbol` é o avatar. */
  variant?: LogoVariant;
  /** Altura do "O". Abaixo de 40px o manual proíbe o descritor. */
  mark?: number | string;
  className?: string;
  ink?: string;
  dotColor?: string;
  subColor?: string;
}

export const Logo = ({
  variant = "compact",
  mark,
  className,
  ink = "var(--foreground)",
  dotColor = "var(--red)",
  subColor = "var(--primary)",
}: LogoProps) => {
  // As definições do SVG (gradientes e máscaras) vivem no documento
  // inteiro, então dois logos na mesma página colidem de id. A chave vem das
  // cores: instâncias com a mesma cor geram defs idênticas, e aí a colisão é
  // inofensiva — o navegador resolve para algo igual.
  const uid = `otz${ink}`.replace(/[^a-zA-Z0-9]/g, "");
  const size = typeof mark === "number" ? `${mark}px` : mark;

  return (
    <div
      className={cn("inline-flex flex-col items-start [--mark:32px]", className)}
      style={size ? ({ "--mark": size } as React.CSSProperties) : undefined}
    >
      <div className="flex items-center">
        <svg
          viewBox="0 0 216 216"
          role="img"
          aria-label="Otimiza"
          className="block shrink-0 overflow-visible"
          style={{
            width: `calc(var(--mark) * ${RATIO.svg})`,
            height: `calc(var(--mark) * ${RATIO.svg})`,
          }}
        >
          <defs>
            {/* Recorta a faixa do anel: a rede só existe dentro dele. */}
            <mask
              id={`${uid}Band`}
              maskUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width="256"
              height="256"
            >
              <circle
                cx="108"
                cy="108"
                r="82"
                fill="none"
                stroke="#ffffff"
                strokeWidth="52"
              />
            </mask>

            {/* Um gradiente e seu inverso: a rede entra pela esquerda na
                mesma medida em que o anel sólido sai. */}
            <linearGradient id={`${uid}Fade`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#ffffff" />
              <stop offset="0.34" stopColor="#8a8a8a" />
              <stop offset="0.72" stopColor="#000000" />
            </linearGradient>
            <mask
              id={`${uid}FadeMask`}
              maskUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width="256"
              height="256"
            >
              <rect
                x="-20"
                y="-20"
                width="256"
                height="256"
                fill={`url(#${uid}Fade)`}
              />
            </mask>

            <linearGradient id={`${uid}FadeInv`} x1="0" y1="0" x2="1" y2="0">
              <stop offset="0" stopColor="#000000" />
              <stop offset="0.34" stopColor="#757575" />
              <stop offset="0.72" stopColor="#ffffff" />
            </linearGradient>
            <mask
              id={`${uid}FadeInvMask`}
              maskUnits="userSpaceOnUse"
              x="-20"
              y="-20"
              width="256"
              height="256"
            >
              <rect
                x="-20"
                y="-20"
                width="256"
                height="256"
                fill={`url(#${uid}FadeInv)`}
              />
            </mask>
          </defs>

          <circle
            cx="108"
            cy="108"
            r="82"
            fill="none"
            stroke={ink}
            strokeWidth="52"
            mask={`url(#${uid}FadeInvMask)`}
          />
          <g mask={`url(#${uid}Band)`}>
            <g mask={`url(#${uid}FadeMask)`}>
              <g
                stroke={ink}
                strokeWidth="1.9"
                strokeLinecap="round"
                fill="none"
              >
                {MESH.edges.map(([x1, y1, x2, y2], i) => (
                  <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} />
                ))}
              </g>
              {MESH.nodes.map((n, i) => (
                <circle key={i} cx={n.x} cy={n.y} r={n.r} fill={ink} />
              ))}
            </g>
          </g>
        </svg>

        {variant !== "symbol" && (
          <div className="flex items-baseline leading-[0.78]">
            <span
              className="font-display font-black tracking-[-0.035em] pr-[0.08em]"
              style={{
                fontSize: `calc(var(--mark) * ${RATIO.word})`,
                color: ink,
              }}
            >
              timiza
            </span>
            <span
              aria-hidden
              className="rounded-full flex-none self-baseline"
              style={{
                width: `calc(var(--mark) * ${RATIO.word * RATIO.dot})`,
                height: `calc(var(--mark) * ${RATIO.word * RATIO.dot})`,
                background: dotColor,
              }}
            />
          </div>
        )}
      </div>

      {variant === "full" && (
        <div
          className="font-mono font-bold whitespace-nowrap tracking-[0.155em]"
          style={{
            marginLeft: `calc(var(--mark) * ${RATIO.svg})`,
            marginTop: `calc(var(--mark) * ${RATIO.word * RATIO.subGap})`,
            fontSize: `calc(var(--mark) * ${RATIO.word * RATIO.sub})`,
            color: subColor,
          }}
        >
          Consultoria Econômica
        </div>
      )}
    </div>
  );
};
