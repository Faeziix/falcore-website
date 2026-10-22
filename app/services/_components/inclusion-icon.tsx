"use client";

import type { Ref } from "react";
import { PlottedStrokeIcon } from "@/components/plotted-icon/plotted-stroke-icon";
import type { InclusionIconName } from "@/lib/data/services";
import { INCLUSION_ICON_STROKES } from "../_lib/inclusion-icon-strokes";

export function InclusionIcon({
  icon,
  delaySeconds,
  ref,
}: {
  icon: InclusionIconName;
  delaySeconds: number;
  ref?: Ref<SVGSVGElement>;
}) {
  return <PlottedStrokeIcon strokes={INCLUSION_ICON_STROKES[icon]} delaySeconds={delaySeconds} ref={ref} />;
}
