"use client";

import { motion } from "motion/react";
import { PlottedLine, plotOnViewProps } from "@/components/ui/plotted-line";
import type { Service } from "@/lib/data/services";
import { InclusionCell } from "./inclusion-cell";

const cellStaggerSeconds = 0.07;

export function InclusionsGrid({ inclusions }: { inclusions: Service["inclusions"] }) {
  return (
    <motion.ul
      {...plotOnViewProps}
      className="relative mt-12 grid sm:grid-cols-2 lg:grid-cols-3"
    >
      <PlottedLine orientation="horizontal" className="inset-x-0 top-0" />
      <PlottedLine orientation="vertical" className="inset-y-0 left-0" />
      {inclusions.map((inclusion, index) => (
        <InclusionCell
          key={inclusion.label}
          inclusion={inclusion}
          delaySeconds={(index + 1) * cellStaggerSeconds}
        />
      ))}
    </motion.ul>
  );
}
