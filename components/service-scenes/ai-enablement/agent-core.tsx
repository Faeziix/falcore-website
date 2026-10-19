"use client";

import { motion } from "motion/react";
import { SceneObject } from "../scene-parts";
import { AGENT_TILE, EASE_OUT_EXPO, type AgentTone } from "./agent-story";
import { toneEdgeStyle } from "./tool-tile";

const MAIN_SPARKLE_PATH = "M10 6 C10 10.4 13.6 14 18 14 C13.6 14 10 17.6 10 22 C10 17.6 6.4 14 2 14 C6.4 14 10 10.4 10 6 Z";
const SMALL_SPARKLE_PATH = "M18.5 2 C18.5 3.9 20.1 5.5 22 5.5 C20.1 5.5 18.5 7.1 18.5 9 C18.5 7.1 16.9 5.5 15 5.5 C16.9 5.5 18.5 3.9 18.5 2 Z";
const WORKING_CYCLE_SECONDS = 1.6;
const EASE_IN_OUT_QUART = [0.76, 0, 0.24, 1] as const;
const SPIN_AROUND_OWN_CENTER = { transformBox: "fill-box", originX: 0.5, originY: 0.5 } as const;

function MainSparkle({ isWorking }: { isWorking: boolean }) {
  return (
    <motion.path
      d={MAIN_SPARKLE_PATH}
      style={SPIN_AROUND_OWN_CENTER}
      initial={false}
      animate={isWorking ? { rotate: [0, 90], scale: [1, 0.74, 1] } : { rotate: 0, scale: 1 }}
      transition={
        isWorking
          ? { duration: WORKING_CYCLE_SECONDS, ease: EASE_IN_OUT_QUART, repeat: Infinity }
          : { duration: 0.6, ease: EASE_OUT_EXPO }
      }
    />
  );
}

function SmallSparkle({ isWorking }: { isWorking: boolean }) {
  return (
    <motion.path
      d={SMALL_SPARKLE_PATH}
      style={SPIN_AROUND_OWN_CENTER}
      initial={false}
      animate={isWorking ? { scale: [1, 0.35, 1], opacity: [1, 0.35, 1] } : { scale: 1, opacity: 1 }}
      transition={
        isWorking
          ? { duration: WORKING_CYCLE_SECONDS, ease: EASE_IN_OUT_QUART, repeat: Infinity, delay: WORKING_CYCLE_SECONDS / 2 }
          : { duration: 0.6, ease: EASE_OUT_EXPO }
      }
    />
  );
}

function AgentSparkle({ tone, isPlaying }: { tone: AgentTone; isPlaying: boolean }) {
  const isWorking = isPlaying && tone !== "done";
  return (
    <svg viewBox="0 0 24 24" className="size-[58%] overflow-visible" fill="currentColor">
      <MainSparkle isWorking={isWorking} />
      <SmallSparkle isWorking={isWorking} />
    </svg>
  );
}

export function AgentCore({ tone, isPlaying }: { tone: AgentTone; isPlaying: boolean }) {
  return (
    <SceneObject
      x={AGENT_TILE.x}
      y={AGENT_TILE.y}
      width={AGENT_TILE.size}
      height={AGENT_TILE.size}
      className="grid place-items-center text-foreground transition-[box-shadow] duration-300"
      style={toneEdgeStyle(tone === "live" ? "live" : tone === "done" ? "idle" : "agent")}
    >
      <AgentSparkle tone={tone} isPlaying={isPlaying} />
    </SceneObject>
  );
}
