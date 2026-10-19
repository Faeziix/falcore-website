"use client";

import { useRef } from "react";
import type { ServicesTriggerHandlers } from "./desktop-navigation";
import { useHoverIntent } from "./use-navigation-chrome-state";

type ServicesMenuHoverOptions = {
  openServicesMenu: () => void;
  closeServicesMenu: () => void;
  toggleServicesMenu: () => void;
};

function isMousePointer(event: React.PointerEvent) {
  return event.pointerType === "mouse";
}

export function useServicesMenuHover({
  openServicesMenu,
  closeServicesMenu,
  toggleServicesMenu,
}: ServicesMenuHoverOptions) {
  const servicesHoverIntent = useHoverIntent({ onOpen: openServicesMenu, onClose: closeServicesMenu });
  const lastTriggerPointerType = useRef<string | null>(null);

  const servicesTriggerHandlers: ServicesTriggerHandlers = {
    onPointerEnter: (event) => {
      if (isMousePointer(event)) servicesHoverIntent.openAfterHoverIntent();
    },
    onPointerDown: (event) => {
      lastTriggerPointerType.current = event.pointerType;
    },
    onClick: () => {
      const wasMouseClick = lastTriggerPointerType.current === "mouse";
      lastTriggerPointerType.current = null;
      if (wasMouseClick) {
        servicesHoverIntent.openNow();
        return;
      }
      servicesHoverIntent.cancelPending();
      toggleServicesMenu();
    },
  };

  return {
    servicesTriggerHandlers,
    closeServicesWhenPageLinkHovered: (event: React.PointerEvent) => {
      if (isMousePointer(event)) servicesHoverIntent.closeNow();
    },
    headerPointerHandlers: {
      onPointerEnter: (event: React.PointerEvent) => {
        if (isMousePointer(event)) servicesHoverIntent.cancelPending();
      },
      onPointerLeave: (event: React.PointerEvent) => {
        if (isMousePointer(event)) servicesHoverIntent.closeAfterPointerLeaves();
      },
    },
  };
}
