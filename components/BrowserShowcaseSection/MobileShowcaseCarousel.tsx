"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
} from "@phosphor-icons/react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import {
  SHOWCASE_SECTION_INTRO,
  SHOWCASE_SECTION_TITLE,
  type ShowcaseWebsite,
} from "@/lib/data/showcase-websites";

function useSnappedCardIndex(trackRef: React.RefObject<HTMLUListElement | null>) {
  const [snappedCardIndex, setSnappedCardIndex] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const updateSnappedCardIndex = () => {
      const firstCard = track.firstElementChild as HTMLElement | null;
      if (!firstCard) return;
      const isScrolledToEnd =
        track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
      if (isScrolledToEnd) {
        setSnappedCardIndex(track.children.length - 1);
        return;
      }
      const cardStride =
        firstCard.offsetWidth + parseFloat(getComputedStyle(track).columnGap);
      setSnappedCardIndex(Math.round(track.scrollLeft / cardStride));
    };
    track.addEventListener("scroll", updateSnappedCardIndex, { passive: true });
    return () => track.removeEventListener("scroll", updateSnappedCardIndex);
  }, [trackRef]);

  return snappedCardIndex;
}

function ProjectCard({
  website,
  isFirst,
}: {
  website: ShowcaseWebsite;
  isFirst: boolean;
}) {
  return (
    <a
      href={website.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex h-full flex-col border border-border bg-card focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
    >
      <div className="relative aspect-3/4 border-b border-border bg-muted/10">
        <Image
          src={website.mobileThumbnailUrl}
          alt={`Screenshot of ${website.title}`}
          fill
          sizes="(max-width: 767px) 82vw, 320px"
          className="object-cover object-top"
          priority={isFirst}
        />
      </div>
      <div className="flex items-start justify-between gap-4 px-5 pt-4 pb-5">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-foreground">
            {website.title}
          </h3>
          <p className="mt-1 text-sm text-foreground-soft">{website.summary}</p>
        </div>
        <ArrowUpRightIcon
          aria-hidden
          weight="bold"
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-colors group-active:text-foreground"
        />
      </div>
    </a>
  );
}

function PositionSegments({
  websites,
  snappedCardIndex,
  onSelect,
}: {
  websites: ShowcaseWebsite[];
  snappedCardIndex: number;
  onSelect: (cardIndex: number) => void;
}) {
  return (
    <div className="flex gap-1.5">
      {websites.map((website, cardIndex) => {
        const isCurrent = cardIndex === snappedCardIndex;
        return (
          <button
            key={website.id}
            type="button"
            aria-label={`Show ${website.title}`}
            aria-current={isCurrent || undefined}
            onClick={() => onSelect(cardIndex)}
            className="flex h-11 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <span
              className={cn(
                "block w-full transition-[height,background-color] duration-300 ease-out-expo motion-reduce:transition-none",
                isCurrent ? "h-0.5 bg-foreground" : "h-px bg-border-strong"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function CarouselArrows({
  snappedCardIndex,
  lastCardIndex,
  onSelect,
}: {
  snappedCardIndex: number;
  lastCardIndex: number;
  onSelect: (cardIndex: number) => void;
}) {
  return (
    <div className="flex gap-2">
      <Button
        variant="outline"
        className="w-11 px-0"
        aria-label="Previous website"
        disabled={snappedCardIndex === 0}
        onClick={() => onSelect(snappedCardIndex - 1)}
      >
        <ArrowLeftIcon aria-hidden weight="bold" />
      </Button>
      <Button
        variant="outline"
        className="w-11 px-0"
        aria-label="Next website"
        disabled={snappedCardIndex >= lastCardIndex}
        onClick={() => onSelect(snappedCardIndex + 1)}
      >
        <ArrowRightIcon aria-hidden weight="bold" />
      </Button>
    </div>
  );
}

export default function MobileShowcaseCarousel({
  websites,
}: {
  websites: ShowcaseWebsite[];
}) {
  const trackRef = useRef<HTMLUListElement>(null);
  const snappedCardIndex = useSnappedCardIndex(trackRef);
  const prefersReducedMotion = useReducedMotion();

  const scrollToCard = useCallback(
    (cardIndex: number) => {
      const track = trackRef.current;
      const targetCard = track?.children[cardIndex] as HTMLElement | undefined;
      if (!track || !targetCard) return;
      track.scrollTo({
        left:
          targetCard.offsetLeft -
          track.offsetLeft -
          parseFloat(getComputedStyle(track).paddingLeft),
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    },
    [prefersReducedMotion]
  );

  return (
    <div className="section-spacing">
      <SectionHeading
        title={SHOWCASE_SECTION_TITLE}
        intro={SHOWCASE_SECTION_INTRO}
        actions={
          <CarouselArrows
            snappedCardIndex={snappedCardIndex}
            lastCardIndex={websites.length - 1}
            onSelect={scrollToCard}
          />
        }
        className="mx-(--page-gutter) mb-10"
      />
      <p aria-live="polite" className="sr-only">
        {snappedCardIndex + 1} of {websites.length}: {websites[snappedCardIndex]?.title}
      </p>
      <ul
        ref={trackRef}
        aria-label={SHOWCASE_SECTION_TITLE}
        className="grid auto-cols-[min(82%,20rem)] grid-flow-col gap-4 snap-x snap-proximity scroll-px-(--page-gutter) overflow-x-auto overscroll-x-contain px-(--page-gutter) [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {websites.map((website, cardIndex) => (
          <li
            key={website.id}
            className={cn(
              "snap-start transition-opacity duration-500 ease-out-expo motion-reduce:transition-none",
              cardIndex === snappedCardIndex ? "opacity-100" : "opacity-45"
            )}
          >
            <ProjectCard website={website} isFirst={cardIndex === 0} />
          </li>
        ))}
      </ul>
      <div className="mt-4 px-(--page-gutter)">
        <PositionSegments
          websites={websites}
          snappedCardIndex={snappedCardIndex}
          onSelect={scrollToCard}
        />
      </div>
    </div>
  );
}
