"use client";

import { AnimatePresence, motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneChip } from "../scene-parts";
import { SceneLoader } from "../scene-loader";
import { sceneUnits } from "../scene-units";
import { ROUTER_CENTER, ROUTER_CHIP, routerContentWidth } from "./workflow-layout";
import { useMeasuredWidth } from "./use-measured-width";
import { EXPO_OUT, routerStatusText, type RouterIndicator, type RouterStatus } from "./workflow-story";

function RouterIndicatorMark({ indicator, isPlaying }: { indicator: RouterIndicator; isPlaying: boolean }) {
  if (indicator === "loader") return <SceneLoader isPlaying={isPlaying} />;
  return (
    <span className="grid shrink-0 place-items-center" style={{ width: sceneUnits(ROUTER_CHIP.indicatorSize), height: sceneUnits(ROUTER_CHIP.indicatorSize) }}>
      <span
        className={cn("block transition-colors duration-300", indicator === "live" ? "bg-primary" : "bg-foreground")}
        style={{ width: sceneUnits(7), height: sceneUnits(7) }}
      />
    </span>
  );
}

function RouterStatusContent({ status, isPlaying }: { status: RouterStatus; isPlaying: boolean }) {
  return (
    <>
      <RouterIndicatorMark indicator={status.indicator} isPlaying={isPlaying} />
      <span className="whitespace-pre">
        <span className="text-foreground">{status.headline}</span>
        {status.detail ? ` · ${status.detail}` : null}
      </span>
    </>
  );
}

export function RouterChip({ status, isPlaying }: { status: RouterStatus; isPlaying: boolean }) {
  const statusText = routerStatusText(status);
  const { measurerReference, width } = useMeasuredWidth(routerContentWidth(statusText.length));
  return (
    <SceneChip centerX={ROUTER_CENTER.x} y={ROUTER_CENTER.y}>
      <span
        ref={measurerReference}
        className="invisible absolute top-0 left-0 flex w-max items-center"
        style={{ gap: sceneUnits(ROUTER_CHIP.gap), paddingInline: sceneUnits(ROUTER_CHIP.slack / 2) }}
      >
        <RouterStatusContent status={status} isPlaying={false} />
      </span>
      <motion.span className="relative block overflow-clip" style={{ width, height: sceneUnits(ROUTER_CHIP.contentHeight) }}>
        <AnimatePresence initial={false}>
          <motion.span
            key={statusText}
            className="absolute inset-0 flex items-center justify-center"
            style={{ gap: sceneUnits(ROUTER_CHIP.gap) }}
            initial={{ opacity: 0, y: sceneUnits(5) }}
            animate={{ opacity: 1, y: sceneUnits(0) }}
            exit={{ opacity: 0, y: sceneUnits(-5), transition: { duration: 0.14, ease: "easeIn" } }}
            transition={{ duration: 0.5, delay: 0.12, ease: EXPO_OUT }}
          >
            <RouterStatusContent status={status} isPlaying={isPlaying} />
          </motion.span>
        </AnimatePresence>
      </motion.span>
    </SceneChip>
  );
}
