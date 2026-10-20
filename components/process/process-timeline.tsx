"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "motion/react";
import { PROCESS_STEPS } from "@/lib/data/process-steps";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { ProcessTimelineStep } from "./process-timeline-step";

export function ProcessTimeline() {
  const timelineReference = useRef<HTMLOListElement>(null);
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
      data-reveal
      className="relative grid gap-10 pl-8 md:grid-cols-5 md:gap-6 md:pt-10 md:pl-0"
    >
      <div
        aria-hidden
        className="absolute top-0 bottom-0 left-[3px] w-px bg-border md:top-[3px] md:right-0 md:bottom-auto md:left-0 md:h-px md:w-auto"
      >
        <motion.div
          className="size-full origin-top bg-primary md:origin-left"
          style={isHorizontalLayout ? { scaleX: drawnProgress } : { scaleY: drawnProgress }}
        />
      </div>

      {PROCESS_STEPS.map((step, stepIndex) => (
        <ProcessTimelineStep
          key={step.title}
          step={step}
          stepIndex={stepIndex}
          stepCount={PROCESS_STEPS.length}
          timelineDrawProgress={drawnProgress}
        />
      ))}
    </ol>
  );
}
