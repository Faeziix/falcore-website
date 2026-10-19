import type { SmokeStroke } from "./create-smoke-flow-pass";
import { ditheringTuning } from "./dithering-tuning";

export interface PointerFieldSnapshot {
  pointerPresence: number;
  stroke: SmokeStroke;
}

export interface PointerField {
  advance: (deltaSeconds: number) => PointerFieldSnapshot;
  dispose: () => void;
}

function easeTowards(current: number, target: number, followRate: number, deltaSeconds: number) {
  return current + (target - current) * (1 - Math.exp(-followRate * deltaSeconds));
}

function isWithinBounds(bounds: DOMRect, clientX: number, clientY: number) {
  return clientX >= bounds.left && clientX <= bounds.right && clientY >= bounds.top && clientY <= bounds.bottom;
}

export function createPointerField(canvas: HTMLCanvasElement): PointerField {
  const latestClientPosition = { x: 0, y: 0, isKnown: false, isTouchReleased: false };
  const smoothedClientPosition = { x: 0, y: 0 };
  let wasInsideLastFrame = false;
  let presence = 0;

  const stroke: SmokeStroke = {
    strokeStartX: 0,
    strokeStartY: 0,
    strokeEndX: 0,
    strokeEndY: 0,
    pointerVelocityX: 0,
    pointerVelocityY: 0,
    smokeEmission: 0,
  };

  function handlePointerMove(event: PointerEvent) {
    latestClientPosition.x = event.clientX;
    latestClientPosition.y = event.clientY;
    latestClientPosition.isKnown = true;
    latestClientPosition.isTouchReleased = false;
  }

  function handlePointerRelease(event: PointerEvent) {
    if (event.pointerType !== "mouse") latestClientPosition.isTouchReleased = true;
  }

  function handlePointerExitWindow() {
    latestClientPosition.isKnown = false;
  }

  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("pointerdown", handlePointerMove, { passive: true });
  window.addEventListener("pointerup", handlePointerRelease, { passive: true });
  window.addEventListener("pointercancel", handlePointerRelease, { passive: true });
  window.addEventListener("blur", handlePointerExitWindow);
  document.documentElement.addEventListener("pointerleave", handlePointerExitWindow);

  function toCanvasUV(bounds: DOMRect, clientX: number, clientY: number) {
    return {
      u: bounds.width > 0 ? (clientX - bounds.left) / bounds.width : 0,
      v: bounds.height > 0 ? (bounds.bottom - clientY) / bounds.height : 0,
    };
  }

  function advance(deltaSeconds: number): PointerFieldSnapshot {
    const bounds = canvas.getBoundingClientRect();
    const isPointerInside =
      latestClientPosition.isKnown &&
      !latestClientPosition.isTouchReleased &&
      isWithinBounds(bounds, latestClientPosition.x, latestClientPosition.y);

    if (isPointerInside && !wasInsideLastFrame) {
      smoothedClientPosition.x = latestClientPosition.x;
      smoothedClientPosition.y = latestClientPosition.y;
    }

    const previousClientX = smoothedClientPosition.x;
    const previousClientY = smoothedClientPosition.y;
    if (latestClientPosition.isKnown) {
      smoothedClientPosition.x = easeTowards(smoothedClientPosition.x, latestClientPosition.x, ditheringTuning.pointerFollowRate, deltaSeconds);
      smoothedClientPosition.y = easeTowards(smoothedClientPosition.y, latestClientPosition.y, ditheringTuning.pointerFollowRate, deltaSeconds);
    }

    const movedClientX = smoothedClientPosition.x - previousClientX;
    const movedClientY = smoothedClientPosition.y - previousClientY;
    const speedInCssPixelsPerSecond = deltaSeconds > 0 ? Math.hypot(movedClientX, movedClientY) / deltaSeconds : 0;
    presence = easeTowards(presence, isPointerInside ? 1 : 0, ditheringTuning.presenceFollowRate, deltaSeconds);

    const strokeStart = toCanvasUV(bounds, previousClientX, previousClientY);
    const strokeEnd = toCanvasUV(bounds, smoothedClientPosition.x, smoothedClientPosition.y);
    stroke.strokeStartX = strokeStart.u;
    stroke.strokeStartY = strokeStart.v;
    stroke.strokeEndX = strokeEnd.u;
    stroke.strokeEndY = strokeEnd.v;
    stroke.pointerVelocityX = deltaSeconds > 0 && bounds.width > 0 ? movedClientX / bounds.width / deltaSeconds : 0;
    stroke.pointerVelocityY = deltaSeconds > 0 && bounds.height > 0 ? -movedClientY / bounds.height / deltaSeconds : 0;
    stroke.smokeEmission = isPointerInside
      ? Math.min(1, speedInCssPixelsPerSecond / ditheringTuning.speedForFullSmokeInCssPixelsPerSecond)
      : 0;

    wasInsideLastFrame = isPointerInside;
    return { pointerPresence: presence, stroke };
  }

  function dispose() {
    window.removeEventListener("pointermove", handlePointerMove);
    window.removeEventListener("pointerdown", handlePointerMove);
    window.removeEventListener("pointerup", handlePointerRelease);
    window.removeEventListener("pointercancel", handlePointerRelease);
    window.removeEventListener("blur", handlePointerExitWindow);
    document.documentElement.removeEventListener("pointerleave", handlePointerExitWindow);
  }

  return { advance, dispose };
}
