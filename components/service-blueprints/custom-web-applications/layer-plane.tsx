import type { ReactNode } from "react";
import type { BlueprintTone } from "../blueprint-canvas";
import { strokeToneClassName } from "../blueprint-canvas";
import { BlueprintLabel } from "../blueprint-label";
import { LAYER_PLANE } from "./application-layers";

export function LayerPlane({ label, tone, children }: { label: string; tone: BlueprintTone; children: ReactNode }) {
  return (
    <svg
      viewBox={`0 0 ${LAYER_PLANE.width} ${LAYER_PLANE.height}`}
      width={LAYER_PLANE.width}
      height={LAYER_PLANE.height}
      overflow="visible"
      className="absolute inset-0"
    >
      <rect
        width={LAYER_PLANE.width}
        height={LAYER_PLANE.height}
        fillOpacity={0.94}
        strokeWidth={1.25}
        className={`fill-blueprint-paper ${strokeToneClassName[tone]}`}
      />
      <BlueprintLabel x={0} y={-14} tone={tone} size={14}>
        {label}
      </BlueprintLabel>
      {children}
    </svg>
  );
}
