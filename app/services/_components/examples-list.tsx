"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PlottedLine, plotOnViewProps } from "@/components/ui/plotted-line";
import { textLinkVariants } from "@/components/ui/text-link";
import type { ServiceExample } from "@/lib/data/services";

const rowStaggerSeconds = 0.12;

export type ServiceExampleWithCaseStudyLink = ServiceExample & {
  caseStudyHref?: string;
};

export function ExamplesList({
  examples,
}: {
  examples: ServiceExampleWithCaseStudyLink[];
}) {
  return (
    <motion.ul {...plotOnViewProps} className="relative mt-12">
      {examples.map((example, index) => (
        <li
          key={example.title}
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
            {example.title}
          </h3>
          <div className="md:col-span-7">
            <p className="leading-relaxed text-foreground-soft transition-colors duration-500 ease-out-expo group-hover:text-foreground">
              {example.description}
            </p>
            {example.caseStudyHref && (
              <Link
                href={example.caseStudyHref}
                className={textLinkVariants({
                  tone: "muted",
                  size: "sm",
                  underline: "always",
                  className: "mt-4",
                })}
              >
                Read the case study
              </Link>
            )}
          </div>
        </li>
      ))}
      <PlottedLine
        orientation="horizontal"
        delaySeconds={examples.length * rowStaggerSeconds}
        className="inset-x-0 bottom-0"
      />
    </motion.ul>
  );
}
