"use client";

import { useRef } from "react";
import { useHoverIntent } from "./use-navigation-chrome-state";

export type MenuTriggerHandlers = {
  onPointerEnter: (event: React.PointerEvent) => void;
  onPointerDown: (event: React.PointerEvent) => void;
  onClick: () => void;
};

type MenuHoverOptions = {
  openMenu: () => void;
  closeMenu: () => void;
  toggleMenu: () => void;
};

export function isMousePointer(event: React.PointerEvent) {
  return event.pointerType === "mouse";
}

export function useMenuHover({ openMenu, closeMenu, toggleMenu }: MenuHoverOptions) {
  const menuHoverIntent = useHoverIntent({ onOpen: openMenu, onClose: closeMenu });
  const lastTriggerPointerType = useRef<string | null>(null);

  const triggerHandlers: MenuTriggerHandlers = {
    onPointerEnter: (event) => {
      if (isMousePointer(event)) menuHoverIntent.openAfterHoverIntent();
    },
    onPointerDown: (event) => {
      lastTriggerPointerType.current = event.pointerType;
    },
    onClick: () => {
      const wasMouseClick = lastTriggerPointerType.current === "mouse";
      lastTriggerPointerType.current = null;
      if (wasMouseClick) {
        menuHoverIntent.openNow();
        return;
      }
      menuHoverIntent.cancelPending();
      toggleMenu();
    },
  };

  return {
    triggerHandlers,
    closeNow: menuHoverIntent.closeNow,
    cancelPending: menuHoverIntent.cancelPending,
    closeAfterPointerLeaves: menuHoverIntent.closeAfterPointerLeaves,
  };
}
