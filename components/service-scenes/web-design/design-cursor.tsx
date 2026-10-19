"use client";

import { motion } from "motion/react";
import { SCENE_HEIGHT, SCENE_WIDTH, sceneUnits } from "../scene-units";
import { CURSOR_CLICK_BEATS, EASE_OUT_EXPO, cursorPositionFor } from "./web-design-story";

function toPercent(value: number, total: number) {
  return `${Math.round((value / total) * 10000) / 100}%`;
}

export function DesignCursor({ beat }: { beat: number }) {
  const cursorPosition = cursorPositionFor(beat);
  const isClicking = CURSOR_CLICK_BEATS.includes(beat);

  return (
    <motion.div
      className="absolute"
      style={{ width: sceneUnits(18), height: sceneUnits(18) }}
      initial={false}
      animate={{ left: toPercent(cursorPosition.x, SCENE_WIDTH), top: toPercent(cursorPosition.y, SCENE_HEIGHT) }}
      transition={{ duration: 0.75, ease: EASE_OUT_EXPO }}
    >
      <motion.svg
        viewBox="0 0 24 24"
        className="size-full origin-top-left fill-foreground stroke-background"
        strokeWidth={1.2}
        strokeLinejoin="miter"
        strokeLinecap="square"
        initial={{ scale: 1 }}
        animate={isClicking ? { scale: [1, 0.8, 1] } : { scale: 1 }}
        transition={isClicking ? { duration: 0.4, ease: EASE_OUT_EXPO, delay: 0.1, times: [0, 0.3, 1] } : { duration: 0.2 }}
      >
        <path d="M4 2l15 9-7 1.5L8.5 20z" />
      </motion.svg>
    </motion.div>
  );
}
