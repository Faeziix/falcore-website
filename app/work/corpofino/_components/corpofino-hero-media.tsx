import { skinCareDepartmentFrame, skinCareDepartmentPhoneFrame } from "../_lib/case-study-images";
import { ArtDirectedFigure } from "./art-directed-figure";

export function CorpofinoHeroMedia() {
  return (
    <div className="page-container">
      <ArtDirectedFigure desktopImage={skinCareDepartmentFrame} phoneImage={skinCareDepartmentPhoneFrame} isPriority />
    </div>
  );
}
