"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneLabel } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { APPS, RUN_COUNTER_POSITION, type AppKey } from "./workflow-layout";
import { EXPO_OUT, type AppState } from "./workflow-story";

const TICK_CLASS: Record<AppState, string> = {
  idle: "bg-border",
  live: "bg-muted-foreground",
  done: "bg-foreground",
};

const COUNTER_TEXT_STYLE = { fontSize: sceneUnits(RUN_COUNTER_POSITION.fontSize) };

type RunCounterProps = { runNumber: number; apps: Record<AppKey, AppState>; isRunComplete: boolean };

export function RunCounter({ runNumber, apps, isRunComplete }: RunCounterProps) {
  const counterHeight = sceneUnits(RUN_COUNTER_POSITION.height);
  return (
    <div
      className="absolute flex items-center tabular-nums"
      style={{ left: sceneUnits(RUN_COUNTER_POSITION.x), top: sceneUnits(RUN_COUNTER_POSITION.y), gap: sceneUnits(RUN_COUNTER_POSITION.gap), height: counterHeight }}
    >
      <SceneLabel style={COUNTER_TEXT_STYLE}>RUN</SceneLabel>
      <span className="relative block overflow-clip" style={{ width: sceneUnits(RUN_COUNTER_POSITION.numberWidth), height: counterHeight }}>
        <AnimatePresence initial={false}>
          <motion.span
            key={runNumber}
            className="absolute inset-0 flex items-center leading-none"
            initial={{ y: counterHeight, opacity: 0 }}
            animate={{ y: sceneUnits(0), opacity: 1 }}
            exit={{ y: sceneUnits(-RUN_COUNTER_POSITION.height), opacity: 0, transition: { duration: 0.3, ease: "easeIn" } }}
            transition={{ duration: 0.6, delay: 0.1, ease: EXPO_OUT }}
          >
            <SceneLabel isBright style={COUNTER_TEXT_STYLE}>
              #{runNumber}
            </SceneLabel>
          </motion.span>
        </AnimatePresence>
      </span>
      <span className="flex items-center" style={{ gap: sceneUnits(3) }}>
        {APPS.map((app) => (
          <span
            key={app.key}
            className={cn("block transition-colors duration-300", TICK_CLASS[apps[app.key]])}
            style={{ width: sceneUnits(RUN_COUNTER_POSITION.tickSize), height: sceneUnits(RUN_COUNTER_POSITION.tickSize) }}
          />
        ))}
      </span>
      <motion.span
        className="flex items-center leading-none"
        style={{ height: counterHeight }}
        initial={false}
        animate={{ opacity: isRunComplete ? 1 : 0 }}
        transition={{ duration: 0.4, ease: EXPO_OUT }}
      >
        <SceneLabel style={COUNTER_TEXT_STYLE}>3 / 3</SceneLabel>
      </motion.span>
    </div>
  );
}
