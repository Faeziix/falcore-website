"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { CHART_DRAWN_FRACTIONS, CHART_POINTS, LINE_DRAW_SECONDS } from "./custom-web-applications-story";

const VERTEX_SIZE = 3;

function drawnFractionAt(pointCount: number) {
  return pointCount > 1 ? CHART_DRAWN_FRACTIONS[pointCount - 1] : 0;
}

function revealDelaySeconds(vertexIndex: number, previousCount: number, currentCount: number) {
  const isNewlyReached = currentCount > previousCount && vertexIndex >= previousCount && vertexIndex < currentCount;
  if (!isNewlyReached) return 0;
  const drawStart = drawnFractionAt(previousCount);
  const drawSpan = drawnFractionAt(currentCount) - drawStart;
  if (drawSpan <= 0) return 0;
  return Math.round(((CHART_DRAWN_FRACTIONS[vertexIndex] - drawStart) / drawSpan) * LINE_DRAW_SECONDS * 100) / 100;
}

export function ChartVertices({ drawnPointCount, vertexCount }: { drawnPointCount: number; vertexCount: number }) {
  const [countHistory, setCountHistory] = useState({ previousCount: drawnPointCount, currentCount: drawnPointCount });
  if (countHistory.currentCount !== drawnPointCount) {
    setCountHistory({ previousCount: countHistory.currentCount, currentCount: drawnPointCount });
  }

  return CHART_POINTS.slice(0, vertexCount).map((point, vertexIndex) => (
    <rect
      key={point.x}
      x={point.x - VERTEX_SIZE / 2}
      y={point.y - VERTEX_SIZE / 2}
      width={VERTEX_SIZE}
      height={VERTEX_SIZE}
      className={cn("fill-foreground-soft transition-opacity duration-200", vertexIndex < drawnPointCount ? "opacity-100" : "opacity-0")}
      style={{ transitionDelay: `${revealDelaySeconds(vertexIndex, countHistory.previousCount, drawnPointCount)}s` }}
    />
  ));
}
