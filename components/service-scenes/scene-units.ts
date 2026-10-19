export const SCENE_WIDTH = 640;
export const SCENE_HEIGHT = 360;

export function sceneUnits(value: number) {
  return `calc(${value} * var(--scene-unit))`;
}

export type ScenePoint = { x: number; y: number };

export function sceneStroke(width: number) {
  return `calc(${width} * var(--scene-stroke-boost, 1))`;
}
