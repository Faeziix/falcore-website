"use client";

import Image from "next/image";
import type { CSSProperties } from "react";
import { emeraldCutPackshotThreeQuarter, emeraldCutRawShoot } from "../_lib/diamaria-images";
import {
  LOUPE_MAGNIFICATION,
  RING_CENTRE_IN_RAW_FRAME,
  packshotPlacementInStage,
} from "../_lib/loupe-geometry";
import { useLoupePosition } from "../_hooks/use-loupe-position";
import { PHOTOGRAPH_QUALITY } from "./framed-photograph";
import { LoupeReadout } from "./loupe-readout";

const stageStyle = {
  "--loupe-x": RING_CENTRE_IN_RAW_FRAME.x,
  "--loupe-y": RING_CENTRE_IN_RAW_FRAME.y,
  "--loupe-magnification": LOUPE_MAGNIFICATION,
  "--loupe-size": "clamp(12rem, 28cqw, 36rem)",
} as CSSProperties;

const lensStyle: CSSProperties = {
  transform:
    "translate3d(calc(var(--loupe-x) * 100cqw - 50%), calc(var(--loupe-y) * 100cqh - 50%), 0)",
};

const finishedFrameStyle: CSSProperties = {
  width: "calc(100cqw * var(--loupe-magnification))",
  height: "calc(100cqh * var(--loupe-magnification))",
  transform:
    "translate3d(calc(var(--loupe-size) / 2 - var(--loupe-x) * 100cqw * var(--loupe-magnification)), calc(var(--loupe-size) / 2 - var(--loupe-y) * 100cqh * var(--loupe-magnification)), 0)",
};

const packshotPlacementStyle: CSSProperties = {
  left: `${packshotPlacementInStage.leftPercent}%`,
  top: `${packshotPlacementInStage.topPercent}%`,
  width: `${packshotPlacementInStage.widthPercent}%`,
};

export function JewellersLoupe({ instructionId }: { instructionId: string }) {
  const { stageRef, stageHandlers, lensHandlers } = useLoupePosition();

  return (
    <div className="relative aspect-[4/5] max-h-[min(72svh,44rem)] w-full overflow-clip bg-(--diamaria-sweep) [container-type:size] md:aspect-[3200/2133] md:max-h-[100svh]">
      <div
        ref={stageRef}
        style={stageStyle}
        className="absolute top-1/2 left-1/2 aspect-[3200/2133] w-[max(100cqw,calc(100cqh*1.5002))] -translate-x-1/2 -translate-y-1/2 [container-type:size] [@media(pointer:fine)]:cursor-none"
        {...stageHandlers}
      >
        <Image
          src={emeraldCutRawShoot.src}
          alt={emeraldCutRawShoot.alt}
          fill
          sizes="(min-width: 768px) 100vw, 190vw"
          quality={PHOTOGRAPH_QUALITY}
          className="object-cover select-none"
          draggable={false}
        />
        <div
          tabIndex={0}
          role="group"
          aria-roledescription="loupe"
          aria-label="Jeweller's loupe showing the finished packshot of the ring"
          aria-describedby={instructionId}
          style={lensStyle}
          className="absolute top-0 left-0 size-(--loupe-size) touch-none rounded-full will-change-transform focus-visible:outline-offset-6"
          {...lensHandlers}
        >
          <div className="absolute inset-0 overflow-clip rounded-full border border-(--diamaria-loupe-rim) bg-(--diamaria-packshot-ground)">
            <div style={finishedFrameStyle} className="absolute top-0 left-0">
              <div style={packshotPlacementStyle} className="absolute aspect-square">
                <Image
                  src={emeraldCutPackshotThreeQuarter.src}
                  alt={emeraldCutPackshotThreeQuarter.alt}
                  fill
                  sizes="(min-width: 768px) 41vw, 95vw"
                  quality={PHOTOGRAPH_QUALITY}
                  className="select-none"
                  draggable={false}
                />
              </div>
            </div>
          </div>
          <LoupeReadout />
        </div>
      </div>
    </div>
  );
}
