import Image from "next/image";
import { cva, type VariantProps } from "class-variance-authority";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const SCREENSHOT_QUALITY = 90;
const PHONE_IMAGE_SIZES = "(min-width: 640px) 384px, 100vw";

const phoneFrameVariants = cva("border border-case-rule sm:max-w-sm", {
  variants: {
    desktopFrom: {
      lg: "lg:hidden",
      xl: "xl:hidden",
    },
  },
  defaultVariants: { desktopFrom: "lg" },
});

const desktopFrameVariants = cva("hidden border border-case-rule", {
  variants: {
    desktopFrom: {
      lg: "lg:block",
      xl: "xl:block",
    },
  },
  defaultVariants: { desktopFrom: "lg" },
});

type ResponsiveScreenshotProps = VariantProps<typeof phoneFrameVariants> & {
  desktopImage: CaseStudyImage;
  phoneImage: CaseStudyImage;
  desktopSizes: string;
  caption?: string;
};

export function ResponsiveScreenshot({
  desktopImage,
  phoneImage,
  desktopSizes,
  caption,
  desktopFrom,
}: ResponsiveScreenshotProps) {
  return (
    <figure>
      <div className={phoneFrameVariants({ desktopFrom })}>
        <Image
          src={phoneImage.src}
          alt={phoneImage.alt}
          width={phoneImage.width}
          height={phoneImage.height}
          quality={SCREENSHOT_QUALITY}
          sizes={PHONE_IMAGE_SIZES}
          className="h-auto w-full"
        />
      </div>
      <div className={desktopFrameVariants({ desktopFrom })}>
        <Image
          src={desktopImage.src}
          alt={desktopImage.alt}
          width={desktopImage.width}
          height={desktopImage.height}
          quality={SCREENSHOT_QUALITY}
          sizes={desktopSizes}
          className="h-auto w-full"
        />
      </div>
      {caption ? (
        <figcaption className="mt-3 max-w-xl text-sm text-case-ink-soft md:mt-4">{caption}</figcaption>
      ) : null}
    </figure>
  );
}
