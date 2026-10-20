import { cn } from "@/lib/utils";
import { revealOrder } from "./reveal-order";

const lockCornerPlacements = [
  "-top-2 -left-2 border-t border-l [--corner-x:-1] [--corner-y:-1]",
  "-top-2 -right-2 border-t border-r [--corner-x:1] [--corner-y:-1]",
  "-bottom-2 -left-2 border-b border-l [--corner-x:-1] [--corner-y:1]",
  "-bottom-2 -right-2 border-b border-r [--corner-x:1] [--corner-y:1]",
];

const filmLagInSteps = 4;

export function AcquireFrame({
  children,
  order = 0,
  className,
  filmClassName,
}: {
  children: React.ReactNode;
  order?: number;
  className?: string;
  filmClassName?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      {lockCornerPlacements.map((placement) => (
        <span
          key={placement}
          aria-hidden
          className={cn("reveal-lock-corner pointer-events-none absolute z-10 size-5 border-foreground/70", placement)}
          style={revealOrder(order)}
        />
      ))}
      <div className={cn("reveal-film-wipe size-full overflow-clip", filmClassName)} style={revealOrder(order + filmLagInSteps)}>
        <div className="reveal-film-settle size-full" style={revealOrder(order + filmLagInSteps)}>
          {children}
        </div>
      </div>
    </div>
  );
}
