"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { sceneUnits } from "../scene-units";
import { DASHBOARD, EASE_OUT_EXPO, SIDEBAR } from "./custom-web-applications-story";
import { stagePercentY } from "./stage-percent";

type DashboardSidebarProps = { activeNavIndex: number; hiddenNavIndexes: readonly number[] };

export function DashboardSidebar({ activeNavIndex, hiddenNavIndexes }: DashboardSidebarProps) {
  return (
    <>
      <span
        className="absolute bg-border"
        style={{ left: sceneUnits(SIDEBAR.dividerX), top: sceneUnits(DASHBOARD.y), width: sceneUnits(1), height: sceneUnits(DASHBOARD.height) }}
      />
      <motion.span
        className="absolute bg-foreground"
        initial={false}
        animate={{ top: stagePercentY(SIDEBAR.itemYs[activeNavIndex]) }}
        transition={{ duration: 0.6, ease: EASE_OUT_EXPO }}
        style={{ left: sceneUnits(SIDEBAR.indicatorX), width: sceneUnits(2), height: sceneUnits(SIDEBAR.itemSize) }}
      />
      {SIDEBAR.itemYs.map((itemY, navIndex) => (
        <NavItem key={itemY} y={itemY} isActive={navIndex === activeNavIndex} isHiddenForRole={hiddenNavIndexes.includes(navIndex)} />
      ))}
    </>
  );
}

function NavItem({ y, isActive, isHiddenForRole }: { y: number; isActive: boolean; isHiddenForRole: boolean }) {
  return (
    <span
      className={cn(
        "absolute transition-[background-color,opacity] duration-500 ease-out",
        isActive ? "bg-foreground" : "bg-border-strong",
        isHiddenForRole ? "opacity-20" : "opacity-100",
      )}
      style={{
        left: sceneUnits(SIDEBAR.centerX - SIDEBAR.itemSize / 2),
        top: sceneUnits(y),
        width: sceneUnits(SIDEBAR.itemSize),
        height: sceneUnits(SIDEBAR.itemSize),
      }}
    />
  );
}
