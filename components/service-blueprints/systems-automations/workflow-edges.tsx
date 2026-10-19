import { BlueprintLabel } from "../blueprint-label";
import { WORKFLOW_CARD_HEIGHT, WORKFLOW_EDGES, workflowCardTop, workflowEdgeGeometry, workflowNodeById, type WorkflowEdge } from "./workflow-data";
import { workflowStateStrokeClassName } from "./workflow-node-card";

const LABEL_CHARACTER_WIDTH = 8.4;

function EdgeLabel({ edge }: { edge: WorkflowEdge & { label: string } }) {
  const { middle } = workflowEdgeGeometry(edge);
  const width = edge.label.length * LABEL_CHARACTER_WIDTH + 16;
  return (
    <>
      <rect x={middle.x - width / 2} y={middle.y - 11} width={width} height={22} className="fill-blueprint-paper stroke-border-strong" />
      <BlueprintLabel x={middle.x} y={middle.y + 4} tone={edge.state === "skipped" ? "faint" : "soft"} anchor="middle" size={11}>
        {edge.label}
      </BlueprintLabel>
    </>
  );
}

function hasLabel(edge: WorkflowEdge): edge is WorkflowEdge & { label: string } {
  return Boolean(edge.label);
}

export function WorkflowEdges() {
  return (
    <g>
      {WORKFLOW_EDGES.map((edge) => {
        const geometry = workflowEdgeGeometry(edge);
        const strokeClassName = workflowStateStrokeClassName[edge.state];
        const isSolid = edge.state === "done" || edge.state === "live" || edge.state === "quiet";
        return (
          <g key={`${edge.from}-${edge.to}`}>
            <path
              d={geometry.pathData}
              fill="none"
              strokeWidth={edge.state === "live" ? 2 : 1.25}
              strokeDasharray={isSolid ? undefined : "5 5"}
              className={strokeClassName}
            />
            <circle cx={geometry.start.x} cy={geometry.start.y} r={3.5} className={`fill-blueprint-paper ${strokeClassName}`} />
            <circle cx={geometry.end.x} cy={geometry.end.y} r={3.5} className={`fill-blueprint-paper ${strokeClassName}`} />
          </g>
        );
      })}
      {WORKFLOW_EDGES.filter(hasLabel).map((edge) => (
        <EdgeLabel key={`label-${edge.from}-${edge.to}`} edge={edge} />
      ))}
    </g>
  );
}

export function WorkflowRetryPath() {
  const booking = workflowNodeById("booking");
  const notify = workflowNodeById("notify");
  const bookingBottom = workflowCardTop(booking) + WORKFLOW_CARD_HEIGHT;
  const pillLeft = booking.x + 30;
  const pillTop = bookingBottom + 22;
  const pillWidth = 132;
  const notifyEntryY = workflowCardTop(notify) + 20;
  return (
    <g fill="none" strokeDasharray="3 4" className="stroke-accent">
      <path d={`M ${booking.x + 20} ${bookingBottom} V ${pillTop + 11} H ${pillLeft}`} />
      <rect x={pillLeft} y={pillTop} width={pillWidth} height={22} strokeDasharray="none" className="fill-blueprint-paper" />
      <BlueprintLabel x={pillLeft + pillWidth / 2} y={pillTop + 15} tone="info" anchor="middle" size={10}>
        ON FAIL · RETRY ×3
      </BlueprintLabel>
      <path
        d={`M ${pillLeft + pillWidth} ${pillTop + 11} C ${pillLeft + pillWidth + 38} ${pillTop + 11}, ${notify.x - 40} ${notifyEntryY}, ${notify.x} ${notifyEntryY}`}
      />
    </g>
  );
}
