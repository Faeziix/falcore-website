import { cva } from "class-variance-authority";
import { paletteAsTheSiteSpendsIt, paletteSpendCaption } from "../_lib/palette-spend";

const paletteSwatchVariants = cva("flex min-w-0 items-end px-3 pb-3 sm:px-4 sm:pb-4", {
  variants: {
    name: {
      ground: "bg-(--sanaa-ouahmane-swatch-ground) text-(--sanaa-ouahmane-swatch-label-on-light)",
      porcelain: "bg-(--sanaa-ouahmane-swatch-porcelain) text-(--sanaa-ouahmane-swatch-label-on-light)",
      graphite: "bg-(--sanaa-ouahmane-swatch-graphite) text-(--sanaa-ouahmane-swatch-label-on-dark)",
      crimson: "bg-(--sanaa-ouahmane-swatch-crimson) text-(--sanaa-ouahmane-swatch-label-on-dark)",
      mulberry: "bg-(--sanaa-ouahmane-swatch-mulberry) text-(--sanaa-ouahmane-swatch-label-on-dark)",
      terracotta: "bg-(--sanaa-ouahmane-swatch-terracotta)",
    },
  },
});

export function PaletteSpendStrip() {
  return (
    <figure>
      <ul aria-label="Palette" className="flex h-24 border border-case-rule sm:h-32">
        {paletteAsTheSiteSpendsIt.map((swatch) => (
          <li
            key={swatch.name}
            style={{ flexGrow: swatch.share, flexBasis: 0 }}
            className={paletteSwatchVariants({ name: swatch.name })}
          >
            <span
              className={
                swatch.isLabelVisible
                  ? "hidden truncate font-(family-name:--sanaa-ouahmane-label-family) text-[0.8125rem] tracking-(--sanaa-ouahmane-label-tracking) uppercase xl:block"
                  : "sr-only"
              }
            >
              {swatch.label}
            </span>
          </li>
        ))}
      </ul>
      <figcaption className="mt-4 max-w-xl text-sm text-case-ink-soft">{paletteSpendCaption}</figcaption>
    </figure>
  );
}
