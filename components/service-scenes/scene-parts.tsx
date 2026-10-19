import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { sceneUnits } from "./scene-units";

export function raisedObjectStyle(isLive = false): CSSProperties {
  const edge = isLive ? `0 0 0 ${sceneUnits(1.5)} var(--primary)` : `0 0 0 ${sceneUnits(1)} var(--scene-object-edge)`;
  return {
    backgroundImage: "linear-gradient(180deg, var(--scene-object-top), var(--scene-object-bottom))",
    boxShadow: `inset 0 ${sceneUnits(1)} 0 var(--scene-object-highlight), ${edge}, 0 ${sceneUnits(14)} ${sceneUnits(30)} var(--scene-object-shadow)`,
  };
}

type SceneObjectProps = {
  x: number;
  y: number;
  width: number;
  height: number;
  isLive?: boolean;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
};

export function SceneObject({ x, y, width, height, isLive = false, className, style, children }: SceneObjectProps) {
  return (
    <div
      className={cn("absolute transition-[box-shadow] duration-300", className)}
      style={{
        left: sceneUnits(x),
        top: sceneUnits(y),
        width: sceneUnits(width),
        height: sceneUnits(height),
        ...raisedObjectStyle(isLive),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

type SceneChipProps = {
  centerX: number;
  y: number;
  children: ReactNode;
  className?: string;
};

export function SceneChip({ centerX, y, children, className }: SceneChipProps) {
  return (
    <div
      className={cn("absolute flex -translate-x-1/2 items-center whitespace-nowrap bg-scene-inset font-mono font-medium text-muted-foreground", className)}
      style={{
        left: sceneUnits(centerX),
        top: sceneUnits(y),
        gap: sceneUnits(8),
        padding: `${sceneUnits(7)} ${sceneUnits(12)}`,
        fontSize: sceneUnits(10.5),
        lineHeight: 1,
        boxShadow: `inset 0 ${sceneUnits(1)} 0 var(--scene-object-highlight), 0 0 0 ${sceneUnits(1)} var(--scene-object-edge), 0 ${sceneUnits(8)} ${sceneUnits(18)} var(--scene-object-shadow)`,
      }}
    >
      {children}
    </div>
  );
}

export function SceneLabel({ children, isBright = false, className, style }: { children: ReactNode; isBright?: boolean; className?: string; style?: CSSProperties }) {
  return (
    <span
      className={cn("whitespace-nowrap font-mono font-medium tracking-[0.04em]", isBright ? "text-foreground" : "text-muted-foreground", className)}
      style={{ fontSize: sceneUnits(9.5), lineHeight: 1, ...style }}
    >
      {children}
    </span>
  );
}

export function SceneLed({ isOn = false, size = 6, className }: { isOn?: boolean; size?: number; className?: string }) {
  return (
    <span
      className={cn("inline-block shrink-0 transition-colors duration-300", isOn ? "bg-primary" : "bg-border-strong", className)}
      style={{ width: sceneUnits(size), height: sceneUnits(size) }}
    />
  );
}

export function SceneBar({ width, isBright = false, className }: { width: string; isBright?: boolean; className?: string }) {
  return (
    <span
      className={cn("block", isBright ? "bg-border-strong" : "bg-border", className)}
      style={{ width, height: sceneUnits(5) }}
    />
  );
}
