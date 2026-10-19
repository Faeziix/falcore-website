import { SCENE_HEIGHT, SCENE_WIDTH } from "../scene-units";

const roundToFourDecimals = (value: number) => Math.round(value * 10000) / 10000;

export function stagePercentX(x: number) {
  return `${roundToFourDecimals((x / SCENE_WIDTH) * 100)}%`;
}

export function stagePercentY(y: number) {
  return `${roundToFourDecimals((y / SCENE_HEIGHT) * 100)}%`;
}
