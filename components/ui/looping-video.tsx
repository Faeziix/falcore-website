"use client";

import { useEffect, useRef } from "react";
import { useInView } from "motion/react";
import { cn } from "@/lib/utils";

export type LoopingVideoSources = {
  mp4: string;
  webm: string;
  poster: string;
};

export function LoopingVideo({
  sources,
  label,
  isActive = true,
  className,
}: {
  sources: LoopingVideoSources;
  label: string;
  isActive?: boolean;
  className?: string;
}) {
  const videoReference = useRef<HTMLVideoElement>(null);
  const isNearViewport = useInView(videoReference, { margin: "200px 0px" });
  const shouldPlay = isNearViewport && isActive;

  useEffect(() => {
    const video = videoReference.current;
    if (!video) return;
    if (shouldPlay) {
      video.play().catch(() => undefined);
      return;
    }
    video.pause();
  }, [shouldPlay]);

  return (
    <video
      ref={videoReference}
      aria-label={label}
      poster={sources.poster}
      muted
      loop
      playsInline
      preload={isNearViewport ? "auto" : "none"}
      className={cn("size-full object-cover", className)}
    >
      <source src={sources.webm} type="video/webm" />
      <source src={sources.mp4} type="video/mp4" />
    </video>
  );
}
