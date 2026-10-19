"use client";

import { useRef } from "react";
import { BLUEPRINT_CANVAS, type BlueprintFraming } from "../blueprint-canvas";
import { BlueprintLabel } from "../blueprint-label";
import { BlueprintSheet } from "../blueprint-sheet";
import { useBlueprintPlayback, useStepCounter } from "../use-blueprint-playback";
import { FIRST_SHOWN_RUN_NUMBER, WORKFLOW_NODES, WORKFLOW_PLANE } from "./workflow-data";
import { WorkflowEdges, WorkflowRetryPath } from "./workflow-edges";
import { WorkflowNodeCard } from "./workflow-node-card";
import { WorkflowPacket } from "./workflow-packet";
import { WorkflowSwimlanes } from "./workflow-swimlanes";
import { WorkflowPayloadInspector, WorkflowRunStats } from "./workflow-telemetry";

export const SYSTEMS_AUTOMATIONS_FOCUS_FRAMING: BlueprintFraming = { x: 205, y: 282, width: 1110 };

const PACKET_TRAVEL_MILLISECONDS = 1800;
const PLANE_TILT = "rotateX(36deg) rotateZ(-3deg) scale(0.74)";
const PLANE_LEFT = (BLUEPRINT_CANVAS.width - WORKFLOW_PLANE.width) / 2 - 60;
const PLANE_TOP = 160;
const STATIC_ELAPSED_SECONDS = 1.8;

function TiltedWorkflowPlane({ isPlaying }: { isPlaying: boolean }) {
  return (
    <div
      className="absolute transform-3d"
      style={{ left: PLANE_LEFT, top: PLANE_TOP, width: WORKFLOW_PLANE.width, height: WORKFLOW_PLANE.height, transform: PLANE_TILT }}
    >
      <svg
        viewBox={`0 0 ${WORKFLOW_PLANE.width} ${WORKFLOW_PLANE.height}`}
        width={WORKFLOW_PLANE.width}
        height={WORKFLOW_PLANE.height}
        overflow="visible"
        className="absolute inset-0"
      >
        <WorkflowSwimlanes />
        <WorkflowEdges />
        <WorkflowRetryPath />
        {WORKFLOW_NODES.map((node) => (
          <WorkflowNodeCard key={node.id} node={node} />
        ))}
        <WorkflowPacket isPlaying={isPlaying} travelDurationMilliseconds={PACKET_TRAVEL_MILLISECONDS} />
      </svg>
    </div>
  );
}

type SystemsAutomationsBlueprintProps = { framing: BlueprintFraming; label: string; isActive?: boolean };

export function SystemsAutomationsBlueprint({ framing, label, isActive = true }: SystemsAutomationsBlueprintProps) {
  const playbackReference = useRef<HTMLDivElement>(null);
  const { isPlaying } = useBlueprintPlayback(playbackReference, isActive);
  const completedRuns = useStepCounter(isPlaying, PACKET_TRAVEL_MILLISECONDS);
  const elapsedSeconds = STATIC_ELAPSED_SECONDS + (completedRuns % 5) * 0.1;

  return (
    <div ref={playbackReference} className="size-full">
      <BlueprintSheet
        title="SYSTEMS & AUTOMATIONS"
        sheetNumber="02 / 04"
        label={label}
        framing={framing}
        drawing={
          <>
            <BlueprintLabel x={96} y={120} tone="line">
              WORKFLOW 07  ·  RUNS ON ITS OWN
            </BlueprintLabel>
            <BlueprintLabel x={96} y={142}>
              SIX TOOLS, ONE PROCESS  ·  NO COPY AND PASTE
            </BlueprintLabel>
            <WorkflowRunStats runsToday={FIRST_SHOWN_RUN_NUMBER + completedRuns} />
          </>
        }
        spatialLayer={<TiltedWorkflowPlane isPlaying={isPlaying} />}
        foreground={<WorkflowPayloadInspector runNumber={FIRST_SHOWN_RUN_NUMBER + completedRuns} elapsedSeconds={elapsedSeconds} />}
      />
    </div>
  );
}
