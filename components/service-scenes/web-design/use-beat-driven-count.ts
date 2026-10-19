"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, type AnimationPlaybackControls, type Easing } from "motion/react";

type BeatDrivenCountOptions = {
  beat: number;
  isPlaying: boolean;
  finalCount: number;
  resetBeat: number;
  countBeat: number;
  durationSeconds: number;
  ease: Easing;
};

export function useBeatDrivenCount({ beat, isPlaying, finalCount, resetBeat, countBeat, durationSeconds, ease }: BeatDrivenCountOptions) {
  const count = useMotionValue(finalCount);
  const runningCount = useRef<AnimationPlaybackControls | null>(null);

  useEffect(() => {
    if (!isPlaying) {
      runningCount.current?.stop();
      count.jump(finalCount);
      return;
    }
    if (beat === resetBeat) {
      runningCount.current?.stop();
      count.jump(0);
    }
    if (beat === countBeat) {
      runningCount.current?.stop();
      runningCount.current = animate(count, finalCount, { from: 0, duration: durationSeconds, ease });
    }
  }, [beat, isPlaying, count, finalCount, resetBeat, countBeat, durationSeconds, ease]);

  useEffect(() => () => runningCount.current?.stop(), []);

  return count;
}
