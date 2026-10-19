"use client";

import { useCallback, useEffect, useState } from "react";
import { buildSourceTraceTimeline } from "../../_lib/source-trace-timeline";

const sourceTraceTimeline = buildSourceTraceTimeline();
const finalStepIndex = sourceTraceTimeline.length - 1;

export function useSourceTracePlayback({ hasEnteredView }: { hasEnteredView: boolean }) {
  const [stepIndex, setStepIndex] = useState(0);
  const [hasPlayedThrough, setHasPlayedThrough] = useState(false);

  const isPlaying = hasEnteredView && stepIndex < finalStepIndex;

  useEffect(() => {
    if (!isPlaying) return;
    const advanceTimer = window.setTimeout(() => {
      const nextStepIndex = stepIndex + 1;
      setStepIndex(nextStepIndex);
      if (nextStepIndex === finalStepIndex) setHasPlayedThrough(true);
    }, sourceTraceTimeline[stepIndex].holdMilliseconds);
    return () => window.clearTimeout(advanceTimer);
  }, [isPlaying, stepIndex]);

  const playAgain = useCallback(() => setStepIndex(0), []);

  return {
    snapshot: sourceTraceTimeline[stepIndex].snapshot,
    isPlaying,
    hasPlayedThrough,
    playAgain,
  };
}
