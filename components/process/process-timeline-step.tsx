"use client";

import { useTransform, type MotionValue } from "motion/react";
import type { ProcessStep } from "@/lib/data/process-steps";
import { ProcessStepIcon } from "./process-step-icons";
import { useIconRedraw } from "./use-icon-redraw";

const SIGNAL_DRAW_SPAN = 0.12;

type ProcessTimelineStepProps = {
  step: ProcessStep;
  stepIndex: number;
  stepCount: number;
  timelineDrawProgress: MotionValue<number>;
};

export function ProcessTimelineStep({
  step,
  stepIndex,
  stepCount,
  timelineDrawProgress,
}: ProcessTimelineStepProps) {
  const lineReachesStepAt = stepIndex / stepCount;
  const scrollLinkedSignalProgress = useTransform(
    timelineDrawProgress,
    [lineReachesStepAt, lineReachesStepAt + SIGNAL_DRAW_SPAN],
    [0, 1],
    { clamp: true }
  );
  const { outlineDrawProgress, signalReplayProgress, redrawIcon } = useIconRedraw();
  const signalDrawProgress = useTransform(
    [scrollLinkedSignalProgress, signalReplayProgress],
    ([scrollProgress, replayProgress]: number[]) =>
      Math.min(scrollProgress, replayProgress)
  );

  return (
    <li className="relative">
      <span
        aria-hidden
        className="absolute top-1.5 -left-8 size-[7px] border border-foreground/60 bg-background md:-top-10 md:left-0"
      />
      <div
        className="w-fit"
        onPointerEnter={redrawIcon}
      >
        <ProcessStepIcon
          iconName={step.iconName}
          outlineDrawProgress={outlineDrawProgress}
          signalDrawProgress={signalDrawProgress}
        />
      </div>
      <p className="mt-6 font-mono text-xs text-muted-foreground tabular-nums">
        {String(stepIndex + 1).padStart(2, "0")}
      </p>
      <h3 className="mt-2 font-display text-xl font-medium text-foreground">
        {step.title}
      </h3>
      <p className="mt-3 text-[0.9375rem] leading-relaxed text-foreground-soft">
        {step.description}
      </p>
    </li>
  );
}
