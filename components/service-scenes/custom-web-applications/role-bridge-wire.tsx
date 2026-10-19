"use client";

import { motion } from "motion/react";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, ROLE_BRIDGE, roleRowCenterY } from "./custom-web-applications-story";
import { stagePercentY } from "./stage-percent";

const BRIDGE_NODE_SIZE = 5;

export function RoleBridgeWire({ activeRoleIndex }: { activeRoleIndex: number | null }) {
  return (
    <motion.span
      className="absolute"
      initial={false}
      animate={{ top: stagePercentY(roleRowCenterY(activeRoleIndex ?? 0)), opacity: activeRoleIndex === null ? 0 : 1 }}
      transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
      style={{ left: sceneUnits(ROLE_BRIDGE.fromX), width: sceneUnits(ROLE_BRIDGE.toX - ROLE_BRIDGE.fromX), height: 0 }}
    >
      <span className="absolute inset-x-0 bg-border-strong" style={{ top: sceneUnits(-0.5), height: sceneUnits(1) }} />
      <span
        className="absolute bg-foreground"
        style={{
          left: sceneUnits(-BRIDGE_NODE_SIZE / 2),
          top: sceneUnits(-BRIDGE_NODE_SIZE / 2),
          width: sceneUnits(BRIDGE_NODE_SIZE),
          height: sceneUnits(BRIDGE_NODE_SIZE),
        }}
      />
    </motion.span>
  );
}
