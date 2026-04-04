"use client";

import { useState } from "react";
import { motion } from "motion/react";
import Image from "next/image";
import type { ShowcaseWebsite } from "./BrowserShowcaseClient";

interface BrowserTabBarProps {
  websites: ShowcaseWebsite[];
  activeIndex: number;
  onTabChange: (index: number) => void;
}

const getBaseUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return `${urlObj.protocol}//${urlObj.hostname}`;
  } catch {
    return url;
  }
};

const getFaviconSources = (url: string): string[] => {
  const baseUrl = getBaseUrl(url);
  return [
    `${baseUrl}/favicon.ico`,
    `${baseUrl}/favicon.png`,
    `${baseUrl}/icon.png`,
    `${baseUrl}/apple-touch-icon.png`,
  ];
};

const Favicon = ({ url }: { url: string }) => {
  const sources = getFaviconSources(url);
  const [sourceIndex, setSourceIndex] = useState(0);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (sourceIndex < sources.length - 1) {
      setSourceIndex(sourceIndex + 1);
    } else {
      setHasError(true);
    }
  };

  if (hasError) {
    return (
      <div className="w-4 h-4 rounded-full bg-muted-dim/30 flex-shrink-0" />
    );
  }

  return (
    <Image
      src={sources[sourceIndex]}
      alt=""
      width={16}
      height={16}
      className="object-contain"
      unoptimized
      onError={handleError}
    />
  );
};

const truncateTitle = (title: string, maxLength: number = 18): string => {
  if (title.length <= maxLength) return title;
  return `${title.slice(0, maxLength)}...`;
};

const tabVariants = {
  initial: { opacity: 0, y: -10 },
  animate: { opacity: 1, y: 0 },
};

const BrowserTabBar = ({
  websites,
  activeIndex,
  onTabChange,
}: BrowserTabBarProps) => {
  const handleKeyDown = (
    event: React.KeyboardEvent,
    currentIndex: number
  ) => {
    const lastIndex = websites.length - 1;

    switch (event.key) {
      case "ArrowRight":
        event.preventDefault();
        onTabChange(currentIndex === lastIndex ? 0 : currentIndex + 1);
        break;
      case "ArrowLeft":
        event.preventDefault();
        onTabChange(currentIndex === 0 ? lastIndex : currentIndex - 1);
        break;
      case "Home":
        event.preventDefault();
        onTabChange(0);
        break;
      case "End":
        event.preventDefault();
        onTabChange(lastIndex);
        break;
    }
  };

  return (
    <div
      role="tablist"
      aria-label="Website showcase tabs"
      className="flex items-end gap-1 px-2 pt-2 bg-muted/50 overflow-x-auto"
    >
      {websites.map((website, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.button
            key={website.id}
            role="tab"
            id={`tab-${website.id}`}
            aria-selected={isActive}
            aria-controls={`panel-${website.id}`}
            tabIndex={isActive ? 0 : -1}
            variants={tabVariants}
            initial="initial"
            animate="animate"
            transition={{ delay: index * 0.05, duration: 0.3 }}
            onClick={() => onTabChange(index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className={`relative flex items-center gap-2 px-3 py-2 rounded-t-lg min-w-[140px] max-w-[180px] mb-2 text-sm font-medium transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
              isActive
                ? "bg-card text-foreground"
                : "bg-muted/70 text-muted-foreground hover:text-foreground hover:bg-muted"
            }`}
          >
            <div className="flex items-center justify-center w-4 h-4 flex-shrink-0">
              <Favicon url={website.externalUrl} />
            </div>
            <span className="truncate">{truncateTitle(website.title)}</span>
            {isActive && (
              <motion.div
                layoutId="activeTabIndicator"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
                transition={{ type: "spring", stiffness: 500, damping: 30 }}
              />
            )}
          </motion.button>
        );
      })}
    </div>
  );
};

export default BrowserTabBar;
