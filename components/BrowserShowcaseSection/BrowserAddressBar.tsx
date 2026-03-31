"use client";

import { motion, AnimatePresence } from "framer-motion";

interface BrowserAddressBarProps {
  url: string;
}

const formatDisplayUrl = (url: string): string => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname + urlObj.pathname.replace(/\/$/, "");
  } catch {
    return url;
  }
};

const BrowserAddressBar = ({ url }: BrowserAddressBarProps) => {
  return (
    <div className="flex items-center gap-3 px-4 py-2 bg-card border-b border-border">
      <div className="flex items-center gap-2 flex-1 px-3 py-1.5 rounded-md bg-card-bright border border-border">
        <svg
          className="w-3.5 h-3.5 text-emerald-500 flex-shrink-0"
          viewBox="0 0 16 16"
          fill="currentColor"
          aria-hidden="true"
        >
          <path d="M8 1a4 4 0 0 0-4 4v3H3a1 1 0 0 0-1 1v5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V9a1 1 0 0 0-1-1h-1V5a4 4 0 0 0-4-4zm2 7H6V5a2 2 0 1 1 4 0v3z" />
        </svg>
        <AnimatePresence mode="wait">
          <motion.span
            key={url}
            initial={{ opacity: 0, y: 5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -5 }}
            transition={{ duration: 0.2 }}
            className="text-sm text-muted-foreground truncate"
          >
            {formatDisplayUrl(url)}
          </motion.span>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BrowserAddressBar;
