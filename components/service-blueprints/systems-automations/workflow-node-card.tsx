import { cn } from "@/lib/utils";
import type { BlueprintTone } from "../blueprint-canvas";
import { BlueprintLabel, BlueprintText } from "../blueprint-label";
import { WORKFLOW_CARD_HEIGHT, workflowCardTop, type WorkflowGlyph, type WorkflowNode, type WorkflowState } from "./workflow-data";

export const workflowStateStrokeClassName: Record<WorkflowState, string> = {
  live: "stroke-primary",
  done: "stroke-foreground",
  next: "stroke-muted-foreground",
  quiet: "stroke-muted-foreground",
  skipped: "stroke-border-strong",
};

const titleToneByState: Record<WorkflowState, BlueprintTone> = {
  live: "line",
  done: "line",
  next: "soft",
  quiet: "line",
  skipped: "faint",
};

const metaToneByState: Record<WorkflowState, BlueprintTone> = {
  live: "signal",
  done: "soft",
  next: "soft",
  quiet: "soft",
  skipped: "faint",
};

function WorkflowGlyphShape({ glyph, x, y }: { glyph: WorkflowGlyph; x: number; y: number }) {
  switch (glyph) {
    case "bolt":
      return <path d={`M ${x + 17} ${y + 6} L ${x + 9} ${y + 17} h 6 l -2 9 l 9 -12 h -6 z`} />;
    case "person":
      return (
        <>
          <circle cx={x + 15} cy={y + 11} r={4.5} />
          <path d={`M ${x + 7} ${y + 24} a 8 7 0 0 1 16 0`} />
        </>
      );
    case "gauge":
      return <path d={`M ${x + 6} ${y + 21} a 9 9 0 0 1 18 0 M ${x + 15} ${y + 21} L ${x + 21} ${y + 14}`} />;
    case "calendar":
      return (
        <>
          <rect x={x + 7} y={y + 8} width={16} height={15} />
          <path d={`M ${x + 7} ${y + 13} H ${x + 23}`} />
          <rect x={x + 16} y={y + 16} width={4} height={4} />
        </>
      );
    case "loop":
      return <path d={`M ${x + 8} ${y + 15} a 7 7 0 0 1 13 -4 M ${x + 22} ${y + 15} a 7 7 0 0 1 -13 4 M ${x + 21} ${y + 7} v 4 h -4`} />;
    case "send":
      return <path d={`M ${x + 7} ${y + 15} L ${x + 23} ${y + 8} L ${x + 18} ${y + 24} L ${x + 15} ${y + 18} Z`} />;
    case "page":
      return <path d={`M ${x + 9} ${y + 6} h 8 l 5 5 v 13 h -13 z M ${x + 12} ${y + 16} h 7`} />;
    case "chat":
      return <path d={`M ${x + 7} ${y + 9} h 16 v 11 h -9 l -4 4 v -4 h -3 z`} />;
    case "clock":
      return (
        <>
          <circle cx={x + 15} cy={y + 15} r={8} />
          <path d={`M ${x + 15} ${y + 10} v 5 l 4 3`} />
        </>
      );
  }
}

function LeadScoreBar({ node, top }: { node: WorkflowNode; top: number }) {
  const barLeft = node.x + 52;
  const barWidth = node.width - 66;
  return (
    <>
      <line x1={barLeft} y1={top + 58} x2={barLeft + barWidth} y2={top + 58} strokeWidth={3} className="stroke-border-strong" />
      <line x1={barLeft} y1={top + 58} x2={barLeft + barWidth * 0.82} y2={top + 58} strokeWidth={3} className="stroke-foreground" />
    </>
  );
}

export function WorkflowNodeCard({ node, meta }: { node: WorkflowNode; meta?: string }) {
  const top = workflowCardTop(node);
  const strokeClassName = workflowStateStrokeClassName[node.state];
  return (
    <g>
      <rect
        x={node.x}
        y={top}
        width={node.width}
        height={WORKFLOW_CARD_HEIGHT}
        strokeWidth={1.25}
        strokeDasharray={node.state === "skipped" ? "4 4" : undefined}
        className={cn("fill-background", strokeClassName)}
      />
      <rect x={node.x + 12} y={top + 20} width={30} height={30} fill="none" className="stroke-border-strong" />
      <g fill="none" strokeWidth={1.25} className={strokeClassName}>
        <WorkflowGlyphShape glyph={node.glyph} x={node.x + 12} y={top + 20} />
      </g>
      <BlueprintLabel x={node.x + 52} y={top + 22} tone={metaToneByState[node.state]} size={10}>
        {node.code}
      </BlueprintLabel>
      <BlueprintLabel x={node.x + node.width - 12} y={top + 22} tone={metaToneByState[node.state]} anchor="end" size={10}>
        {meta ?? node.meta}
      </BlueprintLabel>
      <BlueprintText x={node.x + 52} y={top + 44} size={14} tone={titleToneByState[node.state]}>
        {node.title}
      </BlueprintText>
      {node.id === "score" && <LeadScoreBar node={node} top={top} />}
    </g>
  );
}
