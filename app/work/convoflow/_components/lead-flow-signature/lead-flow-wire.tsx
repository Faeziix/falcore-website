import { cva } from "class-variance-authority";
import type { LeadFlowLayout, LeadFlowSegment } from "../../_lib/lead-flow";
import {
  cssVariables,
  curvedPathBetween,
  secondsAsCssTime,
  type LeadFlowPhase,
} from "../../_lib/lead-flow-geometry";

const trailVariants = cva("fill-none stroke-(--convoflow-trail) [stroke-dasharray:1_1]", {
  variants: {
    phase: {
      idle: "[stroke-dashoffset:1]",
      running: "convoflow-trail-draw",
      complete: "[stroke-dashoffset:0]",
    },
  },
});

export function LeadFlowWire({
  segment,
  layout,
  phase,
}: {
  segment: LeadFlowSegment;
  layout: LeadFlowLayout;
  phase: LeadFlowPhase;
}) {
  const pathDefinition = curvedPathBetween(
    layout.positions[segment.from],
    layout.positions[segment.to],
    layout.direction
  );
  const travelTiming = cssVariables({
    "--convoflow-travel-delay": secondsAsCssTime(segment.startSeconds),
    "--convoflow-travel-duration": secondsAsCssTime(segment.travelSeconds),
  });

  return (
    <g>
      <path d={pathDefinition} className="fill-none stroke-(--convoflow-wire)" strokeWidth={1.5} />
      <path
        d={pathDefinition}
        pathLength={1}
        strokeWidth={1.5}
        style={travelTiming}
        className={trailVariants({ phase })}
      />
      {phase === "running" ? (
        <path
          d={pathDefinition}
          pathLength={1}
          strokeWidth={4}
          style={travelTiming}
          className="convoflow-beam-travel fill-none stroke-(--convoflow-beam) [stroke-dasharray:var(--convoflow-beam-length)_2]"
        />
      ) : null}
    </g>
  );
}
