import { lariatPhonePhoto, pinkRadiantRawShoot } from "../_lib/diamaria-images";
import { FramedPhotograph, PhotographCaption } from "./framed-photograph";

export function StartingPhotographs() {
  return (
    <div className="grid grid-cols-12 gap-x-4 gap-y-12 lg:grid-cols-[minmax(0,2fr)_minmax(0,1fr)] lg:gap-x-6">
      <figure className="col-span-12 lg:col-span-1">
        <FramedPhotograph
          image={pinkRadiantRawShoot}
          sizes="(min-width: 1400px) 900px, (min-width: 1024px) 64vw, 100vw"
          ground="sweep"
          frameClassName="aspect-[3200/2133]"
        />
        <PhotographCaption>The studio shoot, as delivered</PhotographCaption>
      </figure>
      <figure className="col-span-7 col-start-6 lg:col-span-1 lg:col-start-2">
        <FramedPhotograph
          image={lariatPhonePhoto}
          sizes="(min-width: 1400px) 440px, (min-width: 1024px) 31vw, 58vw"
          frameClassName="aspect-[3/4]"
        />
        <PhotographCaption>A phone photo, sent over chat</PhotographCaption>
      </figure>
    </div>
  );
}
