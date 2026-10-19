"use client";

import { motion } from "motion/react";
import { SceneChip } from "../scene-parts";
import { SceneLoader } from "../scene-loader";
import { sceneUnits } from "../scene-units";
import { CHIP_COPY, CHIP_TOP, DRAFT_TOTAL, EASE_OUT_EXPO, type ChipIndicator, type StoryPhase } from "./agent-story";

const FIGURE_SPACE = "\u2007";

function BlinkingSquare({ className, isPlaying }: { className: string; isPlaying: boolean }) {
  return (
    <motion.span
      className={`block shrink-0 ${className}`}
      style={{ width: sceneUnits(7), height: sceneUnits(7) }}
      initial={false}
      animate={{ opacity: isPlaying ? [1, 0.25, 1] : 1 }}
      transition={isPlaying ? { duration: 0.9, repeat: Infinity, ease: "linear" } : { duration: 0.3 }}
    />
  );
}

function DoneCheck() {
  return (
    <svg viewBox="0 0 12 12" className="shrink-0 text-foreground" style={{ width: sceneUnits(11), height: sceneUnits(11) }}>
      <rect x={0.75} y={0.75} width={10.5} height={10.5} fill="none" stroke="currentColor" strokeWidth={1.2} />
      <path d="M3.2 6.2 L5.2 8.1 L8.8 4" fill="none" stroke="currentColor" strokeWidth={1.4} strokeLinecap="square" strokeLinejoin="miter" />
    </svg>
  );
}

function ChipIndicatorMark({ indicator, isPlaying }: { indicator: ChipIndicator; isPlaying: boolean }) {
  if (indicator === "loader") return <SceneLoader isPlaying={isPlaying} />;
  if (indicator === "waiting") return <BlinkingSquare className="bg-accent" isPlaying={isPlaying} />;
  if (indicator === "live") return <BlinkingSquare className="bg-primary" isPlaying={isPlaying} />;
  return <DoneCheck />;
}

function DraftCounter({ draftCount }: { draftCount: number }) {
  return (
    <span className="tabular-nums text-primary">
      {String(draftCount).padStart(2, FIGURE_SPACE)} / {DRAFT_TOTAL}
    </span>
  );
}

export function AgentStatusChip({ phase, draftCount, isPlaying }: { phase: StoryPhase; draftCount: number; isPlaying: boolean }) {
  const copy = CHIP_COPY[phase];
  return (
    <SceneChip centerX={320} y={CHIP_TOP}>
      <motion.span
        key={phase}
        className="flex items-center"
        style={{ gap: sceneUnits(8) }}
        initial={isPlaying ? { opacity: 0, y: 4 } : false}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE_OUT_EXPO }}
      >
        <ChipIndicatorMark indicator={copy.indicator} isPlaying={isPlaying} />
        <span className={phase === "approval" ? "text-accent" : "text-foreground"}>{copy.lead}</span>
        {copy.detail ? <span>{copy.detail}</span> : null}
        {copy.showsDraftCount ? <DraftCounter draftCount={draftCount} /> : null}
      </motion.span>
    </SceneChip>
  );
}
