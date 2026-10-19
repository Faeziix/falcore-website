export type LeadFlowNodeId =
  | "ad"
  | "engine"
  | "phone"
  | "whatsapp"
  | "email"
  | "qualified"
  | "booked";

export type LeadFlowNodeKind = "endpoint" | "engine" | "channel";

export type LeadFlowPoint = { x: number; y: number };

export type LeadFlowLayoutName = "wide" | "upright";

export type LeadFlowLayout = {
  width: number;
  height: number;
  direction: "horizontal" | "vertical";
  positions: Record<LeadFlowNodeId, LeadFlowPoint>;
};

export type LeadFlowNode = {
  id: LeadFlowNodeId;
  kind: LeadFlowNodeKind;
  label: string;
  detail?: string;
  arrivalSeconds: number;
};

export type LeadFlowSegment = {
  from: LeadFlowNodeId;
  to: LeadFlowNodeId;
  startSeconds: number;
  travelSeconds: number;
};

const adToEngineSeconds = 0.6;
const channelStartOffsetsSeconds = [0, 0.5, 1];
const qualifyStartOffsetsSeconds = [1.5, 2, 2.5];
const channelTravelSeconds = 1;
const bookingStartOffsetSeconds = 3.5;
const bookingTravelSeconds = 0.5;
const settleSeconds = 0.4;

const runStartsAt = adToEngineSeconds;
const channelIds: LeadFlowNodeId[] = ["phone", "whatsapp", "email"];

export const LEAD_FLOW_RUN_SECONDS =
  runStartsAt + bookingStartOffsetSeconds + bookingTravelSeconds + settleSeconds;

export const leadFlowSegments: LeadFlowSegment[] = [
  { from: "ad", to: "engine", startSeconds: 0, travelSeconds: adToEngineSeconds },
  ...channelIds.map((channelId, channelPosition) => ({
    from: "engine" as const,
    to: channelId,
    startSeconds: runStartsAt + channelStartOffsetsSeconds[channelPosition],
    travelSeconds: channelTravelSeconds,
  })),
  ...channelIds.map((channelId, channelPosition) => ({
    from: channelId,
    to: "qualified" as const,
    startSeconds: runStartsAt + qualifyStartOffsetsSeconds[channelPosition],
    travelSeconds: channelTravelSeconds,
  })),
  {
    from: "qualified",
    to: "booked",
    startSeconds: runStartsAt + bookingStartOffsetSeconds,
    travelSeconds: bookingTravelSeconds,
  },
];

function lastArrivalAt(nodeId: LeadFlowNodeId) {
  const arrivals = leadFlowSegments
    .filter((segment) => segment.to === nodeId)
    .map((segment) => segment.startSeconds + segment.travelSeconds);
  return arrivals.length ? Math.max(...arrivals) : 0;
}

export const leadFlowNodes: LeadFlowNode[] = [
  { id: "ad", kind: "endpoint", label: "New lead", detail: "Taps your ad", arrivalSeconds: lastArrivalAt("ad") },
  { id: "engine", kind: "engine", label: "BookedByAI", detail: "Follows up for you", arrivalSeconds: lastArrivalAt("engine") },
  { id: "phone", kind: "channel", label: "Call", arrivalSeconds: lastArrivalAt("phone") },
  { id: "whatsapp", kind: "channel", label: "WhatsApp", arrivalSeconds: lastArrivalAt("whatsapp") },
  { id: "email", kind: "channel", label: "Email", arrivalSeconds: lastArrivalAt("email") },
  { id: "qualified", kind: "endpoint", label: "Qualified", detail: "Fits your rules", arrivalSeconds: lastArrivalAt("qualified") },
  { id: "booked", kind: "endpoint", label: "Booked", detail: "Meeting set", arrivalSeconds: lastArrivalAt("booked") },
];

export const leadFlowLayouts: Record<LeadFlowLayoutName, LeadFlowLayout> = {
  wide: {
    width: 1000,
    height: 400,
    direction: "horizontal",
    positions: {
      ad: { x: 85, y: 200 },
      engine: { x: 290, y: 200 },
      phone: { x: 520, y: 70 },
      whatsapp: { x: 520, y: 200 },
      email: { x: 520, y: 330 },
      qualified: { x: 735, y: 200 },
      booked: { x: 922, y: 200 },
    },
  },
  upright: {
    width: 360,
    height: 780,
    direction: "vertical",
    positions: {
      ad: { x: 180, y: 50 },
      engine: { x: 180, y: 215 },
      phone: { x: 62, y: 395 },
      whatsapp: { x: 180, y: 395 },
      email: { x: 298, y: 395 },
      qualified: { x: 180, y: 570 },
      booked: { x: 180, y: 730 },
    },
  },
};

export const leadFlowStatusCopy = {
  idle: "One lead, from the ad to a booked call.",
  running: "Following the lead…",
  complete: "Called, messaged, emailed, qualified and booked.",
};

export const leadFlowStepsForScreenReaders = [
  "A new lead taps an ad.",
  "BookedByAI picks the lead up.",
  "It calls, sends a WhatsApp message and sends an email.",
  "The lead is qualified against the business's rules.",
  "The call is booked on the calendar.",
];
