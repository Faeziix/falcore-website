"use client";

import { useRef } from "react";
import type { BlueprintFraming } from "../blueprint-canvas";
import { BlueprintSheet } from "../blueprint-sheet";
import { useBlueprintPlayback } from "../use-blueprint-playback";
import { ConstructionOverlay } from "./construction-overlay";
import { LandingPageDesign, LandingPageFrame } from "./landing-page-design";
import { WireframeSphere } from "./wireframe-sphere";

export const WEB_DESIGN_FOCUS_FRAMING: BlueprintFraming = { x: 130, y: 66, width: 1350 };

type WebDesignBlueprintProps = { framing: BlueprintFraming; label: string; isActive?: boolean };

export function WebDesignBlueprint({ framing, label, isActive = true }: WebDesignBlueprintProps) {
  const playbackReference = useRef<HTMLDivElement>(null);
  const { isPlaying } = useBlueprintPlayback(playbackReference, isActive);

  return (
    <div ref={playbackReference} className="size-full">
      <BlueprintSheet
        title="WEB DESIGN"
        sheetNumber="03 / 04"
        label={label}
        framing={framing}
        drawing={
          <>
            <LandingPageFrame />
            <WireframeSphere isPlaying={isPlaying} />
            <ConstructionOverlay isPlaying={isPlaying} />
            <LandingPageDesign />
          </>
        }
      />
    </div>
  );
}
