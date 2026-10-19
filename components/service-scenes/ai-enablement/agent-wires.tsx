"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SCENE_HEIGHT, SCENE_WIDTH, sceneStroke, type ScenePoint } from "../scene-units";
import { EASE_OUT_EXPO, INTAKE_WIRE, PULSE_SIZE, TOOLS, toolTone, type StoryPhase, type ToolTone } from "./agent-story";
import { polylinePath } from "./polyline";
import { useWirePulse } from "./use-wire-pulse";

const TRACE_CLASS_BY_TONE: Record<ToolTone, string> = {
  idle: "stroke-primary",
  live: "stroke-primary",
  waiting: "stroke-accent",
  done: "stroke-primary",
};

const NODE_CLASS_BY_TONE: Record<ToolTone, string> = {
  idle: "stroke-border-strong",
  live: "stroke-primary",
  waiting: "stroke-accent",
  done: "stroke-muted-foreground",
};

function WireBase({ points }: { points: ScenePoint[] }) {
  return (
    <path
      d={polylinePath(points)}
      className="fill-none stroke-border-strong"
      style={{ strokeWidth: sceneStroke(1.2) }}
    />
  );
}

function WireTrace({ points, tone }: { points: ScenePoint[]; tone: ToolTone }) {
  const isTraced = tone === "live" || tone === "waiting";
  return (
    <motion.path
      d={polylinePath(points)}
      className={cn("fill-none transition-[stroke] duration-300", TRACE_CLASS_BY_TONE[tone])}
      style={{ strokeWidth: sceneStroke(1.6) }}
      strokeLinecap="square"
      strokeLinejoin="miter"
      initial={false}
      animate={isTraced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={
        isTraced
          ? { pathLength: { duration: 0.6, ease: EASE_OUT_EXPO }, opacity: { duration: 0.15 } }
          : { opacity: { duration: 0.4 }, pathLength: { duration: 0, delay: 0.4 } }
      }
    />
  );
}

function WireNode({ point, tone }: { point: ScenePoint; tone: ToolTone }) {
  return (
    <rect
      x={point.x - 3}
      y={point.y - 3}
      width={6}
      height={6}
      className={cn("transition-[stroke] duration-500", NODE_CLASS_BY_TONE[tone])}
      style={{ fill: "var(--background)", strokeWidth: sceneStroke(1.2) }}
    />
  );
}

function WirePulse({ phase, isPlaying }: { phase: StoryPhase; isPlaying: boolean }) {
  const { cornerX, cornerY, opacity } = useWirePulse(phase, isPlaying);
  return (
    <motion.rect
      x={cornerX}
      y={cornerY}
      width={PULSE_SIZE}
      height={PULSE_SIZE}
      className={cn("transition-[fill] duration-300", phase === "approval" ? "fill-accent" : "fill-primary")}
      style={{ opacity }}
    />
  );
}

export function AgentWires({ phase, isPlaying }: { phase: StoryPhase; isPlaying: boolean }) {
  const intakeTone: ToolTone = phase === "arrive" ? "live" : "done";
  return (
    <svg
      viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
      preserveAspectRatio="none"
      className="absolute inset-0 size-full"
    >
      <WireBase points={INTAKE_WIRE} />
      {TOOLS.map((tool) => (
        <WireBase key={tool.name} points={tool.wire} />
      ))}
      <WireTrace points={INTAKE_WIRE} tone={intakeTone} />
      {TOOLS.map((tool) => (
        <WireTrace key={tool.name} points={tool.wire} tone={toolTone(tool, phase)} />
      ))}
      {TOOLS.map((tool) => (
        <WireNode key={tool.name} point={tool.node} tone={toolTone(tool, phase)} />
      ))}
      <WirePulse phase={phase} isPlaying={isPlaying} />
    </svg>
  );
}
