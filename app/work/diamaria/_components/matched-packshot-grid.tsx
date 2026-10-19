import { matchedPackshots } from "../_lib/diamaria-images";
import { FramedPhotograph } from "./framed-photograph";

export function MatchedPackshotGrid() {
  return (
    <ul className="grid grid-cols-2 gap-px border-y border-case-rule bg-case-rule lg:grid-cols-4">
      {matchedPackshots.map((packshot) => (
        <li key={packshot.src}>
          <FramedPhotograph
            image={packshot}
            sizes="(min-width: 1024px) 25vw, 50vw"
            ground="packshotWhite"
            frameClassName="aspect-square"
          />
        </li>
      ))}
    </ul>
  );
}
