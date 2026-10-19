import {
  olympicCollectionPieces,
  olympicCollectionPiecesOnPhone,
  pinkRadiantProductPageDesktop,
  pinkRadiantProductPageMobile,
} from "../_lib/diamaria-images";
import { FramedPhotograph } from "./framed-photograph";

export function CatalogueCaptures() {
  return (
    <div className="grid grid-cols-[minmax(0,1fr)] items-start gap-4 sm:grid-cols-[minmax(0,1792fr)_minmax(0,1446fr)] lg:grid-cols-[minmax(0,3.608fr)_minmax(0,1fr)] lg:gap-6">
      <FramedPhotograph
        image={olympicCollectionPiecesOnPhone}
        sizes="(min-width: 640px) 52vw, 100vw"
        border="hairline"
        ground="paper"
        frameClassName="aspect-[828/1446] lg:hidden"
      />
      <FramedPhotograph
        image={olympicCollectionPieces}
        sizes="(min-width: 1400px) 1340px, 96vw"
        border="hairline"
        ground="paper"
        frameClassName="col-span-2 hidden aspect-[2880/1010] lg:block"
      />
      <FramedPhotograph
        image={pinkRadiantProductPageDesktop}
        sizes="(min-width: 1400px) 1040px, 76vw"
        border="hairline"
        ground="paper"
        frameClassName="hidden aspect-[2880/1728] lg:block"
      />
      <FramedPhotograph
        image={pinkRadiantProductPageMobile}
        sizes="(min-width: 1400px) 290px, (min-width: 1024px) 22vw, (min-width: 640px) 42vw, 70vw"
        border="hairline"
        ground="paper"
        frameClassName="mx-auto aspect-[828/1792] w-[70%] sm:w-full"
      />
    </div>
  );
}
