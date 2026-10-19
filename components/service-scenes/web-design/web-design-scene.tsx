"use client";

import { SceneStage } from "../scene-stage";
import { useScenePlayback } from "../use-scene-playback";
import { BrowserWindow } from "./browser-window";
import { DesignCursor } from "./design-cursor";
import { StatusChip } from "./status-chip";
import { StyleCard } from "./style-card";
import { useRestartingStoryBeat } from "./use-restarting-story-beat";
import {
  CHOSEN_SWATCH_INDEX,
  DRAFT_SWATCH_INDEX,
  STORY_BEATS,
  STORY_BEAT_COUNT,
  STORY_BEAT_MILLISECONDS,
  SWATCH_COLOURS,
  hasReachedBeat,
} from "./web-design-story";

export type ServiceSceneProps = { label: string; isActive?: boolean };

export function WebDesignScene({ label, isActive = true }: ServiceSceneProps) {
  const { sceneReference, isPlaying } = useScenePlayback(isActive);
  const beat = useRestartingStoryBeat(isPlaying, STORY_BEAT_MILLISECONDS, STORY_BEAT_COUNT);
  const selectedSwatchIndex = hasReachedBeat(beat, STORY_BEATS.pickSwatch) ? CHOSEN_SWATCH_INDEX : DRAFT_SWATCH_INDEX;
  const accentColour = SWATCH_COLOURS[selectedSwatchIndex];

  return (
    <div ref={sceneReference} className="size-full">
      <SceneStage label={label} figure="FIG 03 · SITE">
        <BrowserWindow beat={beat} isPlaying={isPlaying} accentColour={accentColour} />
        <StyleCard beat={beat} selectedSwatchIndex={selectedSwatchIndex} />
        <DesignCursor beat={beat} />
        <StatusChip beat={beat} isPlaying={isPlaying} />
      </SceneStage>
    </div>
  );
}
