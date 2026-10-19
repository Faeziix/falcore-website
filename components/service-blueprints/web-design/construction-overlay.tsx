"use client";

import { motion } from "motion/react";
import { BlueprintLabel } from "../blueprint-label";
import {
  GOLDEN_GUIDE_RATIO,
  HEADLINE_CAP_HEIGHT,
  HEADLINE_FIRST_BASELINE,
  HEADLINE_LEFT,
  HEADLINE_SECOND_BASELINE,
  LANDING_COLUMN_WIDTH,
  LANDING_FRAME,
  LANDING_GRID,
  NAV_BASELINE,
  SPHERE,
} from "./landing-layout";

function ColumnGrid() {
  return (
    <g strokeWidth={0.75} opacity={0.28} className="stroke-primary">
      {Array.from({ length: LANDING_GRID.columns }, (_, index) => {
        const columnLeft = LANDING_FRAME.x + LANDING_GRID.margin + index * (LANDING_COLUMN_WIDTH + LANDING_GRID.gutter);
        const columnRight = columnLeft + LANDING_COLUMN_WIDTH;
        return (
          <g key={index}>
            <line x1={columnLeft} y1={LANDING_FRAME.y} x2={columnLeft} y2={LANDING_FRAME.y + LANDING_FRAME.height} />
            <line x1={columnRight} y1={LANDING_FRAME.y} x2={columnRight} y2={LANDING_FRAME.y + LANDING_FRAME.height} />
          </g>
        );
      })}
    </g>
  );
}

function DimensionLine({ x1, y1, x2, y2, label }: { x1: number; y1: number; x2: number; y2: number; label: string }) {
  const isVertical = x1 === x2;
  return (
    <g>
      <g strokeWidth={1} className="stroke-primary">
        <line x1={x1} y1={y1} x2={x2} y2={y2} />
        {isVertical ? (
          <>
            <line x1={x1 - 6} y1={y1} x2={x1 + 6} y2={y1} />
            <line x1={x2 - 6} y1={y2} x2={x2 + 6} y2={y2} />
          </>
        ) : (
          <>
            <line x1={x1} y1={y1 - 6} x2={x1} y2={y1 + 6} />
            <line x1={x2} y1={y2 - 6} x2={x2} y2={y2 + 6} />
          </>
        )}
      </g>
      <BlueprintLabel
        x={isVertical ? x1 + 10 : (x1 + x2) / 2}
        y={isVertical ? (y1 + y2) / 2 + 4 : y1 - 10}
        tone="signal"
        anchor={isVertical ? "start" : "middle"}
        size={11}
      >
        {label}
      </BlueprintLabel>
    </g>
  );
}

function TypeGuides({ isPlaying }: { isPlaying: boolean }) {
  const frameRight = LANDING_FRAME.x + LANDING_FRAME.width;
  const guides = [
    { y: HEADLINE_FIRST_BASELINE, right: frameRight },
    { y: HEADLINE_FIRST_BASELINE - HEADLINE_CAP_HEIGHT, right: LANDING_FRAME.x + 620 },
    { y: HEADLINE_SECOND_BASELINE, right: frameRight },
  ];
  return (
    <g strokeWidth={1} strokeDasharray="4 4" className="stroke-primary">
      {guides.map((guide) => (
        <motion.line
          key={guide.y}
          x1={LANDING_FRAME.x}
          y1={guide.y}
          x2={guide.right}
          y2={guide.y}
          initial={{ strokeDashoffset: 0 }}
          animate={isPlaying ? { strokeDashoffset: [0, -16] } : { strokeDashoffset: 0 }}
          transition={isPlaying ? { duration: 1.6, repeat: Infinity, ease: "linear" } : { duration: 0 }}
        />
      ))}
    </g>
  );
}

function SphereConstruction() {
  const guideRadius = SPHERE.radius * GOLDEN_GUIDE_RATIO;
  return (
    <g strokeWidth={1} fill="none" className="stroke-primary">
      <circle cx={SPHERE.x} cy={SPHERE.y} r={guideRadius} strokeDasharray="2 6" />
      <line x1={SPHERE.x - SPHERE.radius - 50} y1={SPHERE.y} x2={SPHERE.x + SPHERE.radius + 50} y2={SPHERE.y} />
      <line x1={SPHERE.x} y1={SPHERE.y - SPHERE.radius - 50} x2={SPHERE.x} y2={SPHERE.y + SPHERE.radius + 50} />
    </g>
  );
}

export function ConstructionOverlay({ isPlaying }: { isPlaying: boolean }) {
  const goldenLabelOffset = SPHERE.radius * GOLDEN_GUIDE_RATIO * 0.71 + 8;
  return (
    <g>
      <ColumnGrid />
      <TypeGuides isPlaying={isPlaying} />
      <SphereConstruction />
      <DimensionLine x1={HEADLINE_LEFT + 520} y1={NAV_BASELINE + 14} x2={HEADLINE_LEFT + 520} y2={HEADLINE_FIRST_BASELINE - HEADLINE_CAP_HEIGHT} label="96" />
      <DimensionLine
        x1={LANDING_FRAME.x + 40}
        y1={LANDING_FRAME.y + LANDING_FRAME.height - 24}
        x2={LANDING_FRAME.x + 40 + LANDING_COLUMN_WIDTH * 3 + LANDING_GRID.gutter * 2}
        y2={LANDING_FRAME.y + LANDING_FRAME.height - 24}
        label="3 COL"
      />
      <BlueprintLabel x={LANDING_FRAME.x + LANDING_FRAME.width + 14} y={HEADLINE_FIRST_BASELINE + 4} tone="signal" size={11}>
        BASE
      </BlueprintLabel>
      <BlueprintLabel x={LANDING_FRAME.x + 630} y={HEADLINE_FIRST_BASELINE - HEADLINE_CAP_HEIGHT + 4} tone="signal" size={11}>
        CAP
      </BlueprintLabel>
      <BlueprintLabel x={SPHERE.x + goldenLabelOffset} y={SPHERE.y + goldenLabelOffset} tone="signal" size={11}>
        φ 1.272
      </BlueprintLabel>
      <BlueprintLabel x={LANDING_FRAME.x} y={LANDING_FRAME.y - 16} tone="signal" size={11}>
        12 COL  ·  20 GUTTER  ·  1300 FRAME
      </BlueprintLabel>
      <BlueprintLabel x={LANDING_FRAME.x + LANDING_FRAME.width} y={LANDING_FRAME.y - 16} anchor="end" size={11}>
        LANDING / HERO / V3
      </BlueprintLabel>
    </g>
  );
}
