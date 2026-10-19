"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { ChartVertices } from "./chart-vertices";
import { CHART, CHART_DRAWN_FRACTIONS, CHART_POINTS, EASE_OUT_EXPO, LINE_DRAW_SECONDS } from "./custom-web-applications-story";
import { ScenePlaneSvg } from "./scene-plane";

const CHART_LINE_POINTS = CHART_POINTS.map((point) => `${point.x},${point.y}`).join(" ");
const NEWEST_POINT_INDEX = CHART_POINTS.length - 1;
const NEWEST_POINT_SIZE = 7;

type BookingChartProps = { drawnPointCount: number; isDimmed: boolean };

export function BookingChart({ drawnPointCount, isDimmed }: BookingChartProps) {
  const isChartReady = drawnPointCount > 0;
  const drawnFraction = drawnPointCount > 1 ? CHART_DRAWN_FRACTIONS[drawnPointCount - 1] : 0;
  return (
    <ScenePlaneSvg>
      {CHART.gridYs.map((gridY, gridIndex) => (
        <motion.line
          key={gridY}
          x1={CHART.left}
          x2={CHART.right}
          y1={gridY}
          y2={gridY}
          className="stroke-border"
          strokeWidth={1}
          strokeLinecap="square"
          initial={false}
          animate={{ pathLength: isChartReady ? 1 : 0, opacity: isChartReady ? 1 : 0 }}
          transition={{ duration: 0.9, delay: isChartReady ? gridIndex * 0.08 : 0, ease: EASE_OUT_EXPO }}
        />
      ))}
      <g className={cn("transition-opacity duration-500 ease-out", isDimmed ? "opacity-30" : "opacity-100")}>
        <motion.polyline
          points={CHART_LINE_POINTS}
          fill="none"
          className="stroke-primary"
          strokeWidth={2}
          strokeLinecap="square"
          strokeLinejoin="miter"
          initial={false}
          animate={{ pathLength: drawnFraction, opacity: isChartReady ? 1 : 0 }}
          transition={{ duration: LINE_DRAW_SECONDS, ease: "linear" }}
        />
        <ChartVertices drawnPointCount={drawnPointCount} vertexCount={NEWEST_POINT_INDEX} />
        <NewestPoint isShown={drawnPointCount > NEWEST_POINT_INDEX} />
      </g>
    </ScenePlaneSvg>
  );
}

function NewestPoint({ isShown }: { isShown: boolean }) {
  const newestPoint = CHART_POINTS[NEWEST_POINT_INDEX];
  return (
    <motion.rect
      x={newestPoint.x - NEWEST_POINT_SIZE / 2}
      y={newestPoint.y - NEWEST_POINT_SIZE / 2}
      width={NEWEST_POINT_SIZE}
      height={NEWEST_POINT_SIZE}
      className="fill-primary"
      initial={false}
      animate={{ opacity: isShown ? 1 : 0, scale: isShown ? 1 : 0.2 }}
      transition={{ duration: 0.6, delay: isShown ? LINE_DRAW_SECONDS * 0.8 : 0, ease: EASE_OUT_EXPO }}
    />
  );
}
