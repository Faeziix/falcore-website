import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";
import { revealOrder } from "./reveal-order";

const plotterHairlineVariants = cva("pointer-events-none absolute inset-x-0 h-px overflow-clip", {
  variants: {
    edge: {
      top: "top-0",
      bottom: "bottom-0",
    },
  },
  defaultVariants: { edge: "top" },
});

export function PlotterHairline({
  edge,
  order = 0,
  withSignalTip = true,
  className,
}: {
  order?: number;
  withSignalTip?: boolean;
  className?: string;
} & VariantProps<typeof plotterHairlineVariants>) {
  return (
    <span aria-hidden className={cn(plotterHairlineVariants({ edge }), className)}>
      <span className="reveal-plot-run relative block size-full bg-border" style={revealOrder(order)}>
        {withSignalTip ? (
          <span
            className="reveal-signal-tip absolute inset-y-0 right-0 w-28 bg-linear-to-l from-primary to-transparent"
            style={revealOrder(order)}
          />
        ) : null}
      </span>
    </span>
  );
}
