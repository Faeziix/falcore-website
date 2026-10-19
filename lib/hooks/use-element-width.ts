"use client";

import { useEffect, useState, type RefObject } from "react";

export function useElementWidth(elementReference: RefObject<HTMLElement | null>): number {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const element = elementReference.current;
    if (!element) return;
    const resizeObserver = new ResizeObserver(([entry]) => setWidth(entry.contentRect.width));
    resizeObserver.observe(element);
    return () => resizeObserver.disconnect();
  }, [elementReference]);

  return width;
}
