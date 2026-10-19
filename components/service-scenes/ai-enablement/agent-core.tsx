"use client";

import { motion } from "motion/react";
import { SceneObject } from "../scene-parts";
import { AGENT_TILE, type AgentTone } from "./agent-story";
import { toneEdgeStyle } from "./tool-tile";

const CLOCKWISE_RAYS = [
  "M12 2 V5",
  "M17.3 6.7 L19.1 4.9",
  "M19 12 H22",
  "M17.3 17.3 L19.1 19.1",
  "M12 19 V22",
  "M6.7 17.3 L4.9 19.1",
  "M2 12 H5",
  "M6.7 6.7 L4.9 4.9",
];
const RAY_STEP_SECONDS = 0.14;

function AgentRay({ path, index, isThinking, isSettled }: { path: string; index: number; isThinking: boolean; isSettled: boolean }) {
  return (
    <motion.path
      d={path}
      initial={false}
      animate={{ opacity: isThinking ? [1, 0.2, 0.2] : isSettled ? 0.55 : 1 }}
      transition={
        isThinking
          ? { duration: CLOCKWISE_RAYS.length * RAY_STEP_SECONDS, times: [0, 0.5, 1], repeat: Infinity, delay: index * RAY_STEP_SECONDS, ease: "linear" }
          : { duration: 0.6 }
      }
    />
  );
}

function AgentGlyph({ tone, storyBeat, isPlaying }: { tone: AgentTone; storyBeat: number; isPlaying: boolean }) {
  const isThinking = isPlaying && tone !== "done";
  const isCoreFilled = isPlaying ? tone === "done" || storyBeat % 2 === 0 : true;
  return (
    <svg viewBox="0 0 24 24" className="size-[46%]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" strokeLinejoin="miter">
      {CLOCKWISE_RAYS.map((path, index) => (
        <AgentRay key={path} path={path} index={index} isThinking={isThinking} isSettled={isPlaying && tone === "done"} />
      ))}
      <rect x={9} y={9} width={6} height={6} />
      <motion.rect
        x={10.6}
        y={10.6}
        width={2.8}
        height={2.8}
        stroke="none"
        fill="currentColor"
        initial={false}
        animate={{ opacity: isCoreFilled ? 1 : 0 }}
        transition={{ duration: 0.25, ease: "linear" }}
      />
    </svg>
  );
}

export function AgentCore({ tone, storyBeat, isPlaying }: { tone: AgentTone; storyBeat: number; isPlaying: boolean }) {
  return (
    <SceneObject
      x={AGENT_TILE.x}
      y={AGENT_TILE.y}
      width={AGENT_TILE.size}
      height={AGENT_TILE.size}
      className="grid place-items-center text-foreground transition-[box-shadow] duration-300"
      style={toneEdgeStyle(tone === "live" ? "live" : tone === "done" ? "idle" : "agent")}
    >
      <AgentGlyph tone={tone} storyBeat={storyBeat} isPlaying={isPlaying} />
    </SceneObject>
  );
}
