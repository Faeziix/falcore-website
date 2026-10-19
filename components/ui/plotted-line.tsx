"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { motion, type Variants } from "motion/react";
import { easeOutExpo } from "@/lib/motion";
import { cn } from "@/lib/utils";

const plottedLineDrawSeconds = 0.9;

export const plotOnViewProps = {
  initial: "unplotted",
  whileInView: "plotted",
  viewport: { once: true, amount: 0.2 },
} as const;

const plottedLineVariants = cva("pointer-events-none absolute z-10 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px origin-left",
      vertical: "w-px origin-top",
    },
  },
});

export function PlottedLine({
  orientation,
  delaySeconds = 0,
  className,
}: {
  orientation: NonNullable<VariantProps<typeof plottedLineVariants>["orientation"]>;
  delaySeconds?: number;
  className?: string;
}) {
  const isHorizontal = orientation === "horizontal";
  const drawVariants: Variants = {
    unplotted: isHorizontal ? { scaleX: 0 } : { scaleY: 0 },
    plotted: {
      ...(isHorizontal ? { scaleX: 1 } : { scaleY: 1 }),
      transition: { duration: plottedLineDrawSeconds, delay: delaySeconds, ease: easeOutExpo },
    },
  };

  return (
    <motion.span
      aria-hidden
      variants={drawVariants}
      className={cn(plottedLineVariants({ orientation }), className)}
    />
  );
}
