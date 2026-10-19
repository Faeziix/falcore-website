"use client";

import { AnimatePresence, motion, useTransform } from "motion/react";
import { SceneChip, SceneLed } from "../scene-parts";
import { SceneLoader } from "../scene-loader";
import { sceneUnits } from "../scene-units";
import { useBeatDrivenCount } from "./use-beat-driven-count";
import { EASE_OUT_EXPO, STATUS_CHIP, STORY_BEATS, chipStatusFor } from "./web-design-story";

const PERFECT_SCORE = 100;

function usePerformanceScoreText(beat: number, isPlaying: boolean) {
  const performanceScore = useBeatDrivenCount({
    beat,
    isPlaying,
    finalCount: PERFECT_SCORE,
    resetBeat: STORY_BEATS.clearPage,
    countBeat: STORY_BEATS.goLive,
    durationSeconds: 1.8,
    ease: EASE_OUT_EXPO,
  });
  return useTransform(performanceScore, (score) => String(Math.round(score)));
}

const statusFade = {
  initial: { opacity: 0, y: 3 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -3 },
  transition: { duration: 0.22, ease: "easeOut" as const },
};

export function StatusChip({ beat, isPlaying }: { beat: number; isPlaying: boolean }) {
  const chipStatus = chipStatusFor(beat);
  const performanceScoreText = usePerformanceScoreText(beat, isPlaying);
  const statusKey = chipStatus.kind === "live" ? "live" : `${chipStatus.title}-${chipStatus.detail}`;

  return (
    <SceneChip centerX={STATUS_CHIP.centerX} y={STATUS_CHIP.y}>
      <span className="relative block" style={{ width: sceneUnits(STATUS_CHIP.contentWidth), height: sceneUnits(11) }}>
        <AnimatePresence initial={false} mode="wait">
          <motion.span key={statusKey} className="absolute inset-0 flex items-center justify-center" style={{ gap: sceneUnits(8) }} {...statusFade}>
            {chipStatus.kind === "live" ? (
              <>
                <SceneLed isOn />
                <span className="text-foreground">Live</span>
                <span>· loads in 0.8s · perf</span>
                <motion.span className="-ml-[0.3em] inline-block text-right tabular-nums text-foreground" style={{ width: sceneUnits(19) }}>
                  {performanceScoreText}
                </motion.span>
              </>
            ) : (
              <>
                <SceneLoader isPlaying={isPlaying} />
                <span className="text-foreground">{chipStatus.title}</span>
                <span>· {chipStatus.detail}</span>
              </>
            )}
          </motion.span>
        </AnimatePresence>
      </span>
    </SceneChip>
  );
}
