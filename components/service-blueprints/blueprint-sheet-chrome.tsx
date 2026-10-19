import { BLUEPRINT_CANVAS } from "./blueprint-canvas";
import { BlueprintLabel } from "./blueprint-label";

const GRID_STEP = 40;
const SHEET_INSET = 32.5;
const TITLE_BLOCK_HEIGHT = 48;
const TITLE_BLOCK_SPLIT_FROM_RIGHT = 360.5;

function DraftingGrid() {
  const verticalLines = Array.from({ length: BLUEPRINT_CANVAS.width / GRID_STEP + 1 }, (_, index) => index * GRID_STEP);
  const horizontalLines = Array.from({ length: BLUEPRINT_CANVAS.height / GRID_STEP + 1 }, (_, index) => index * GRID_STEP);
  return (
    <g className="stroke-border" strokeWidth={1} opacity={0.45}>
      {verticalLines.map((x) => (
        <line key={`vertical-${x}`} x1={x} y1={0} x2={x} y2={BLUEPRINT_CANVAS.height} />
      ))}
      {horizontalLines.map((y) => (
        <line key={`horizontal-${y}`} x1={0} y1={y} x2={BLUEPRINT_CANVAS.width} y2={y} />
      ))}
    </g>
  );
}

function CornerCross({ x, y }: { x: number; y: number }) {
  return (
    <g className="stroke-muted-foreground" strokeWidth={1}>
      <line x1={x - 10} y1={y} x2={x + 10} y2={y} />
      <line x1={x} y1={y - 10} x2={x} y2={y + 10} />
    </g>
  );
}

export function BlueprintSheetChrome({ title, sheetNumber }: { title: string; sheetNumber: string }) {
  const right = BLUEPRINT_CANVAS.width - SHEET_INSET;
  const bottom = BLUEPRINT_CANVAS.height - SHEET_INSET;
  const titleBlockTop = bottom - TITLE_BLOCK_HEIGHT;
  const labelBaseline = BLUEPRINT_CANVAS.height - 50;
  return (
    <>
      <rect width={BLUEPRINT_CANVAS.width} height={BLUEPRINT_CANVAS.height} className="fill-background" />
      <DraftingGrid />
      <g fill="none" className="stroke-border" strokeWidth={1}>
        <rect x={SHEET_INSET} y={SHEET_INSET} width={right - SHEET_INSET} height={bottom - SHEET_INSET} />
        <line x1={SHEET_INSET} y1={titleBlockTop} x2={right} y2={titleBlockTop} />
        <line
          x1={BLUEPRINT_CANVAS.width - TITLE_BLOCK_SPLIT_FROM_RIGHT}
          y1={titleBlockTop}
          x2={BLUEPRINT_CANVAS.width - TITLE_BLOCK_SPLIT_FROM_RIGHT}
          y2={bottom}
        />
      </g>
      <BlueprintLabel x={56} y={labelBaseline}>{`FALCORE / ${title}`}</BlueprintLabel>
      <BlueprintLabel x={BLUEPRINT_CANVAS.width - 336} y={labelBaseline}>{`SHEET ${sheetNumber}`}</BlueprintLabel>
      <BlueprintLabel x={BLUEPRINT_CANVAS.width - 56} y={labelBaseline} anchor="end">
        SCALE 1:1
      </BlueprintLabel>
      <CornerCross x={SHEET_INSET} y={SHEET_INSET} />
      <CornerCross x={right} y={SHEET_INSET} />
    </>
  );
}
