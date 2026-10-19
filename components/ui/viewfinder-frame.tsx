import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const cornerPlacements = [
  "top-0 left-0 border-t border-l [--corner-x:-1] [--corner-y:-1]",
  "top-0 right-0 border-t border-r [--corner-x:1] [--corner-y:-1]",
  "bottom-0 left-0 border-b border-l [--corner-x:-1] [--corner-y:1]",
  "bottom-0 right-0 border-b border-r [--corner-x:1] [--corner-y:1]",
];

const viewfinderCornerVariants = cva(
  "absolute size-4 border-foreground/50 transition-[translate,border-color] duration-500 ease-out-expo group-hover/viewfinder:border-foreground group-hover/viewfinder:translate-x-[calc(var(--corner-x)*var(--viewfinder-focus-travel)*-1)] group-hover/viewfinder:translate-y-[calc(var(--corner-y)*var(--viewfinder-focus-travel)*-1)]",
  {
    variants: {
      reveal: {
        none: "",
        onLoad: "motion-safe:animate-viewfinder-lock",
      },
    },
    defaultVariants: { reveal: "none" },
  },
);

const viewfinderScreenVariants = cva("relative size-full overflow-clip bg-surface", {
  variants: {
    reveal: {
      none: "",
      onLoad: "motion-safe:animate-film-wipe",
    },
  },
  defaultVariants: { reveal: "none" },
});

const viewfinderFilmVariants = cva("size-full", {
  variants: {
    reveal: {
      none: "",
      onLoad: "motion-safe:animate-film-settle",
    },
  },
  defaultVariants: { reveal: "none" },
});

export function ViewfinderFrame({
  children,
  reveal,
  className,
}: {
  children: React.ReactNode;
  className?: string;
} & VariantProps<typeof viewfinderCornerVariants>) {
  return (
    <div className={cn("group/viewfinder relative p-2.5 sm:p-3", className)}>
      {cornerPlacements.map((placement) => (
        <span
          key={placement}
          aria-hidden
          className={cn(viewfinderCornerVariants({ reveal }), placement)}
        />
      ))}
      <div className={viewfinderScreenVariants({ reveal })}>
        <div className={viewfinderFilmVariants({ reveal })}>{children}</div>
      </div>
    </div>
  );
}
