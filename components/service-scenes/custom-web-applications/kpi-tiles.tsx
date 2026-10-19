"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneBar, SceneLabel } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { CountingValue } from "./counting-value";
import { EASE_OUT_EXPO, KPI_TILE_FRAME, KPI_TILES, type KpiTileLayout, type RoleView } from "./custom-web-applications-story";

type KpiTilesProps = {
  areKpisCounted: boolean;
  bookingsTotal: number;
  isBookingLive: boolean;
  roleView: RoleView;
};

export function KpiTiles({ areKpisCounted, bookingsTotal, isBookingLive, roleView }: KpiTilesProps) {
  return KPI_TILES.map((tile) => (
    <KpiTile
      key={tile.key}
      tile={tile}
      targetValue={tile.key === "bookings" ? bookingsTotal : tile.restingValue}
      isCounted={areKpisCounted}
      isLive={tile.key === "bookings" && isBookingLive}
      isHiddenForRole={roleView.hiddenKpis.includes(tile.key)}
    />
  ));
}

type KpiTileProps = {
  tile: KpiTileLayout;
  targetValue: number;
  isCounted: boolean;
  isLive: boolean;
  isHiddenForRole: boolean;
};

function KpiTile({ tile, targetValue, isCounted, isLive, isHiddenForRole }: KpiTileProps) {
  return (
    <div
      className={cn("absolute grid content-start bg-surface transition-[box-shadow,opacity] duration-500 ease-out", isHiddenForRole ? "opacity-45" : "opacity-100")}
      style={{
        left: sceneUnits(tile.x),
        top: sceneUnits(KPI_TILE_FRAME.y),
        width: sceneUnits(KPI_TILE_FRAME.width),
        height: sceneUnits(KPI_TILE_FRAME.height),
        padding: sceneUnits(KPI_TILE_FRAME.padding),
        gap: sceneUnits(6),
        boxShadow: `inset 0 0 0 ${sceneUnits(1)} ${isLive ? "var(--primary)" : "var(--border)"}`,
      }}
    >
      <SceneLabel>{tile.label}</SceneLabel>
      <span className="relative block font-display font-medium text-foreground" style={{ fontSize: sceneUnits(17), lineHeight: 1, height: sceneUnits(17) }}>
        <AnimatePresence initial={false} mode="wait">
          {isHiddenForRole ? (
            <motion.span
              key="hidden"
              className="absolute inset-y-0 left-0 flex items-center"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              <SceneBar width={sceneUnits(38)} isBright />
            </motion.span>
          ) : (
            <motion.span
              key="value"
              className="absolute inset-y-0 left-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_OUT_EXPO }}
            >
              <CountingValue targetValue={targetValue} isCounted={isCounted} prefix={tile.prefix} suffix={tile.suffix} />
            </motion.span>
          )}
        </AnimatePresence>
      </span>
    </div>
  );
}
