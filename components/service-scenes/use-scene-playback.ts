"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";

export function useScenePlayback(isActive: boolean) {
  const sceneReference = useRef<HTMLDivElement>(null);
  const isNearViewport = useInView(sceneReference, { margin: "120px 0px" });
  const prefersReducedMotion = useReducedMotion();
  return { sceneReference, isPlaying: isNearViewport && isActive && !prefersReducedMotion };
}

export function useSceneBeat(isPlaying: boolean, beatDurationMilliseconds: number, beatCount: number, restingBeat: number) {
  const [playingBeat, setPlayingBeat] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;
    const interval = window.setInterval(() => setPlayingBeat((current) => (current + 1) % beatCount), beatDurationMilliseconds);
    return () => {
      window.clearInterval(interval);
      setPlayingBeat(0);
    };
  }, [isPlaying, beatDurationMilliseconds, beatCount]);

  return isPlaying ? playingBeat : restingBeat;
}
