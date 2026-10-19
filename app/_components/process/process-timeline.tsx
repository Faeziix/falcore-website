"use client";

import { useRef } from "react";
import { motion, useReducedMotion, useScroll, useSpring } from "motion/react";
import { PROCESS_STEPS } from "@/app/_lib/process-steps";
import { useMediaQuery } from "@/lib/hooks/use-media-query";

export function ProcessTimeline() {
  const timelineReference = useRef<HTMLOListElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const isHorizontalLayout = useMediaQuery("(min-width: 768px)");
  const { scrollYProgress } = useScroll({
    target: timelineReference,
    offset: ["start 85%", "end 55%"],
  });
  const drawnProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
  });

  return (
    <ol
      ref={timelineReference}
      className="relative grid gap-10 pl-8 md:grid-cols-5 md:gap-6 md:pt-10 md:pl-0"
    >
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[3px] w-px bg-border md:top-[3px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
      >
        <motion.div
          className="size-full origin-top bg-primary md:origin-left"
          style={
            prefersReducedMotion
              ? undefined
              : isHorizontalLayout
                ? { scaleX: drawnProgress }
                : { scaleY: drawnProgress }
          }
        />
      </div>

      {PROCESS_STEPS.map((step, index) => (
        <li key={step.title} className="relative">
          <span
            aria-hidden
            className="absolute top-1.5 -left-8 size-[7px] border border-foreground/60 bg-background md:-top-10 md:left-0"
          />
          <p className="font-mono text-xs text-muted-foreground tabular-nums">
            {String(index + 1).padStart(2, "0")}
          </p>
          <h3 className="mt-2 font-display text-xl font-medium text-foreground">
            {step.title}
          </h3>
          <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground-soft">
            {step.description}
          </p>
        </li>
      ))}
    </ol>
  );
}
