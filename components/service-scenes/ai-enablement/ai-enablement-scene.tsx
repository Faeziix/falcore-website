"use client";

import { SceneStage } from "../scene-stage";
import { useScenePlayback } from "../use-scene-playback";
import { TOOLS, agentTone, toolTone } from "./agent-story";
import { AgentCore } from "./agent-core";
import { AgentStatusChip } from "./agent-status-chip";
import { AgentWires } from "./agent-wires";
import { ApprovalBadge } from "./approval-badge";
import { QuoteStack } from "./quote-stack";
import { TaskIntake } from "./task-intake";
import { ToolTile } from "./tool-tile";
import { useAgentStory } from "./use-agent-story";

export type ServiceSceneProps = { label: string; isActive?: boolean };

export function AiEnablementScene({ label, isActive = true }: ServiceSceneProps) {
  const { sceneReference, isPlaying } = useScenePlayback(isActive);
  const { storyBeat, phase, draftCount, quoteSheets } = useAgentStory(isPlaying);
  return (
    <div ref={sceneReference} className="size-full">
      <SceneStage label={label} figure="FIG 01 · AGENT">
        <AgentWires phase={phase} isPlaying={isPlaying} />
        <TaskIntake phase={phase} />
        {TOOLS.map((tool) => (
          <ToolTile key={tool.name} tool={tool} tone={toolTone(tool, phase)} isPlaying={isPlaying} />
        ))}
        <QuoteStack sheetCount={quoteSheets} isPlaying={isPlaying} />
        <ApprovalBadge phase={phase} isPlaying={isPlaying} />
        <AgentCore tone={agentTone(phase)} storyBeat={storyBeat} isPlaying={isPlaying} />
        <AgentStatusChip phase={phase} draftCount={draftCount} isPlaying={isPlaying} />
      </SceneStage>
    </div>
  );
}
