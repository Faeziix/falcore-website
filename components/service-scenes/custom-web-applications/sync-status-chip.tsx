"use client";

import { AnimatePresence, motion } from "motion/react";
import { SceneChip, SceneLed } from "../scene-parts";
import { SceneLoader } from "../scene-loader";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, STATUS_CHIP, type SyncStatus } from "./custom-web-applications-story";

type SyncStatusChipProps = { syncStatus: SyncStatus; isPlaying: boolean };

export function SyncStatusChip({ syncStatus, isPlaying }: SyncStatusChipProps) {
  return (
    <SceneChip centerX={STATUS_CHIP.centerX} y={STATUS_CHIP.y} className="justify-center">
      <span className="relative block" style={{ width: sceneUnits(STATUS_CHIP.width - 24), height: sceneUnits(11) }}>
        <AnimatePresence initial={false}>
          <motion.span
            key={syncStatus.isSyncing ? "syncing" : "synced"}
            className="absolute inset-0 flex items-center justify-center"
            style={{ gap: sceneUnits(8) }}
            initial={{ opacity: 0, y: "30%" }}
            animate={{ opacity: 1, y: "0%" }}
            exit={{ opacity: 0, y: "-30%" }}
            transition={{ duration: 0.35, ease: EASE_OUT_EXPO }}
          >
            {syncStatus.isSyncing ? <SceneLoader isPlaying={isPlaying} /> : <SceneLed isOn size={6} />}
            <span>
              <span className="text-foreground">{syncStatus.isSyncing ? "Syncing" : "Synced"}</span>
              {syncStatus.detail ? <span className="tabular-nums">{` · ${syncStatus.detail}`}</span> : null}
            </span>
          </motion.span>
        </AnimatePresence>
      </span>
    </SceneChip>
  );
}
