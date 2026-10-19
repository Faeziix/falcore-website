import Image from "next/image";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";

const SCREENSHOT_QUALITY = 90;
const PHONE_IMAGE_SIZES = "100vw";

export function ResponsiveScreenshot({
  desktopImage,
  phoneImage,
  desktopSizes,
}: {
  desktopImage: CaseStudyImage;
  phoneImage: CaseStudyImage;
  desktopSizes: string;
}) {
  return (
    <figure>
      <div className="border border-case-rule md:hidden">
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
      <div className="hidden border border-case-rule md:block">
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
    </figure>
  );
}
