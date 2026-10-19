import { BlueprintLabel, BlueprintText } from "../blueprint-label";
import { AGENT_GOAL_LINES, PLAN_PANEL, PLAN_STEPS, TOTAL_QUOTES, type PlanStepStatus } from "./agent-run-data";

const GOAL_TOP = PLAN_PANEL.y + 52;
const PLAN_TOP = PLAN_PANEL.y + 168;
const STEP_SPACING = 50;
const INNER_LEFT = PLAN_PANEL.x + 24;
const INNER_WIDTH = PLAN_PANEL.width - 48;
const RUNNING_STEP_INDEX = PLAN_STEPS.findIndex((step) => step.status === "running");

export function planStepBaseline(stepIndex: number) {
  return PLAN_TOP + 34 + stepIndex * STEP_SPACING;
}

export const RUNNING_STEP_ANCHOR = { x: PLAN_PANEL.x + PLAN_PANEL.width, y: planStepBaseline(RUNNING_STEP_INDEX) - 5 };

function StepStatusGlyph({ status, x, y }: { status: PlanStepStatus; x: number; y: number }) {
  if (status === "done") return <rect x={x} y={y - 6} width={12} height={12} className="fill-foreground" />;
  if (status === "running") {
    return (
      <>
        <circle cx={x + 6} cy={y} r={7} fill="none" strokeWidth={1.5} className="stroke-primary" />
        <circle cx={x + 6} cy={y} r={2.5} className="fill-primary" />
      </>
    );
  }
  return <rect x={x + 0.5} y={y - 5.5} width={11} height={11} fill="none" className="stroke-border-strong" />;
}

function ApprovalBadge({ baseline }: { baseline: number }) {
  const badgeWidth = 128;
  const badgeX = PLAN_PANEL.x + PLAN_PANEL.width - 24 - badgeWidth;
  return (
    <>
      <rect x={badgeX} y={baseline - 15} width={badgeWidth} height={20} fill="none" className="stroke-accent" />
      <BlueprintLabel x={badgeX + badgeWidth / 2} y={baseline - 1} tone="info" anchor="middle" size={10}>
        NEEDS YOUR OK
      </BlueprintLabel>
    </>
  );
}

export function AgentPlanPanel({ quotesWritten }: { quotesWritten: number }) {
  const goalProgress = Math.min(1, (2 + quotesWritten / TOTAL_QUOTES) / PLAN_STEPS.length);
  const progressPercent = Math.round(goalProgress * 100);
  return (
    <g>
      <rect
        x={PLAN_PANEL.x}
        y={PLAN_PANEL.y}
        width={PLAN_PANEL.width}
        height={PLAN_PANEL.height}
        strokeWidth={1.25}
        className="fill-blueprint-paper stroke-foreground"
      />
      <BlueprintLabel x={INNER_LEFT} y={PLAN_PANEL.y + 32} size={12}>
        01  GOAL
      </BlueprintLabel>
      {AGENT_GOAL_LINES.map((line, index) => (
        <BlueprintText key={line} x={INNER_LEFT} y={GOAL_TOP + 22 + index * 28} size={21}>
          {line}
        </BlueprintText>
      ))}
      <line x1={INNER_LEFT} y1={GOAL_TOP + 84} x2={INNER_LEFT + INNER_WIDTH} y2={GOAL_TOP + 84} className="stroke-border-strong" />
      <line
        x1={INNER_LEFT}
        y1={GOAL_TOP + 84}
        x2={INNER_LEFT + INNER_WIDTH * goalProgress}
        y2={GOAL_TOP + 84}
        strokeWidth={2}
        className="stroke-primary"
      />
      <BlueprintLabel x={INNER_LEFT + INNER_WIDTH} y={GOAL_TOP + 104} anchor="end" size={11}>
        {`${progressPercent}%  ·  STEP 3 OF 6`}
      </BlueprintLabel>
      <BlueprintLabel x={INNER_LEFT} y={PLAN_TOP + 4} size={12}>
        02  PLAN
      </BlueprintLabel>
      {PLAN_STEPS.map((step, index) => {
        const baseline = planStepBaseline(index);
        const titleTone = step.status === "running" ? "signal" : step.status === "queued" ? "soft" : "line";
        return (
          <g key={step.title}>
            <StepStatusGlyph status={step.status} x={INNER_LEFT} y={baseline - 5} />
            <BlueprintText x={PLAN_PANEL.x + 48} y={baseline} size={15} tone={titleTone}>
              {step.title}
            </BlueprintText>
            {step.needsApproval && <ApprovalBadge baseline={baseline} />}
          </g>
        );
      })}
    </g>
  );
}
