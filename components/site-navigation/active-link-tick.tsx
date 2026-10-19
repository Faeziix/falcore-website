"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";

const tickTransition = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const };

export function ActiveLinkTick({ layoutGroup, className }: { layoutGroup: string; className?: string }) {
  return (
    <motion.span
      aria-hidden
      layoutId={`${layoutGroup}-active-link-tick`}
      transition={tickTransition}
      className={cn("absolute z-10 h-0.5 bg-accent", className)}
    />
  );
}
