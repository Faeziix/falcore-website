import { emeraldCutPackshotThreeQuarter, emeraldCutRawShootDetail } from "../_lib/diamaria-images";
import { FramedPhotograph, PhotographCaption } from "./framed-photograph";
import { loupeReadoutLabel } from "./loupe-readout";

export function LoupeStillComparison() {
  return (
    <div className="page-container grid grid-cols-2 gap-4 lg:gap-6">
      <figure>
        <FramedPhotograph
          image={emeraldCutRawShootDetail}
          sizes="(min-width: 1400px) 670px, 48vw"
          ground="sweep"
          frameClassName="aspect-square"
        />
        <PhotographCaption>{loupeReadoutLabel.outside}</PhotographCaption>
      </figure>
      <figure>
        <FramedPhotograph
          image={emeraldCutPackshotThreeQuarter}
          sizes="(min-width: 1400px) 670px, 48vw"
          ground="packshotWhite"
          frameClassName="aspect-square"
        />
        <PhotographCaption>{loupeReadoutLabel.inside}</PhotographCaption>
      </figure>
    </div>
  );
}
