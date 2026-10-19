import {
  olympicCollectionPieces,
  pinkRadiantProductPageDesktop,
  pinkRadiantProductPageMobile,
} from "../_lib/diamaria-images";
import { FramedPhotograph } from "./framed-photograph";

export function CatalogueCaptures() {
  return (
    <div className="grid gap-4 lg:gap-6">
      <FramedPhotograph
        image={olympicCollectionPieces}
        sizes="(min-width: 1400px) 1340px, (min-width: 640px) 96vw, 190vw"
        border="hairline"
        ground="paper"
        frameClassName="aspect-[1440/1010] sm:aspect-[2880/1010]"
        imageClassName="object-left sm:object-center"
      />
      <div className="grid grid-cols-[minmax(0,1fr)] gap-4 sm:grid-cols-[minmax(0,3.608fr)_minmax(0,1fr)] lg:gap-6">
        <FramedPhotograph
          image={pinkRadiantProductPageDesktop}
          sizes="(min-width: 1400px) 1040px, 76vw"
          border="hairline"
          ground="paper"
          frameClassName="hidden aspect-[2880/1728] sm:block"
        />
        <FramedPhotograph
          image={pinkRadiantProductPageMobile}
          sizes="(min-width: 1400px) 290px, (min-width: 640px) 22vw, 70vw"
          border="hairline"
          ground="paper"
          frameClassName="mx-auto aspect-[828/1792] w-[70%] sm:w-full"
        />
      </div>
    </div>
  );
}
