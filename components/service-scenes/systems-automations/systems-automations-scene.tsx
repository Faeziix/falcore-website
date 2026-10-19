"use client";

import { SceneStage } from "../scene-stage";
import { useScenePlayback } from "../use-scene-playback";
import { AppCard } from "./app-card";
import { EnquiryForm } from "./enquiry-form";
import { RouterChip } from "./router-chip";
import { RunCounter } from "./run-counter";
import { useWorkflowClock } from "./use-workflow-clock";
import { APPS } from "./workflow-layout";
import { WORKFLOW_STORY } from "./workflow-story";
import { WorkflowWires } from "./workflow-wires";

export type ServiceSceneProps = { label: string; isActive?: boolean };

export function SystemsAutomationsScene({ label, isActive = true }: ServiceSceneProps) {
  const { sceneReference, isPlaying } = useScenePlayback(isActive);
  const { beat, runNumber } = useWorkflowClock(isPlaying);
  const step = WORKFLOW_STORY[beat];

  return (
    <div ref={sceneReference} className="size-full">
      <SceneStage label={label} figure="FIG 02 · WORKFLOW">
        <WorkflowWires liveWire={step.liveWire} hasTravellingPulse={step.hasTravellingPulse} isPlaying={isPlaying} />
        <EnquiryForm
          filledFieldCount={step.filledFieldCount}
          typingFieldIndex={step.typingFieldIndex}
          isSubmitting={step.isSubmitting}
          isPlaying={isPlaying}
        />
        <RunCounter runNumber={runNumber} apps={step.apps} isRunComplete={step.isRunComplete} />
        {APPS.map((app) => (
          <AppCard key={app.key} label={app.label} doneText={app.doneText} portY={app.portY} state={step.apps[app.key]} />
        ))}
        <RouterChip status={step.router} isPlaying={isPlaying} />
      </SceneStage>
    </div>
  );
}
