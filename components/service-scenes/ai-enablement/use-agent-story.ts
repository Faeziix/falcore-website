"use client";

import { useEffect, useState } from "react";
import { animate, useMotionValue } from "motion/react";
import { useSceneBeat } from "../use-scene-playback";
import {
  BEAT_MILLISECONDS,
  DRAFT_TOTAL,
  MAXIMUM_QUOTE_SHEETS,
  RESTING_DRAFT_COUNT,
  RESTING_STORY_BEAT,
  STORY_BEATS,
  phaseAtBeat,
  phaseBeatCount,
  type StoryPhase,
} from "./agent-story";

const DRAFTING_SECONDS = (phaseBeatCount("documents") * BEAT_MILLISECONDS) / 1000 - 0.35;
const PHASES_BEFORE_DRAFTING: StoryPhase[] = ["arrive", "records"];
const PHASES_HOLDING_QUOTES: StoryPhase[] = ["documents", "approval"];

function useDraftCount(phase: StoryPhase, isPlaying: boolean) {
  const draftProgress = useMotionValue(RESTING_DRAFT_COUNT);
  const [draftCount, setDraftCount] = useState(RESTING_DRAFT_COUNT);

  useEffect(() => draftProgress.on("change", (latest) => setDraftCount(Math.round(latest))), [draftProgress]);

  useEffect(() => {
    if (!isPlaying) {
      draftProgress.jump(RESTING_DRAFT_COUNT);
      return;
    }
    if (PHASES_BEFORE_DRAFTING.includes(phase)) {
      draftProgress.jump(0);
      return;
    }
    if (phase !== "documents") {
      draftProgress.jump(DRAFT_TOTAL);
      return;
    }
    const startingCount = Math.max(draftProgress.get(), 1);
    draftProgress.jump(startingCount);
    const remainingShare = (DRAFT_TOTAL - startingCount) / (DRAFT_TOTAL - 1);
    const controls = animate(draftProgress, DRAFT_TOTAL, { duration: DRAFTING_SECONDS * remainingShare, ease: "linear" });
    return () => controls.stop();
  }, [phase, isPlaying, draftProgress]);

  return draftCount;
}

function quoteSheetCount(phase: StoryPhase, draftCount: number) {
  if (!PHASES_HOLDING_QUOTES.includes(phase)) return 0;
  return Math.min(MAXIMUM_QUOTE_SHEETS, Math.ceil((draftCount / DRAFT_TOTAL) * MAXIMUM_QUOTE_SHEETS));
}

export function useAgentStory(isPlaying: boolean) {
  const playedBeat = useSceneBeat(isPlaying, BEAT_MILLISECONDS, STORY_BEATS.length, 0);
  const storyBeat = (playedBeat + RESTING_STORY_BEAT) % STORY_BEATS.length;
  const phase = phaseAtBeat(storyBeat);
  const draftCount = useDraftCount(phase, isPlaying);
  return { storyBeat, phase, draftCount, quoteSheets: quoteSheetCount(phase, draftCount) };
}
