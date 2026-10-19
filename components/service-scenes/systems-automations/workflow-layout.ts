import type { ScenePoint } from "../scene-units";

export type AppKey = "crm" | "calendar" | "email";
export type WireKey = "intake" | "router" | AppKey;

export const WIRE_Y = 180;

export const FORM_CARD = { x: 60, y: 126, width: 132, height: 108 };
export const FORM_SPACING = { padding: 14, gap: 7, fieldHeight: 8, fieldInset: 3, inkHeight: 4, buttonHeight: 14 };
export const FORM_FIELD_WIDTHS = ["80%", "100%", "64%"];
export const RUN_COUNTER_POSITION = { x: 60, y: 250, height: 12, gap: 10, numberWidth: 38, tickSize: 5, fontSize: 10 };

export const ROUTER_CENTER = { x: 322, y: 167 };
export const ROUTER_CHIP = { characterEm: 0.6, indicatorSize: 11, gap: 8, slack: 3, contentHeight: 11 };

export const JUNCTION: ScenePoint = { x: 450, y: WIRE_Y };
export const JUNCTION_SIZE = 7;
export const PORT_SIZE = 4;
export const PULSE_SIZE = 7;

export const APP_CARD = { x: 476, width: 124, height: 52, paddingInline: 12, gap: 8, ledSize: 6, statusHeight: 11, statusFontSize: 10, recordDashWidth: 8, recordGap: 5 };

export const APPS: { key: AppKey; label: string; doneText: string; portY: number }[] = [
  { key: "crm", label: "CRM", doneText: "Contact added", portY: 104 },
  { key: "calendar", label: "CALENDAR", doneText: "Slot held", portY: WIRE_Y },
  { key: "email", label: "EMAIL", doneText: "Welcome sent", portY: 256 },
];

const FORM_PORT: ScenePoint = { x: FORM_CARD.x + FORM_CARD.width, y: WIRE_Y };
const ROUTER_POINT: ScenePoint = { x: ROUTER_CENTER.x, y: WIRE_Y };

export const WIRE_ROUTES: Record<WireKey, ScenePoint[]> = {
  intake: [FORM_PORT, ROUTER_POINT],
  router: [ROUTER_POINT, JUNCTION],
  crm: [JUNCTION, { x: JUNCTION.x, y: 104 }, { x: APP_CARD.x, y: 104 }],
  calendar: [JUNCTION, { x: APP_CARD.x, y: WIRE_Y }],
  email: [JUNCTION, { x: JUNCTION.x, y: 256 }, { x: APP_CARD.x, y: 256 }],
};

export const WIRE_KEYS = Object.keys(WIRE_ROUTES) as WireKey[];

export function routerContentWidth(characterCount: number) {
  const fixedUnits = ROUTER_CHIP.indicatorSize + ROUTER_CHIP.gap + ROUTER_CHIP.slack;
  const textEm = Math.round(characterCount * ROUTER_CHIP.characterEm * 100) / 100;
  return `calc(${textEm}em + ${fixedUnits} * var(--scene-unit))`;
}

export function pointsToPath(points: ScenePoint[]) {
  return points.map((point, index) => `${index === 0 ? "M" : "L"}${point.x} ${point.y}`).join(" ");
}

export function pointAlongRoute(points: ScenePoint[], progress: number): ScenePoint {
  const segmentLengths = points.slice(1).map((point, index) => Math.abs(point.x - points[index].x) + Math.abs(point.y - points[index].y));
  let remaining = segmentLengths.reduce((total, length) => total + length, 0) * Math.min(1, Math.max(0, progress));
  for (let index = 0; index < segmentLengths.length; index++) {
    const start = points[index];
    const end = points[index + 1];
    if (remaining <= segmentLengths[index] || index === segmentLengths.length - 1) {
      const ratio = segmentLengths[index] === 0 ? 0 : Math.min(1, remaining / segmentLengths[index]);
      return { x: start.x + (end.x - start.x) * ratio, y: start.y + (end.y - start.y) * ratio };
    }
    remaining -= segmentLengths[index];
  }
  return points[points.length - 1];
}
