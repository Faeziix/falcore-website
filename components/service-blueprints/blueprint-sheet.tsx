"use client";

import { useRef, type ReactNode } from "react";
import { useElementWidth } from "@/lib/hooks/use-element-width";
import { cn } from "@/lib/utils";
import { BLUEPRINT_CANVAS, type BlueprintFraming } from "./blueprint-canvas";
import { BlueprintSheetChrome } from "./blueprint-sheet-chrome";

type BlueprintSheetProps = {
  title: string;
  sheetNumber: string;
  label: string;
  framing: BlueprintFraming;
  drawing: ReactNode;
  spatialLayer?: ReactNode;
  foreground?: ReactNode;
  className?: string;
};

export function BlueprintSheet({
  title,
  sheetNumber,
  label,
  framing,
  drawing,
  spatialLayer,
  foreground,
  className,
}: BlueprintSheetProps) {
  const viewportReference = useRef<HTMLDivElement>(null);
  const viewportWidth = useElementWidth(viewportReference);
  const scale = viewportWidth / framing.width;

  return (
    <div
      ref={viewportReference}
      role="img"
      aria-label={label}
      className={cn("relative size-full overflow-clip bg-background", className)}
    >
      <div
        aria-hidden
        className={cn("absolute top-0 left-0 origin-top-left", viewportWidth === 0 && "invisible")}
        style={{
          width: BLUEPRINT_CANVAS.width,
          height: BLUEPRINT_CANVAS.height,
          transform: `scale(${scale}) translate(${-framing.x}px, ${-framing.y}px)`,
        }}
      >
        <svg
          viewBox={`0 0 ${BLUEPRINT_CANVAS.width} ${BLUEPRINT_CANVAS.height}`}
          width={BLUEPRINT_CANVAS.width}
          height={BLUEPRINT_CANVAS.height}
          className="absolute inset-0"
        >
          <BlueprintSheetChrome title={title} sheetNumber={sheetNumber} />
          {drawing}
        </svg>
        {spatialLayer && <div className="absolute inset-0 perspective-[2600px] perspective-origin-[50%_30%]">{spatialLayer}</div>}
        {foreground && (
          <svg
            viewBox={`0 0 ${BLUEPRINT_CANVAS.width} ${BLUEPRINT_CANVAS.height}`}
            width={BLUEPRINT_CANVAS.width}
            height={BLUEPRINT_CANVAS.height}
            className="pointer-events-none absolute inset-0"
          >
            {foreground}
          </svg>
        )}
      </div>
    </div>
  );
}
