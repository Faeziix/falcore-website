"use client";

import { useCallback } from "react";
import { ArrowUpRightIcon } from "@phosphor-icons/react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  useCarousel,
  useCarouselScrollTween,
  type LoadedCarouselApi,
} from "@/components/ui/carousel";
import { SectionHeading } from "@/components/ui/section-heading";
import { cn } from "@/lib/utils";
import {
  SHOWCASE_SECTION_INTRO,
  SHOWCASE_SECTION_TITLE,
  type ShowcaseWebsite,
} from "@/lib/data/showcase-websites";

const DIMMED_CARD_OPACITY = 0.45;
const SCREENSHOT_PARALLAX_SHIFT_PERCENT = 4.5;

const clamp = (value: number, min: number, max: number) =>
  Math.min(max, Math.max(min, value));

function useCardFocusTween() {
  const applyCardFocus = useCallback(
    (api: LoadedCarouselApi, slideDistancesInCards: number[]) => {
      api.slideNodes().forEach((slide, slideIndex) => {
        const distance = clamp(slideDistancesInCards[slideIndex], -1, 1);
        const closeness = 1 - Math.abs(distance);
        slide.style.opacity = String(
          DIMMED_CARD_OPACITY + (1 - DIMMED_CARD_OPACITY) * closeness
        );
        const parallaxLayer = slide.querySelector<HTMLElement>("[data-parallax-layer]");
        if (parallaxLayer) {
          parallaxLayer.style.transform = `translate3d(${distance * -SCREENSHOT_PARALLAX_SHIFT_PERCENT}%, 0, 0)`;
        }
      });
    },
    []
  );

  useCarouselScrollTween(applyCardFocus);
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
      draggable={false}
      className="group flex flex-1 flex-col border border-border bg-card transition-colors duration-300 hover:border-border-strong focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground active:border-border-strong"
    >
      <div className="relative aspect-9/16 overflow-clip border-b border-border bg-muted/10">
        <div data-parallax-layer className="absolute inset-y-0 -left-[5%] w-[110%] will-change-transform">
          <Image
            src={website.mobileThumbnailUrl}
            alt={`Screenshot of ${website.title}`}
            fill
            draggable={false}
            sizes="(max-width: 767px) 90vw, 352px"
            quality={90}
            className="object-cover object-top"
            priority={isFirst}
          />
        </div>
      </div>
      <div className="flex flex-1 items-start justify-between gap-4 px-5 pt-4 pb-5">
        <div className="min-w-0">
          <h3 className="text-base font-medium text-foreground">
            {website.title}
          </h3>
          <p className="mt-1 text-sm text-foreground-soft">{website.summary}</p>
        </div>
        <ArrowUpRightIcon
          aria-hidden
          weight="bold"
          className="mt-1 size-4 shrink-0 text-muted-foreground transition-[color,translate] duration-300 ease-out-expo group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-foreground group-focus-visible:text-foreground group-active:text-foreground"
        />
      </div>
    </a>
  );
}

function ShowcaseSlides({ websites }: { websites: ShowcaseWebsite[] }) {
  useCardFocusTween();

  return (
    <CarouselContent viewportClassName="px-(--page-gutter)">
      {websites.map((website, cardIndex) => (
        <CarouselItem
          key={website.id}
          aria-label={`${cardIndex + 1} of ${websites.length}: ${website.title}`}
          className={cn(
            "basis-[min(82%,20rem)]",
            cardIndex === 0 ? "opacity-100" : "opacity-45"
          )}
        >
          <ProjectCard website={website} isFirst={cardIndex === 0} />
        </CarouselItem>
      ))}
    </CarouselContent>
  );
}

function PositionSegments({ websites }: { websites: ShowcaseWebsite[] }) {
  const { selectedIndex, scrollTo } = useCarousel();

  return (
    <div className="mt-4 flex gap-1.5 px-(--page-gutter)">
      {websites.map((website, cardIndex) => {
        const isCurrent = cardIndex === selectedIndex;
        return (
          <button
            key={website.id}
            type="button"
            aria-label={`Show ${website.title}`}
            aria-current={isCurrent || undefined}
            onClick={() => scrollTo(cardIndex)}
            className="flex h-11 flex-1 items-center focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-foreground"
          >
            <span
              className={cn(
                "block w-full transition-[height,background-color] duration-300 ease-out-expo",
                isCurrent ? "h-0.5 bg-foreground" : "h-px bg-border-strong"
              )}
            />
          </button>
        );
      })}
    </div>
  );
}

function SelectedWebsiteAnnouncement({ websites }: { websites: ShowcaseWebsite[] }) {
  const { selectedIndex } = useCarousel();

  return (
    <p aria-live="polite" className="sr-only">
      {selectedIndex + 1} of {websites.length}: {websites[selectedIndex]?.title}
    </p>
  );
}

export default function MobileShowcaseCarousel({
  websites,
}: {
  websites: ShowcaseWebsite[];
}) {
  return (
    <Carousel aria-label={SHOWCASE_SECTION_TITLE} className="section-spacing">
      <SectionHeading
        title={SHOWCASE_SECTION_TITLE}
        intro={SHOWCASE_SECTION_INTRO}
        actions={
          <div className="flex gap-2">
            <CarouselPrevious aria-label="Previous website" />
            <CarouselNext aria-label="Next website" />
          </div>
        }
        className="mx-(--page-gutter) mb-10"
      />
      <SelectedWebsiteAnnouncement websites={websites} />
      <ShowcaseSlides websites={websites} />
      <PositionSegments websites={websites} />
    </Carousel>
  );
}
