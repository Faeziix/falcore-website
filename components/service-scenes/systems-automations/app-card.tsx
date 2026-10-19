"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneBar, SceneLabel, SceneObject } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { APP_CARD } from "./workflow-layout";
import { EXPO_OUT, type AppState } from "./workflow-story";

const APP_LED_CLASS: Record<AppState, string> = {
  idle: "bg-border-strong",
  live: "bg-primary",
  done: "bg-foreground",
};

function AppStatusRow({ state, doneText }: { state: AppState; doneText: string }) {
  return (
    <div className="relative overflow-clip" style={{ height: sceneUnits(APP_CARD.statusHeight) }}>
      <AnimatePresence initial={false}>
        {state === "idle" ? (
          <motion.span
            key="placeholder"
            className="absolute inset-y-0 left-0 flex items-center"
            style={{ width: "72%" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EXPO_OUT }}
          >
            <SceneBar width="100%" />
          </motion.span>
        ) : (
          <motion.span
            key="record"
            className="absolute inset-y-0 left-0 flex items-center leading-none"
            style={{ gap: sceneUnits(APP_CARD.recordGap) }}
            initial={{ x: sceneUnits(-24), opacity: 0 }}
            animate={{ x: sceneUnits(0), opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: EXPO_OUT }}
          >
            <span className={cn("block shrink-0", state === "live" ? "bg-foreground" : "bg-border-strong")} style={{ width: sceneUnits(APP_CARD.recordDashWidth), height: sceneUnits(2) }} />
            <SceneLabel isBright={state === "live"} style={{ fontSize: sceneUnits(APP_CARD.statusFontSize) }}>
              {doneText}
            </SceneLabel>
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}

type AppCardProps = { label: string; doneText: string; portY: number; state: AppState };

export function AppCard({ label, doneText, portY, state }: AppCardProps) {
  return (
    <SceneObject
      x={APP_CARD.x}
      y={portY - APP_CARD.height / 2}
      width={APP_CARD.width}
      height={APP_CARD.height}
      isLive={state === "live"}
      className="grid content-center"
      style={{ paddingInline: sceneUnits(APP_CARD.paddingInline), gap: sceneUnits(APP_CARD.gap) }}
    >
      <div className="flex items-center" style={{ gap: sceneUnits(APP_CARD.gap) }}>
        <span className={cn("block shrink-0 transition-colors duration-300", APP_LED_CLASS[state])} style={{ width: sceneUnits(APP_CARD.ledSize), height: sceneUnits(APP_CARD.ledSize) }} />
        <SceneLabel isBright={state !== "idle"} className="transition-colors duration-300">
          {label}
        </SceneLabel>
      </div>
      <AppStatusRow state={state} doneText={doneText} />
    </SceneObject>
  );
}
