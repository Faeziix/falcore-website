"use client";

import { motion } from "motion/react";
import { SCENE_HEIGHT, SCENE_WIDTH, sceneUnits, type ScenePoint } from "../scene-units";
import { APPS, JUNCTION, JUNCTION_SIZE, PORT_SIZE, WIRE_KEYS, WIRE_ROUTES, pointsToPath, type WireKey } from "./workflow-layout";
import { WorkflowPulse } from "./workflow-pulse";
import { EXPO_OUT } from "./workflow-story";

const BRANCH_WIRES: WireKey[] = ["router", "crm", "calendar", "email"];

function SquarePort({ point, isLive }: { point: ScenePoint; isLive: boolean }) {
  return (
    <rect
      x={point.x - PORT_SIZE / 2}
      y={point.y - PORT_SIZE / 2}
      width={PORT_SIZE}
      height={PORT_SIZE}
      className={isLive ? "fill-primary" : "fill-border-strong"}
      style={{ transition: "fill 300ms" }}
    />
  );
}

function LiveWireOverlay({ wireKey, isLive }: { wireKey: WireKey; isLive: boolean }) {
  return (
    <motion.path
      d={pointsToPath(WIRE_ROUTES[wireKey])}
      className="fill-none stroke-primary"
      strokeWidth={1.6}
      strokeLinecap="square"
      strokeLinejoin="miter"
      initial={false}
      animate={isLive ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 }}
      transition={
        isLive
          ? { pathLength: { duration: 0.7, ease: EXPO_OUT }, opacity: { duration: 0.1 } }
          : { opacity: { duration: 0.45, ease: EXPO_OUT }, pathLength: { delay: 0.45, duration: 0 } }
      }
    />
  );
}

type WorkflowWiresProps = { liveWire: WireKey | null; hasTravellingPulse: boolean; isPlaying: boolean };

export function WorkflowWires({ liveWire, hasTravellingPulse, isPlaying }: WorkflowWiresProps) {
  const isJunctionLive = liveWire !== null && BRANCH_WIRES.includes(liveWire);
  return (
    <svg
      viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`}
      preserveAspectRatio="none"
      className="absolute top-0 left-0 overflow-visible"
      style={{ width: sceneUnits(SCENE_WIDTH), height: sceneUnits(SCENE_HEIGHT) }}
    >
      {WIRE_KEYS.map((wireKey) => (
        <path key={wireKey} d={pointsToPath(WIRE_ROUTES[wireKey])} className="fill-none stroke-border" strokeWidth={1.2} strokeLinecap="square" strokeLinejoin="miter" />
      ))}
      {WIRE_KEYS.map((wireKey) => (
        <LiveWireOverlay key={wireKey} wireKey={wireKey} isLive={liveWire === wireKey} />
      ))}
      <SquarePort point={WIRE_ROUTES.intake[0]} isLive={liveWire === "intake"} />
      {APPS.map((app) => (
        <SquarePort key={app.key} point={WIRE_ROUTES[app.key][WIRE_ROUTES[app.key].length - 1]} isLive={liveWire === app.key} />
      ))}
      <rect
        x={JUNCTION.x - JUNCTION_SIZE / 2}
        y={JUNCTION.y - JUNCTION_SIZE / 2}
        width={JUNCTION_SIZE}
        height={JUNCTION_SIZE}
        strokeWidth={1.2}
        className={isJunctionLive ? "fill-background stroke-primary" : "fill-background stroke-border-strong"}
        style={{ transition: "stroke 300ms" }}
      />
      <WorkflowPulse route={liveWire} isTravelling={hasTravellingPulse} isPlaying={isPlaying} />
    </svg>
  );
}
