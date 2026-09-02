import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"
import { px } from "../utils"

// O corte em polígono que dá o canto chanfrado. Só as variantes que o usam
// precisam renderizar as diagonais em `data-border`.
const notchClip =
  "[clip-path:polygon(var(--poly-roundness)_0,calc(100%_-_var(--poly-roundness))_0,100%_0,100%_calc(100%_-_var(--poly-roundness)),calc(100%_-_var(--poly-roundness))_100%,0_100%,0_calc(100%_-_var(--poly-roundness)),0_var(--poly-roundness))]"

const buttonVariants = cva(
  "inline-flex relative uppercase border font-mono cursor-pointer items-center font-medium has-[>svg]:px-3 justify-center gap-2 whitespace-nowrap font-medium ease-out transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        // Original: preenchimento dourado via box-shadow interno de 54px.
        default: `${notchClip} bg-background border-primary text-primary-foreground [&>[data-border]]:bg-primary [box-shadow:inset_0_0_54px_0px_var(--tw-shadow-color)] shadow-[#EBB800] hover:shadow-[#EBB800]/80`,

        // Gradiente claro no lugar do brilho interno da `default`: o `inset`
        // deixava o preto do fundo vazar e acinzentava o bege. O chanfro é
        // clip-path, então sombra externa seria recortada — o efeito mora
        // dentro: gradiente vertical + fio de luz na aresta de cima.
        sand: `${notchClip} border-sand text-background [&>[data-border]]:bg-sand bg-[linear-gradient(180deg,var(--sand-light)_0%,var(--sand)_58%,var(--sand-dim)_100%)] [box-shadow:inset_0_1px_0_0_rgba(255,255,255,0.65)] hover:bg-[linear-gradient(180deg,#FFFFFF_0%,var(--sand-light)_58%,var(--sand)_100%)]`,

        // Contorno bege com o chanfro; preenche no hover.
        sandOutline: `${notchClip} bg-transparent border-sand text-sand [&>[data-border]]:bg-sand hover:bg-sand hover:text-background`,

        // Bege chapado sem chanfro, cantos retos.
        sandFlat:
          "bg-sand border-sand text-background hover:bg-sand-dim hover:border-sand-dim [&>[data-border]]:hidden",
      },
      size: {
        default: "h-16 px-6 text-base",
        sm: "h-14 px-6 text-sm",
      },
    },
    defaultVariants: {
      variant: "sand",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  children,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  const polyRoundness = 16
  const hypotenuse = polyRoundness * 2
  const hypotenuseHalf = polyRoundness / 2 - 1.5

  return (
    <Comp
      style={{
        "--poly-roundness": px(polyRoundness),
      } as React.CSSProperties}
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <span data-border="top-left" style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute inline-block w-[var(--h)] top-[var(--hh)] left-[var(--hh)] h-[2px] -rotate-45 origin-top -translate-x-1/2" />
      <span data-border="bottom-right" style={{ "--h": px(hypotenuse), "--hh": px(hypotenuseHalf) } as React.CSSProperties} className="absolute w-[var(--h)] bottom-[var(--hh)] right-[var(--hh)] h-[2px] -rotate-45 translate-x-1/2" />

      <Slottable>
        {children}
      </Slottable>
    </Comp>
  )
}

export { Button, buttonVariants }
