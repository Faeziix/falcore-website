"use client";

import { useEffect, type RefObject } from "react";
import { createDitheringRenderer, type DitheringFrame } from "./create-dithering-renderer";
import { createPointerField } from "./create-pointer-field";
import { ditheringPresets, ditheringTuning, type DitheringPresetName } from "./dithering-tuning";
import { readCssColorToken } from "./read-css-color-token";

const maxFrameDeltaSeconds = 0.1;

const stillFrame: DitheringFrame = {
  time: ditheringTuning.reducedMotionFrozenTime,
  deltaSeconds: 0,
  stroke: {
    strokeStartX: 0,
    strokeStartY: 0,
    strokeEndX: 0,
    strokeEndY: 0,
    pointerVelocityX: 0,
    pointerVelocityY: 0,
    smokeEmission: 0,
  },
};

export function useInteractiveDithering(
  canvasRef: RefObject<HTMLCanvasElement | null>,
  isMotionReduced: boolean,
  presetName: DitheringPresetName,
) {
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const preset = ditheringPresets[presetName];
    const renderer = createDitheringRenderer(
      canvas,
      {
        ink: readCssColorToken(preset.colorTokens.ink),
        backdrop: readCssColorToken(preset.colorTokens.backdrop),
      },
      preset,
    );
    if (!renderer) return;

    const resizeObserver = new ResizeObserver(([entry]) => {
      renderer.resize(entry.contentRect.width, entry.contentRect.height);
      if (isMotionReduced) renderer.render(stillFrame);
    });
    resizeObserver.observe(canvas);

    if (isMotionReduced) {
      return () => {
        resizeObserver.disconnect();
        renderer.dispose();
      };
    }

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

      renderer!.render({ time: patternTime, deltaSeconds, stroke });
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
      resizeObserver.disconnect();
      pointerField.dispose();
      renderer.dispose();
    };
  }, [canvasRef, isMotionReduced, presetName]);
}
