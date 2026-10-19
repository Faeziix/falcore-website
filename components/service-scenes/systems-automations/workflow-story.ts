import type { AppKey, WireKey } from "./workflow-layout";

export type AppState = "idle" | "live" | "done";
export type RouterIndicator = "loader" | "live" | "done";

export type RouterStatus = { indicator: RouterIndicator; headline: string; detail?: string };

export type WorkflowStep = {
  filledFieldCount: number;
  typingFieldIndex: number | null;
  isSubmitting: boolean;
  liveWire: WireKey | null;
  hasTravellingPulse: boolean;
  router: RouterStatus;
  apps: Record<AppKey, AppState>;
  isRunComplete: boolean;
};

export const STORY_BEAT_MILLISECONDS = 850;
export const RESTING_BEAT = 0;
export const RUN_RESET_BEAT = 4;
export const FIRST_RUN_NUMBER = 1284;

const IDLE_APPS: Record<AppKey, AppState> = { crm: "idle", calendar: "idle", email: "idle" };
const DONE_APPS: Record<AppKey, AppState> = { crm: "done", calendar: "done", email: "done" };
const SCORED: RouterStatus = { indicator: "done", headline: "Score 82", detail: "high intent" };
const HANDLED: RouterStatus = { indicator: "done", headline: "Lead handled", detail: "2.4s" };
const ARRIVING: RouterStatus = { indicator: "loader", headline: "New enquiry", detail: "typing" };

const SUBMITTED_FORM = { filledFieldCount: 3, typingFieldIndex: null, isSubmitting: false };
const QUIET_STEP = { liveWire: null, hasTravellingPulse: false, isRunComplete: false };

export const WORKFLOW_STORY: WorkflowStep[] = [
  { ...SUBMITTED_FORM, liveWire: "calendar", hasTravellingPulse: true, router: SCORED, apps: { crm: "done", calendar: "live", email: "idle" }, isRunComplete: false },
  { ...SUBMITTED_FORM, liveWire: "email", hasTravellingPulse: true, router: SCORED, apps: { crm: "done", calendar: "done", email: "live" }, isRunComplete: false },
  { ...SUBMITTED_FORM, ...QUIET_STEP, router: HANDLED, apps: DONE_APPS, isRunComplete: true },
  { ...SUBMITTED_FORM, ...QUIET_STEP, router: HANDLED, apps: DONE_APPS, isRunComplete: true },
  { filledFieldCount: 0, typingFieldIndex: null, isSubmitting: false, ...QUIET_STEP, router: { indicator: "loader", headline: "Waiting for enquiry" }, apps: IDLE_APPS },
  { filledFieldCount: 1, typingFieldIndex: 0, isSubmitting: false, ...QUIET_STEP, router: ARRIVING, apps: IDLE_APPS },
  { filledFieldCount: 2, typingFieldIndex: 1, isSubmitting: false, ...QUIET_STEP, router: ARRIVING, apps: IDLE_APPS },
  { filledFieldCount: 3, typingFieldIndex: 2, isSubmitting: false, ...QUIET_STEP, router: ARRIVING, apps: IDLE_APPS },
  { filledFieldCount: 3, typingFieldIndex: null, isSubmitting: true, liveWire: "intake", hasTravellingPulse: true, router: { indicator: "done", headline: "Enquiry received" }, apps: IDLE_APPS, isRunComplete: false },
  { ...SUBMITTED_FORM, liveWire: "intake", hasTravellingPulse: false, router: { indicator: "loader", headline: "Routing lead" }, apps: IDLE_APPS, isRunComplete: false },
  { ...SUBMITTED_FORM, liveWire: "router", hasTravellingPulse: true, router: { indicator: "live", headline: "Score 82", detail: "high intent" }, apps: IDLE_APPS, isRunComplete: false },
  { ...SUBMITTED_FORM, liveWire: "crm", hasTravellingPulse: true, router: SCORED, apps: { crm: "live", calendar: "idle", email: "idle" }, isRunComplete: false },
];

export const EXPO_OUT: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function typingEase(progress: number) {
  return Math.min(1, Math.floor(progress * 11) / 10);
}

export function routerStatusText(status: RouterStatus) {
  return status.detail ? `${status.headline} · ${status.detail}` : status.headline;
}
