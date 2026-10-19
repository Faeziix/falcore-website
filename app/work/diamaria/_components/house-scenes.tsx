import { bespokeDrawingScene, olympicColourScene } from "../_lib/diamaria-images";
import { FramedPhotograph } from "./framed-photograph";

const houseScenePhotographs = [bespokeDrawingScene, olympicColourScene];

export function HouseScenes() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:gap-6">
      {houseScenePhotographs.map((scene) => (
        <FramedPhotograph
          key={scene.src}
          image={scene}
          sizes="(min-width: 1400px) 670px, (min-width: 640px) 48vw, 100vw"
          frameClassName="aspect-[1792/2400]"
        />
      ))}
    </div>
  );
}
