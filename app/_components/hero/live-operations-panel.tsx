"use client";

import { useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";
import { OPERATION_SCENARIOS } from "@/app/_lib/operation-scenarios";
import { SystemGraph } from "./system-graph";
import { OperationsLog } from "./operations-log";
import { useScenarioPlayback } from "./use-scenario-playback";

export function LiveOperationsPanel() {
  const panelReference = useRef<HTMLDivElement>(null);
  const isPanelVisible = useInView(panelReference, { amount: 0.3 });
  const { scenario, scenarioIndex, completedStepCount, selectScenario } =
    useScenarioPlayback({
      isPlaying: isPanelVisible,
    });

  return (
    <figure
      ref={panelReference}
      className="border border-border bg-surface"
      aria-label="Example of an automated business system handling a request"
    >
      <div className="flex flex-col gap-3 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5">
        <p className="flex items-center gap-2.5 text-sm text-foreground-soft">
          <span aria-hidden className="relative size-1.5 bg-primary">
            <span className="absolute inset-0 animate-signal-pulse bg-primary" />
          </span>
          What happens when there&apos;s…
        </p>
        <div
          role="group"
          aria-label="Choose a scenario"
          className="flex flex-wrap gap-1"
        >
          {OPERATION_SCENARIOS.map((option, index) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={index === scenarioIndex}
              onClick={() => selectScenario(index)}
              className={cn(
                "shrink-0 border px-3 py-1.5 text-[0.8125rem] whitespace-nowrap transition-colors duration-300",
                index === scenarioIndex
                  ? "border-foreground/80 text-foreground"
                  : "border-transparent text-muted-foreground hover:text-foreground"
              )}
            >
              {option.label.toLowerCase()}
            </button>
          ))}
        </div>
      </div>

      <div className="hairline-grid bg-background/40 px-3 py-6 [background-position:-1px_-1px] sm:px-6 sm:py-8">
        <SystemGraph
          scenario={scenario}
          completedStepCount={completedStepCount}
          shouldAnimate
        />
      </div>

      <OperationsLog
        scenario={scenario}
        completedStepCount={completedStepCount}
        shouldAnimate
      />

      <figcaption className="border-t border-border px-4 py-3 text-xs text-muted-foreground sm:px-5">
        A simplified example of the kind of system I build. Pick a
        scenario to watch it run.
      </figcaption>
    </figure>
  );
}
