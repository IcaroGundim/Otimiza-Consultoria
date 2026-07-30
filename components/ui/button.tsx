import * as React from "react"
import { Slot, Slottable } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex rounded-full cursor-pointer items-center justify-center gap-2 whitespace-nowrap font-sans font-medium ease-out transition-colors duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-terracotta",
  {
    variants: {
      variant: {
        default: "bg-ink text-paper hover:bg-ink/85",
        secondary: "bg-terracotta text-paper hover:bg-terracotta/90",
        ghost: "border border-ink/15 text-ink hover:bg-sage-50",
      },
      size: {
        default: "h-12 px-7 text-base",
        sm: "h-10 px-5 text-sm",
      },
    },
    defaultVariants: {
      variant: "default",
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

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    >
      <Slottable>
        {children}
      </Slottable>
    </Comp>
  )
}

export { Button, buttonVariants }
