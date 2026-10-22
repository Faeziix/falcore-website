"use client";

import { motion } from "motion/react";
import { PlottedLine, plotOnViewProps } from "@/components/ui/plotted-line";
import { WORKING_PRINCIPLES } from "../_lib/about-content";
import { WorkingPrincipleCell } from "./working-principle-cell";

const cellStaggerSeconds = 0.07;

export function WorkingPrincipleGrid() {
  return (
    <motion.ul {...plotOnViewProps} className="relative mt-12 grid sm:grid-cols-2 lg:grid-cols-4">
      <PlottedLine orientation="horizontal" className="inset-x-0 top-0" />
      <PlottedLine orientation="vertical" className="inset-y-0 left-0" />
      {WORKING_PRINCIPLES.map((principle, index) => (
        <WorkingPrincipleCell
          key={principle.title}
          principle={principle}
          delaySeconds={(index + 1) * cellStaggerSeconds}
        />
      ))}
    </motion.ul>
  );
}
