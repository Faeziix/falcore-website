"use client";

import * as React from "react";
import useEmblaCarousel, {
  type UseEmblaCarouselType,
} from "embla-carousel-react";
import { useReducedMotion } from "motion/react";
import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type CarouselApi = UseEmblaCarouselType[1];
type CarouselOptions = Parameters<typeof useEmblaCarousel>[0];

const calmSwipeOptions: CarouselOptions = {
  align: "start",
  containScroll: "trimSnaps",
  skipSnaps: false,
  dragThreshold: 12,
  duration: 25,
};

type CarouselContextValue = {
  viewportRef: UseEmblaCarouselType[0];
  api: CarouselApi;
  selectedIndex: number;
  snapCount: number;
  canScrollPrev: boolean;
  canScrollNext: boolean;
  scrollTo: (index: number) => void;
  scrollPrev: () => void;
  scrollNext: () => void;
};

const CarouselContext = React.createContext<CarouselContextValue | null>(null);

function useCarousel() {
  const carouselContext = React.useContext(CarouselContext);
  if (!carouselContext) {
    throw new Error("useCarousel must be used inside <Carousel>");
  }
  return carouselContext;
}

function Carousel({
  opts,
  className,
  children,
  ...props
}: React.ComponentProps<"div"> & { opts?: CarouselOptions }) {
  const [viewportRef, api] = useEmblaCarousel({ ...calmSwipeOptions, ...opts });
  const prefersReducedMotion = useReducedMotion() ?? false;
  const [selectedIndex, setSelectedIndex] = React.useState(0);
  const [snapCount, setSnapCount] = React.useState(0);
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(false);

  React.useEffect(() => {
    if (!api) return;
    const syncPosition = () => {
      setSelectedIndex(api.selectedScrollSnap());
      setSnapCount(api.scrollSnapList().length);
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    syncPosition();
    api.on("select", syncPosition);
    api.on("reInit", syncPosition);
    return () => {
      api.off("select", syncPosition);
      api.off("reInit", syncPosition);
    };
  }, [api]);

  const scrollTo = React.useCallback(
    (index: number) => api?.scrollTo(index, prefersReducedMotion),
    [api, prefersReducedMotion]
  );
  const scrollPrev = React.useCallback(
    () => api?.scrollPrev(prefersReducedMotion),
    [api, prefersReducedMotion]
  );
  const scrollNext = React.useCallback(
    () => api?.scrollNext(prefersReducedMotion),
    [api, prefersReducedMotion]
  );

  const handleArrowKeys = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      scrollPrev();
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      scrollNext();
    }
  };

  return (
    <CarouselContext.Provider
      value={{
        viewportRef,
        api,
        selectedIndex,
        snapCount,
        canScrollPrev,
        canScrollNext,
        scrollTo,
        scrollPrev,
        scrollNext,
      }}
    >
      <div
        role="region"
        aria-roledescription="carousel"
        onKeyDownCapture={handleArrowKeys}
        className={cn("relative", className)}
        {...props}
      >
        {children}
      </div>
    </CarouselContext.Provider>
  );
}

function CarouselContent({
  className,
  viewportClassName,
  ...props
}: React.ComponentProps<"div"> & { viewportClassName?: string }) {
  const { viewportRef } = useCarousel();

  return (
    <div ref={viewportRef} className={cn("overflow-hidden", viewportClassName)}>
      <div className={cn("-ml-4 flex touch-pan-y", className)} {...props} />
    </div>
  );
}

function CarouselItem({ className, ...props }: React.ComponentProps<"div">) {
  return (
    <div
      role="group"
      aria-roledescription="slide"
      className={cn("flex min-w-0 shrink-0 grow-0 basis-full pl-4", className)}
      {...props}
    />
  );
}

function CarouselPrevious({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollPrev, canScrollPrev } = useCarousel();

  return (
    <Button
      variant="outline"
      className={cn("w-11 px-0", className)}
      aria-label="Previous slide"
      disabled={!canScrollPrev}
      onClick={scrollPrev}
      {...props}
    >
      <ArrowLeftIcon aria-hidden weight="bold" />
    </Button>
  );
}

function CarouselNext({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  const { scrollNext, canScrollNext } = useCarousel();

  return (
    <Button
      variant="outline"
      className={cn("w-11 px-0", className)}
      aria-label="Next slide"
      disabled={!canScrollNext}
      onClick={scrollNext}
      {...props}
    >
      <ArrowRightIcon aria-hidden weight="bold" />
    </Button>
  );
}

export {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselPrevious,
  CarouselNext,
  useCarousel,
  type CarouselApi,
  type CarouselOptions,
};
