import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
import { SCENE_HEIGHT, SCENE_WIDTH, sceneUnits } from "./scene-units";

type SceneStageProps = {
  label: string;
  figure: string;
  children: ReactNode;
  className?: string;
};

export function SceneStage({ label, figure, children, className }: SceneStageProps) {
  return (
    <div
      role="img"
      aria-label={label}
      className={cn("@container relative size-full overflow-clip", className)}
      style={{
        ["--scene-unit" as string]: `calc(100cqw / ${SCENE_WIDTH})`,
        backgroundImage: "linear-gradient(180deg, var(--scene-backdrop-top), var(--scene-backdrop-bottom))",
      }}
    >
      <span
        aria-hidden
        className="absolute font-mono font-medium tracking-[0.12em] text-border-strong"
        style={{ left: sceneUnits(18), top: sceneUnits(14), fontSize: sceneUnits(9), lineHeight: 1 }}
      >
        {figure}
      </span>
      <div
        aria-hidden
        className="absolute top-1/2 left-0 -translate-y-1/2"
        style={{ width: sceneUnits(SCENE_WIDTH), height: sceneUnits(SCENE_HEIGHT) }}
      >
        {children}
      </div>
    </div>
  );
}
