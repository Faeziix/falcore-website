"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import type { OperationScenario } from "@/app/_lib/operation-scenarios";

export function OperationsLog({
  scenario,
  completedStepCount,
  shouldAnimate,
}: {
  scenario: OperationScenario;
  completedStepCount: number;
  shouldAnimate: boolean;
}) {
  return (
    <ol
      aria-live="polite"
      className="divide-y divide-border/70 border-t border-border"
    >
      {scenario.steps.map((step, index) => {
        const isReached = index < completedStepCount;
        const isLatest = index === completedStepCount - 1;

        return (
          <li
            key={`${scenario.id}-${index}`}
            className="flex min-h-11 items-baseline gap-3 px-4 py-2.5 sm:gap-5 sm:px-5"
          >
            <span
              className={cn(
                "font-mono text-[0.6875rem] tabular-nums transition-colors duration-500 sm:text-xs",
                isLatest ? "text-primary" : "text-muted-foreground/70"
              )}
            >
              {step.time}
            </span>
            <AnimatePresence mode="wait" initial={false}>
              {isReached ? (
                <motion.span
                  key="message"
                  initial={shouldAnimate ? { opacity: 0, x: -8 } : false}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                  className={cn(
                    "text-[0.8125rem] leading-snug sm:text-sm",
                    isLatest ? "text-foreground" : "text-foreground-soft/80"
                  )}
                >
                  {step.message}
                </motion.span>
              ) : (
                <span
                  key="placeholder"
                  aria-hidden
                  className="h-px flex-1 self-center bg-border/60"
                />
              )}
            </AnimatePresence>
          </li>
        );
      })}
    </ol>
  );
}
