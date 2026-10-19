import { BlueprintLabel } from "../blueprint-label";
import { PAYLOAD_FIELDS } from "./workflow-data";

const INSPECTOR = { x: 1150, y: 92, width: 400, rowHeight: 22 };
const RECENT_RUN_BAR_HEIGHTS = [32, 41, 38, 52, 47, 60, 55, 66, 72, 64, 78, 84, 80, 92];

export function WorkflowPayloadInspector({ runNumber, elapsedSeconds }: { runNumber: number; elapsedSeconds: number }) {
  const rows = [
    { key: "run", value: `#${runNumber.toLocaleString("en-US")}` },
    ...PAYLOAD_FIELDS,
    { key: "elapsed", value: `${elapsedSeconds.toFixed(1)} s` },
  ];
  const height = 56 + rows.length * INSPECTOR.rowHeight;
  const right = INSPECTOR.x + INSPECTOR.width;
  return (
    <g>
      <rect x={INSPECTOR.x} y={INSPECTOR.y} width={INSPECTOR.width} height={height} className="fill-blueprint-paper stroke-muted-foreground" />
      <line x1={INSPECTOR.x} y1={INSPECTOR.y + 32} x2={right} y2={INSPECTOR.y + 32} className="stroke-border-strong" />
      <rect x={INSPECTOR.x + 18} y={INSPECTOR.y + 12} width={8} height={8} className="fill-primary" />
      <BlueprintLabel x={INSPECTOR.x + 34} y={INSPECTOR.y + 21} tone="line" size={11}>
        LIVE PAYLOAD
      </BlueprintLabel>
      <BlueprintLabel x={right - 18} y={INSPECTOR.y + 21} anchor="end" size={11}>
        N04 → N06
      </BlueprintLabel>
      {rows.map((row, index) => {
        const baseline = INSPECTOR.y + 56 + index * INSPECTOR.rowHeight;
        const isRoute = "isRoute" in row && row.isRoute;
        return (
          <g key={row.key}>
            <BlueprintLabel x={INSPECTOR.x + 18} y={baseline} size={11}>
              {row.key}
            </BlueprintLabel>
            <BlueprintLabel x={right - 18} y={baseline} tone={isRoute ? "signal" : "line"} anchor="end" size={11}>
              {row.value}
            </BlueprintLabel>
          </g>
        );
      })}
    </g>
  );
}

export function WorkflowRunStats({ runsToday }: { runsToday: number }) {
  const left = 96;
  const top = 172;
  return (
    <g>
      {RECENT_RUN_BAR_HEIGHTS.map((barHeight, index) => {
        const scaledHeight = barHeight * 0.4;
        const isLatest = index === RECENT_RUN_BAR_HEIGHTS.length - 1;
        return (
          <rect
            key={index}
            x={left + index * 9}
            y={top + 40 - scaledHeight}
            width={5}
            height={scaledHeight}
            className={isLatest ? "fill-primary" : "fill-border-strong"}
          />
        );
      })}
      <BlueprintLabel x={left + 140} y={top + 22} tone="line" size={11}>
        {`${runsToday.toLocaleString("en-US")} RUNS TODAY`}
      </BlueprintLabel>
      <BlueprintLabel x={left + 140} y={top + 40} size={11}>
        99.8% OK  ·  AVG 2.4 S
      </BlueprintLabel>
    </g>
  );
}
