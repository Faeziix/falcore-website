import { BlueprintLabel } from "../blueprint-label";
import { TOTAL_QUOTES } from "./agent-run-data";

const STACK_LEFT = 1150;
const STACK_BASE = 704;
const VISIBLE_PAGES = 5;

export function AgentOutputStack({ quotesWritten }: { quotesWritten: number }) {
  return (
    <g>
      {Array.from({ length: VISIBLE_PAGES }, (_, index) => {
        const x = STACK_LEFT + index * 14;
        const y = STACK_BASE - index * 8;
        const isNewest = index === VISIBLE_PAGES - 1;
        return (
          <path
            key={index}
            d={`M ${x} ${y} h 40 l 10 10 v 46 h -50 z`}
            strokeWidth={1.25}
            className={isNewest ? "fill-background stroke-primary" : "fill-background stroke-muted-foreground"}
          />
        );
      })}
      <BlueprintLabel x={STACK_LEFT + 132} y={STACK_BASE + 22} tone="line" size={12}>
        {`${quotesWritten} QUOTES READY`}
      </BlueprintLabel>
      <BlueprintLabel x={STACK_LEFT + 132} y={STACK_BASE + 42} size={12}>
        {`${TOTAL_QUOTES - quotesWritten} TO GO`}
      </BlueprintLabel>
    </g>
  );
}
