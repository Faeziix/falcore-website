"use client";

import { useCallback, useRef } from "react";
import { useAnimate, useReducedMotion } from "motion/react";
import { easeOutExpo } from "@/lib/motion";
import {
  outlineDrawSeconds,
  signalDrawSeconds,
  signalLagSeconds,
} from "./inclusion-icon";

const outlineStrokeSelector = '[data-icon-tone="outline"], [data-icon-tone="detail"]';
const signalStrokeSelector = '[data-icon-tone="signal"]';

export function useIconRedraw() {
  const [iconScope, animate] = useAnimate<SVGSVGElement>();
  const prefersReducedMotion = useReducedMotion();
  const isRedrawing = useRef(false);

  const redrawIcon = useCallback(async () => {
    const icon = iconScope.current;
    if (prefersReducedMotion || isRedrawing.current || !icon) return;

    isRedrawing.current = true;
    const outlineStrokes = icon.querySelectorAll(outlineStrokeSelector);
    const signalStrokes = icon.querySelectorAll(signalStrokeSelector);
    animate(signalStrokes, { pathLength: 0 }, { duration: 0 });
    await Promise.all([
      animate(
        outlineStrokes,
        { pathLength: [0, 1] },
        { duration: outlineDrawSeconds, ease: easeOutExpo },
      ),
      animate(
        signalStrokes,
        { pathLength: [0, 1] },
        { duration: signalDrawSeconds, delay: signalLagSeconds, ease: easeOutExpo },
      ),
    ]);
    isRedrawing.current = false;
  }, [animate, iconScope, prefersReducedMotion]);

  return { iconScope, redrawIcon };
}
