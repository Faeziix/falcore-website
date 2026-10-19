"use client";

import { useId, useRef, useState, type KeyboardEvent } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import { cn } from "@/lib/utils";
import type { ProjectView } from "../../_lib/case-study-chapters";
import { artDirectedRenditions } from "../../_lib/art-direction";
import { containedScreenshotSizes } from "../../_lib/screenshot-sizes";

const SCREENSHOT_QUALITY = 90;

const viewTabVariants = cva(
  "relative -mb-px min-w-11 border-b-2 pt-1.5 pb-3 text-base transition-colors duration-300 ease-out-expo sm:text-lg",
  {
    variants: {
      isSelected: {
        true: "border-case-accent text-case-ink",
        false: "border-transparent text-case-ink-soft hover:text-case-ink",
      },
    },
  }
);

const viewPictureVariants = cva(
  "col-start-1 row-start-1 transition-opacity duration-500 ease-out-expo",
  {
    variants: {
      isSelected: {
        true: "opacity-100",
        false: "pointer-events-none opacity-0",
      },
    },
  }
);

const arrowKeyOffsets: Record<string, number> = { ArrowRight: 1, ArrowLeft: -1 };

export function ProjectViewSwitcher({ views }: { views: ProjectView[] }) {
  const [selectedViewId, setSelectedViewId] = useState(views[0].id);
  const tabReferences = useRef<Array<HTMLButtonElement | null>>([]);
  const idPrefix = useId();

  function tabId(viewId: string) {
    return `${idPrefix}-tab-${viewId}`;
  }
  const panelId = `${idPrefix}-panel`;

  function selectViewAt(viewIndex: number) {
    const wrappedIndex = (viewIndex + views.length) % views.length;
    setSelectedViewId(views[wrappedIndex].id);
    tabReferences.current[wrappedIndex]?.focus();
  }

  function handleTabKeyDown(event: KeyboardEvent<HTMLButtonElement>, viewIndex: number) {
    const offset = arrowKeyOffsets[event.key];
    if (offset !== undefined) {
      event.preventDefault();
      selectViewAt(viewIndex + offset);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectViewAt(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectViewAt(views.length - 1);
    }
  }

  const selectedView = views.find((view) => view.id === selectedViewId) ?? views[0];

  return (
    <div>
      <div
        role="tablist"
        aria-label="Project views"
        className="flex gap-8 border-b border-case-rule sm:gap-10"
      >
        {views.map((view, viewIndex) => {
          const isSelected = view.id === selectedViewId;
          return (
            <button
              key={view.id}
              ref={(tabElement) => {
                tabReferences.current[viewIndex] = tabElement;
              }}
              id={tabId(view.id)}
              type="button"
              role="tab"
              aria-selected={isSelected}
              aria-controls={panelId}
              tabIndex={isSelected ? 0 : -1}
              onClick={() => setSelectedViewId(view.id)}
              onKeyDown={(event) => handleTabKeyDown(event, viewIndex)}
              className={viewTabVariants({ isSelected })}
            >
              {view.label}
            </button>
          );
        })}
      </div>
      <div
        id={panelId}
        role="tabpanel"
        aria-labelledby={tabId(selectedView.id)}
        className="mt-8 grid border border-case-rule lg:mt-10"
      >
        {views.map((view) => {
          const isSelected = view.id === selectedViewId;
          return (
            <div
              key={view.id}
              aria-hidden={!isSelected}
              className={viewPictureVariants({ isSelected })}
            >
              {artDirectedRenditions(view, containedScreenshotSizes).map((rendition) => (
                <Image
                  key={rendition.key}
                  src={rendition.image.src}
                  alt={isSelected ? rendition.image.alt : ""}
                  width={rendition.image.width}
                  height={rendition.image.height}
                  sizes={rendition.sizes}
                  quality={SCREENSHOT_QUALITY}
                  className={cn("h-auto w-full", rendition.visibilityClassName)}
                />
              ))}
            </div>
          );
        })}
      </div>
    </div>
  );
}
