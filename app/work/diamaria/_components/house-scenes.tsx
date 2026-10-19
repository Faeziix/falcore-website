import { bespokeDrawingScene, olympicColourScene } from "../_lib/diamaria-images";
import { FramedPhotograph } from "./framed-photograph";

const houseScenePhotographs = [bespokeDrawingScene, olympicColourScene];

export function HouseScenes() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:gap-6">
      {houseScenePhotographs.map((scene) => (
        <FramedPhotograph
          key={scene.src}
          image={scene}
          sizes="(min-width: 1400px) 670px, 48vw"
          frameClassName="aspect-[1792/2400]"
        />
      ))}
    </div>
  );
}
