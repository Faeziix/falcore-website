import Image from "next/image";
import { CAPTIONS } from "../_lib/case-study-content";
import { treatmentImageryWall } from "../_lib/case-study-images";
import { TREATMENT_WALL_MAX_WIDTH_IMAGE_SIZES } from "../_lib/image-sizes";

export function TreatmentImageryWall() {
  return (
    <figure className="mx-auto max-w-[1600px]">
      <div className="relative aspect-square overflow-clip sm:aspect-[4/3] md:aspect-[3128/1086]">
        <Image
          src={treatmentImageryWall.src}
          alt={treatmentImageryWall.alt}
          fill
          sizes={TREATMENT_WALL_MAX_WIDTH_IMAGE_SIZES}
          quality={90}
          className="object-cover object-left"
        />
      </div>
      <figcaption className="page-container mt-4 text-sm text-case-ink-soft">{CAPTIONS.photographs}</figcaption>
    </figure>
  );
}
