import Image from "next/image";
import type { CSSProperties } from "react";
import type { ClientLogo } from "@/lib/data/client-logos";

const MINIMUM_LOGOS_PER_SET = 8;
const TARGET_LOGO_AREA_PX = 6400;
const MAXIMUM_LOGO_HEIGHT_PX = 52;
const MAXIMUM_LOGO_WIDTH_PX = 190;

function opticallyBalancedSize(logo: ClientLogo) {
  const aspectRatio = logo.width / logo.height;
  const heightForTargetArea = Math.sqrt(TARGET_LOGO_AREA_PX / aspectRatio);
  const height = Math.min(
    heightForTargetArea,
    MAXIMUM_LOGO_HEIGHT_PX,
    MAXIMUM_LOGO_WIDTH_PX / aspectRatio
  );
  return { width: Math.round(height * aspectRatio), height: Math.round(height) };
}

function repeatUntilWideEnough(row: readonly ClientLogo[]) {
  if (row.length >= MINIMUM_LOGOS_PER_SET) return row;
  const repeatedRow: ClientLogo[] = [];
  while (repeatedRow.length < MINIMUM_LOGOS_PER_SET) repeatedRow.push(...row);
  return repeatedRow;
}

function splitIntoTwoRows(logos: readonly ClientLogo[]) {
  const midpoint = Math.ceil(logos.length / 2);
  return [logos.slice(0, midpoint), logos.slice(midpoint)];
}

function LogoMarqueeItem({
  logo,
  isDuplicate,
  isPaddingRepeat,
}: {
  logo: ClientLogo;
  isDuplicate: boolean;
  isPaddingRepeat: boolean;
}) {
  const displaySize = opticallyBalancedSize(logo);
  const displayWidth = { "--logo-width": `${displaySize.width}px` } as CSSProperties;

  return (
    <li
      data-duplicate={isPaddingRepeat ? "" : undefined}
      className="logo-marquee-item flex h-14 shrink-0 items-center px-7 md:h-18 md:px-11"
    >
      <Image
        src={logo.src}
        alt={isDuplicate ? "" : logo.name}
        width={logo.width}
        height={logo.height}
        loading="lazy"
        sizes={`${displaySize.width}px`}
        className="logo-marquee-mark h-auto max-w-none w-[calc(var(--logo-width)*0.75)] md:w-(--logo-width)"
        style={displayWidth}
      />
    </li>
  );
}

export default function LogoMarquee({
  logos,
  label,
}: {
  logos: readonly ClientLogo[];
  label: string;
}) {
  const rows = splitIntoTwoRows(logos);

  return (
    <div className="logo-marquee" role="region" aria-label={label}>
      {rows.map((row, rowIndex) => (
        <div
          key={rowIndex}
          className="logo-marquee-row"
          data-direction={rowIndex === 0 ? "left" : "right"}
        >
          {[0, 1].map((copyIndex) => (
            <ul
              key={copyIndex}
              className="logo-marquee-set"
              aria-hidden={copyIndex === 1 || undefined}
            >
              {repeatUntilWideEnough(row).map((logo, logoIndex) => {
                const isPaddingRepeat = logoIndex >= row.length;
                return (
                  <LogoMarqueeItem
                    key={logo.slug + logoIndex}
                    logo={logo}
                    isPaddingRepeat={isPaddingRepeat}
                    isDuplicate={copyIndex === 1 || isPaddingRepeat}
                  />
                );
              })}
            </ul>
          ))}
        </div>
      ))}
    </div>
  );
}
