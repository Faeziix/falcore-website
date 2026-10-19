export const BLUEPRINT_CANVAS = { width: 1600, height: 900 } as const;

export type BlueprintFraming = { x: number; y: number; width: number };

export const FULL_SHEET_FRAMING: BlueprintFraming = { x: 0, y: 0, width: BLUEPRINT_CANVAS.width };

export type BlueprintTone = "line" | "soft" | "faint" | "grid" | "signal" | "info";

export const strokeToneClassName: Record<BlueprintTone, string> = {
  line: "stroke-foreground",
  soft: "stroke-muted-foreground",
  faint: "stroke-border-strong",
  grid: "stroke-border",
  signal: "stroke-primary",
  info: "stroke-accent",
};

export const fillToneClassName: Record<BlueprintTone, string> = {
  line: "fill-foreground",
  soft: "fill-muted-foreground",
  faint: "fill-border-strong",
  grid: "fill-border",
  signal: "fill-primary",
  info: "fill-accent",
};

export function roundForSvg(value: number) {
  return Math.round(value * 100) / 100;
}
