"use client";

import { PlottedLine } from "@/components/ui/plotted-line";
import type { Service } from "@/lib/data/services";
import { InclusionIcon } from "./inclusion-icon";
import { usePlottedIconRedraw } from "@/components/plotted-icon/use-plotted-icon-redraw";

const iconLagSeconds = 0.2;

export function InclusionCell({
  inclusion,
  delaySeconds,
}: {
  inclusion: Service["inclusions"][number];
  delaySeconds: number;
}) {
  const { iconScope, redrawIcon } = usePlottedIconRedraw();

  return (
    <li
      onPointerEnter={redrawIcon}
      className="relative flex flex-col gap-6 p-6 text-foreground-soft transition-colors duration-500 ease-out-expo hover:bg-surface/60 hover:text-foreground lg:p-8"
    >
      <PlottedLine
        orientation="horizontal"
        delaySeconds={delaySeconds}
        className="inset-x-0 bottom-0"
      />
      <PlottedLine
        orientation="vertical"
        delaySeconds={delaySeconds}
        className="inset-y-0 right-0"
      />
      <InclusionIcon
        ref={iconScope}
        icon={inclusion.icon}
        delaySeconds={delaySeconds + iconLagSeconds}
      />
      {inclusion.label}
    </li>
  );
}
