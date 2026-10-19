"use client";

import { useRef } from "react";
import { motion } from "motion/react";
import { BLUEPRINT_CANVAS, type BlueprintFraming } from "../blueprint-canvas";
import { BlueprintLabel } from "../blueprint-label";
import { BlueprintSheet } from "../blueprint-sheet";
import { useBlueprintPlayback } from "../use-blueprint-playback";
import { LAYER_GAP, LAYER_PLANE } from "./application-layers";
import { ChannelDonut, DashboardChrome, KpiTiles, LatestOrdersTable, ThroughputChart } from "./dashboard-widgets";
import { DataLayer, LogicLayer } from "./data-and-logic-layers";
import { LayerPlane } from "./layer-plane";

export const CUSTOM_WEB_APPLICATIONS_FOCUS_FRAMING: BlueprintFraming = { x: 420, y: 40, width: 1120 };

const STACK_LEFT = (BLUEPRINT_CANVAS.width - LAYER_PLANE.width) / 2 + 60;
const STACK_TOP = 130;
const STACK_TILT = "rotateX(56deg) rotateZ(-30deg) scale(0.66) translateZ(-150px)";
const LAYER_BREATHING_SECONDS = 6;

function CornerPillars() {
  const corners = [
    [0, 0],
    [LAYER_PLANE.width, 0],
    [LAYER_PLANE.width, LAYER_PLANE.height],
    [0, LAYER_PLANE.height],
  ];
  return (
    <>
      {corners.map(([left, top]) => (
        <div
          key={`${left}-${top}`}
          className="absolute w-0 origin-top-left -rotate-x-90 border-l border-dashed border-border-strong"
          style={{ left, top, height: LAYER_GAP * 2 }}
        />
      ))}
    </>
  );
}

function FloatingLayer({ restingLift, breathingLift, isPlaying, children }: { restingLift: number; breathingLift: number; isPlaying: boolean; children: React.ReactNode }) {
  return (
    <motion.div
      className="absolute inset-0 transform-3d"
      initial={false}
      animate={{ z: isPlaying ? [restingLift, restingLift + breathingLift, restingLift] : restingLift }}
      transition={isPlaying ? { duration: LAYER_BREATHING_SECONDS, repeat: Infinity, ease: "easeInOut" } : { duration: 0 }}
    >
      {children}
    </motion.div>
  );
}

function ApplicationLayerStack({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div
      className="absolute transform-3d"
      style={{ left: STACK_LEFT, top: STACK_TOP, width: LAYER_PLANE.width, height: LAYER_PLANE.height, transform: STACK_TILT }}
    >
      <CornerPillars />
      <FloatingLayer restingLift={0} breathingLift={0} isPlaying={isPlaying}>
        <DataLayer />
      </FloatingLayer>
      <FloatingLayer restingLift={LAYER_GAP} breathingLift={14} isPlaying={isPlaying}>
        <LogicLayer />
      </FloatingLayer>
      <FloatingLayer restingLift={LAYER_GAP * 2} breathingLift={32} isPlaying={isPlaying}>
        <LayerPlane label="INTERFACE" tone="line">
          <DashboardChrome />
          <KpiTiles />
          <ThroughputChart isPlaying={isPlaying} />
          <ChannelDonut />
          <LatestOrdersTable />
        </LayerPlane>
      </FloatingLayer>
    </div>
  );
}

type CustomWebApplicationsBlueprintProps = { framing: BlueprintFraming; label: string; isActive?: boolean };

export function CustomWebApplicationsBlueprint({ framing, label, isActive = true }: CustomWebApplicationsBlueprintProps) {
  const playbackReference = useRef<HTMLDivElement>(null);
  const { isPlaying } = useBlueprintPlayback(playbackReference, isActive);

  return (
    <div ref={playbackReference} className="size-full">
      <BlueprintSheet
        title="CUSTOM WEB APPLICATIONS"
        sheetNumber="04 / 04"
        label={label}
        framing={framing}
        drawing={
          <>
            <BlueprintLabel x={96} y={120} tone="line">
              BUILT AROUND HOW YOU WORK
            </BlueprintLabel>
            <BlueprintLabel x={96} y={142}>
              3 LAYERS  ·  ONE SOURCE OF TRUTH
            </BlueprintLabel>
          </>
        }
        spatialLayer={<ApplicationLayerStack isPlaying={isPlaying} />}
      />
    </div>
  );
}
