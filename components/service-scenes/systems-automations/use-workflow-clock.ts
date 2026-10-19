"use client";

import { useEffect, useState } from "react";
import { FIRST_RUN_NUMBER, RESTING_BEAT, RUN_RESET_BEAT, STORY_BEAT_MILLISECONDS, WORKFLOW_STORY } from "./workflow-story";

const BEAT_COUNT = WORKFLOW_STORY.length;

function countRunResets(elapsedBeats: number) {
  const beatsUntilFirstReset = (RUN_RESET_BEAT - RESTING_BEAT + BEAT_COUNT) % BEAT_COUNT;
  if (elapsedBeats < beatsUntilFirstReset) return 0;
  return Math.floor((elapsedBeats - beatsUntilFirstReset) / BEAT_COUNT) + 1;
}

export function useWorkflowClock(isPlaying: boolean) {
  const [elapsedBeats, setElapsedBeats] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => setElapsedBeats((current) => current + 1), STORY_BEAT_MILLISECONDS);
    return () => {
      window.clearInterval(interval);
      setElapsedBeats(0);
    };
  }, [isPlaying]);

  const activeElapsedBeats = isPlaying ? elapsedBeats : 0;
  return {
    beat: (RESTING_BEAT + activeElapsedBeats) % BEAT_COUNT,
    runNumber: FIRST_RUN_NUMBER + countRunResets(activeElapsedBeats),
  };
}
