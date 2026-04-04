"use client";

import { useRef, useState, useEffect } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "motion/react";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import type { ShowcaseWebsite } from "./BrowserShowcaseClient";
import Image from "next/image";

interface HorizontalScrollGalleryProps {
  websites: ShowcaseWebsite[];
}

function ProjectCard({ website }: { website: ShowcaseWebsite }) {
  return (
    <a
      href={website.externalUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="block w-[90vw] flex-shrink-0 border border-border bg-card overflow-hidden group max-w-xs"
    >
      <div className="relative aspect-3/4 bg-muted/10 overflow-hidden">
        <Image
          src={website.mobileThumbnailUrl}
          alt={`Screenshot of ${website.title}`}
          className="w-full h-full object-cover object-top transition-transform duration-700 group-active:scale-105"
          loading="lazy"
          width={website.mobileWidth}
          height={website.mobileHeight}
        />
      </div>
      <div className="flex items-center justify-between px-5 py-3">
        <div>
          <h3 className="text-sm font-medium text-foreground">
            {website.title}
          </h3>
          <p className="text-xs text-muted-foreground mt-0.5">
            {new URL(website.externalUrl).hostname}
          </p>
        </div>
        <ArrowSquareOutIcon
          weight="bold"
          className="w-4 h-4 text-muted-foreground flex-shrink-0"
        />
      </div>
    </a>
  );
}

function StackedFallback({ websites }: { websites: ShowcaseWebsite[] }) {
  return (
    <div className="flex flex-col gap-6 px-6">
      <div className="px-0">
        <h2 className="text-3xl font-bold tracking-tighter">Selected work</h2>
        <p className="text-muted-foreground text-lg mt-4 max-w-2xl">
          A look at recent projects we have shipped.
        </p>
      </div>
      {websites.map((website) => (
        <a
          key={website.id}
          href={website.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block border border-border bg-card overflow-hidden"
        >
          <div className="relative aspect-video bg-muted/10 overflow-hidden">
            <img
              src={website.mobileThumbnailUrl}
              alt={`Screenshot of ${website.title}`}
              className="w-full h-full object-cover object-top"
              loading="lazy"
            />
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <div>
              <h3 className="text-sm font-medium text-foreground">
                {website.title}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                {new URL(website.externalUrl).hostname}
              </p>
            </div>
            <ArrowSquareOutIcon
              weight="bold"
              className="w-4 h-4 text-muted-foreground flex-shrink-0"
            />
          </div>
        </a>
      ))}
    </div>
  );
}

export default function HorizontalScrollGallery({
  websites,
}: HorizontalScrollGalleryProps) {
  const shouldReduceMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollRange, setScrollRange] = useState(0);
  const [viewportHeight, setViewportHeight] = useState(0);

  useEffect(() => {
    if (!trackRef.current) return;
    const measure = () => {
      const trackWidth = trackRef.current!.scrollWidth;
      const vw = window.innerWidth;
      setScrollRange(trackWidth - vw);
      setViewportHeight(window.innerHeight);
    };
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [websites.length]);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);

  if (shouldReduceMotion) {
    return <StackedFallback websites={websites} />;
  }

  const containerHeight = scrollRange + viewportHeight;

  return (
    <div
      ref={containerRef}
      style={{
        height: containerHeight > 0 ? `${containerHeight}px` : "100dvh",
      }}
      className="relative"
    >
      <div className="sticky top-0 overflow-hidden px-6 pt-24 pb-12">
        <div className="mb-6">
          <h2 className="text-3xl font-bold tracking-tighter">
            Selected work
          </h2>
          <p className="text-muted-foreground text-base mt-2 max-w-2xl">
            A look at recent projects we have shipped.
          </p>
        </div>
        <motion.div
          ref={trackRef}
          style={{ x }}
          className="flex gap-5 -mx-6 px-6"
        >
          {websites.map((website) => (
            <ProjectCard key={website.id} website={website} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
