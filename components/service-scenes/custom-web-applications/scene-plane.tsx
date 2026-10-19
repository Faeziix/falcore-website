import type { ReactNode } from "react";
import { SCENE_HEIGHT, SCENE_WIDTH, sceneUnits } from "../scene-units";

export function ScenePlane({ children }: { children: ReactNode }) {
  return (
    <div className="absolute top-0 left-0" style={{ width: sceneUnits(SCENE_WIDTH), height: sceneUnits(SCENE_HEIGHT) }}>
      {children}
    </div>
  );
}

export function ScenePlaneSvg({ children }: { children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${SCENE_WIDTH} ${SCENE_HEIGHT}`} className="absolute inset-0 size-full">
      {children}
    </svg>
  );
}
