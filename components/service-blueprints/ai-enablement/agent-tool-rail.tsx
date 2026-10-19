import { cn } from "@/lib/utils";
import { BlueprintLabel, BlueprintText } from "../blueprint-label";
import { AGENT_TOOLS, TOOL_RAIL, TOTAL_QUOTES, type AgentToolGlyph } from "./agent-run-data";

function ToolGlyphShape({ glyph, x, y }: { glyph: AgentToolGlyph; x: number; y: number }) {
  switch (glyph) {
    case "stack":
      return (
        <>
          {[10, 17, 24].map((offset) => (
            <rect key={offset} x={x + 9} y={y + offset - 3} width={18} height={5} />
          ))}
        </>
      );
    case "grid":
      return (
        <>
          <rect x={x + 9} y={y + 9} width={18} height={18} />
          <path d={`M ${x + 9} ${y + 15} H ${x + 27} M ${x + 9} ${y + 21} H ${x + 27} M ${x + 15} ${y + 9} V ${y + 27}`} />
        </>
      );
    case "page":
      return <path d={`M ${x + 11} ${y + 8} h 10 l 5 5 v 15 h -15 z M ${x + 21} ${y + 8} v 5 h 5 M ${x + 14} ${y + 18} h 9 M ${x + 14} ${y + 22} h 7`} />;
    case "envelope":
      return (
        <>
          <rect x={x + 8} y={y + 11} width={20} height={14} />
          <path d={`M ${x + 8} ${y + 11} l 10 8 l 10 -8`} />
        </>
      );
    case "calendar":
      return (
        <>
          <rect x={x + 9} y={y + 10} width={18} height={17} />
          <path d={`M ${x + 9} ${y + 15} H ${x + 27} M ${x + 13} ${y + 7} V ${y + 12} M ${x + 23} ${y + 7} V ${y + 12}`} />
        </>
      );
    case "globe":
      return (
        <>
          <circle cx={x + 18} cy={y + 18} r={9} />
          <ellipse cx={x + 18} cy={y + 18} rx={4} ry={9} />
          <line x1={x + 9} y1={y + 18} x2={x + 27} y2={y + 18} />
        </>
      );
  }
}

type AgentToolRailProps = {
  connectorOrigin: { x: number; y: number };
  isWriting: boolean;
  quotesWritten: number;
};

export function AgentToolRail({ connectorOrigin, isWriting, quotesWritten }: AgentToolRailProps) {
  return (
    <g>
      {AGENT_TOOLS.map((tool, index) => {
        const cardY = TOOL_RAIL.firstY + index * TOOL_RAIL.spacing;
        const centerY = cardY + TOOL_RAIL.cardHeight / 2;
        const isLive = tool.isWriter && isWriting;
        const cardTone = isLive ? "stroke-primary" : tool.wasUsed || tool.isWriter ? "stroke-foreground" : "stroke-muted-foreground";
        const connectorTone = isLive ? "stroke-primary" : tool.wasUsed || tool.isWriter ? "stroke-muted-foreground" : "stroke-border-strong";
        const handle = (TOOL_RAIL.x - connectorOrigin.x) * 0.5;
        const state = tool.isWriter ? `WRITING  ${quotesWritten} / ${TOTAL_QUOTES}` : tool.state;
        return (
          <g key={tool.name}>
            <path
              d={`M ${connectorOrigin.x} ${connectorOrigin.y} C ${connectorOrigin.x + handle} ${connectorOrigin.y}, ${TOOL_RAIL.x - handle} ${centerY}, ${TOOL_RAIL.x} ${centerY}`}
              fill="none"
              strokeWidth={isLive ? 2 : 1}
              strokeDasharray={isLive ? undefined : "4 5"}
              className={cn("transition-[stroke] duration-300", connectorTone)}
            />
            <rect
              x={TOOL_RAIL.x}
              y={cardY}
              width={TOOL_RAIL.cardWidth}
              height={TOOL_RAIL.cardHeight}
              strokeWidth={1.25}
              className={cn("fill-background transition-[stroke] duration-300", cardTone)}
            />
            <rect x={TOOL_RAIL.x + 12} y={cardY + 12} width={36} height={36} fill="none" className="stroke-border-strong" />
            <g fill="none" strokeWidth={1.25} className={cn("transition-[stroke] duration-300", cardTone)}>
              <ToolGlyphShape glyph={tool.glyph} x={TOOL_RAIL.x + 12} y={cardY + 12} />
            </g>
            <BlueprintText x={TOOL_RAIL.x + 62} y={centerY + 6}>
              {tool.name}
            </BlueprintText>
            <BlueprintLabel x={TOOL_RAIL.x + TOOL_RAIL.cardWidth - 14} y={centerY + 5} tone={isLive ? "signal" : "soft"} anchor="end" size={11}>
              {state}
            </BlueprintLabel>
          </g>
        );
      })}
    </g>
  );
}
