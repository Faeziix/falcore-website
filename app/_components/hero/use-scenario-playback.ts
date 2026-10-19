"use client";

import { useCallback, useEffect, useState } from "react";
import { OPERATION_SCENARIOS } from "@/app/_lib/operation-scenarios";

const STEP_INTERVAL_MS = 1300;
const HOLD_AFTER_SCENARIO_MS = 3600;
const START_DELAY_MS = 900;

export function useScenarioPlayback({
  isPlaying,
  prefersReducedMotion,
}: {
  isPlaying: boolean;
  prefersReducedMotion: boolean;
}) {
  const [scenarioIndex, setScenarioIndex] = useState(0);
  const [completedStepCount, setCompletedStepCount] = useState(
    prefersReducedMotion ? OPERATION_SCENARIOS[0].steps.length : 0
  );
  const [hasStarted, setHasStarted] = useState(false);

  const scenario = OPERATION_SCENARIOS[scenarioIndex];
  const isScenarioComplete = completedStepCount >= scenario.steps.length;

  useEffect(() => {
    if (!isPlaying || prefersReducedMotion) return;

    const delay = !hasStarted
      ? START_DELAY_MS
      : isScenarioComplete
        ? HOLD_AFTER_SCENARIO_MS
        : STEP_INTERVAL_MS;

    const timer = window.setTimeout(() => {
      setHasStarted(true);
      if (isScenarioComplete) {
        setScenarioIndex((index) => (index + 1) % OPERATION_SCENARIOS.length);
        setCompletedStepCount(1);
        return;
      }
      setCompletedStepCount((count) => count + 1);
    }, delay);

    return () => window.clearTimeout(timer);
  }, [
    isPlaying,
    prefersReducedMotion,
    hasStarted,
    isScenarioComplete,
    completedStepCount,
  ]);

  const selectScenario = useCallback(
    (index: number) => {
      setHasStarted(true);
      setScenarioIndex(index);
      setCompletedStepCount(
        prefersReducedMotion ? OPERATION_SCENARIOS[index].steps.length : 1
      );
    },
    [prefersReducedMotion]
  );

  return {
    scenario,
    scenarioIndex,
    completedStepCount,
    selectScenario,
  };
}
