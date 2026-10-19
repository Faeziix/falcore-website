import Image from "next/image";
import type { CaseStudyImage } from "@/app/work/_lib/case-study-types";
import { cn } from "@/lib/utils";

const SCREENSHOT_QUALITY = 90;

export function PhoneScreen({
  image,
  sizes,
  className,
}: {
  image: CaseStudyImage;
  sizes: string;
  className?: string;
}) {
  return (
    <div className={cn("w-full overflow-clip border border-(--convoflow-screen-edge)", className)}>
      <Image
        src={image.src}
        alt={image.alt}
        width={image.width}
        height={image.height}
        sizes={sizes}
        quality={SCREENSHOT_QUALITY}
        className="h-auto w-full"
      />
    </div>
  );
}
