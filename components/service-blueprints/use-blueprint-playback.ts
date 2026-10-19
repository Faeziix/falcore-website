"use client";

import { useEffect, useState, type RefObject } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function useBlueprintPlayback(sheetReference: RefObject<HTMLElement | null>, isActive: boolean) {
  const isNearViewport = useInView(sheetReference, { margin: "120px 0px" });
  const prefersReducedMotion = useReducedMotion();
  return { isPlaying: isNearViewport && isActive && !prefersReducedMotion };
}

export function useStepCounter(isPlaying: boolean, stepDurationMilliseconds: number) {
  const [completedSteps, setCompletedSteps] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => setCompletedSteps((steps) => steps + 1), stepDurationMilliseconds);
    return () => window.clearInterval(interval);
  }, [isPlaying, stepDurationMilliseconds]);

  return completedSteps;
}
