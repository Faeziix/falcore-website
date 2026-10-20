"use client";

import { useState } from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { AcquireFrame } from "@/components/scroll-reveal/acquire-frame";
import { LaunchpadFeatureButton } from "./launchpad-feature-button";

export function LaunchpadShowcase() {
  const { features } = LAUNCHPAD_SHOWCASE;
  const [activeFeatureId, setActiveFeatureId] = useState(features[0].id);

  return (
    <div className="grid grid-cols-12 items-center gap-12">
      <div
        role="group"
        aria-label="Platform features"
        className="col-span-4 flex flex-col gap-7"
      >
        {features.map((feature, featureIndex) => (
          <LaunchpadFeatureButton
            key={feature.id}
            revealStep={featureIndex * 2}
            feature={feature}
            isActive={feature.id === activeFeatureId}
            onSelect={setActiveFeatureId}
          />
        ))}
      </div>

      <AcquireFrame order={2} className="col-span-8">
        <div
          id="launchpad-screenshot"
          className="relative aspect-video overflow-clip border border-border bg-surface"
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
                quality={90}
                sizes="(max-width: 1400px) 66vw, 920px"
                className={cn(
                  "object-cover object-top transition-opacity duration-700 ease-out-expo",
                  isActive ? "opacity-100" : "opacity-0"
                )}
              />
            );
          })}
        </div>
      </AcquireFrame>
    </div>
  );
}
