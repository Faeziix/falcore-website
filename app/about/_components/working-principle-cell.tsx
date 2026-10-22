"use client";

import { PlottedLine } from "@/components/ui/plotted-line";
import { PlottedStrokeIcon } from "@/components/plotted-icon/plotted-stroke-icon";
import { usePlottedIconRedraw } from "@/components/plotted-icon/use-plotted-icon-redraw";
import type { WorkingPrinciple } from "../_lib/about-content";
import { WORKING_PRINCIPLE_ICON_STROKES } from "../_lib/working-principle-icon-strokes";

const iconLagSeconds = 0.2;

export function WorkingPrincipleCell({
  principle,
  delaySeconds,
}: {
  principle: WorkingPrinciple;
  delaySeconds: number;
}) {
  const { iconScope, redrawIcon } = usePlottedIconRedraw();

  return (
    <li
      onPointerEnter={redrawIcon}
      className="group relative flex flex-col gap-6 p-6 transition-colors duration-500 ease-out-expo hover:bg-surface/60 lg:p-8"
    >
      <PlottedLine orientation="horizontal" delaySeconds={delaySeconds} className="inset-x-0 bottom-0" />
      <PlottedLine orientation="vertical" delaySeconds={delaySeconds} className="inset-y-0 right-0" />
      <PlottedStrokeIcon
        ref={iconScope}
        strokes={WORKING_PRINCIPLE_ICON_STROKES[principle.icon]}
        delaySeconds={delaySeconds + iconLagSeconds}
      />
      <div>
        <h3 className="font-display text-lg font-medium text-foreground">{principle.title}</h3>
        <p className="mt-2 leading-relaxed text-foreground-soft transition-colors duration-500 ease-out-expo group-hover:text-foreground">
          {principle.description}
        </p>
      </div>
    </li>
  );
}
