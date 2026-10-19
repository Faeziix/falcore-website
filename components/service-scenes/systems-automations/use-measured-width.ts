"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useTransform } from "motion/react";
import { EXPO_OUT } from "./workflow-story";

export function useMeasuredWidth(estimatedWidth: string) {
  const measurerReference = useRef<HTMLSpanElement>(null);
  const pixelWidth = useMotionValue(0);
  const [hasMeasured, setHasMeasured] = useState(false);
  const measuredWidth = useTransform(pixelWidth, (width) => `${Math.ceil(width)}px`);

  useEffect(() => {
    const measurer = measurerReference.current;
    if (!measurer) return;
    let isFirstMeasurement = true;
    let resize: ReturnType<typeof animate> | null = null;
    const observer = new ResizeObserver(() => {
      const nextWidth = measurer.getBoundingClientRect().width;
      resize?.stop();
      if (isFirstMeasurement) {
        pixelWidth.set(nextWidth);
        isFirstMeasurement = false;
        setHasMeasured(true);
        return;
      }
      resize = animate(pixelWidth, nextWidth, { duration: 0.6, ease: EXPO_OUT });
    });
    observer.observe(measurer);
    return () => {
      observer.disconnect();
      resize?.stop();
    };
  }, [pixelWidth]);

  return { measurerReference, width: hasMeasured ? measuredWidth : estimatedWidth };
}
