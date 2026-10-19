"use client";

import { useRef, type KeyboardEvent } from "react";
import { motion } from "motion/react";
import { cva } from "class-variance-authority";
import { easeOutExpo } from "@/lib/motion";
import type { FamilySite } from "../../_lib/family-sites";

const siteTabVariants = cva(
  "relative row-span-2 grid min-h-11 grid-rows-subgrid content-start justify-items-start pt-5 pr-2 text-left sm:pr-3 transition-colors duration-300 focus-visible:-outline-offset-2",
  {
    variants: {
      isActive: {
        true: "text-case-ink",
        false: "text-case-ink-soft hover:text-case-ink",
      },
    },
  }
);

const toneIndicatorVariants = cva("absolute -top-px left-0 h-[3px] w-full", {
  variants: {
    tone: {
      group: "bg-(--xma-agency-tone-group)",
      media: "bg-(--xma-agency-tone-media)",
      boost: "bg-(--xma-agency-tone-boost)",
    },
  },
});

const keyboardStepByKey: Record<string, (currentIndex: number, siteCount: number) => number> = {
  ArrowRight: (currentIndex, siteCount) => (currentIndex + 1) % siteCount,
  ArrowLeft: (currentIndex, siteCount) => (currentIndex - 1 + siteCount) % siteCount,
  Home: () => 0,
  End: (_currentIndex, siteCount) => siteCount - 1,
};

type FamilySiteTabsProps = {
  sites: FamilySite[];
  activeSiteIndex: number;
  onSelectSite: (siteIndex: number) => void;
  tabIdForSite: (site: FamilySite) => string;
  panelId: string;
};

export function FamilySiteTabs({ sites, activeSiteIndex, onSelectSite, tabIdForSite, panelId }: FamilySiteTabsProps) {
  const tabButtons = useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    const nextIndexFor = keyboardStepByKey[event.key];
    if (!nextIndexFor) return;
    event.preventDefault();
    const nextIndex = nextIndexFor(activeSiteIndex, sites.length);
    onSelectSite(nextIndex);
    tabButtons.current[nextIndex]?.focus();
  }

  return (
    <div
      role="tablist"
      aria-label="The three XMA sites"
      onKeyDown={handleKeyDown}
      className="relative grid grid-cols-3 grid-rows-[auto_auto] border-t border-case-rule"
    >
      {sites.map((site, siteIndex) => {
        const isActive = siteIndex === activeSiteIndex;
        return (
          <button
            key={site.id}
            ref={(tabButton) => {
              tabButtons.current[siteIndex] = tabButton;
            }}
            type="button"
            role="tab"
            id={tabIdForSite(site)}
            aria-selected={isActive}
            aria-controls={panelId}
            tabIndex={isActive ? 0 : -1}
            onClick={() => onSelectSite(siteIndex)}
            className={siteTabVariants({ isActive })}
          >
            {isActive ? (
              <motion.span
                aria-hidden
                layoutId="xma-agency-family-site-indicator"
                transition={{ duration: 0.55, ease: easeOutExpo }}
                className={toneIndicatorVariants({ tone: site.id })}
              />
            ) : null}
            <span className="font-case-display text-base leading-tight font-extrabold tracking-[-0.03em] uppercase min-[25rem]:text-lg sm:text-2xl">
              {site.name}
            </span>
            <span className="mt-1 text-sm text-case-ink-soft">{site.job}</span>
          </button>
        );
      })}
    </div>
  );
}
