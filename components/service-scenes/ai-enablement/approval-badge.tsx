"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { sceneUnits } from "../scene-units";
import { APPROVAL_BADGE, EASE_OUT_EXPO, type StoryPhase } from "./agent-story";

type ApprovalState = "hidden" | "waiting" | "approved";

const APPROVED_PHASES: StoryPhase[] = ["sending", "calendar", "done"];

function approvalState(phase: StoryPhase): ApprovalState {
  if (phase === "approval") return "waiting";
  return APPROVED_PHASES.includes(phase) ? "approved" : "hidden";
}

export function ApprovalBadge({ phase, isPlaying }: { phase: StoryPhase; isPlaying: boolean }) {
  const state = approvalState(phase);
  const isWaiting = state === "waiting" && isPlaying;
  return (
    <motion.div
      className={cn(
        "absolute grid place-items-center transition-colors duration-300",
        state === "approved" ? "bg-accent text-accent-foreground" : "bg-scene-inset text-accent",
      )}
      style={{
        left: sceneUnits(APPROVAL_BADGE.x),
        top: sceneUnits(APPROVAL_BADGE.y),
        width: sceneUnits(APPROVAL_BADGE.size),
        height: sceneUnits(APPROVAL_BADGE.size),
        boxShadow: `0 0 0 ${sceneUnits(1.2)} var(--accent), 0 ${sceneUnits(6)} ${sceneUnits(14)} var(--scene-object-shadow)`,
      }}
      initial={false}
      animate={{ opacity: state === "hidden" ? 0 : isWaiting ? [1, 0.45, 1] : 1, y: state === "hidden" ? -4 : 0 }}
      transition={
        isWaiting
          ? { opacity: { duration: 0.9, repeat: Infinity, ease: "linear" }, y: { duration: 0.5, ease: EASE_OUT_EXPO } }
          : { duration: 0.5, ease: EASE_OUT_EXPO }
      }
    >
      <svg viewBox="0 0 12 12" className="size-[70%]" fill="none" stroke="currentColor" strokeWidth={1.6} strokeLinecap="square" strokeLinejoin="miter">
        <motion.path
          d="M2.6 6.2 L5 8.5 L9.4 3.6"
          initial={false}
          animate={state === "approved" ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
          transition={{ duration: 0.45, ease: EASE_OUT_EXPO }}
        />
      </svg>
    </motion.div>
  );
}
