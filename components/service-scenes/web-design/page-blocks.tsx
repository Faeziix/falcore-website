"use client";

import { motion } from "motion/react";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, PAGE_LAYOUT, STORY_BEATS, hasReachedBeat } from "./web-design-story";

const CLEAR_SECONDS = 0.4;

function revealTransition(isShown: boolean, delay = 0) {
  return isShown
    ? { duration: 0.9, ease: EASE_OUT_EXPO, delay }
    : { duration: CLEAR_SECONDS, ease: "easeOut" as const };
}

export function PageTextBars({ beat }: { beat: number }) {
  const areBarsShown = hasReachedBeat(beat, STORY_BEATS.extendTextBars);
  return PAGE_LAYOUT.textBars.map((textBar, barIndex) => (
    <motion.span
      key={barIndex}
      className="absolute block origin-left bg-border"
      style={{ left: sceneUnits(textBar.left), top: sceneUnits(textBar.top), width: sceneUnits(textBar.width), height: sceneUnits(5) }}
      initial={false}
      animate={areBarsShown ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.0001 }}
      transition={areBarsShown ? revealTransition(true, barIndex * 0.14) : { opacity: { duration: CLEAR_SECONDS }, scaleX: { duration: 0, delay: CLEAR_SECONDS } }}
    />
  ));
}

export function PageImage({ beat }: { beat: number }) {
  const isImageShown = hasReachedBeat(beat, STORY_BEATS.wipeImage);
  const { left, top, width, height } = PAGE_LAYOUT.image;
  return (
    <motion.div
      className="absolute"
      style={{
        left: sceneUnits(left),
        top: sceneUnits(top),
        width: sceneUnits(width),
        height: sceneUnits(height),
        backgroundImage: "linear-gradient(160deg, var(--border) 0%, var(--scene-object-top) 55%, var(--scene-object-bottom) 100%)",
        boxShadow: `inset 0 0 0 ${sceneUnits(1)} var(--border)`,
      }}
      initial={false}
      animate={isImageShown ? { opacity: 1, clipPath: "inset(0% 0% 0% 0%)" } : { opacity: 0, clipPath: "inset(0% 100% 0% 0%)" }}
      transition={
        isImageShown
          ? { clipPath: { duration: 1.1, ease: EASE_OUT_EXPO }, opacity: { duration: 0.2 } }
          : { opacity: { duration: CLEAR_SECONDS }, clipPath: { duration: 0, delay: CLEAR_SECONDS } }
      }
    />
  );
}

export function PageButton({ beat, accentColour }: { beat: number; accentColour: string }) {
  const isButtonShown = hasReachedBeat(beat, STORY_BEATS.placeButton);
  const isPressed = beat === STORY_BEATS.pressButton;
  const { left, top, width, height } = PAGE_LAYOUT.button;
  return (
    <motion.div
      className="absolute origin-left"
      style={{ left: sceneUnits(left), top: sceneUnits(top), width: sceneUnits(width), height: sceneUnits(height) }}
      initial={false}
      animate={isButtonShown ? { opacity: 1, scaleX: 1 } : { opacity: 0, scaleX: 0.0001 }}
      transition={isButtonShown ? revealTransition(true) : { opacity: { duration: CLEAR_SECONDS }, scaleX: { duration: 0, delay: CLEAR_SECONDS } }}
    >
      <motion.span
        className="block size-full transition-[background-color] duration-700"
        style={{ backgroundColor: accentColour }}
        initial={{ scale: 1 }}
        animate={isPressed ? { scale: [1, 0.93, 1] } : { scale: 1 }}
        transition={isPressed ? { duration: 0.42, ease: EASE_OUT_EXPO, delay: 0.12, times: [0, 0.3, 1] } : { duration: 0.2 }}
      />
    </motion.div>
  );
}
