"use client";

import { useRef } from "react";
import type { BlueprintFraming } from "../blueprint-canvas";
import { BlueprintLabel } from "../blueprint-label";
import { BlueprintSheet } from "../blueprint-sheet";
import { useBlueprintPlayback, useStepCounter } from "../use-blueprint-playback";
import { ACT_NODE_RIGHT_EDGE, AgentLoop, PLAN_NODE_LEFT_EDGE } from "./agent-loop";
import { AgentOutputStack } from "./agent-output-stack";
import { AgentPlanPanel, RUNNING_STEP_ANCHOR } from "./agent-plan-panel";
import { ACT_STAGE_INDEX, AGENT_LOOP_STAGES, FIRST_SHOWN_QUOTE, TOTAL_QUOTES } from "./agent-run-data";
import { AgentToolRail } from "./agent-tool-rail";
import { AgentTrace } from "./agent-trace";

export const AI_ENABLEMENT_FOCUS_FRAMING: BlueprintFraming = { x: 510, y: 180, width: 1040 };

const LOOP_STAGE_DURATION_MILLISECONDS = 1100;
const QUOTES_CYCLE_LENGTH = TOTAL_QUOTES - FIRST_SHOWN_QUOTE + 1;

function PlanToLoopLink() {
  return (
    <path
      d={`M ${RUNNING_STEP_ANCHOR.x} ${RUNNING_STEP_ANCHOR.y} C ${RUNNING_STEP_ANCHOR.x + 60} ${RUNNING_STEP_ANCHOR.y}, 600 ${PLAN_NODE_LEFT_EDGE.y - 40}, ${PLAN_NODE_LEFT_EDGE.x} ${PLAN_NODE_LEFT_EDGE.y}`}
      fill="none"
      strokeWidth={1.25}
      strokeDasharray="4 4"
      className="stroke-primary"
    />
  );
}

type AiEnablementBlueprintProps = { framing: BlueprintFraming; label: string; isActive?: boolean };

export function AiEnablementBlueprint({ framing, label, isActive = true }: AiEnablementBlueprintProps) {
  const playbackReference = useRef<HTMLDivElement>(null);
  const { isPlaying } = useBlueprintPlayback(playbackReference, isActive);
  const completedStages = useStepCounter(isPlaying, LOOP_STAGE_DURATION_MILLISECONDS);
  const stagesSinceStart = completedStages + ACT_STAGE_INDEX;
  const activeStageIndex = stagesSinceStart % AGENT_LOOP_STAGES.length;
  const completedLoops = Math.floor(stagesSinceStart / AGENT_LOOP_STAGES.length);
  const quotesWritten = FIRST_SHOWN_QUOTE + (completedLoops % QUOTES_CYCLE_LENGTH);

  return (
    <div ref={playbackReference} className="size-full">
      <BlueprintSheet
        title="AI ENABLEMENT"
        sheetNumber="01 / 04"
        label={label}
        framing={framing}
        drawing={
          <>
            <BlueprintLabel x={96} y={120} tone="line">
              AGENT RUN 23  ·  WORKING ON ITS OWN
            </BlueprintLabel>
            <BlueprintLabel x={96} y={142}>
              6 STEPS  ·  6 TOOLS  ·  1 APPROVAL  ·  0 HANDOFFS
            </BlueprintLabel>
            <PlanToLoopLink />
            <AgentPlanPanel quotesWritten={quotesWritten} />
            <AgentLoop activeStageIndex={activeStageIndex} />
            <AgentToolRail
              connectorOrigin={ACT_NODE_RIGHT_EDGE}
              isWriting={activeStageIndex === ACT_STAGE_INDEX}
              quotesWritten={quotesWritten}
            />
            <AgentOutputStack quotesWritten={quotesWritten} />
            <AgentTrace quotesWritten={quotesWritten} />
          </>
        }
      />
    </div>
  );
}
