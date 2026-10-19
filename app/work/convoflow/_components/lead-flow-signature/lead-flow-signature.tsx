"use client";

import { Button } from "@/components/ui/button";
import { leadFlowStatusCopy, leadFlowStepsForScreenReaders } from "../../_lib/lead-flow";
import { LeadFlowDiagram } from "./lead-flow-diagram";
import { useLeadFlowRun } from "./use-lead-flow-run";

const sendButtonLabels = {
  idle: "Send a lead",
  running: "Sending",
  complete: "Send another lead",
};

export function LeadFlowSignature() {
  const { phase, runCount, isRunning, sendLead } = useLeadFlowRun();

  return (
    <div className="convoflow-square-grid border border-case-rule">
      <div className="flex flex-col gap-5 px-4 pt-8 sm:flex-row sm:items-center sm:gap-6 sm:px-8 lg:pt-10">
        <Button
          type="button"
          size="lg"
          width="fullOnMobile"
          onClick={sendLead}
          aria-disabled={isRunning}
          className="aria-disabled:cursor-progress"
        >
          {sendButtonLabels[phase]}
        </Button>
        <p role="status" className="min-h-12 text-case-ink-soft sm:min-h-0">
          {leadFlowStatusCopy[phase]}
        </p>
      </div>
      <ol className="sr-only">
        {leadFlowStepsForScreenReaders.map((step) => (
          <li key={step}>{step}</li>
        ))}
      </ol>
      <div aria-hidden className="px-4 pt-14 pb-12 sm:px-8 lg:pt-16 lg:pb-16">
        <div className="hidden xl:block">
          <LeadFlowDiagram key={`wide-${runCount}`} layoutName="wide" phase={phase} />
        </div>
        <div className="xl:hidden">
          <LeadFlowDiagram key={`upright-${runCount}`} layoutName="upright" phase={phase} />
        </div>
      </div>
    </div>
  );
}
