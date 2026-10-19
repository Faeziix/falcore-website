"use client";

import { useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { sceneUnits } from "../scene-units";
import { SYNC_PULSE_PERIOD_MILLISECONDS, SYNC_WIRE_POINTS } from "./custom-web-applications-story";
import { ScenePlaneSvg } from "./scene-plane";
import { stagePercentX, stagePercentY } from "./stage-percent";

const SYNC_WIRE_PATH = SYNC_WIRE_POINTS.map((point, pointIndex) => `${pointIndex === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
const ELBOW_POINT = SYNC_WIRE_POINTS[1];
const PULSE_SIZE = 5;
const ELBOW_NODE_SIZE = 5;

const segmentLengths = SYNC_WIRE_POINTS.slice(1).map((point, segmentIndex) => {
  const segmentStart = SYNC_WIRE_POINTS[segmentIndex];
  return Math.abs(point.x - segmentStart.x) + Math.abs(point.y - segmentStart.y);
});
const totalWireLength = segmentLengths.reduce((sum, length) => sum + length, 0);

function pointAlongWire(progress: number) {
  let remainingLength = progress * totalWireLength;
  for (let segmentIndex = 0; segmentIndex < segmentLengths.length; segmentIndex++) {
    const segmentLength = segmentLengths[segmentIndex];
    const segmentStart = SYNC_WIRE_POINTS[segmentIndex];
    const segmentEnd = SYNC_WIRE_POINTS[segmentIndex + 1];
    if (remainingLength <= segmentLength) {
      const segmentProgress = remainingLength / segmentLength;
      return { x: segmentStart.x + (segmentEnd.x - segmentStart.x) * segmentProgress, y: segmentStart.y + (segmentEnd.y - segmentStart.y) * segmentProgress };
    }
    remainingLength -= segmentLength;
  }
  return SYNC_WIRE_POINTS[SYNC_WIRE_POINTS.length - 1];
}

const easeInOutCubic = (progress: number) => (progress < 0.5 ? 4 * progress ** 3 : 1 - (-2 * progress + 2) ** 3 / 2);

export function SyncWire({ isPulsing }: { isPulsing: boolean }) {
  const pulseReference = useRef<HTMLSpanElement>(null);

  useAnimationFrame((elapsedMilliseconds) => {
    const pulse = pulseReference.current;
    if (!pulse) return;
    if (!isPulsing) {
      pulse.style.opacity = "0";
      return;
    }
    const cycleProgress = (elapsedMilliseconds % SYNC_PULSE_PERIOD_MILLISECONDS) / SYNC_PULSE_PERIOD_MILLISECONDS;
    const pulsePoint = pointAlongWire(easeInOutCubic(cycleProgress));
    pulse.style.left = stagePercentX(pulsePoint.x);
    pulse.style.top = stagePercentY(pulsePoint.y);
    pulse.style.opacity = cycleProgress > 0.92 ? "0" : "1";
  });

  return (
    <>
      <ScenePlaneSvg>
        <path d={SYNC_WIRE_PATH} fill="none" className="stroke-border-strong" strokeWidth={1} strokeLinecap="square" strokeLinejoin="miter" />
      </ScenePlaneSvg>
      <span
        className="absolute bg-border-strong"
        style={{
          left: sceneUnits(ELBOW_POINT.x - ELBOW_NODE_SIZE / 2),
          top: sceneUnits(ELBOW_POINT.y - ELBOW_NODE_SIZE / 2),
          width: sceneUnits(ELBOW_NODE_SIZE),
          height: sceneUnits(ELBOW_NODE_SIZE),
        }}
      />
      <span
        ref={pulseReference}
        className="absolute -translate-x-1/2 -translate-y-1/2 bg-primary opacity-0"
        style={{ width: sceneUnits(PULSE_SIZE), height: sceneUnits(PULSE_SIZE) }}
      />
    </>
  );
}
