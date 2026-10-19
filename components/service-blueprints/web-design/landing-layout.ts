export const LANDING_FRAME = { x: 150, y: 110, width: 1300, height: 640 };
export const LANDING_GRID = { columns: 12, gutter: 20, margin: 40 };
export const LANDING_COLUMN_WIDTH =
  (LANDING_FRAME.width - LANDING_GRID.margin * 2 - (LANDING_GRID.columns - 1) * LANDING_GRID.gutter) / LANDING_GRID.columns;

export const HEADLINE_LEFT = LANDING_FRAME.x + 40;
export const HEADLINE_CAP_HEIGHT = 136;
export const HEADLINE_FIRST_BASELINE = LANDING_FRAME.y + 300;
export const HEADLINE_SECOND_BASELINE = LANDING_FRAME.y + 478;
export const NAV_BASELINE = LANDING_FRAME.y + 47;

export const SPHERE = { x: LANDING_FRAME.x + 1050, y: LANDING_FRAME.y + 370, radius: 175, tiltInDegrees: -18 };
export const GOLDEN_GUIDE_RATIO = 1.272;

export const INTRO_LINES = ["An independent studio for brands", "that would rather be remembered", "than merely seen."];
export const NAV_LINKS = [
  { label: "Work", x: 760 },
  { label: "Studio", x: 840 },
  { label: "Journal", x: 930 },
];
