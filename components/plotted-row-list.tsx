"use client";

import Link from "next/link";
import { motion } from "motion/react";
import { PlottedLine, plotOnViewProps } from "@/components/ui/plotted-line";
import { textLinkVariants } from "@/components/ui/text-link";
import { cn } from "@/lib/utils";

const rowStaggerSeconds = 0.12;

export type PlottedRow = {
  title: string;
  description: string;
  link?: { href: string; label: string };
};

export function PlottedRowList({ rows, className }: { rows: PlottedRow[]; className?: string }) {
  return (
    <motion.ul {...plotOnViewProps} className={cn("relative mt-12", className)}>
      {rows.map((row, index) => (
        <li key={row.title} className="group relative grid gap-3 py-8 md:grid-cols-12 md:gap-8">
          <PlottedLine
            orientation="horizontal"
            delaySeconds={index * rowStaggerSeconds}
            className="inset-x-0 top-0"
          />
          <span
            aria-hidden
            className="pointer-events-none absolute inset-x-0 top-0 z-20 h-px origin-right scale-x-0 bg-accent transition-[scale] duration-500 ease-out-expo group-hover:origin-left group-hover:scale-x-100"
          />
          <h3 className="font-display text-xl font-medium text-foreground md:col-span-5">{row.title}</h3>
          <div className="md:col-span-7">
            <p className="leading-relaxed text-foreground-soft transition-colors duration-500 ease-out-expo group-hover:text-foreground">
              {row.description}
            </p>
            {row.link && (
              <Link
                href={row.link.href}
                className={textLinkVariants({
                  tone: "muted",
                  size: "sm",
                  underline: "always",
                  className: "mt-4",
                })}
              >
                {row.link.label}
              </Link>
            )}
          </div>
        </li>
      ))}
      <PlottedLine
        orientation="horizontal"
        delaySeconds={rows.length * rowStaggerSeconds}
        className="inset-x-0 bottom-0"
      />
    </motion.ul>
  );
}
