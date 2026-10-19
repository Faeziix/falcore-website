"use client";

import { SceneLabel, SceneObject } from "../scene-parts";
import { SCENE_WIDTH, sceneUnits } from "../scene-units";
import { TEAM_AVATARS, TEAM_CARD } from "./custom-web-applications-story";
import { TeamAvatars } from "./team-avatars";
import { TeamRoles } from "./team-roles";

type TeamCardProps = { visibleAvatarCount: number; activeRoleIndex: number | null };

export function TeamCard({ visibleAvatarCount, activeRoleIndex }: TeamCardProps) {
  const labelTop = sceneUnits(TEAM_CARD.y + 12);
  return (
    <>
      <SceneObject x={TEAM_CARD.x} y={TEAM_CARD.y} width={TEAM_CARD.width} height={TEAM_CARD.height} />
      <SceneLabel className="absolute" style={{ left: sceneUnits(TEAM_CARD.x + TEAM_CARD.paddingX), top: labelTop }}>
        TEAM
      </SceneLabel>
      <SceneLabel
        isBright={visibleAvatarCount === TEAM_AVATARS.length}
        className="absolute tabular-nums transition-colors duration-500"
        style={{ right: sceneUnits(SCENE_WIDTH - TEAM_CARD.x - TEAM_CARD.width + TEAM_CARD.paddingX), top: labelTop }}
      >
        {`${visibleAvatarCount}/${TEAM_AVATARS.length}`}
      </SceneLabel>
      <TeamAvatars visibleAvatarCount={visibleAvatarCount} activeRoleIndex={activeRoleIndex} />
      <TeamRoles activeRoleIndex={activeRoleIndex} />
    </>
  );
}
