"use client";

import type { CSSProperties } from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneLabel, SceneObject } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { TOOL_TILE_SIZE, type ToolDefinition, type ToolTone } from "./agent-story";
import { ToolGlyph } from "./tool-glyphs";

const EDGE_BY_TONE: Record<ToolTone | "agent", string> = {
  idle: `0 0 0 ${sceneUnits(1)} var(--scene-object-edge)`,
  done: `0 0 0 ${sceneUnits(1)} var(--scene-object-edge)`,
  agent: `0 0 0 ${sceneUnits(1)} var(--border-strong)`,
  live: `0 0 0 ${sceneUnits(1.5)} var(--primary)`,
  waiting: `0 0 0 ${sceneUnits(1.5)} var(--accent)`,
};

export function toneEdgeStyle(tone: ToolTone | "agent"): CSSProperties {
  return {
    boxShadow: `inset 0 ${sceneUnits(1)} 0 var(--scene-object-highlight), ${EDGE_BY_TONE[tone]}, 0 ${sceneUnits(14)} ${sceneUnits(30)} var(--scene-object-shadow)`,
  };
}

const GLYPH_CLASS_BY_TONE: Record<ToolTone, string> = {
  idle: "text-muted-foreground",
  live: "text-foreground",
  waiting: "text-foreground",
  done: "text-foreground-soft",
};

const LED_CLASS_BY_TONE: Record<ToolTone, string> = {
  idle: "bg-border-strong",
  live: "bg-primary",
  waiting: "bg-accent",
  done: "bg-foreground",
};

function ToolLed({ tone, isPlaying }: { tone: ToolTone; isPlaying: boolean }) {
  const isBlinking = isPlaying && (tone === "live" || tone === "waiting");
  return (
    <motion.span
      className={cn("absolute block transition-colors duration-500", LED_CLASS_BY_TONE[tone])}
      style={{ left: sceneUnits(6), top: sceneUnits(6), width: sceneUnits(5), height: sceneUnits(5) }}
      initial={false}
      animate={{ opacity: isBlinking ? [1, 0.3, 1] : 1 }}
      transition={isBlinking ? { duration: 0.75, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
    />
  );
}

export function ToolTile({ tool, tone, isPlaying }: { tool: ToolDefinition; tone: ToolTone; isPlaying: boolean }) {
  const isEngaged = tone === "live" || tone === "waiting";
  const half = TOOL_TILE_SIZE / 2;
  return (
    <>
      <SceneObject
        x={tool.centre.x - half}
        y={tool.centre.y - half}
        width={TOOL_TILE_SIZE}
        height={TOOL_TILE_SIZE}
        className={cn("grid place-items-center transition-[box-shadow,color] duration-300", GLYPH_CLASS_BY_TONE[tone])}
        style={toneEdgeStyle(tone)}
      >
        <ToolGlyph name={tool.name} tone={tone} isPlaying={isPlaying} />
        <ToolLed tone={tone} isPlaying={isPlaying} />
      </SceneObject>
      <div className="absolute -translate-x-1/2" style={{ left: sceneUnits(tool.centre.x), top: sceneUnits(tool.centre.y + half + 9) }}>
        <SceneLabel isBright={isEngaged} className="transition-colors duration-500">
          {tool.label}
        </SceneLabel>
      </div>
    </>
  );
}
