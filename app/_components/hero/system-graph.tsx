"use client";

import { useEffect, useRef } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import {
  SYSTEM_CANVAS,
  SYSTEM_CONNECTIONS,
  SYSTEM_NODES,
  buildConnectionPath,
  type OperationScenario,
} from "@/app/_lib/operation-scenarios";
import { SystemNodeChip, type SystemNodeState } from "./system-node-chip";

const HOP_DURATION_SECONDS = 0.8;

function TravellingSignal({
  pathDefinition,
  shouldAnimate,
}: {
  pathDefinition: string;
  shouldAnimate: boolean;
}) {
  const pathReference = useRef<SVGPathElement>(null);
  const signalX = useMotionValue(0);
  const signalY = useMotionValue(0);

  useEffect(() => {
    const pathElement = pathReference.current;
    if (!pathElement) return;
    const totalLength = pathElement.getTotalLength();
    const placeSignalAt = (progress: number) => {
      const point = pathElement.getPointAtLength(progress * totalLength);
      signalX.set(point.x);
      signalY.set(point.y);
    };

    if (!shouldAnimate) {
      placeSignalAt(1);
      return;
    }

    const controls = animate(0, 1, {
      duration: HOP_DURATION_SECONDS,
      ease: [0.65, 0, 0.35, 1],
      onUpdate: placeSignalAt,
    });
    return () => controls.stop();
  }, [pathDefinition, shouldAnimate, signalX, signalY]);

  return (
    <>
      <motion.path
        ref={pathReference}
        d={pathDefinition}
        fill="none"
        stroke="var(--primary)"
        strokeWidth={1.5}
        vectorEffect="non-scaling-stroke"
        initial={{ pathLength: shouldAnimate ? 0 : 1 }}
        animate={{ pathLength: 1 }}
        transition={{
          duration: shouldAnimate ? HOP_DURATION_SECONDS : 0,
          ease: [0.65, 0, 0.35, 1],
        }}
      />
      <motion.rect
        width={8}
        height={8}
        x={-4}
        y={-4}
        fill="var(--primary)"
        style={{ translateX: signalX, translateY: signalY }}
      />
    </>
  );
}

export function SystemGraph({
  scenario,
  completedStepCount,
  shouldAnimate,
}: {
  scenario: OperationScenario;
  completedStepCount: number;
  shouldAnimate: boolean;
}) {
  const reachedSteps = scenario.steps.slice(0, completedStepCount);
  const activeStep = reachedSteps.at(-1);
  const visitedNodeIds = new Set(reachedSteps.map((step) => step.nodeId));
  const travelledHops = reachedSteps
    .slice(1)
    .map((step, index) => ({
      from: reachedSteps[index].nodeId,
      to: step.nodeId,
    }));
  const latestHop = travelledHops.at(-1);
  const earlierHops = travelledHops.slice(0, -1);

  const resolveNodeState = (nodeId: string): SystemNodeState => {
    if (activeStep?.nodeId === nodeId) return "active";
    if (visitedNodeIds.has(nodeId as never)) return "visited";
    return "idle";
  };

  return (
    <div
      className="relative w-full"
      style={{
        aspectRatio: `${SYSTEM_CANVAS.width} / ${SYSTEM_CANVAS.height}`,
      }}
    >
      <svg
        aria-hidden
        viewBox={`0 0 ${SYSTEM_CANVAS.width} ${SYSTEM_CANVAS.height}`}
        className="absolute inset-0 size-full"
      >
        {SYSTEM_CONNECTIONS.map(([fromId, toId]) => (
          <path
            key={`${fromId}-${toId}`}
            d={buildConnectionPath(fromId, toId)}
            fill="none"
            stroke="var(--border-strong)"
            strokeWidth={1}
            strokeDasharray="3 5"
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {earlierHops.map((hop) => (
          <path
            key={`${scenario.id}-${hop.from}-${hop.to}`}
            d={buildConnectionPath(hop.from, hop.to)}
            fill="none"
            stroke="var(--accent)"
            strokeOpacity={0.6}
            strokeWidth={1.25}
            vectorEffect="non-scaling-stroke"
          />
        ))}
        {latestHop && (
          <TravellingSignal
            key={`${scenario.id}-${completedStepCount}`}
            pathDefinition={buildConnectionPath(latestHop.from, latestHop.to)}
            shouldAnimate={shouldAnimate}
          />
        )}
      </svg>
      {SYSTEM_NODES.map((node) => (
        <SystemNodeChip
          key={node.id}
          node={node}
          state={resolveNodeState(node.id)}
        />
      ))}
    </div>
  );
}
