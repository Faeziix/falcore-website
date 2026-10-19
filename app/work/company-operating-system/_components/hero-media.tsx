import {
  clientKnowledgeRecordImage,
  clientKnowledgeRecordNarrowImage,
} from "../_lib/case-study-images";
import { containedScreenshotSizes } from "../_lib/screenshot-sizes";
import { ArtDirectedFigure } from "./art-directed-figure";

export function HeroMedia() {
  return (
    <div className="page-container">
      <ArtDirectedFigure
        image={clientKnowledgeRecordImage}
        narrowImage={clientKnowledgeRecordNarrowImage}
        sizes={containedScreenshotSizes}
        isPriority
      />
    </div>
  );
}
