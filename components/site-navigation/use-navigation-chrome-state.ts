"use client";

import { useCallback, useEffect, useRef, useState, type RefObject } from "react";
import { useMotionValueEvent, useScroll } from "motion/react";

const SCROLL_DISTANCE_BEFORE_BAR_SURFACE = 24;

export function useScrollDrivenBarState() {
  const { scrollY } = useScroll();
  const [hasScrolled, setHasScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (scrollPosition) => {
    setHasScrolled(scrollPosition > SCROLL_DISTANCE_BEFORE_BAR_SURFACE);
  });

  return { hasScrolled };
}

const HOVER_OPEN_DELAY_MS = 90;
const HOVER_CLOSE_DELAY_MS = 220;

export function useHoverIntent({ onOpen, onClose }: { onOpen: () => void; onClose: () => void }) {
  const pendingTimer = useRef<number | null>(null);

  const cancelPending = useCallback(() => {
    if (pendingTimer.current === null) return;
    window.clearTimeout(pendingTimer.current);
    pendingTimer.current = null;
  }, []);

  const schedule = useCallback(
    (action: () => void, delayMs: number) => {
      cancelPending();
      pendingTimer.current = window.setTimeout(() => {
        pendingTimer.current = null;
        action();
      }, delayMs);
    },
    [cancelPending]
  );

  useEffect(() => cancelPending, [cancelPending]);

  return {
    openAfterHoverIntent: () => schedule(onOpen, HOVER_OPEN_DELAY_MS),
    closeAfterPointerLeaves: () => schedule(onClose, HOVER_CLOSE_DELAY_MS),
    openNow: () => {
      cancelPending();
      onOpen();
    },
    closeNow: () => {
      cancelPending();
      onClose();
    },
    cancelPending,
  };
}

export function useDocumentScrollLock(isLocked: boolean) {
  useEffect(() => {
    if (!isLocked) return;
    const rootStyle = document.documentElement.style;
    const previousOverflow = rootStyle.overflow;
    rootStyle.overflow = "clip";
    return () => {
      rootStyle.overflow = previousOverflow;
    };
  }, [isLocked]);
}

type DismissibleLayerOptions = {
  isOpen: boolean;
  layerRef: RefObject<HTMLElement | null>;
  triggerRef: RefObject<HTMLElement | null>;
  onDismiss: () => void;
};

export function useDismissibleLayer({ isOpen, layerRef, triggerRef, onDismiss }: DismissibleLayerOptions) {
  useEffect(() => {
    if (!isOpen) return;

    function dismissOnEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;
      onDismiss();
      triggerRef.current?.focus();
    }

    function dismissOnPointerOutside(event: PointerEvent) {
      if (layerRef.current?.contains(event.target as Node)) return;
      onDismiss();
    }

    window.addEventListener("keydown", dismissOnEscape);
    document.addEventListener("pointerdown", dismissOnPointerOutside);
    return () => {
      window.removeEventListener("keydown", dismissOnEscape);
      document.removeEventListener("pointerdown", dismissOnPointerOutside);
    };
  }, [isOpen, layerRef, triggerRef, onDismiss]);
}
