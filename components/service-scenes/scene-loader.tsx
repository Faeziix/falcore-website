"use client";

import { motion } from "motion/react";
import { sceneUnits } from "./scene-units";

const LOADER_CELLS = [0, 1, 3, 2];

export function SceneLoader({ isPlaying }: { isPlaying: boolean }) {
  return (
    <span className="grid shrink-0 grid-cols-2" style={{ width: sceneUnits(11), height: sceneUnits(11), gap: sceneUnits(1.5) }}>
      {[0, 1, 2, 3].map((cellIndex) => (
        <motion.span
          key={cellIndex}
          className="block bg-foreground"
          initial={{ opacity: 0.25 }}
          animate={isPlaying ? { opacity: [0.25, 1, 0.25] } : { opacity: cellIndex === 0 ? 1 : 0.25 }}
          transition={
            isPlaying
              ? { duration: 1, repeat: Infinity, delay: LOADER_CELLS.indexOf(cellIndex) * 0.25, ease: "easeInOut" }
              : { duration: 0 }
          }
        />
      ))}
    </span>
  );
}
