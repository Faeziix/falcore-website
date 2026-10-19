import { coupeAndLariatScene } from "../_lib/diamaria-images";
import { FramedPhotograph } from "./framed-photograph";

export function HeroCampaignPhotograph() {
  return (
    <FramedPhotograph
      image={coupeAndLariatScene}
      sizes="100vw"
      isPriority
      frameClassName="aspect-[4/5] sm:aspect-[16/10] lg:aspect-[3200/1786]"
      imageClassName="object-[44%_50%] sm:object-center"
    />
  );
}
