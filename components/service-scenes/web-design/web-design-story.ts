import type { ScenePoint } from "../scene-units";

export const STORY_BEAT_MILLISECONDS = 600;
export const STORY_BEAT_COUNT = 18;
export const FINISHED_BEAT = 0;

export const STORY_BEATS = {
  clearPage: 1,
  drawGuides: 2,
  typeHeadline: 3,
  extendTextBars: 5,
  wipeImage: 6,
  placeButton: 7,
  reachTypeCard: 8,
  pickType: 9,
  reachSwatches: 10,
  pickSwatch: 11,
  returnToButton: 12,
  pressButton: 13,
  goLive: 14,
} as const;

export const EASE_OUT_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function hasReachedBeat(beat: number, storyBeat: number) {
  return beat === FINISHED_BEAT || beat >= storyBeat;
}

export function isBetweenBeats(beat: number, firstBeat: number, lastBeat: number) {
  return beat >= firstBeat && beat <= lastBeat;
}

export function isBuilding(beat: number) {
  return isBetweenBeats(beat, STORY_BEATS.clearPage, STORY_BEATS.goLive - 1);
}

export const BROWSER_FRAME = { x: 120, y: 58, width: 330, height: 232, titleBarHeight: 24 };

export const PAGE_LAYOUT = {
  headline: { left: 22, top: 58, fontSize: 25 },
  textBars: [
    { left: 22, top: 128, width: 134 },
    { left: 22, top: 144, width: 102 },
  ],
  button: { left: 22, top: 162, width: 70, height: 20 },
  image: { left: 186, top: 46, width: 122, height: 152 },
  guides: { left: 22, top: 46, width: 286, height: 164, columnCount: 6, gutter: 10 },
};

export const HEADLINE_LINES = ["Made to", "be felt."] as const;

export const STYLE_CARD = { x: 470, y: 86, width: 108 };

export const SWATCH_COLOURS = ["var(--foreground)", "var(--border-strong)", "var(--primary)"] as const;
export const SWATCH_SIZE = 16;
export const SWATCH_GAP = 6;
export const DRAFT_SWATCH_INDEX = 0;
export const CHOSEN_SWATCH_INDEX = 2;

export const STATUS_CHIP = { centerX: 285, y: 306, contentWidth: 212 };

const CURSOR_REST: ScenePoint = { x: 218, y: 228 };

const CURSOR_WAYPOINTS_BY_BEAT: Record<number, ScenePoint> = {
  [FINISHED_BEAT]: CURSOR_REST,
  1: { x: 262, y: 150 },
  2: { x: 150, y: 98 },
  3: { x: 236, y: 120 },
  4: { x: 226, y: 150 },
  5: { x: 266, y: 196 },
  6: { x: 424, y: 250 },
  7: { x: 236, y: 238 },
  8: { x: 496, y: 124 },
  9: { x: 496, y: 124 },
  10: { x: 532, y: 174 },
  11: { x: 532, y: 174 },
  12: { x: 190, y: 226 },
  13: { x: 190, y: 226 },
  16: { x: 226, y: 220 },
};

export function cursorPositionFor(beat: number): ScenePoint {
  return CURSOR_WAYPOINTS_BY_BEAT[beat] ?? CURSOR_REST;
}

export const CURSOR_CLICK_BEATS: readonly number[] = [STORY_BEATS.pickType, STORY_BEATS.pickSwatch, STORY_BEATS.pressButton];

export type ChipStatus = { kind: "building"; title: string; detail: string } | { kind: "live" };

const BUILD_STATUS_RANGES: { firstBeat: number; lastBeat: number; title: string; detail: string }[] = [
  { firstBeat: 1, lastBeat: 2, title: "Building", detail: "layout" },
  { firstBeat: 3, lastBeat: 5, title: "Building", detail: "content" },
  { firstBeat: 6, lastBeat: 7, title: "Building", detail: "media" },
  { firstBeat: 8, lastBeat: 9, title: "Styling", detail: "type" },
  { firstBeat: 10, lastBeat: 11, title: "Styling", detail: "colour" },
  { firstBeat: 12, lastBeat: 13, title: "Publishing", detail: "site" },
];

export function chipStatusFor(beat: number): ChipStatus {
  const buildRange = BUILD_STATUS_RANGES.find((range) => isBetweenBeats(beat, range.firstBeat, range.lastBeat));
  return buildRange ? { kind: "building", title: buildRange.title, detail: buildRange.detail } : { kind: "live" };
}
