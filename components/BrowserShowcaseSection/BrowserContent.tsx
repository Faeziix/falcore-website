"use client";

import { motion } from "framer-motion";
import { ArrowSquareOutIcon } from "@phosphor-icons/react";
import type { ShowcaseWebsite } from "./BrowserShowcaseClient";

interface BrowserContentProps {
  websites: ShowcaseWebsite[];
  activeIndex: number;
  onContentClick?: () => void;
}

const BrowserContent = ({
  websites,
  activeIndex,
  onContentClick,
}: BrowserContentProps) => {
  const activeWebsite = websites[activeIndex];

  return (
    <div
      role="tabpanel"
      id={`panel-${activeWebsite.id}`}
      aria-labelledby={`tab-${activeWebsite.id}`}
      onClick={onContentClick}
      className="relative aspect-[9/20] md:aspect-video bg-background overflow-hidden rounded-b-xl cursor-pointer group"
    >
      <motion.div
        className="absolute inset-0 bg-transparent group-hover:bg-black/20 transition-colors duration-300 z-10 pointer-events-none"
        aria-hidden="true"
      />

      {onContentClick && (
        <button
          onClick={(e) => {
            e.stopPropagation();
            onContentClick();
          }}
          className="absolute bottom-4 right-4 z-30 md:hidden flex items-center justify-center gap-2 py-3 px-5 bg-foreground hover:bg-foreground/90 text-background font-semibold rounded-full shadow-lg transition-colors"
        >
          <ArrowSquareOutIcon weight="bold" className="w-5 h-5" />
          Preview
        </button>
      )}

      {websites.map((website, index) => {
        const isActive = index === activeIndex;

        return (
          <motion.div
            key={website.id}
            initial={false}
            animate={{
              opacity: isActive ? 1 : 0,
              scale: isActive ? 1 : 0.98,
            }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="absolute inset-0"
            aria-hidden={!isActive}
          >
            {website.thumbnailUrl ? (
              <motion.div
                className="relative w-full h-full"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
              >
                <img
                  src={website.thumbnailUrl}
                  alt={`Screenshot of ${website.title}`}
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </motion.div>
            ) : (
              <div className="flex items-center justify-center h-full text-muted-foreground">
                No preview available
              </div>
            )}
          </motion.div>
        );
      })}
    </div>
  );
};

export default BrowserContent;
