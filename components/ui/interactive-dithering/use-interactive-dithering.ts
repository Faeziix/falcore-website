"use client";

import { useEffect, type RefObject } from "react";
import { createDitheringRenderer, type DitheringRenderer } from "./create-dithering-renderer";
import { createPointerField } from "./create-pointer-field";
import type { SmokeStroke } from "./create-smoke-flow-pass";
import { ditheringPresets, ditheringTuning, type DitheringPreset, type DitheringPresetName } from "./dithering-tuning";
import { readCssColorToken } from "./read-css-color-token";

const maxFrameDeltaSeconds = 0.1;
const idleStartTimeoutMilliseconds = 2000;

const stillStroke: SmokeStroke = {
  strokeStartX: 0,
  strokeStartY: 0,
  strokeEndX: 0,
  strokeEndY: 0,
  pointerVelocityX: 0,
  pointerVelocityY: 0,
  smokeEmission: 0,
};

function markCanvasReady(canvas: HTMLCanvasElement) {
  canvas.dataset.ditheringReady = "";
}

function runWhenBrowserIsIdle(callback: () => void) {
  if (typeof window.requestIdleCallback === "function") {
    const idleCallbackId = window.requestIdleCallback(callback, { timeout: idleStartTimeoutMilliseconds });
    return () => window.cancelIdleCallback(idleCallbackId);
  }
  const timeoutId = window.setTimeout(callback, 0);
  return () => window.clearTimeout(timeoutId);
}

function runOnceVisibleAndIdle(canvas: HTMLCanvasElement, callback: () => void) {
  let cancelIdleWait: (() => void) | null = null;
  const firstVisibilityObserver = new IntersectionObserver(([entry]) => {
    if (!entry.isIntersecting) return;
    firstVisibilityObserver.disconnect();
    cancelIdleWait = runWhenBrowserIsIdle(callback);
  });
  firstVisibilityObserver.observe(canvas);

  return () => {
    firstVisibilityObserver.disconnect();
    cancelIdleWait?.();
  };
}

function observeCanvasSize(canvas: HTMLCanvasElement, onResize: (cssWidth: number, cssHeight: number) => void) {
  const resizeObserver = new ResizeObserver(([entry]) => {
    onResize(entry.contentRect.width, entry.contentRect.height);
  });
  resizeObserver.observe(canvas);
  return () => resizeObserver.disconnect();
}

function startStillDithering(canvas: HTMLCanvasElement, renderer: DitheringRenderer) {
  const stopObservingSize = observeCanvasSize(canvas, (cssWidth, cssHeight) => {
    renderer.resize(cssWidth, cssHeight);
    renderer.render({ time: 0, deltaSeconds: 0, stroke: stillStroke });
    markCanvasReady(canvas);
  });

  return () => {
    stopObservingSize();
    renderer.dispose();
  };
}

function startAnimatedDithering(canvas: HTMLCanvasElement, renderer: DitheringRenderer, preset: DitheringPreset) {
  const stopObservingSize = observeCanvasSize(canvas, (cssWidth, cssHeight) => renderer.resize(cssWidth, cssHeight));
  const pointerField = createPointerField(canvas);
  let animationFrameId = 0;
  let previousTimestamp: number | null = null;
  let patternTime = 0;
  let timeScale: number = preset.idleTimeScale;

  function renderNextFrame(timestamp: number) {
    const deltaSeconds = previousTimestamp === null ? 0 : Math.min(maxFrameDeltaSeconds, (timestamp - previousTimestamp) / 1000);
    previousTimestamp = timestamp;

    const { pointerPresence, stroke } = pointerField.advance(deltaSeconds);
    const targetTimeScale = preset.idleTimeScale + (preset.activeTimeScale - preset.idleTimeScale) * pointerPresence;
    timeScale += (targetTimeScale - timeScale) * (1 - Math.exp(-ditheringTuning.timeScaleFollowRate * deltaSeconds));
    patternTime += deltaSeconds * timeScale;

    renderer.render({ time: patternTime, deltaSeconds, stroke });
    markCanvasReady(canvas);
    animationFrameId = requestAnimationFrame(renderNextFrame);
  }

  function startLoop() {
    if (animationFrameId) return;
    previousTimestamp = null;
    animationFrameId = requestAnimationFrame(renderNextFrame);
  }

  function stopLoop() {
    cancelAnimationFrame(animationFrameId);
    animationFrameId = 0;
  }

  const visibilityObserver = new IntersectionObserver(([entry]) => {
    if (entry.isIntersecting) startLoop();
    else stopLoop();
  });
  visibilityObserver.observe(canvas);

  return () => {
    stopLoop();
    visibilityObserver.disconnect();
    stopObservingSize();
    pointerField.dispose();
    renderer.dispose();
  };
}

function startDithering(canvas: HTMLCanvasElement, presetName: DitheringPresetName) {
  const preset = ditheringPresets[presetName];
  const renderer = createDitheringRenderer(
    canvas,
    {
      ink: readCssColorToken(preset.colorTokens.ink),
      backdrop: readCssColorToken(preset.colorTokens.backdrop),
    },
    preset,
  );
  if (!renderer) return null;

  return renderer.isSoftwareRendered
    ? startStillDithering(canvas, renderer)
    : startAnimatedDithering(canvas, renderer, preset);
}

export function useInteractiveDithering(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  presetName: DitheringPresetName,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let stopDithering: (() => void) | null = null;
    const cancelDeferredStart = runOnceVisibleAndIdle(canvas, () => {
      stopDithering = startDithering(canvas, presetName);
    });

    return () => {
      cancelDeferredStart();
      stopDithering?.();
    };
  }, [canvasRef, presetName]);
}
