"use client";

import { useEffect, useRef } from "react";
import { excerptRevealWindow } from "../_lib/book-excerpt";

type MeasuredWord = {
  element: HTMLSpanElement;
  offsetTop: number;
  offsetLeft: number;
};

function clampToUnit(value: number) {
  return Math.min(1, Math.max(0, value));
}

function readRestingState(container: HTMLElement) {
  const computedStyle = getComputedStyle(container);
  return {
    opacity: Number.parseFloat(computedStyle.getPropertyValue("--sanaa-ouahmane-excerpt-resting-opacity")) || 0.1,
    blurInPixels: Number.parseFloat(computedStyle.getPropertyValue("--sanaa-ouahmane-excerpt-resting-blur")) || 4,
  };
}

export function SharpeningExcerpt({ text, className }: { text: string; className?: string }) {
  const containerRef = useRef<HTMLParagraphElement>(null);
  const wordRefs = useRef<HTMLSpanElement[]>([]);
  const words = text.split(" ");

  useEffect(() => {
    const container = containerRef.current;
    const wordElements = wordRefs.current.filter(Boolean);
    if (!container) return;

    const restingState = readRestingState(container);
    let measuredWords: MeasuredWord[] = [];
    let lineHeightInPixels = 0;
    let containerWidth = 1;
    let pendingFrame = 0;
    let isNearViewport = false;

    function measureWords() {
      if (!container) return;
      lineHeightInPixels = Number.parseFloat(getComputedStyle(container).lineHeight) || 0;
      containerWidth = container.clientWidth || 1;
      measuredWords = wordElements.map((element) => ({
        element,
        offsetTop: element.offsetTop,
        offsetLeft: element.offsetLeft,
      }));
    }

    function paintWords() {
      pendingFrame = 0;
      if (!container) return;
      const viewportHeight = window.innerHeight;
      const revealStart = viewportHeight * excerptRevealWindow.startsAtViewportFraction;
      const revealEnd = viewportHeight * excerptRevealWindow.endsAtViewportFraction;
      const containerTop = container.getBoundingClientRect().top;

      for (const word of measuredWords) {
        const sweepOffset =
          (word.offsetLeft / containerWidth) * lineHeightInPixels * excerptRevealWindow.lineSweepFraction;
        const wordPosition = containerTop + word.offsetTop + sweepOffset;
        const progress = clampToUnit((revealStart - wordPosition) / (revealStart - revealEnd));
        const opacity = restingState.opacity + (1 - restingState.opacity) * progress;
        const blurInPixels = restingState.blurInPixels * (1 - progress);
        word.element.style.opacity = progress >= 1 ? "1" : opacity.toFixed(3);
        word.element.style.filter = blurInPixels < 0.05 ? "none" : `blur(${blurInPixels.toFixed(2)}px)`;
      }
    }

    function requestPaint() {
      if (!isNearViewport || pendingFrame) return;
      pendingFrame = window.requestAnimationFrame(paintWords);
    }

    function remeasureAndPaint() {
      measureWords();
      paintWords();
    }

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => {
        isNearViewport = entry.isIntersecting;
        if (isNearViewport) requestPaint();
      },
      { rootMargin: "50% 0px 50% 0px" }
    );
    const resizeObserver = new ResizeObserver(remeasureAndPaint);

    remeasureAndPaint();
    visibilityObserver.observe(container);
    resizeObserver.observe(container);
    window.addEventListener("scroll", requestPaint, { passive: true });
    window.addEventListener("resize", requestPaint);

    return () => {
      visibilityObserver.disconnect();
      resizeObserver.disconnect();
      window.removeEventListener("scroll", requestPaint);
      window.removeEventListener("resize", requestPaint);
      if (pendingFrame) window.cancelAnimationFrame(pendingFrame);
    };
  }, []);

  return (
    <p ref={containerRef} className={className} style={{ position: "relative" }}>
      {words.map((word, wordPosition) => (
        <span key={`${word}-${wordPosition}`}>
          <span
            ref={(element) => {
              if (element) wordRefs.current[wordPosition] = element;
            }}
            className="inline-block"
          >
            {word}
          </span>
          {wordPosition < words.length - 1 ? " " : null}
        </span>
      ))}
    </p>
  );
}
