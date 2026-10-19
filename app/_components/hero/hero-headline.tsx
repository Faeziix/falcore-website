"use client";

import { motion, useReducedMotion } from "motion/react";

const HEADLINE_LINES = ["The technical arm", "your business", "is missing."];

export function HeroHeadline() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <h1 className="font-display text-display-xl font-medium text-foreground">
      {HEADLINE_LINES.map((line, index) => (
        <span key={line} className="block overflow-clip pb-[0.06em]">
          <motion.span
            className="block"
            initial={prefersReducedMotion ? false : { y: "105%" }}
            animate={{ y: "0%" }}
            transition={{
              duration: 1.1,
              delay: 0.15 + index * 0.12,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h1>
  );
}
