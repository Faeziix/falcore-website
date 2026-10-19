import type { CSSProperties, PointerEvent } from "react";
import Image from "next/image";
import { cva } from "class-variance-authority";
import {
  departmentName,
  treatmentCountLabel,
  type DepartmentSwatch,
  type StripLanguage,
} from "../_lib/department-swatches";
import { OPEN_SWATCH_BAND_IMAGE_SIZES } from "../_lib/image-sizes";

const swatchBandVariants = cva(
  "relative grid min-w-0 grid-cols-[minmax(0,1fr)_auto] px-5 py-5 [grid-template-areas:'name_count'_'panel_panel'] sm:px-6 lg:grid-cols-1 lg:grid-rows-[auto_minmax(0,1fr)_auto] lg:p-6 lg:[grid-template-areas:'name'_'panel'_'count']",
  {
    variants: {
      tone: {
        copper: "bg-(--corpofino-tone-copper) text-(--corpofino-tone-text-on-light)",
        blush: "bg-(--corpofino-tone-blush) text-(--corpofino-tone-text-on-light)",
        rose: "bg-(--corpofino-tone-rose) text-(--corpofino-tone-text-on-light)",
        linen: "bg-(--corpofino-tone-linen) text-(--corpofino-tone-text-on-light)",
        ink: "bg-(--corpofino-tone-ink) text-(--corpofino-tone-text-on-ink)",
      },
    },
  }
);

const treatmentPanelVariants = cva(
  "grid transition-[grid-template-rows,opacity] duration-700 ease-out-expo [grid-area:panel] lg:grid-rows-[minmax(0,1fr)]",
  {
    variants: {
      isOpen: {
        true: "grid-rows-[1fr] opacity-100 delay-150",
        false: "grid-rows-[0fr] opacity-0",
      },
    },
  }
);

function bandTransitionName(swatch: DepartmentSwatch): CSSProperties {
  return { viewTransitionName: `corpofino-band-${swatch.id}` };
}

export function DepartmentSwatchBand({
  swatch,
  language,
  isOpen,
  onOpen,
}: {
  swatch: DepartmentSwatch;
  language: StripLanguage;
  isOpen: boolean;
  onOpen: (bandPart: HTMLElement) => void;
}) {
  const panelId = `corpofino-department-${swatch.id}`;

  function openOnMouseHover(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") onOpen(event.currentTarget);
  }

  return (
    <div
      style={bandTransitionName(swatch)}
      onPointerEnter={openOnMouseHover}
      className={swatchBandVariants({ tone: swatch.tone })}
    >
      <h3 className="[grid-area:name]">
        <button
          type="button"
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={(event) => onOpen(event.currentTarget)}
          onFocus={(event) => onOpen(event.currentTarget)}
          className="text-start font-case-display text-[clamp(1.25rem,0.9vw+0.9rem,1.75rem)] leading-[1.12] font-normal tracking-[-0.02em] after:absolute after:inset-0 after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:-outline-offset-8 focus-visible:after:outline-current"
        >
          {departmentName(swatch, language)}
        </button>
      </h3>
      <p className="self-center text-sm [grid-area:count] lg:self-end">
        {treatmentCountLabel(swatch.treatmentCount, language)}
      </p>
      <div id={panelId} aria-hidden={!isOpen} className={treatmentPanelVariants({ isOpen })}>
        <div className="relative min-h-0 overflow-clip">
          <div className="relative mt-5 aspect-[3/4] w-full sm:max-w-md lg:absolute lg:inset-x-0 lg:inset-y-6 lg:mt-0 lg:aspect-auto lg:max-w-none">
            <Image
              src={swatch.treatmentWall.src}
              alt={swatch.treatmentWall.alt}
              fill
              sizes={OPEN_SWATCH_BAND_IMAGE_SIZES}
              quality={90}
              className="object-contain object-[0%_0%] rtl:object-[100%_0%]"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
