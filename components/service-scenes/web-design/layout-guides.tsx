"use client";

import { motion } from "motion/react";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, PAGE_LAYOUT, STORY_BEATS, isBetweenBeats } from "./web-design-story";

const { left, top, width, height, columnCount, gutter } = PAGE_LAYOUT.guides;
const COLUMN_WIDTH = (width - gutter * (columnCount - 1)) / columnCount;
const COLUMN_INDEXES = Array.from({ length: columnCount }, (_, columnIndex) => columnIndex);

export function LayoutGuides({ beat }: { beat: number }) {
  const areGuidesVisible = isBetweenBeats(beat, STORY_BEATS.drawGuides, STORY_BEATS.placeButton - 1);

  return (
    <div className="pointer-events-none absolute" style={{ left: sceneUnits(left), top: sceneUnits(top), width: sceneUnits(width), height: sceneUnits(height) }}>
      {COLUMN_INDEXES.map((columnIndex) => (
        <motion.span
          key={columnIndex}
          className="absolute top-0 h-full origin-top border-x border-border bg-foreground/[0.04]"
          style={{ left: sceneUnits(columnIndex * (COLUMN_WIDTH + gutter)), width: sceneUnits(COLUMN_WIDTH), borderWidth: `0 ${sceneUnits(1)}` }}
          initial={false}
          animate={areGuidesVisible ? { opacity: 1, scaleY: 1 } : { opacity: 0, scaleY: 0 }}
          transition={
            areGuidesVisible
              ? { duration: 0.9, ease: EASE_OUT_EXPO, delay: columnIndex * 0.05 }
              : { opacity: { duration: 0.5, delay: columnIndex * 0.03 }, scaleY: { duration: 0, delay: 0.6 } }
          }
        />
      ))}
    </div>
  );
}
