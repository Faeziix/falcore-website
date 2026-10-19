export type PlanStepStatus = "done" | "running" | "queued";

export const AGENT_GOAL_LINES = ["Renew every contract that", "expires this month."];

export const PLAN_STEPS: { title: string; status: PlanStepStatus; needsApproval?: boolean }[] = [
  { title: "Find contracts expiring this month", status: "done" },
  { title: "Pull each client's usage", status: "done" },
  { title: "Draft a renewal quote for each", status: "running" },
  { title: "Send quotes to you", status: "queued", needsApproval: true },
  { title: "Email clients and book calls", status: "queued" },
  { title: "Log everything in the CRM", status: "queued" },
];

export const AGENT_LOOP_STAGES = ["PLAN", "ACT", "OBSERVE", "CHECK"] as const;
export const ACT_STAGE_INDEX = 1;

export const AGENT_TOOLS: { name: string; glyph: AgentToolGlyph; state: string; wasUsed?: boolean; isWriter?: boolean }[] = [
  { name: "CRM", glyph: "stack", state: "READ  14", wasUsed: true },
  { name: "Spreadsheet", glyph: "grid", state: "READ  14", wasUsed: true },
  { name: "Documents", glyph: "page", state: "WRITING", isWriter: true },
  { name: "Email", glyph: "envelope", state: "WAITING" },
  { name: "Calendar", glyph: "calendar", state: "WAITING" },
  { name: "Browser", glyph: "globe", state: "IDLE" },
];

export type AgentToolGlyph = "stack" | "grid" | "page" | "envelope" | "calendar" | "globe";

export const TOTAL_QUOTES = 14;
export const FIRST_SHOWN_QUOTE = 9;

export const COMPLETED_TRACE_LINES = [
  { time: "09:14:02", verb: "READ ", detail: "crm / contracts renewing in oct", result: "14 found" },
  { time: "09:14:06", verb: "READ ", detail: "usage.xlsx / 14 clients", result: "ok" },
];

export const QUOTE_CLIENT_FILE_NAMES = [
  "northline-renewal.pdf",
  "harbor-clinic-renewal.pdf",
  "atlas-legal-renewal.pdf",
  "brightside-renewal.pdf",
  "cedar-dental-renewal.pdf",
  "meridian-spa-renewal.pdf",
];

export const PLAN_PANEL = { x: 96, y: 190, width: 404, height: 480 };
export const AGENT_LOOP_CENTER = { x: 790, y: 420 };
export const AGENT_LOOP_RADIUS = 118;
export const TOOL_RAIL = { x: 1150, firstY: 190, cardWidth: 324, cardHeight: 60, spacing: 82 };
