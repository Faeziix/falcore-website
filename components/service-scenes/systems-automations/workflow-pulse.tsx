"use client";

import { useEffect } from "react";
import { animate, motion, useMotionValue } from "motion/react";
import { PULSE_SIZE, WIRE_ROUTES, pointAlongRoute, type WireKey } from "./workflow-layout";

const TRAVEL_SECONDS = 0.62;
const APPEAR_SECONDS = 0.1;
const FADE_SECONDS = 0.18;
const TRAVEL_EASE: [number, number, number, number] = [0.65, 0, 0.35, 1];
const PULSE_LIFETIME = TRAVEL_SECONDS + FADE_SECONDS;

type WorkflowPulseProps = { route: WireKey | null; isTravelling: boolean; isPlaying: boolean };

export function WorkflowPulse({ route, isTravelling, isPlaying }: WorkflowPulseProps) {
  const pulseX = useMotionValue(0);
  const pulseY = useMotionValue(0);
  const pulseOpacity = useMotionValue(0);

  useEffect(() => {
    if (!isPlaying || !isTravelling || route === null) {
      const fade = animate(pulseOpacity, 0, { duration: FADE_SECONDS });
      return () => fade.stop();
    }
    const routePoints = WIRE_ROUTES[route];
    const placePulse = (progress: number) => {
      const point = pointAlongRoute(routePoints, progress);
      pulseX.set(point.x - PULSE_SIZE / 2);
      pulseY.set(point.y - PULSE_SIZE / 2);
    };
    placePulse(0);
    const travel = animate(0, 1, { duration: TRAVEL_SECONDS, ease: TRAVEL_EASE, onUpdate: placePulse });
    const visibility = animate(pulseOpacity, [0, 1, 1, 0], {
      duration: PULSE_LIFETIME,
      times: [0, APPEAR_SECONDS / PULSE_LIFETIME, TRAVEL_SECONDS / PULSE_LIFETIME, 1],
      ease: "linear",
    });
    return () => {
      travel.stop();
      visibility.stop();
    };
  }, [route, isTravelling, isPlaying, pulseX, pulseY, pulseOpacity]);

  return <motion.rect width={PULSE_SIZE} height={PULSE_SIZE} x={pulseX} y={pulseY} className="fill-primary" style={{ opacity: pulseOpacity }} />;
}
