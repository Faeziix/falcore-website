import type { CSSProperties } from "react";
import type { LeadFlowLayout, LeadFlowPoint } from "./lead-flow";

export type LeadFlowPhase = "idle" | "running" | "complete";

export function curvedPathBetween(
  start: LeadFlowPoint,
  end: LeadFlowPoint,
  direction: LeadFlowLayout["direction"]
) {
  if (direction === "horizontal") {
    const middleX = (start.x + end.x) / 2;
    return `M ${start.x} ${start.y} C ${middleX} ${start.y}, ${middleX} ${end.y}, ${end.x} ${end.y}`;
  }
  const middleY = (start.y + end.y) / 2;
  return `M ${start.x} ${start.y} C ${start.x} ${middleY}, ${end.x} ${middleY}, ${end.x} ${end.y}`;
}

export function positionWithinLayout(point: LeadFlowPoint, layout: LeadFlowLayout): CSSProperties {
  return {
    left: `${(point.x / layout.width) * 100}%`,
    top: `${(point.y / layout.height) * 100}%`,
  };
}

export function cssVariables(variables: Record<`--${string}`, string>): CSSProperties {
  return variables as CSSProperties;
}

export function secondsAsCssTime(seconds: number) {
  return `${seconds}s`;
}
