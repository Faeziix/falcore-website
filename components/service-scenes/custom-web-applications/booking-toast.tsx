"use client";

import { motion } from "motion/react";
import { SceneLabel, SceneLed } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { BOOKING_TOAST, EASE_OUT_EXPO } from "./custom-web-applications-story";

export function BookingToast({ isShown }: { isShown: boolean }) {
  return (
    <motion.div
      className="absolute flex items-center bg-scene-inset"
      initial={false}
      animate={{ opacity: isShown ? 1 : 0, y: isShown ? "0%" : "45%" }}
      transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
      style={{
        left: sceneUnits(BOOKING_TOAST.x),
        top: sceneUnits(BOOKING_TOAST.y),
        gap: sceneUnits(7),
        padding: `${sceneUnits(6)} ${sceneUnits(9)}`,
        boxShadow: `inset 0 0 0 ${sceneUnits(1)} var(--border), 0 ${sceneUnits(6)} ${sceneUnits(14)} var(--scene-object-shadow)`,
      }}
    >
      <SceneLed isOn size={5} />
      <SceneLabel isBright>{BOOKING_TOAST.label}</SceneLabel>
      <SceneLabel>{BOOKING_TOAST.detail}</SceneLabel>
    </motion.div>
  );
}
