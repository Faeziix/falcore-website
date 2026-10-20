import type { CSSProperties } from "react";

export function revealOrder(order: number) {
  return { "--reveal-order": order } as CSSProperties;
}
