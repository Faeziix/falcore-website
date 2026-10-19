import { BlueprintLabel } from "../blueprint-label";
import { WORKFLOW_CARD_HEIGHT, WORKFLOW_LANES, WORKFLOW_NODES, WORKFLOW_PLANE, workflowCardTop } from "./workflow-data";

const COLUMN_STEP = 70;
const CARD_SHADOW_OFFSET = 7;

export function WorkflowSwimlanes() {
  const lanesBottom = WORKFLOW_PLANE.laneTop + WORKFLOW_LANES.length * WORKFLOW_PLANE.laneHeight;
  const columnCount = Math.floor((WORKFLOW_PLANE.width - WORKFLOW_PLANE.labelColumnWidth) / COLUMN_STEP) + 1;
  return (
    <g>
      <rect width={WORKFLOW_PLANE.width} height={WORKFLOW_PLANE.height} className="fill-blueprint-paper stroke-muted-foreground" />
      <g className="stroke-border" strokeOpacity={0.55}>
        {Array.from({ length: columnCount }, (_, index) => {
          const x = WORKFLOW_PLANE.labelColumnWidth + index * COLUMN_STEP;
          return <line key={x} x1={x} y1={WORKFLOW_PLANE.laneTop} x2={x} y2={lanesBottom} />;
        })}
      </g>
      {WORKFLOW_LANES.map((lane, index) => {
        const laneY = WORKFLOW_PLANE.laneTop + index * WORKFLOW_PLANE.laneHeight;
        const labelBaseline = laneY + WORKFLOW_PLANE.laneHeight / 2 + 5;
        return (
          <g key={lane}>
            {index % 2 === 0 && (
              <rect y={laneY} width={WORKFLOW_PLANE.width} height={WORKFLOW_PLANE.laneHeight} className="fill-foreground" fillOpacity={0.018} />
            )}
            <line x1={0} y1={laneY} x2={WORKFLOW_PLANE.width} y2={laneY} className="stroke-border" />
            <BlueprintLabel x={20} y={labelBaseline} size={12}>
              {lane}
            </BlueprintLabel>
            <BlueprintLabel x={20} y={labelBaseline + 19} tone="faint" size={10}>
              {`L0${index + 1}`}
            </BlueprintLabel>
          </g>
        );
      })}
      <line
        x1={WORKFLOW_PLANE.labelColumnWidth}
        y1={0}
        x2={WORKFLOW_PLANE.labelColumnWidth}
        y2={WORKFLOW_PLANE.height}
        className="stroke-border-strong"
      />
      <BlueprintLabel x={20} y={26} size={12}>
        W1  NEW ENQUIRY TO BOOKED CALL   ·   W2  MONDAY INVOICE CHASE
      </BlueprintLabel>
      <BlueprintLabel x={WORKFLOW_PLANE.width - 20} y={26} anchor="end" size={12}>
        2 WORKFLOWS  ·  6 TOOLS  ·  12 STEPS
      </BlueprintLabel>
      {WORKFLOW_NODES.map((node) => (
        <rect
          key={node.id}
          x={node.x + CARD_SHADOW_OFFSET}
          y={workflowCardTop(node) + CARD_SHADOW_OFFSET}
          width={node.width}
          height={WORKFLOW_CARD_HEIGHT}
          fill="none"
          strokeDasharray="3 4"
          className={node.state === "live" ? "stroke-primary" : "stroke-border-strong"}
        />
      ))}
    </g>
  );
}
