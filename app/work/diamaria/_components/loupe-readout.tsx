import { cva } from "class-variance-authority";

export const loupeReadoutLabel = {
  inside: "Finished",
  outside: "Raw shoot",
};

const readoutLabelVariants = cva(
  "pointer-events-none absolute left-1/2 -translate-x-1/2 text-[0.625rem] leading-none whitespace-nowrap text-(--diamaria-loupe-label) uppercase tracking-(--diamaria-label-tracking)",
  {
    variants: {
      side: {
        insideTop: "top-4",
        outsideBottom: "top-[calc(100%+0.875rem)]",
      },
    },
  }
);

export function LoupeReadout() {
  return (
    <>
      <span aria-hidden className={readoutLabelVariants({ side: "insideTop" })}>
        {loupeReadoutLabel.inside}
      </span>
      <span aria-hidden className={readoutLabelVariants({ side: "outsideBottom" })}>
        {loupeReadoutLabel.outside}
      </span>
    </>
  );
}
