import type { ScenePoint } from "../scene-units";

export const BEAT_MILLISECONDS = 750;
export const EASE_OUT_EXPO = [0.16, 1, 0.3, 1] as const;

export type StoryPhase = "arrive" | "records" | "documents" | "approval" | "sending" | "calendar" | "done";
export type ToolName = "email" | "calendar" | "records" | "documents";
export type ToolTone = "idle" | "live" | "waiting" | "done";
export type AgentTone = "live" | "working" | "done";

export const PHASE_ORDER: StoryPhase[] = ["arrive", "records", "documents", "approval", "sending", "calendar", "done"];

export const STORY_BEATS: StoryPhase[] = [
  "arrive", "arrive",
  "records", "records",
  "documents", "documents", "documents",
  "approval", "approval",
  "sending",
  "calendar", "calendar",
  "done", "done",
];

export const RESTING_STORY_BEAT = 5;
export const DRAFT_TOTAL = 14;
export const RESTING_DRAFT_COUNT = 9;
export const MAXIMUM_QUOTE_SHEETS = 5;

export const AGENT_TILE = { x: 278, y: 138, size: 84 };
export const TOOL_TILE_SIZE = 50;
export const CHIP_TOP = 300;
export const PULSE_SIZE = 7;
export const INTAKE_SOCKET = { x: 320, y: 50 };
export const APPROVAL_BADGE = { x: 166, y: 62, size: 17 };
export const QUOTE_STACK = { x: 528, y: 256, width: 16, height: 21, offset: 3 };

export type ToolDefinition = {
  name: ToolName;
  label: string;
  centre: ScenePoint;
  wire: ScenePoint[];
  node: ScenePoint;
  livePhases: StoryPhase[];
  waitingPhase?: StoryPhase;
};

export const TOOLS: ToolDefinition[] = [
  {
    name: "email",
    label: "EMAIL",
    centre: { x: 150, y: 96 },
    wire: [{ x: 278, y: 180 }, { x: 214, y: 180 }, { x: 214, y: 96 }, { x: 175, y: 96 }],
    node: { x: 214, y: 138 },
    livePhases: ["sending"],
    waitingPhase: "approval",
  },
  {
    name: "calendar",
    label: "CALENDAR",
    centre: { x: 150, y: 264 },
    wire: [{ x: 278, y: 180 }, { x: 214, y: 180 }, { x: 214, y: 264 }, { x: 175, y: 264 }],
    node: { x: 214, y: 222 },
    livePhases: ["calendar"],
  },
  {
    name: "records",
    label: "RECORDS",
    centre: { x: 490, y: 96 },
    wire: [{ x: 362, y: 180 }, { x: 426, y: 180 }, { x: 426, y: 96 }, { x: 465, y: 96 }],
    node: { x: 426, y: 138 },
    livePhases: ["records"],
  },
  {
    name: "documents",
    label: "DOCUMENTS",
    centre: { x: 490, y: 264 },
    wire: [{ x: 362, y: 180 }, { x: 426, y: 180 }, { x: 426, y: 264 }, { x: 465, y: 264 }],
    node: { x: 426, y: 222 },
    livePhases: ["documents"],
  },
];

export const INTAKE_WIRE: ScenePoint[] = [{ x: INTAKE_SOCKET.x, y: INTAKE_SOCKET.y + 4 }, { x: INTAKE_SOCKET.x, y: AGENT_TILE.y }];

export type PulsePlan = {
  route: ToolName | "intake";
  progress: number[];
  progressTimes: number[];
  opacity: number[];
  opacityTimes: number[];
};

export const PULSE_PLANS: Record<StoryPhase, PulsePlan | null> = {
  arrive: { route: "intake", progress: [0, 1, 1], progressTimes: [0, 0.55, 1], opacity: [1, 1, 0], opacityTimes: [0, 0.6, 0.75] },
  records: { route: "records", progress: [0, 1, 1, 0], progressTimes: [0, 0.35, 0.6, 0.95], opacity: [1, 1], opacityTimes: [0, 1] },
  documents: { route: "documents", progress: [0, 1, 1, 0], progressTimes: [0, 0.22, 0.86, 1], opacity: [1, 1], opacityTimes: [0, 1] },
  approval: { route: "email", progress: [0, 1, 1], progressTimes: [0, 0.3, 1], opacity: [1, 1], opacityTimes: [0, 1] },
  sending: { route: "email", progress: [1, 1, 0], progressTimes: [0, 0.3, 1], opacity: [1, 1], opacityTimes: [0, 1] },
  calendar: { route: "calendar", progress: [0, 1, 1, 0], progressTimes: [0, 0.3, 0.7, 1], opacity: [1, 1], opacityTimes: [0, 1] },
  done: null,
};

export const RESTING_PULSE_PROGRESS = 0.86;

export type ChipIndicator = "loader" | "live" | "waiting" | "done";

export const CHIP_COPY: Record<StoryPhase, { indicator: ChipIndicator; lead: string; detail?: string; showsDraftCount?: boolean }> = {
  arrive: { indicator: "live", lead: "New task", detail: "· renew 14 contracts" },
  records: { indicator: "loader", lead: "Reading contracts", detail: "· records" },
  documents: { indicator: "loader", lead: "Drafting quotes", showsDraftCount: true },
  approval: { indicator: "waiting", lead: "Waiting for your OK", detail: "· 14 quotes" },
  sending: { indicator: "loader", lead: "Approved", detail: "· sending 14" },
  calendar: { indicator: "loader", lead: "Booking calls", detail: "· calendar" },
  done: { indicator: "done", lead: "Goal met", detail: "· 14 renewals" },
};

export function phaseAtBeat(storyBeat: number) {
  return STORY_BEATS[storyBeat % STORY_BEATS.length];
}

export function phaseBeatCount(phase: StoryPhase) {
  return STORY_BEATS.filter((beatPhase) => beatPhase === phase).length;
}

export function toolTone(tool: ToolDefinition, phase: StoryPhase): ToolTone {
  if (tool.waitingPhase === phase) return "waiting";
  if (tool.livePhases.includes(phase)) return "live";
  const lastToolPhase = tool.livePhases[tool.livePhases.length - 1];
  return PHASE_ORDER.indexOf(phase) > PHASE_ORDER.indexOf(lastToolPhase) ? "done" : "idle";
}

export function agentTone(phase: StoryPhase): AgentTone {
  if (phase === "arrive") return "live";
  return phase === "done" ? "done" : "working";
}

export function findTool(name: ToolName) {
  return TOOLS.find((tool) => tool.name === name) ?? TOOLS[0];
}
