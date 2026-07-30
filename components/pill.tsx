import { cn } from "@/lib/utils";

/**
 * Eyebrow: rótulo mono em maiúsculas precedido de um traço curto.
 * Herda a cor do contexto via `currentColor`, então funciona tanto sobre
 * superfície clara (terracotta) quanto sobre a faixa escura (terracotta-light).
 */
export const Pill = ({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) => {
  return (
    <div
      {...props}
      className={cn(
        "inline-flex items-center gap-3 font-mono text-xs uppercase tracking-[0.18em] text-terracotta",
        className
      )}
    >
      <span aria-hidden className="h-px w-6 bg-current" />
      {children}
    </div>
  );
};
