"use client";

import { useEffect, useRef, useState } from "react";
import { animate, useMotionValue, useMotionValueEvent } from "motion/react";
import { EASE_OUT_EXPO } from "./custom-web-applications-story";

type CountingValueProps = {
  targetValue: number;
  isCounted: boolean;
  prefix: string;
  suffix: string;
};

export function CountingValue({ targetValue, isCounted, prefix, suffix }: CountingValueProps) {
  const formatValue = (value: number) => `${prefix}${Math.round(value)}${suffix}`;
  const shownValue = isCounted ? targetValue : 0;
  const [firstRenderedText] = useState(() => formatValue(shownValue));
  const textReference = useRef<HTMLSpanElement>(null);
  const countedValue = useMotionValue(shownValue);

  useMotionValueEvent(countedValue, "change", (latestValue) => {
    if (textReference.current) textReference.current.textContent = formatValue(latestValue);
  });

  useEffect(() => {
    const isCountingUp = shownValue > countedValue.get();
    const controls = animate(countedValue, shownValue, {
      duration: isCountingUp ? 1.8 : 0.5,
      ease: isCountingUp ? EASE_OUT_EXPO : "easeIn",
    });
    return () => controls.stop();
  }, [shownValue, countedValue]);

  return (
    <span ref={textReference} className="tabular-nums">
      {firstRenderedText}
    </span>
  );
}
