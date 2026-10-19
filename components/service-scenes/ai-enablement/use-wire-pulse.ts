"use client";

import { useEffect, useRef } from "react";
import { animate, useMotionValue, useTransform } from "motion/react";
import {
  BEAT_MILLISECONDS,
  EASE_OUT_EXPO,
  INTAKE_WIRE,
  PULSE_PLANS,
  PULSE_SIZE,
  RESTING_PULSE_PROGRESS,
  findTool,
  phaseBeatCount,
  type PulsePlan,
  type StoryPhase,
} from "./agent-story";
import { pointAlongPolyline } from "./polyline";

const RESTING_ROUTE: PulsePlan["route"] = "documents";

function routePoints(route: PulsePlan["route"]) {
  return route === "intake" ? INTAKE_WIRE : findTool(route).wire;
}

export function useWirePulse(phase: StoryPhase, isPlaying: boolean) {
  const activeRoute = useRef<PulsePlan["route"]>(RESTING_ROUTE);
  const hasPlayedPhase = useRef(false);
  const progress = useMotionValue(RESTING_PULSE_PROGRESS);
  const opacity = useMotionValue(1);
  const cornerX = useTransform(progress, (latest) => pointAlongPolyline(routePoints(activeRoute.current), latest).x - PULSE_SIZE / 2);
  const cornerY = useTransform(progress, (latest) => pointAlongPolyline(routePoints(activeRoute.current), latest).y - PULSE_SIZE / 2);

  useEffect(() => {
    if (!isPlaying) {
      hasPlayedPhase.current = false;
      activeRoute.current = RESTING_ROUTE;
      progress.jump(RESTING_PULSE_PROGRESS);
      opacity.jump(1);
      return;
    }
    const plan = PULSE_PLANS[phase];
    if (!plan) {
      const fade = animate(opacity, 0, { duration: 0.4, ease: EASE_OUT_EXPO });
      return () => fade.stop();
    }
    const isResumingMidPhase = !hasPlayedPhase.current;
    hasPlayedPhase.current = true;
    activeRoute.current = plan.route;
    const duration = (phaseBeatCount(phase) * BEAT_MILLISECONDS) / 1000;
    const progressKeyframes: (number | null)[] = isResumingMidPhase ? [null, ...plan.progress.slice(1)] : plan.progress;
    if (!isResumingMidPhase) progress.jump(plan.progress[0]);
    const travel = animate(progress, progressKeyframes, { duration, times: plan.progressTimes, ease: EASE_OUT_EXPO });
    const visibility = animate(opacity, plan.opacity, { duration, times: plan.opacityTimes, ease: "linear" });
    return () => {
      travel.stop();
      visibility.stop();
    };
  }, [phase, isPlaying, progress, opacity]);

  return { cornerX, cornerY, opacity };
}
