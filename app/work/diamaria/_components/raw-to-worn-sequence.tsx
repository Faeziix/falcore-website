import { blueHeartPackshot, blueHeartRawShoot, blueHeartWorn } from "../_lib/diamaria-images";
import { wornSequenceCaptions } from "../_lib/diamaria-chapters";
import { FramedPhotograph, PhotographCaption } from "./framed-photograph";

export function RawToWornSequence() {
  return (
    <ol className="grid grid-cols-2 gap-x-4 gap-y-12 md:grid-cols-3 lg:gap-x-6">
      <li>
        <figure>
          <FramedPhotograph
            image={blueHeartRawShoot}
            sizes="(min-width: 1400px) 440px, (min-width: 768px) 31vw, 48vw"
            ground="sweep"
            frameClassName="aspect-[4/5]"
            imageClassName="object-[41%_50%]"
          />
          <PhotographCaption>{wornSequenceCaptions.rawShoot}</PhotographCaption>
        </figure>
      </li>
      <li>
        <figure>
          <FramedPhotograph
            image={blueHeartPackshot}
            sizes="(min-width: 1400px) 440px, (min-width: 768px) 31vw, 48vw"
            ground="packshotWhite"
            frameClassName="aspect-[4/5]"
          />
          <PhotographCaption>{wornSequenceCaptions.packshot}</PhotographCaption>
        </figure>
      </li>
      <li className="col-span-2 md:col-span-1">
        <figure>
          <FramedPhotograph
            image={blueHeartWorn}
            sizes="(min-width: 1400px) 440px, (min-width: 768px) 31vw, 100vw"
            frameClassName="aspect-[4/5]"
          />
          <PhotographCaption>{wornSequenceCaptions.worn}</PhotographCaption>
        </figure>
      </li>
    </ol>
  );
}
