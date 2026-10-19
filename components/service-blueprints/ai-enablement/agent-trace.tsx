import { BlueprintLabel } from "../blueprint-label";
import { COMPLETED_TRACE_LINES, QUOTE_CLIENT_FILE_NAMES, TOTAL_QUOTES } from "./agent-run-data";

const TRACE_LEFT = 530;
const TRACE_TOP = 676;
const TRACE_WIDTH = 560;
const ROW_SPACING = 24;

function quoteTimestamp(quotesWritten: number) {
  const totalSeconds = 16 * 60 + 41 + (quotesWritten - 9) * 23;
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = String(totalSeconds % 60).padStart(2, "0");
  return `09:${minutes}:${seconds}`;
}

export function AgentTrace({ quotesWritten }: { quotesWritten: number }) {
  const latestLine = {
    time: quoteTimestamp(quotesWritten),
    verb: "WRITE",
    detail: `quotes / ${QUOTE_CLIENT_FILE_NAMES[(quotesWritten - 9) % QUOTE_CLIENT_FILE_NAMES.length]}`,
    result: `${quotesWritten} of ${TOTAL_QUOTES}`,
  };
  const lines = [...COMPLETED_TRACE_LINES, latestLine];
  const cursorBaseline = TRACE_TOP + 40 + (lines.length - 1) * ROW_SPACING;
  return (
    <g>
      <BlueprintLabel x={TRACE_LEFT} y={TRACE_TOP} size={12}>
        TRACE
      </BlueprintLabel>
      <line x1={TRACE_LEFT} y1={TRACE_TOP + 12} x2={TRACE_LEFT + TRACE_WIDTH} y2={TRACE_TOP + 12} className="stroke-border-strong" />
      {lines.map((line, index) => {
        const baseline = TRACE_TOP + 40 + index * ROW_SPACING;
        const isLatest = index === lines.length - 1;
        return (
          <g key={line.verb + line.detail}>
            <BlueprintLabel x={TRACE_LEFT} y={baseline} tone="faint" size={12}>
              {line.time}
            </BlueprintLabel>
            <BlueprintLabel x={TRACE_LEFT + 92} y={baseline} tone={isLatest ? "signal" : "soft"} size={12}>
              {line.verb}
            </BlueprintLabel>
            <BlueprintLabel x={TRACE_LEFT + 160} y={baseline} tone={isLatest ? "line" : "soft"} size={12}>
              {line.detail}
            </BlueprintLabel>
            <BlueprintLabel x={TRACE_LEFT + TRACE_WIDTH} y={baseline} tone={isLatest ? "signal" : "soft"} anchor="end" size={12}>
              {line.result}
            </BlueprintLabel>
          </g>
        );
      })}
      <rect x={TRACE_LEFT + TRACE_WIDTH + 6} y={cursorBaseline - 12} width={7} height={15} className="fill-primary motion-safe:animate-caret-blink" />
    </g>
  );
}
