"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { LEAD_FLOW_RUN_SECONDS } from "../../_lib/lead-flow";
import type { LeadFlowPhase } from "../../_lib/lead-flow-geometry";

export function useLeadFlowRun() {
  const [phase, setPhase] = useState<LeadFlowPhase>("idle");
  const [runCount, setRunCount] = useState(0);
  const completionTimer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(completionTimer.current), []);

  const sendLead = useCallback(() => {
    if (phase === "running") return;
    window.clearTimeout(completionTimer.current);
    setRunCount((previousRunCount) => previousRunCount + 1);
    setPhase("running");
    completionTimer.current = window.setTimeout(
      () => setPhase("complete"),
      LEAD_FLOW_RUN_SECONDS * 1000
    );
  }, [phase]);

  return {
    phase,
    runCount,
    isRunning: phase === "running",
    sendLead,
  };
}
