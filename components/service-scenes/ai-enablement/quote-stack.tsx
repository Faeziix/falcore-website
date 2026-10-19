"use client";

import { AnimatePresence, motion } from "motion/react";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, MAXIMUM_QUOTE_SHEETS, QUOTE_STACK } from "./agent-story";

const SHEET_INDEXES = Array.from({ length: MAXIMUM_QUOTE_SHEETS }, (_, index) => index);

function QuoteSheet({ index, isTopSheet, isPlaying }: { index: number; isTopSheet: boolean; isPlaying: boolean }) {
  const offset = index * QUOTE_STACK.offset;
  return (
    <motion.span
      className="absolute flex flex-col bg-surface"
      style={{
        left: sceneUnits(QUOTE_STACK.x + offset),
        top: sceneUnits(QUOTE_STACK.y - offset),
        width: sceneUnits(QUOTE_STACK.width),
        height: sceneUnits(QUOTE_STACK.height),
        gap: sceneUnits(2.5),
        padding: `${sceneUnits(4)} ${sceneUnits(3.5)}`,
        boxShadow: `0 0 0 ${sceneUnits(1)} ${isTopSheet ? "var(--border-strong)" : "var(--border)"}, 0 ${sceneUnits(4)} ${sceneUnits(8)} var(--scene-object-shadow)`,
      }}
      initial={isPlaying ? { opacity: 0, y: -6 } : false}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -10, transition: { duration: 0.4, delay: (MAXIMUM_QUOTE_SHEETS - index) * 0.05, ease: EASE_OUT_EXPO } }}
      transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
    >
      {[100, 70, 85].map((lineWidth) => (
        <span key={lineWidth} className={isTopSheet ? "block bg-border-strong" : "block bg-border"} style={{ width: `${lineWidth}%`, height: sceneUnits(1.5) }} />
      ))}
    </motion.span>
  );
}

export function QuoteStack({ sheetCount, isPlaying }: { sheetCount: number; isPlaying: boolean }) {
  return (
    <AnimatePresence>
      {SHEET_INDEXES.filter((index) => index < sheetCount).map((index) => (
        <QuoteSheet key={index} index={index} isTopSheet={index === sheetCount - 1} isPlaying={isPlaying} />
      ))}
    </AnimatePresence>
  );
}
