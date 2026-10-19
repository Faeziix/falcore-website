"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneObject } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { LayoutGuides } from "./layout-guides";
import { PageButton, PageImage, PageTextBars } from "./page-blocks";
import { TypedHeadline } from "./typed-headline";
import { BROWSER_FRAME, EASE_OUT_EXPO, STORY_BEATS, isBuilding } from "./web-design-story";

const WINDOW_DOT_INDEXES = [0, 1, 2];
const LAST_BUILD_BEAT = STORY_BEATS.goLive - 1;

function TitleBar({ beat }: { beat: number }) {
  const isPageBuilding = isBuilding(beat);
  const buildProgress = isPageBuilding ? beat / LAST_BUILD_BEAT : 1;

  return (
    <div className="relative flex items-center border-b border-border" style={{ height: sceneUnits(BROWSER_FRAME.titleBarHeight), gap: sceneUnits(5), paddingInline: sceneUnits(10), borderBottomWidth: sceneUnits(1) }}>
      {WINDOW_DOT_INDEXES.map((dotIndex) => (
        <span
          key={dotIndex}
          className={cn("block transition-colors duration-300", isPageBuilding && beat % 3 === dotIndex ? "bg-foreground-soft" : "bg-border-strong")}
          style={{ width: sceneUnits(6), height: sceneUnits(6) }}
        />
      ))}
      <motion.span
        className="absolute left-0 block w-full origin-left bg-foreground-soft"
        style={{ bottom: sceneUnits(-1), height: sceneUnits(1) }}
        initial={false}
        animate={{ scaleX: buildProgress, opacity: isPageBuilding ? 0.7 : 0 }}
        transition={beat === STORY_BEATS.clearPage ? { duration: 0 } : { scaleX: { duration: 0.6, ease: EASE_OUT_EXPO }, opacity: { duration: 0.6, delay: 0.3 } }}
      />
    </div>
  );
}

export function BrowserWindow({ beat, isPlaying, accentColour }: { beat: number; isPlaying: boolean; accentColour: string }) {
  return (
    <SceneObject x={BROWSER_FRAME.x} y={BROWSER_FRAME.y} width={BROWSER_FRAME.width} height={BROWSER_FRAME.height} className="overflow-clip">
      <TitleBar beat={beat} />
      <LayoutGuides beat={beat} />
      <TypedHeadline beat={beat} isPlaying={isPlaying} />
      <PageTextBars beat={beat} />
      <PageButton beat={beat} accentColour={accentColour} />
      <PageImage beat={beat} />
    </SceneObject>
  );
}
