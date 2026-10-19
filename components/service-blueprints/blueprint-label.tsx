import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { fillToneClassName, type BlueprintTone } from "./blueprint-canvas";

type BlueprintLabelProps = {
  x: number;
  y: number;
  children: ReactNode;
  tone?: BlueprintTone;
  anchor?: "start" | "middle" | "end";
  size?: number;
};

export function BlueprintLabel({ x, y, children, tone = "soft", anchor = "start", size = 13 }: BlueprintLabelProps) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      fontSize={size}
      letterSpacing={1.5}
      className={cn("font-mono stroke-none", fillToneClassName[tone])}
    >
      {children}
    </text>
  );
}

export function BlueprintText({
  x,
  y,
  children,
  tone = "line",
  size = 16,
  anchor = "start",
}: BlueprintLabelProps) {
  return (
    <text x={x} y={y} textAnchor={anchor} fontSize={size} className={cn("font-sans stroke-none", fillToneClassName[tone])}>
      {children}
    </text>
  );
}
