"use client";

import { motion } from "motion/react";
import { sceneUnits } from "../scene-units";
import { EASE_OUT_EXPO, TEAM_AVATAR_FRAME, TEAM_AVATARS } from "./custom-web-applications-story";

const AVATAR_RING = `0 0 0 ${sceneUnits(2)} var(--scene-object-top)`;

type TeamAvatarsProps = { visibleAvatarCount: number; activeRoleIndex: number | null };

export function TeamAvatars({ visibleAvatarCount, activeRoleIndex }: TeamAvatarsProps) {
  return TEAM_AVATARS.map((avatar, avatarIndex) => {
    const isVisible = avatarIndex < visibleAvatarCount;
    const isActiveRole = activeRoleIndex === avatarIndex;
    const isQuietened = activeRoleIndex !== null && !isActiveRole;
    const frame = { left: sceneUnits(avatar.x), top: sceneUnits(TEAM_AVATAR_FRAME.y), width: sceneUnits(TEAM_AVATAR_FRAME.size), height: sceneUnits(TEAM_AVATAR_FRAME.size) };
    return (
      <span key={avatar.x}>
        <span className="absolute bg-scene-inset" style={{ ...frame, boxShadow: `inset 0 0 0 ${sceneUnits(1)} var(--border), ${AVATAR_RING}` }} />
        <motion.span
          className="absolute"
          initial={false}
          animate={{ opacity: isVisible ? (isQuietened ? 0.6 : 1) : 0, x: isVisible ? "0%" : "30%", y: isActiveRole ? "-9%" : "0%" }}
          transition={{ duration: 0.7, ease: EASE_OUT_EXPO }}
          style={{
            ...frame,
            zIndex: isActiveRole ? 1 : 0,
            backgroundImage: avatar.gradient,
            boxShadow: isActiveRole ? `${AVATAR_RING}, 0 0 0 ${sceneUnits(3)} var(--foreground)` : AVATAR_RING,
          }}
        />
      </span>
    );
  });
}
