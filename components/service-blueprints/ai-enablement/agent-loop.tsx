import { cn } from "@/lib/utils";
import { roundForSvg } from "../blueprint-canvas";
import { BlueprintLabel } from "../blueprint-label";
import { AGENT_LOOP_CENTER, AGENT_LOOP_RADIUS, AGENT_LOOP_STAGES } from "./agent-run-data";

const STAGE_ANGLES_IN_DEGREES = [-90, 0, 90, 180];
const ARC_GAP_IN_DEGREES = 16;
const ARROW_LENGTH = 10;
const ARROW_SPREAD = 0.45;

function pointOnLoop(angleInDegrees: number, radius = AGENT_LOOP_RADIUS) {
  const angle = (angleInDegrees * Math.PI) / 180;
  return { x: roundForSvg(AGENT_LOOP_CENTER.x + Math.cos(angle) * radius), y: roundForSvg(AGENT_LOOP_CENTER.y + Math.sin(angle) * radius) };
}

function LoopArc({ fromStageIndex, isLive }: { fromStageIndex: number; isLive: boolean }) {
  const startAngle = STAGE_ANGLES_IN_DEGREES[fromStageIndex] + ARC_GAP_IN_DEGREES;
  const nextAngle = STAGE_ANGLES_IN_DEGREES[(fromStageIndex + 1) % STAGE_ANGLES_IN_DEGREES.length];
  const endAngle = (nextAngle <= startAngle ? nextAngle + 360 : nextAngle) - ARC_GAP_IN_DEGREES;
  const start = pointOnLoop(startAngle);
  const end = pointOnLoop(endAngle);
  const tangent = (endAngle * Math.PI) / 180 + Math.PI / 2;
  const arrowLeft = {
    x: roundForSvg(end.x - Math.cos(tangent - ARROW_SPREAD) * ARROW_LENGTH),
    y: roundForSvg(end.y - Math.sin(tangent - ARROW_SPREAD) * ARROW_LENGTH),
  };
  const arrowRight = {
    x: roundForSvg(end.x - Math.cos(tangent + ARROW_SPREAD) * ARROW_LENGTH),
    y: roundForSvg(end.y - Math.sin(tangent + ARROW_SPREAD) * ARROW_LENGTH),
  };
  const toneClassName = isLive ? "stroke-primary" : "stroke-foreground";
  const strokeWidth = isLive ? 2 : 1.25;
  return (
    <g fill="none" className={cn("transition-[stroke] duration-300", toneClassName)} strokeWidth={strokeWidth}>
      <path d={`M ${start.x} ${start.y} A ${AGENT_LOOP_RADIUS} ${AGENT_LOOP_RADIUS} 0 0 1 ${end.x} ${end.y}`} />
      <polyline points={`${arrowLeft.x},${arrowLeft.y} ${end.x},${end.y} ${arrowRight.x},${arrowRight.y}`} />
    </g>
  );
}

function StageNode({ stageIndex, isActive }: { stageIndex: number; isActive: boolean }) {
  const label = AGENT_LOOP_STAGES[stageIndex];
  const position = pointOnLoop(STAGE_ANGLES_IN_DEGREES[stageIndex]);
  const width = label.length * 10 + 26;
  return (
    <g>
      <rect
        x={position.x - width / 2}
        y={position.y - 15}
        width={width}
        height={30}
        strokeWidth={1.25}
        className={cn("transition-[fill,stroke] duration-300", isActive ? "fill-primary stroke-primary" : "fill-background stroke-foreground")}
      />
      <BlueprintLabel x={position.x} y={position.y + 5} tone="line" anchor="middle" size={12}>
        {label}
      </BlueprintLabel>
    </g>
  );
}

function AgentCore() {
  const spokeAngles = [0, 60, 120, 180, 240, 300];
  return (
    <g fill="none">
      <circle cx={AGENT_LOOP_CENTER.x} cy={AGENT_LOOP_CENTER.y} r={AGENT_LOOP_RADIUS + 54} className="stroke-border" />
      <circle cx={AGENT_LOOP_CENTER.x} cy={AGENT_LOOP_CENTER.y} r={56} strokeDasharray="3 5" className="stroke-muted-foreground" />
      <g className="stroke-muted-foreground">
        {spokeAngles.map((angle) => {
          const inner = pointOnLoop(angle, 22);
          const outer = pointOnLoop(angle, 40);
          return <line key={angle} x1={inner.x} y1={inner.y} x2={outer.x} y2={outer.y} />;
        })}
      </g>
      <circle cx={AGENT_LOOP_CENTER.x} cy={AGENT_LOOP_CENTER.y} r={10} strokeWidth={1.25} className="stroke-foreground" />
    </g>
  );
}

export const ACT_NODE_RIGHT_EDGE = { x: AGENT_LOOP_CENTER.x + AGENT_LOOP_RADIUS + 27, y: AGENT_LOOP_CENTER.y };
export const PLAN_NODE_LEFT_EDGE = { x: AGENT_LOOP_CENTER.x - 50, y: AGENT_LOOP_CENTER.y - AGENT_LOOP_RADIUS - 19 };

export function AgentLoop({ activeStageIndex }: { activeStageIndex: number }) {
  const liveArcIndex = (activeStageIndex + AGENT_LOOP_STAGES.length - 1) % AGENT_LOOP_STAGES.length;
  return (
    <g>
      <AgentCore />
      {AGENT_LOOP_STAGES.map((stage, stageIndex) => (
        <LoopArc key={stage} fromStageIndex={stageIndex} isLive={stageIndex === liveArcIndex} />
      ))}
      {AGENT_LOOP_STAGES.map((stage, stageIndex) => (
        <StageNode key={stage} stageIndex={stageIndex} isActive={stageIndex === activeStageIndex} />
      ))}
      <BlueprintLabel x={AGENT_LOOP_CENTER.x} y={AGENT_LOOP_CENTER.y + AGENT_LOOP_RADIUS + 86} anchor="middle" size={11}>
        AGENT LOOP  ·  RUNS UNTIL THE GOAL IS MET
      </BlueprintLabel>
    </g>
  );
}
