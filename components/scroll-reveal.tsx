"use client";

import { motion } from "framer-motion";
import { springTransition } from "@/lib/motion";

type Direction = "up" | "left" | "right";

interface ScrollRevealProps {
  children: React.ReactNode;
  delay?: number;
  direction?: Direction;
  className?: string;
}

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 40 },
  left: { x: -40 },
  right: { x: 40 },
};

export default function ScrollReveal({
  children,
  delay = 0,
  direction = "up",
  className,
}: ScrollRevealProps) {
  const offset = offsets[direction];

  return (
    <motion.div
      initial={{ opacity: 0, ...offset }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ ...springTransition, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
