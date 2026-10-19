"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneLabel } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, ROLE_ROWS, ROLE_VIEWS, roleRowTop } from "./custom-web-applications-story";
import { stagePercentY } from "./stage-percent";

export function TeamRoles({ activeRoleIndex }: { activeRoleIndex: number | null }) {
  return (
    <>
      <motion.span
        className="absolute bg-scene-inset"
        initial={false}
        animate={{ top: stagePercentY(roleRowTop(activeRoleIndex ?? 0)), opacity: activeRoleIndex === null ? 0 : 1 }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        style={{
          left: sceneUnits(ROLE_ROWS.x),
          width: sceneUnits(ROLE_ROWS.width),
          height: sceneUnits(ROLE_ROWS.height),
          boxShadow: `inset 0 0 0 ${sceneUnits(1)} var(--border)`,
        }}
      />
      {ROLE_VIEWS.map((roleView, roleIndex) => (
        <RoleRow key={roleView.name} name={roleView.name} top={roleRowTop(roleIndex)} isActive={roleIndex === activeRoleIndex} />
      ))}
    </>
  );
}

function RoleRow({ name, top, isActive }: { name: string; top: number; isActive: boolean }) {
  return (
    <span
      className="absolute flex items-center"
      style={{ left: sceneUnits(ROLE_ROWS.x + 5), top: sceneUnits(top), height: sceneUnits(ROLE_ROWS.height), gap: sceneUnits(6) }}
    >
      <span
        className={cn("block transition-colors duration-500", isActive ? "bg-foreground" : "bg-border-strong")}
        style={{ width: sceneUnits(4), height: sceneUnits(4) }}
      />
      <SceneLabel isBright={isActive} className="transition-colors duration-500">
        {name}
      </SceneLabel>
    </span>
  );
}
