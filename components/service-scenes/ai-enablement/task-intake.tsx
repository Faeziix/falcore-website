"use client";

import { SceneLabel } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { INTAKE_SOCKET, type StoryPhase } from "./agent-story";

export function TaskIntake({ phase }: { phase: StoryPhase }) {
  const isReceiving = phase === "arrive";
  return (
    <>
      <span
        className="absolute block bg-scene-inset transition-[box-shadow] duration-500"
        style={{
          left: sceneUnits(INTAKE_SOCKET.x - 4),
          top: sceneUnits(INTAKE_SOCKET.y - 4),
          width: sceneUnits(8),
          height: sceneUnits(8),
          boxShadow: `0 0 0 ${sceneUnits(1.2)} ${isReceiving ? "var(--primary)" : "var(--border-strong)"}`,
        }}
      />
      <div className="absolute" style={{ left: sceneUnits(INTAKE_SOCKET.x + 10), top: sceneUnits(INTAKE_SOCKET.y - 4.5) }}>
        <SceneLabel isBright={isReceiving} className="transition-colors duration-500">
          INBOX · {isReceiving ? 1 : 0}
        </SceneLabel>
      </div>
    </>
  );
}
