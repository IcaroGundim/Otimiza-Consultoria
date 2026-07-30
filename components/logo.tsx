import { cn } from "@/lib/utils";

export const Logo = ({
  className,
}: {
  className?: string;
}) => {
  return (
    // Cores herdadas (currentColor) para servir tanto ao header claro
    // quanto a superfícies escuras.
    <div className={cn("flex flex-col leading-none", className)}>
      <span className="font-sans text-xl font-semibold tracking-[-0.02em] md:text-3xl">
        OTIMIZA.
      </span>
      <span className="font-mono text-[9px] uppercase tracking-[0.2em] opacity-60 md:text-[10px]">
        Consultoria Econômica
      </span>
    </div>
  );
};
