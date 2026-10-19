import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import { eliteNeroSlabImage } from "../_lib/timeless-touch-images";

const SLAB_IMAGE_QUALITY = 90;

export const slabTravelVariants = cva(
  "transition-[translate,scale] duration-[1500ms] ease-in-out-quart",
  {
    variants: {
      timing: {
        firstOpening: "delay-[450ms]",
        visitorToggle: "delay-0",
      },
    },
  }
);

const slabHalfVariants = cva(
  "absolute inset-y-0 w-1/2 overflow-clip bg-(--timeless-touch-ceramics-slab-backing) will-change-[translate]",
  {
    variants: {
      side: {
        left: "left-0",
        right: "right-0",
      },
      position: {
        open: "",
        closed: "translate-x-0",
      },
    },
    compoundVariants: [
      { side: "left", position: "open", className: "-translate-x-full" },
      { side: "right", position: "open", className: "translate-x-full" },
    ],
  }
);

const slabFaceVariants = cva("absolute inset-0", {
  variants: {
    side: {
      left: "",
      right: "-scale-x-100",
    },
  },
});

type SlabHalfVariantProps = VariantProps<typeof slabHalfVariants>;
type SlabTravelVariantProps = VariantProps<typeof slabTravelVariants>;

export function BookmatchSlabHalf({
  side,
  position,
  timing,
}: {
  side: NonNullable<SlabHalfVariantProps["side"]>;
  position: NonNullable<SlabHalfVariantProps["position"]>;
  timing: NonNullable<SlabTravelVariantProps["timing"]>;
}) {
  return (
    <div aria-hidden className={slabTravelVariants({ timing, className: slabHalfVariants({ side, position }) })}>
      <div className={slabFaceVariants({ side })}>
        <Image
          src={eliteNeroSlabImage.src}
          alt={eliteNeroSlabImage.alt}
          fill
          priority
          quality={SLAB_IMAGE_QUALITY}
          sizes="(min-width: 1400px) 700px, 50vw"
          className="object-cover object-center"
        />
      </div>
    </div>
  );
}
