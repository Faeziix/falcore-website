import { BlueprintLabel } from "../blueprint-label";
import { LAYER_PLANE, LOGIC_LINKS, LOGIC_RULES } from "./application-layers";
import { LayerPlane } from "./layer-plane";

const RECORD_COLUMN_STARTS = [60, 260, 480, 700];
const RECORD_COLUMN_LENGTHS = [140, 160, 120, 180];
const RULE_SIZE = { width: 180, height: 56 };

export function DataLayer() {
  return (
    <LayerPlane label="DATA" tone="soft">
      <g fill="none" strokeWidth={1.25} className="stroke-muted-foreground">
        {[0, 1, 2].map((index) => {
          const left = 60 + index * 90;
          return (
            <g key={index}>
              <ellipse cx={left + 24} cy={58} rx={24} ry={8} />
              <path d={`M ${left} 58 v 26 a 24 8 0 0 0 48 0 v -26`} />
            </g>
          );
        })}
        {Array.from({ length: 9 }, (_, rowIndex) => {
          const rowY = 120 + rowIndex * 50;
          return (
            <g key={rowIndex}>
              <line x1={40} y1={rowY + 22} x2={LAYER_PLANE.width - 40} y2={rowY + 22} className="stroke-border" />
              {RECORD_COLUMN_STARTS.map((columnStart, columnIndex) => (
                <line
                  key={columnStart}
                  x1={columnStart}
                  y1={rowY}
                  x2={columnStart + RECORD_COLUMN_LENGTHS[columnIndex] - (rowIndex % 3) * 18}
                  y2={rowY}
                />
              ))}
            </g>
          );
        })}
      </g>
    </LayerPlane>
  );
}

export function LogicLayer() {
  return (
    <LayerPlane label="LOGIC" tone="soft">
      <g fill="none" strokeWidth={1.25} strokeDasharray="5 5" className="stroke-muted-foreground">
        {LOGIC_LINKS.map(([fromIndex, toIndex]) => {
          const from = LOGIC_RULES[fromIndex];
          const to = LOGIC_RULES[toIndex];
          const startX = from.x + RULE_SIZE.width;
          const startY = from.y + RULE_SIZE.height / 2;
          const endY = to.y + RULE_SIZE.height / 2;
          const handle = Math.abs(to.x - startX) * 0.5;
          return (
            <path key={`${fromIndex}-${toIndex}`} d={`M ${startX} ${startY} C ${startX + handle} ${startY}, ${to.x - handle} ${endY}, ${to.x} ${endY}`} />
          );
        })}
      </g>
      {LOGIC_RULES.map((rule) => (
        <g key={rule.label}>
          <rect x={rule.x} y={rule.y} width={RULE_SIZE.width} height={RULE_SIZE.height} strokeWidth={1.25} className="fill-background stroke-muted-foreground" />
          <BlueprintLabel x={rule.x + 16} y={rule.y + 33} size={12}>
            {rule.label}
          </BlueprintLabel>
        </g>
      ))}
    </LayerPlane>
  );
}
