"use client";

import { motion } from "motion/react";
import { fillToneClassName, roundForSvg, strokeToneClassName } from "../blueprint-canvas";
import { BlueprintLabel } from "../blueprint-label";
import {
  CHANNEL_SHARES,
  DASHBOARD_CONTENT_LEFT,
  DASHBOARD_KPIS,
  DASHBOARD_SIDEBAR_WIDTH,
  KPI_SPARKLINE_RISES,
  LAYER_PLANE,
  THROUGHPUT_CHART,
  throughputPoints,
} from "./application-layers";

const RIGHT_EDGE = LAYER_PLANE.width - 24;

export function DashboardChrome() {
  return (
    <g fill="none" strokeWidth={1.25}>
      <line x1={DASHBOARD_SIDEBAR_WIDTH} y1={0} x2={DASHBOARD_SIDEBAR_WIDTH} y2={LAYER_PLANE.height} className="stroke-border-strong" />
      <line x1={DASHBOARD_SIDEBAR_WIDTH} y1={64} x2={LAYER_PLANE.width} y2={64} className="stroke-border-strong" />
      <rect x={28} y={24} width={20} height={20} className="fill-foreground stroke-none" />
      <line x1={60} y1={34} x2={120} y2={34} className="stroke-foreground" />
      {Array.from({ length: 7 }, (_, index) => {
        const rowY = 110 + index * 46;
        const isCurrentPage = index === 1;
        const tone = isCurrentPage ? "stroke-foreground" : "stroke-muted-foreground";
        return (
          <g key={index}>
            {isCurrentPage && <rect x={0} y={rowY - 14} width={3} height={28} className="fill-primary stroke-none" />}
            <rect x={28} y={rowY - 7} width={14} height={14} className={tone} />
            <line x1={56} y1={rowY} x2={140 - (index % 3) * 18} y2={rowY} className={tone} />
          </g>
        );
      })}
      <rect x={DASHBOARD_CONTENT_LEFT} y={18} width={260} height={30} className="stroke-border-strong" />
      <circle cx={DASHBOARD_SIDEBAR_WIDTH + 42} cy={33} r={6} className="stroke-muted-foreground" />
      <circle cx={LAYER_PLANE.width - 40} cy={33} r={14} className="stroke-muted-foreground" />
      <rect x={LAYER_PLANE.width - 180} y={18} width={110} height={30} className="stroke-foreground" />
    </g>
  );
}

export function KpiTiles() {
  return (
    <g>
      {DASHBOARD_KPIS.map((kpi, index) => {
        const tileLeft = DASHBOARD_CONTENT_LEFT + index * 194;
        const sparkline = KPI_SPARKLINE_RISES.map((rise, step) => `${tileLeft + 110 + step * 10},${152 - rise}`).join(" ");
        return (
          <g key={kpi.label}>
            <rect x={tileLeft} y={88} width={178} height={92} fill="none" strokeWidth={1.25} className="stroke-border-strong" />
            <BlueprintLabel x={tileLeft + 16} y={114} size={11}>
              {kpi.label}
            </BlueprintLabel>
            <text x={tileLeft + 16} y={160} fontSize={30} fontWeight={500} className="font-display fill-foreground">
              {kpi.value}
            </text>
            <polyline
              points={sparkline}
              fill="none"
              strokeWidth={1.5}
              className={index === 0 ? "stroke-primary" : "stroke-muted-foreground"}
            />
          </g>
        );
      })}
    </g>
  );
}

export function ThroughputChart({ isPlaying }: { isPlaying: boolean }) {
  const points = throughputPoints();
  const chartBottom = THROUGHPUT_CHART.y + THROUGHPUT_CHART.height - 30;
  const linePath = points.map((point, index) => `${index === 0 ? "M" : "L"} ${point.x} ${point.y}`).join(" ");
  const areaPath = `${linePath} L ${points[points.length - 1].x} ${chartBottom} L ${points[0].x} ${chartBottom} Z`;
  const lastPoint = points[points.length - 1];
  return (
    <g>
      <rect
        x={THROUGHPUT_CHART.x}
        y={THROUGHPUT_CHART.y}
        width={THROUGHPUT_CHART.width}
        height={THROUGHPUT_CHART.height}
        fill="none"
        strokeWidth={1.25}
        className="stroke-border-strong"
      />
      <BlueprintLabel x={THROUGHPUT_CHART.x + 20} y={THROUGHPUT_CHART.y + 30} size={11}>
        THROUGHPUT  ·  12 WEEKS
      </BlueprintLabel>
      {[0, 1, 2, 3].map((index) => {
        const gridY = THROUGHPUT_CHART.y + 50 + index * 50;
        return (
          <line key={index} x1={THROUGHPUT_CHART.x + 20} y1={gridY} x2={THROUGHPUT_CHART.x + THROUGHPUT_CHART.width - 20} y2={gridY} className="stroke-border" />
        );
      })}
      <path d={areaPath} fillOpacity={0.08} className="fill-primary stroke-none" />
      <motion.path
        d={linePath}
        fill="none"
        strokeWidth={2}
        className="stroke-primary"
        initial={false}
        animate={isPlaying ? { pathLength: [0, 1, 1] } : { pathLength: 1 }}
        transition={isPlaying ? { duration: 4, times: [0, 0.6, 1], repeat: Infinity, ease: "easeOut" } : { duration: 0 }}
      />
      <motion.circle
        cx={lastPoint.x}
        cy={lastPoint.y}
        r={5}
        className="fill-primary"
        initial={{ opacity: 1 }}
        animate={isPlaying ? { opacity: [0, 0, 1, 1] } : { opacity: 1 }}
        transition={isPlaying ? { duration: 4, times: [0, 0.55, 0.62, 1], repeat: Infinity } : { duration: 0 }}
      />
    </g>
  );
}

export function ChannelDonut() {
  const panelLeft = THROUGHPUT_CHART.x + THROUGHPUT_CHART.width + 24;
  const center = { x: panelLeft + 118, y: THROUGHPUT_CHART.y + 112 };
  const radius = 64;
  const circumference = 2 * Math.PI * radius;
  const segmentOffsets = CHANNEL_SHARES.map((_, index) =>
    CHANNEL_SHARES.slice(0, index).reduce((total, segment) => total + segment.share * circumference, 0),
  );
  return (
    <g>
      <rect
        x={panelLeft}
        y={THROUGHPUT_CHART.y}
        width={RIGHT_EDGE - panelLeft}
        height={THROUGHPUT_CHART.height}
        fill="none"
        strokeWidth={1.25}
        className="stroke-border-strong"
      />
      <BlueprintLabel x={panelLeft + 20} y={THROUGHPUT_CHART.y + 30} size={11}>
        BY CHANNEL
      </BlueprintLabel>
      {CHANNEL_SHARES.map((segment, index) => (
        <circle
          key={segment.tone}
          cx={center.x}
          cy={center.y}
          r={radius}
          fill="none"
          strokeWidth={14}
          strokeDasharray={`${roundForSvg(segment.share * circumference - 4)} ${roundForSvg(circumference)}`}
          strokeDashoffset={roundForSvg(-segmentOffsets[index])}
          transform={`rotate(-90 ${center.x} ${center.y})`}
          className={strokeToneClassName[segment.tone]}
        />
      ))}
      {CHANNEL_SHARES.map((segment, index) => (
        <g key={`legend-${segment.tone}`}>
          <rect x={panelLeft + 24 + index * 76} y={THROUGHPUT_CHART.y + 212} width={10} height={10} className={fillToneClassName[segment.tone]} />
          <line
            x1={panelLeft + 40 + index * 76}
            y1={THROUGHPUT_CHART.y + 217}
            x2={panelLeft + 80 + index * 76}
            y2={THROUGHPUT_CHART.y + 217}
            className="stroke-muted-foreground"
          />
        </g>
      ))}
    </g>
  );
}

export function LatestOrdersTable() {
  const tableTop = 476;
  return (
    <g fill="none" strokeWidth={1.25}>
      <rect x={DASHBOARD_CONTENT_LEFT} y={tableTop} width={RIGHT_EDGE - DASHBOARD_CONTENT_LEFT} height={128} className="stroke-border-strong" />
      <BlueprintLabel x={DASHBOARD_CONTENT_LEFT + 16} y={tableTop + 22} size={11}>
        LATEST
      </BlueprintLabel>
      {[0, 1, 2].map((index) => {
        const rowY = tableTop + 40 + index * 34;
        const isFlagged = index === 1;
        const statusTone = isFlagged ? "stroke-primary" : "stroke-muted-foreground";
        return (
          <g key={index}>
            <line x1={DASHBOARD_CONTENT_LEFT} y1={rowY + 14} x2={RIGHT_EDGE} y2={rowY + 14} className="stroke-border" />
            <line x1={DASHBOARD_CONTENT_LEFT + 16} y1={rowY} x2={DASHBOARD_CONTENT_LEFT + 150 - index * 20} y2={rowY} className="stroke-foreground" />
            <line x1={DASHBOARD_CONTENT_LEFT + 260} y1={rowY} x2={DASHBOARD_CONTENT_LEFT + 360} y2={rowY} className="stroke-muted-foreground" />
            <line x1={DASHBOARD_CONTENT_LEFT + 450} y1={rowY} x2={DASHBOARD_CONTENT_LEFT + 520} y2={rowY} className="stroke-muted-foreground" />
            <rect x={LAYER_PLANE.width - 130} y={rowY - 10} width={86} height={20} rx={10} className={statusTone} />
            <line x1={LAYER_PLANE.width - 114} y1={rowY} x2={LAYER_PLANE.width - 62} y2={rowY} className={statusTone} />
          </g>
        );
      })}
    </g>
  );
}
