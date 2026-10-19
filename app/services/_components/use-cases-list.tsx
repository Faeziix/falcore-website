"use client";

import { motion } from "motion/react";
import { PlottedLine, plotOnViewProps } from "@/components/ui/plotted-line";
import type { Service } from "@/lib/data/services";

const rowStaggerSeconds = 0.12;

export function UseCasesList({ useCases }: { useCases: Service["useCases"] }) {
  return (
    <motion.ul {...plotOnViewProps} className="relative mt-12">
      {useCases.map((useCase, index) => (
        <li
          key={useCase.title}
          className="group relative grid gap-3 py-8 md:grid-cols-12 md:gap-8"
        >
          <PlottedLine
            orientation="horizontal"
            delaySeconds={index * rowStaggerSeconds}
            className="inset-x-0 top-0"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-right scale-x-0 bg-accent transition-[scale] duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
          />
          <h3 className="font-display text-xl font-medium text-foreground md:col-span-5">
            {useCase.title}
          </h3>
          <p className="leading-relaxed text-foreground-soft transition-colors duration-500 ease-out-expo group-hover:text-foreground md:col-span-7">
            {useCase.description}
          </p>
        </li>
      ))}
      <PlottedLine
        orientation="horizontal"
        delaySeconds={useCases.length * rowStaggerSeconds}
        className="inset-x-0 bottom-0"
      />
    </motion.ul>
  );
}
