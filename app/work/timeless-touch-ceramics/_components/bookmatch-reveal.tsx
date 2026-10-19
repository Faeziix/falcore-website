"use client";

import { useId, useRef, useState } from "react";
import Image from "next/image";
import { useInView } from "motion/react";
import { cva } from "class-variance-authority";
import { Button } from "@/components/ui/button";
import { bookmatchRevealCopy } from "../_lib/timeless-touch-chapters";
import { homepageDesktopImage, homepageMobileImage } from "../_lib/timeless-touch-images";
import { BookmatchSlabHalf, slabTravelVariants } from "./bookmatch-slab-half";

const SCREENSHOT_QUALITY = 90;
const PANEL_VISIBLE_SHARE_TO_OPEN = 0.6;

const screenshotSettleVariants = cva("absolute inset-0", {
  variants: {
    position: {
      open: "scale-100",
      closed: "scale-[1.06]",
    },
  },
});

export function BookmatchReveal() {
  const panelId = useId();
  const panelRef = useRef<HTMLDivElement>(null);
  const isPanelMostlyVisible = useInView(panelRef, {
    once: true,
    amount: PANEL_VISIBLE_SHARE_TO_OPEN,
  });
  const [visitorWantsOpen, setVisitorWantsOpen] = useState<boolean | null>(null);

  const hasVisitorChosen = visitorWantsOpen !== null;
  const isOpen = visitorWantsOpen ?? isPanelMostlyVisible;
  const slabPosition = isOpen ? "open" : "closed";
  const timing = hasVisitorChosen ? "visitorToggle" : "firstOpening";

  return (
    <figure className="page-container">
      <div
        id={panelId}
        ref={panelRef}
        className="relative aspect-[828/1280] w-full overflow-clip bg-(--timeless-touch-ceramics-slab-backing) sm:aspect-[16/10] sm:max-md:max-h-[calc(100svh-6rem)]"
      >
        <div
          className={slabTravelVariants({
            timing,
            className: screenshotSettleVariants({ position: slabPosition }),
          })}
        >
          <Image
            src={homepageDesktopImage.src}
            alt={homepageDesktopImage.alt}
            fill
            quality={SCREENSHOT_QUALITY}
            sizes="(min-width: 1400px) 1400px, 100vw"
            className="hidden object-cover object-top sm:block"
          />
          <Image
            src={homepageMobileImage.src}
            alt={homepageMobileImage.alt}
            fill
            quality={SCREENSHOT_QUALITY}
            sizes="100vw"
            className="object-cover object-top sm:hidden"
          />
        </div>
        <BookmatchSlabHalf side="left" position={slabPosition} timing={timing} />
        <BookmatchSlabHalf side="right" position={slabPosition} timing={timing} />
      </div>
      <figcaption className="mt-4 flex flex-col items-start gap-4 sm:mt-5 sm:flex-row sm:items-center sm:justify-between">
        <span className="max-w-sm text-balance text-sm text-case-ink-soft">{bookmatchRevealCopy.caption}</span>
        <Button
          type="button"
          variant="outline"
          size="md"
          aria-controls={panelId}
          onClick={() => setVisitorWantsOpen(!isOpen)}
          className="border-(--timeless-touch-ceramics-control-edge) text-case-ink hover:border-(--timeless-touch-ceramics-control-edge-hover) hover:bg-transparent"
        >
          {isOpen ? bookmatchRevealCopy.closeLabel : bookmatchRevealCopy.openLabel}
        </Button>
      </figcaption>
    </figure>
  );
}
