"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { LaunchpadFeatureButton } from "./launchpad-feature-button";

export function LaunchpadShowcase() {
  const { features } = LAUNCHPAD_SHOWCASE;
  const [activeFeatureId, setActiveFeatureId] = useState(features[0].id);

  return (
    <div>
      <div
        id="launchpad-screenshot"
        className="relative aspect-[16/10] overflow-clip border border-border bg-surface"
      >
        {features.map((feature) => {
          const isActive = feature.id === activeFeatureId;
          return (
            <Image
              key={feature.id}
              src={feature.screenshot}
              alt={isActive ? feature.screenshotAlt : ""}
              aria-hidden={!isActive}
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className={cn(
                "object-cover object-top transition-opacity duration-700 ease-out-expo",
                isActive ? "opacity-100" : "opacity-0"
              )}
            />
          );
        })}
      </div>

      <div
        role="group"
        aria-label="Launchpad features"
        className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-10"
      >
        {features.map((feature) => (
          <LaunchpadFeatureButton
            key={feature.id}
            feature={feature}
            isActive={feature.id === activeFeatureId}
            onSelect={setActiveFeatureId}
          />
        ))}
      </div>
    </div>
  );
}
