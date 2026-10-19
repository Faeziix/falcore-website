import { cva } from "class-variance-authority";
import {
  leadFlowLayouts,
  leadFlowNodes,
  leadFlowSegments,
  type LeadFlowLayoutName,
} from "../../_lib/lead-flow";
import type { LeadFlowPhase } from "../../_lib/lead-flow-geometry";
import { LeadFlowNodeCard } from "./lead-flow-node";
import { LeadFlowWire } from "./lead-flow-wire";

const diagramFrameVariants = cva("@container relative w-full", {
  variants: {
    layoutName: {
      wide: "aspect-[1000/400]",
      compact: "aspect-[1000/400]",
      landscape: "aspect-[1000/480]",
      upright: "mx-auto aspect-[360/780] max-w-[24rem]",
    },
  },
});

export function LeadFlowDiagram({
  layoutName,
  phase,
}: {
  layoutName: LeadFlowLayoutName;
  phase: LeadFlowPhase;
}) {
  const layout = leadFlowLayouts[layoutName];

  return (
    <div className={diagramFrameVariants({ layoutName })}>
      <svg
        viewBox={`0 0 ${layout.width} ${layout.height}`}
        className="absolute inset-0 size-full overflow-visible"
        aria-hidden
      >
        {leadFlowSegments.map((segment) => (
          <LeadFlowWire
            key={`${segment.from}-${segment.to}`}
            segment={segment}
            layout={layout}
            phase={phase}
          />
        ))}
      </svg>
      {leadFlowNodes.map((node) => (
        <LeadFlowNodeCard key={node.id} node={node} layout={layout} layoutName={layoutName} phase={phase} />
      ))}
    </div>
  );
}
