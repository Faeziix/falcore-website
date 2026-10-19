"use client";

import type { Ref } from "react";
import { motion, useReducedMotion, type Variants } from "motion/react";
import type { InclusionIconName } from "@/lib/data/services";
import { easeOutExpo } from "@/lib/motion";
import {
  INCLUSION_ICON_STROKES,
  type IconStrokeTone,
} from "../_lib/inclusion-icon-strokes";

export const outlineDrawSeconds = 0.8;
export const signalDrawSeconds = 0.6;
export const signalLagSeconds = 0.35;

const toneClassName: Record<IconStrokeTone, string | undefined> = {
  outline: undefined,
  detail: "opacity-60",
  signal: "stroke-primary",
};

function strokeDrawVariants({
  tone,
  delaySeconds,
  prefersReducedMotion,
}: {
  tone: IconStrokeTone;
  delaySeconds: number;
  prefersReducedMotion: boolean;
}): Variants {
  const isSignal = tone === "signal";
  const drawTiming = {
    duration: isSignal ? signalDrawSeconds : outlineDrawSeconds,
    ease: easeOutExpo,
  };
  const signalLag = isSignal ? signalLagSeconds : 0;

  if (prefersReducedMotion) {
    return {
      unplotted: { pathLength: 1, opacity: 1 },
      plotted: { pathLength: 1, opacity: 1, transition: { duration: 0 } },
    };
  }

  return {
    unplotted: { pathLength: 0, opacity: 0 },
    plotted: {
      pathLength: 1,
      opacity: 1,
      transition: { ...drawTiming, delay: delaySeconds + signalLag },
    },
  };
}

export function InclusionIcon({
  icon,
  delaySeconds,
  ref,
}: {
  icon: InclusionIconName;
  delaySeconds: number;
  ref?: Ref<SVGSVGElement>;
}) {
  const prefersReducedMotion = Boolean(useReducedMotion());

  return (
    <svg
      ref={ref}
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      className="size-10 shrink-0 text-foreground-soft"
    >
      {INCLUSION_ICON_STROKES[icon].map((stroke) => (
        <motion.path
          key={stroke.d}
          d={stroke.d}
          data-icon-tone={stroke.tone}
          className={toneClassName[stroke.tone]}
          variants={strokeDrawVariants({
            tone: stroke.tone,
            delaySeconds,
            prefersReducedMotion,
          })}
        />
      ))}
    </svg>
  );
}
