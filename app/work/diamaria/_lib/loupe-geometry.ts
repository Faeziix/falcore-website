export type StagePoint = { x: number; y: number };

export const RING_CENTRE_IN_RAW_FRAME: StagePoint = { x: 0.511, y: 0.508 };

export const RAW_FRAME_ASPECT_RATIO = 3200 / 2133;

export const LOUPE_MAGNIFICATION = 1.35;

export const PACKSHOT_WIDTH_SHARE_OF_STAGE = 0.215;

const RING_CENTRE_IN_PACKSHOT: StagePoint = { x: 0.505, y: 0.502 };

const packshotHeightShareOfStage = PACKSHOT_WIDTH_SHARE_OF_STAGE * RAW_FRAME_ASPECT_RATIO;

export const packshotPlacementInStage = {
  leftPercent: (RING_CENTRE_IN_RAW_FRAME.x - RING_CENTRE_IN_PACKSHOT.x * PACKSHOT_WIDTH_SHARE_OF_STAGE) * 100,
  topPercent: (RING_CENTRE_IN_RAW_FRAME.y - RING_CENTRE_IN_PACKSHOT.y * packshotHeightShareOfStage) * 100,
  widthPercent: PACKSHOT_WIDTH_SHARE_OF_STAGE * 100,
};

export const KEYBOARD_STEP_SHARE_OF_STAGE = 0.03;
export const KEYBOARD_LARGE_STEP_SHARE_OF_STAGE = 0.1;

export const POINTER_FOLLOW_SMOOTHING = 0.22;

export type VisibleStageBounds = { left: number; right: number; top: number; bottom: number };

export const WHOLE_STAGE: VisibleStageBounds = { left: 0, right: 1, top: 0, bottom: 1 };

export function measureVisibleStageBounds(stageBounds: DOMRect, frameBounds: DOMRect): VisibleStageBounds {
  return {
    left: Math.max(0, (frameBounds.left - stageBounds.left) / stageBounds.width),
    right: Math.min(1, (frameBounds.right - stageBounds.left) / stageBounds.width),
    top: Math.max(0, (frameBounds.top - stageBounds.top) / stageBounds.height),
    bottom: Math.min(1, (frameBounds.bottom - stageBounds.top) / stageBounds.height),
  };
}

export function clampToVisibleStage(point: StagePoint, bounds: VisibleStageBounds): StagePoint {
  return {
    x: Math.min(bounds.right, Math.max(bounds.left, point.x)),
    y: Math.min(bounds.bottom, Math.max(bounds.top, point.y)),
  };
}
