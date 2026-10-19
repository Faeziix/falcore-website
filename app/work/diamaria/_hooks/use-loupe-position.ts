"use client";

import { useCallback, useEffect, useRef } from "react";
import type { KeyboardEvent, PointerEvent } from "react";
import {
  KEYBOARD_LARGE_STEP_SHARE_OF_STAGE,
  KEYBOARD_STEP_SHARE_OF_STAGE,
  POINTER_FOLLOW_SMOOTHING,
  RAW_FRAME_ASPECT_RATIO,
  RING_CENTRE_IN_RAW_FRAME,
  clampToStage,
  type StagePoint,
} from "../_lib/loupe-geometry";

const SETTLED_DISTANCE = 0.0005;

const arrowKeyDirections: Record<string, StagePoint> = {
  ArrowLeft: { x: -1, y: 0 },
  ArrowRight: { x: 1, y: 0 },
  ArrowUp: { x: 0, y: -1 },
  ArrowDown: { x: 0, y: 1 },
};

export function useLoupePosition() {
  const stageRef = useRef<HTMLDivElement>(null);
  const currentPointRef = useRef<StagePoint>(RING_CENTRE_IN_RAW_FRAME);
  const targetPointRef = useRef<StagePoint>(RING_CENTRE_IN_RAW_FRAME);
  const animationFrameRef = useRef<number | null>(null);
  const isDraggingLensRef = useRef(false);

  const paintPoint = useCallback((point: StagePoint) => {
    const stage = stageRef.current;
    if (!stage) return;
    stage.style.setProperty("--loupe-x", point.x.toFixed(4));
    stage.style.setProperty("--loupe-y", point.y.toFixed(4));
  }, []);

  const startGlide = useCallback(() => {
    function glideOneFrame() {
      const current = currentPointRef.current;
      const target = targetPointRef.current;
      const next = {
        x: current.x + (target.x - current.x) * POINTER_FOLLOW_SMOOTHING,
        y: current.y + (target.y - current.y) * POINTER_FOLLOW_SMOOTHING,
      };
      const hasSettled = Math.hypot(target.x - next.x, target.y - next.y) < SETTLED_DISTANCE;
      currentPointRef.current = hasSettled ? target : next;
      paintPoint(currentPointRef.current);
      animationFrameRef.current = hasSettled ? null : requestAnimationFrame(glideOneFrame);
    }
    animationFrameRef.current = requestAnimationFrame(glideOneFrame);
  }, [paintPoint]);

  const glideTo = useCallback(
    (point: StagePoint) => {
      targetPointRef.current = clampToStage(point);
      if (animationFrameRef.current === null) startGlide();
    },
    [startGlide]
  );

  const jumpTo = useCallback(
    (point: StagePoint) => {
      const clampedPoint = clampToStage(point);
      targetPointRef.current = clampedPoint;
      currentPointRef.current = clampedPoint;
      paintPoint(clampedPoint);
    },
    [paintPoint]
  );

  const stagePointFromPointer = useCallback((event: PointerEvent<HTMLElement>): StagePoint | null => {
    const stage = stageRef.current;
    if (!stage) return null;
    const stageBounds = stage.getBoundingClientRect();
    return {
      x: (event.clientX - stageBounds.left) / stageBounds.width,
      y: (event.clientY - stageBounds.top) / stageBounds.height,
    };
  }, []);

  useEffect(() => {
    return () => {
      if (animationFrameRef.current !== null) cancelAnimationFrame(animationFrameRef.current);
    };
  }, []);

  const handleStagePointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      const point = stagePointFromPointer(event);
      if (point) glideTo(point);
    },
    [glideTo, stagePointFromPointer]
  );

  const handleStagePointerLeave = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType !== "mouse") return;
      glideTo(RING_CENTRE_IN_RAW_FRAME);
    },
    [glideTo]
  );

  const handleStagePointerDown = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (event.pointerType === "mouse" || isDraggingLensRef.current) return;
      const point = stagePointFromPointer(event);
      if (point) glideTo(point);
    },
    [glideTo, stagePointFromPointer]
  );

  const handleLensPointerDown = useCallback((event: PointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "mouse") return;
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    isDraggingLensRef.current = true;
  }, []);

  const handleLensPointerMove = useCallback(
    (event: PointerEvent<HTMLDivElement>) => {
      if (!isDraggingLensRef.current) return;
      const point = stagePointFromPointer(event);
      if (point) jumpTo(point);
    },
    [jumpTo, stagePointFromPointer]
  );

  const handleLensPointerRelease = useCallback(() => {
    isDraggingLensRef.current = false;
  }, []);

  const handleLensKeyDown = useCallback(
    (event: KeyboardEvent<HTMLDivElement>) => {
      if (event.key === "Home") {
        event.preventDefault();
        glideTo(RING_CENTRE_IN_RAW_FRAME);
        return;
      }
      const direction = arrowKeyDirections[event.key];
      if (!direction) return;
      event.preventDefault();
      const step = event.shiftKey ? KEYBOARD_LARGE_STEP_SHARE_OF_STAGE : KEYBOARD_STEP_SHARE_OF_STAGE;
      const target = targetPointRef.current;
      glideTo({ x: target.x + direction.x * step, y: target.y + direction.y * step * RAW_FRAME_ASPECT_RATIO });
    },
    [glideTo]
  );

  return {
    stageRef,
    stageHandlers: {
      onPointerMove: handleStagePointerMove,
      onPointerLeave: handleStagePointerLeave,
      onPointerDown: handleStagePointerDown,
    },
    lensHandlers: {
      onPointerDown: handleLensPointerDown,
      onPointerMove: handleLensPointerMove,
      onPointerUp: handleLensPointerRelease,
      onPointerCancel: handleLensPointerRelease,
      onKeyDown: handleLensKeyDown,
    },
  };
}
