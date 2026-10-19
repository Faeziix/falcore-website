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

export function clampToStage(point: StagePoint): StagePoint {
  return {
    x: Math.min(1, Math.max(0, point.x)),
    y: Math.min(1, Math.max(0, point.y)),
  };
}
