"use client";

import { useRef } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useInteractiveDithering } from "./use-interactive-dithering";

interface InteractiveDitheringBackgroundProps {
  className?: string;
}

export function InteractiveDitheringBackground({ className }: InteractiveDitheringBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const isMotionReduced = useReducedMotion() ?? false;

  useInteractiveDithering(canvasRef, isMotionReduced);

  return <canvas ref={canvasRef} aria-hidden className={cn("block size-full", className)} />;
}
