"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneLabel, SceneObject } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import {
  EASE_OUT_EXPO,
  STORY_BEATS,
  STYLE_CARD,
  SWATCH_COLOURS,
  SWATCH_GAP,
  SWATCH_SIZE,
  isBetweenBeats,
} from "./web-design-story";

const SWATCH_STEP_PERCENT = ((SWATCH_SIZE + SWATCH_GAP) / SWATCH_SIZE) * 100;

function TypeSample({ isHighlighted }: { isHighlighted: boolean }) {
  return (
    <span
      className={cn("relative block w-fit font-display font-medium text-foreground transition-[background-color,box-shadow] duration-500", isHighlighted ? "bg-scene-inset" : "bg-transparent")}
      style={{
        fontSize: sceneUnits(22),
        lineHeight: 1,
        margin: `0 ${sceneUnits(-4)}`,
        padding: `${sceneUnits(2)} ${sceneUnits(4)}`,
        boxShadow: isHighlighted ? `inset 0 0 0 ${sceneUnits(1)} var(--border-strong)` : `inset 0 0 0 ${sceneUnits(1)} transparent`,
      }}
    >
      Aa
    </span>
  );
}

function SwatchRow({ selectedSwatchIndex, isSelectionShown }: { selectedSwatchIndex: number; isSelectionShown: boolean }) {
  return (
    <div className="relative flex" style={{ gap: sceneUnits(SWATCH_GAP) }}>
      {SWATCH_COLOURS.map((swatchColour) => (
        <span key={swatchColour} className="block" style={{ width: sceneUnits(SWATCH_SIZE), height: sceneUnits(SWATCH_SIZE), backgroundColor: swatchColour }} />
      ))}
      <motion.span
        className="pointer-events-none absolute left-0 top-0 block"
        style={{ width: sceneUnits(SWATCH_SIZE), height: sceneUnits(SWATCH_SIZE), boxShadow: `0 0 0 ${sceneUnits(2)} var(--scene-object-bottom), 0 0 0 ${sceneUnits(3.5)} var(--foreground)` }}
        initial={false}
        animate={{ x: `${selectedSwatchIndex * SWATCH_STEP_PERCENT}%`, opacity: isSelectionShown ? 1 : 0 }}
        transition={{ x: { duration: 0.7, ease: EASE_OUT_EXPO }, opacity: { duration: 0.35 } }}
      />
    </div>
  );
}

export function StyleCard({ beat, selectedSwatchIndex }: { beat: number; selectedSwatchIndex: number }) {
  const isCardInUse = isBetweenBeats(beat, STORY_BEATS.reachTypeCard, STORY_BEATS.pickSwatch);
  const isPickingType = isBetweenBeats(beat, STORY_BEATS.reachTypeCard, STORY_BEATS.pickType);
  const isTypeHighlighted = isBetweenBeats(beat, STORY_BEATS.pickType, STORY_BEATS.pickSwatch);
  const isPickingColour = isBetweenBeats(beat, STORY_BEATS.reachSwatches, STORY_BEATS.pickSwatch);
  const isSwatchSelectionShown = isBetweenBeats(beat, STORY_BEATS.reachSwatches, STORY_BEATS.returnToButton);

  return (
    <SceneObject x={STYLE_CARD.x} y={STYLE_CARD.y} width={STYLE_CARD.width} height={111} isLive={isCardInUse} className="grid content-start" style={{ padding: sceneUnits(12), gap: sceneUnits(10) }}>
      <SceneLabel isBright={isPickingType} className="transition-colors duration-300">TYPE</SceneLabel>
      <TypeSample isHighlighted={isTypeHighlighted} />
      <SceneLabel isBright={isPickingColour} className="transition-colors duration-300">COLOUR</SceneLabel>
      <SwatchRow selectedSwatchIndex={selectedSwatchIndex} isSelectionShown={isSwatchSelectionShown} />
    </SceneObject>
  );
}
