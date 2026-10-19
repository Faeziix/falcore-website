"use client";

import { useEffect, useState } from "react";
import { FINISHED_BEAT } from "./web-design-story";

export function useRestartingStoryBeat(isPlaying: boolean, beatDurationMilliseconds: number, beatCount: number) {
  const [playingBeat, setPlayingBeat] = useState(FINISHED_BEAT);

  useEffect(() => {
    if (!isPlaying) return;
    let elapsedBeats = 0;
    const interval = window.setInterval(() => {
      elapsedBeats += 1;
      setPlayingBeat(elapsedBeats % beatCount);
    }, beatDurationMilliseconds);
    return () => {
      window.clearInterval(interval);
      setPlayingBeat(FINISHED_BEAT);
    };
  }, [isPlaying, beatDurationMilliseconds, beatCount]);

  return isPlaying ? playingBeat : FINISHED_BEAT;
}
