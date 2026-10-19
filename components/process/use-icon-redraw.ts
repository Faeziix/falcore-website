"use client";

import { useCallback, useEffect, useRef } from "react";
import { animate, useMotionValue, type AnimationPlaybackControls } from "motion/react";
import { easeOutExpo } from "@/lib/motion";

const OUTLINE_REDRAW_SECONDS = 0.6;
const SIGNAL_REDRAW_SECONDS = 0.5;
const SIGNAL_REDRAW_DELAY_SECONDS = 0.3;

export function useIconRedraw() {
  const outlineDrawProgress = useMotionValue(1);
  const signalReplayProgress = useMotionValue(1);
  const runningRedraw = useRef<AnimationPlaybackControls[] | null>(null);

  const redrawIcon = useCallback(async () => {
    if (runningRedraw.current) return;

    outlineDrawProgress.jump(0);
    signalReplayProgress.jump(0);
    const redrawAnimations = [
      animate(outlineDrawProgress, 1, {
        duration: OUTLINE_REDRAW_SECONDS,
        ease: easeOutExpo,
      }),
      animate(signalReplayProgress, 1, {
        duration: SIGNAL_REDRAW_SECONDS,
        delay: SIGNAL_REDRAW_DELAY_SECONDS,
        ease: easeOutExpo,
      }),
    ];
    runningRedraw.current = redrawAnimations;
    await Promise.all(redrawAnimations);
    runningRedraw.current = null;
  }, [outlineDrawProgress, signalReplayProgress]);

  useEffect(
    () => () => runningRedraw.current?.forEach((redrawAnimation) => redrawAnimation.stop()),
    []
  );

  return { outlineDrawProgress, signalReplayProgress, redrawIcon };
}
