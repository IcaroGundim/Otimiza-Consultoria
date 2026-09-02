import { cn } from "@/lib/utils";

export const Logo = ({
  className,
}: {
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col leading-none", className)}>
      <span className="font-sentient text-xl md:text-3xl text-foreground">
        OTIMIZA.
      </span>
      <span className="font-mono text-[9px] md:text-[10px] uppercase tracking-[0.2em] text-foreground/60">
        Consultoria Econômica
      </span>
    </div>
  );
};
