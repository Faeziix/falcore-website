"use client";

import { useRef } from "react";
import { useAnimationFrame } from "motion/react";
import { roundForSvg } from "../blueprint-canvas";
import { SPHERE } from "./landing-layout";

const MERIDIAN_PHASES = [0.15, 0.4, 0.65, 0.9].map((ratio) => Math.asin(ratio));
const PARALLEL_RATIOS = [-0.66, -0.33, 0, 0.33, 0.66];
const SECONDS_PER_TURN = 24;
const MARKER_LATITUDE_OFFSET = -0.55;

export function WireframeSphere({ isPlaying }: { isPlaying: boolean }) {
  const meridianReferences = useRef<(SVGEllipseElement | null)[]>([]);
  const markerReference = useRef<SVGCircleElement>(null);

  useAnimationFrame((elapsedMilliseconds) => {
    if (!isPlaying) return;
    const rotation = ((elapsedMilliseconds / 1000) / SECONDS_PER_TURN) * Math.PI * 2;
    meridianReferences.current.forEach((meridian, index) => {
      meridian?.setAttribute("rx", (Math.abs(Math.sin(MERIDIAN_PHASES[index] + rotation)) * SPHERE.radius).toFixed(1));
    });
    const marker = markerReference.current;
    if (!marker) return;
    const latitudeRadius = SPHERE.radius * Math.sqrt(1 - MARKER_LATITUDE_OFFSET ** 2);
    const longitude = rotation + 0.9;
    marker.setAttribute("cx", (SPHERE.x + Math.sin(longitude) * latitudeRadius).toFixed(1));
    marker.setAttribute("opacity", Math.cos(longitude) > 0 ? "1" : "0.25");
  });

  const markerStartX = roundForSvg(SPHERE.x + Math.sin(0.9) * SPHERE.radius * Math.sqrt(1 - MARKER_LATITUDE_OFFSET ** 2));

  return (
    <g transform={`rotate(${SPHERE.tiltInDegrees} ${SPHERE.x} ${SPHERE.y})`}>
      <g fill="none" strokeWidth={1} opacity={0.85} className="stroke-foreground">
        <circle cx={SPHERE.x} cy={SPHERE.y} r={SPHERE.radius} />
        {MERIDIAN_PHASES.map((phase, index) => (
          <ellipse
            key={phase}
            ref={(element) => {
              meridianReferences.current[index] = element;
            }}
            cx={SPHERE.x}
            cy={SPHERE.y}
            rx={roundForSvg(Math.sin(phase) * SPHERE.radius)}
            ry={SPHERE.radius}
          />
        ))}
        {PARALLEL_RATIOS.map((ratio) => {
          const offset = ratio * SPHERE.radius;
          const halfWidth = Math.sqrt(SPHERE.radius ** 2 - offset ** 2);
          return <ellipse key={ratio} cx={SPHERE.x} cy={roundForSvg(SPHERE.y + offset)} rx={roundForSvg(halfWidth)} ry={roundForSvg(halfWidth * 0.22)} />;
        })}
      </g>
      <circle
        ref={markerReference}
        cx={markerStartX}
        cy={SPHERE.y + MARKER_LATITUDE_OFFSET * SPHERE.radius}
        r={7}
        className="fill-primary"
      />
    </g>
  );
}
