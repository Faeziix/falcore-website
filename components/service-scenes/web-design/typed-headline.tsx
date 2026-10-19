"use client";

import { motion, useTransform, type MotionValue } from "motion/react";
import { cn } from "@/lib/utils";
import { sceneUnits } from "../scene-units";
import { useBeatDrivenCount } from "./use-beat-driven-count";
import { HEADLINE_LINES, PAGE_LAYOUT, STORY_BEATS, hasReachedBeat, isBetweenBeats } from "./web-design-story";

const [FIRST_LINE, SECOND_LINE] = HEADLINE_LINES;
const TOTAL_CHARACTERS = FIRST_LINE.length + SECOND_LINE.length;
const TYPING_SECONDS = 1.1;

function TypingCaret({ isOnThisLine, isTyping }: { isOnThisLine: MotionValue<string>; isTyping: boolean }) {
  return (
    <motion.span
      className="inline-block bg-foreground align-baseline"
      style={{ display: isOnThisLine, width: sceneUnits(2), height: sceneUnits(20), marginLeft: sceneUnits(2), marginBottom: sceneUnits(-2) }}
      initial={{ opacity: 0 }}
      animate={isTyping ? { opacity: [1, 1, 0, 0] } : { opacity: 0 }}
      transition={isTyping ? { duration: 0.8, repeat: Infinity, ease: "linear", times: [0, 0.5, 0.5, 1] } : { duration: 0.15 }}
    />
  );
}

export function TypedHeadline({ beat, isPlaying }: { beat: number; isPlaying: boolean }) {
  const typedCharacterCount = useBeatDrivenCount({
    beat,
    isPlaying,
    finalCount: TOTAL_CHARACTERS,
    resetBeat: STORY_BEATS.drawGuides,
    countBeat: STORY_BEATS.typeHeadline,
    durationSeconds: TYPING_SECONDS,
    ease: "linear",
  });
  const firstLineText = useTransform(typedCharacterCount, (count) => FIRST_LINE.slice(0, Math.round(count)));
  const secondLineText = useTransform(typedCharacterCount, (count) => SECOND_LINE.slice(0, Math.max(0, Math.round(count) - FIRST_LINE.length)));
  const caretOnFirstLine = useTransform<number, string>(typedCharacterCount, (count) => (Math.round(count) <= FIRST_LINE.length ? "inline-block" : "none"));
  const caretOnSecondLine = useTransform<number, string>(typedCharacterCount, (count) => (Math.round(count) > FIRST_LINE.length ? "inline-block" : "none"));
  const isCleared = beat === STORY_BEATS.clearPage;
  const isTyping = isBetweenBeats(beat, STORY_BEATS.drawGuides, STORY_BEATS.typeHeadline + 1);
  const hasChosenType = hasReachedBeat(beat, STORY_BEATS.pickType);
  const { left, top, fontSize } = PAGE_LAYOUT.headline;

  return (
    <motion.div
      className={cn(
        "absolute whitespace-nowrap font-medium tracking-[-0.01em] transition-colors duration-500",
        hasChosenType ? "font-display text-foreground" : "font-sans text-foreground-soft",
      )}
      style={{ left: sceneUnits(left), top: sceneUnits(top), fontSize: sceneUnits(fontSize), lineHeight: 1 }}
      initial={false}
      animate={{ opacity: isCleared ? 0 : 1 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
    >
      <motion.span>{firstLineText}</motion.span>
      <TypingCaret isOnThisLine={caretOnFirstLine} isTyping={isTyping} />
      <br />
      <motion.span>{secondLineText}</motion.span>
      <TypingCaret isOnThisLine={caretOnSecondLine} isTyping={isTyping} />
    </motion.div>
  );
}
