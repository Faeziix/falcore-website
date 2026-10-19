export const WORKFLOW_PLANE = { width: 1400, height: 720, laneTop: 40, laneHeight: 110, labelColumnWidth: 140 };
export const WORKFLOW_CARD_HEIGHT = 70;

export const WORKFLOW_LANES = ["FORMS", "CRM", "CALENDAR", "EMAIL", "ACCOUNTING", "TEAM CHAT"];

export type WorkflowState = "done" | "live" | "next" | "skipped" | "quiet";

export type WorkflowGlyph = "bolt" | "person" | "gauge" | "calendar" | "loop" | "send" | "page" | "chat" | "clock";

export type WorkflowNode = {
  id: string;
  code: string;
  lane: number;
  x: number;
  width: number;
  title: string;
  meta: string;
  glyph: WorkflowGlyph;
  state: WorkflowState;
};

export const WORKFLOW_NODES: WorkflowNode[] = [
  { id: "enquiry", code: "N01", lane: 0, x: 160, width: 190, title: "Enquiry received", meta: "WEBHOOK", glyph: "bolt", state: "done" },
  { id: "contact", code: "N02", lane: 1, x: 376, width: 214, title: "Match or create contact", meta: "180 MS", glyph: "person", state: "done" },
  { id: "score", code: "N03", lane: 1, x: 610, width: 170, title: "Score the lead", meta: "82 / 100", glyph: "gauge", state: "done" },
  { id: "slots", code: "N04", lane: 2, x: 810, width: 180, title: "Hold three call slots", meta: "310 MS", glyph: "calendar", state: "done" },
  { id: "nurture", code: "N05", lane: 3, x: 810, width: 180, title: "Start nurture series", meta: "SKIPPED", glyph: "loop", state: "skipped" },
  { id: "booking", code: "N06", lane: 3, x: 1020, width: 170, title: "Send booking link", meta: "RUNNING", glyph: "send", state: "live" },
  { id: "quote", code: "N07", lane: 4, x: 1210, width: 170, title: "Draft the quote", meta: "QUEUED", glyph: "page", state: "next" },
  { id: "notify", code: "N08", lane: 5, x: 1210, width: 170, title: "Tell sales in chat", meta: "QUEUED", glyph: "chat", state: "next" },
  { id: "schedule", code: "W2·01", lane: 4, x: 160, width: 190, title: "Every Monday, 09:00", meta: "SCHEDULE", glyph: "clock", state: "quiet" },
  { id: "unpaid", code: "W2·02", lane: 4, x: 380, width: 200, title: "Find unpaid invoices", meta: "6 FOUND", glyph: "page", state: "quiet" },
  { id: "reminders", code: "W2·03", lane: 3, x: 610, width: 170, title: "Send reminders", meta: "6 SENT", glyph: "send", state: "quiet" },
  { id: "summary", code: "W2·04", lane: 5, x: 610, width: 170, title: "Post the summary", meta: "DONE", glyph: "chat", state: "quiet" },
];

export type WorkflowEdge = { from: string; to: string; state: WorkflowState; label?: string };

export const WORKFLOW_EDGES: WorkflowEdge[] = [
  { from: "enquiry", to: "contact", state: "done", label: "email → contact" },
  { from: "contact", to: "score", state: "done" },
  { from: "score", to: "slots", state: "done", label: "SCORE ≥ 70" },
  { from: "score", to: "nurture", state: "skipped", label: "< 70" },
  { from: "slots", to: "booking", state: "live" },
  { from: "booking", to: "quote", state: "next" },
  { from: "booking", to: "notify", state: "next" },
  { from: "schedule", to: "unpaid", state: "quiet" },
  { from: "unpaid", to: "reminders", state: "quiet" },
  { from: "unpaid", to: "summary", state: "quiet" },
];

export const PAYLOAD_FIELDS: { key: string; value: string; isRoute?: boolean }[] = [
  { key: "lead.company", value: "Northwind Dental" },
  { key: "lead.source", value: "website / pricing" },
  { key: "lead.score", value: "82" },
  { key: "route", value: "high intent", isRoute: true },
];

export const FIRST_SHOWN_RUN_NUMBER = 1284;

export function workflowNodeById(id: string) {
  const node = WORKFLOW_NODES.find((candidate) => candidate.id === id);
  if (!node) throw new Error(`Unknown workflow node: ${id}`);
  return node;
}

export function workflowCardTop(node: WorkflowNode) {
  return WORKFLOW_PLANE.laneTop + node.lane * WORKFLOW_PLANE.laneHeight + (WORKFLOW_PLANE.laneHeight - WORKFLOW_CARD_HEIGHT) / 2;
}

export function workflowEdgeGeometry(edge: WorkflowEdge) {
  const from = workflowNodeById(edge.from);
  const to = workflowNodeById(edge.to);
  const start = { x: from.x + from.width, y: workflowCardTop(from) + WORKFLOW_CARD_HEIGHT / 2 };
  const end = { x: to.x, y: workflowCardTop(to) + WORKFLOW_CARD_HEIGHT / 2 };
  const handle = Math.max(30, (end.x - start.x) * 0.6);
  return {
    pathData: `M ${start.x} ${start.y} C ${start.x + handle} ${start.y}, ${end.x - handle} ${end.y}, ${end.x} ${end.y}`,
    start,
    end,
    middle: { x: (start.x + end.x) / 2, y: (start.y + end.y) / 2 },
  };
}

export const LIVE_WORKFLOW_EDGE = WORKFLOW_EDGES.find((edge) => edge.state === "live")!;
