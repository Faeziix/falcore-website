"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import type { DitheringPresetName } from "./dithering-tuning";
import { useInteractiveDithering } from "./use-interactive-dithering";

interface InteractiveDitheringBackgroundProps {
  preset?: DitheringPresetName;
  className?: string;
}

export function InteractiveDitheringBackground({ preset = "hero", className }: InteractiveDitheringBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useInteractiveDithering(canvasRef, preset);

  return <canvas ref={canvasRef} aria-hidden className={cn("block size-full", className)} />;
}
