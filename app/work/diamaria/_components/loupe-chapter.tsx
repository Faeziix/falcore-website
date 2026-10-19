import { loupeChapter, loupeInstruction } from "../_lib/diamaria-chapters";
import { DiaMariaChapter } from "./diamaria-chapter";
import { JewellersLoupe } from "./jewellers-loupe";

const LOUPE_INSTRUCTION_ID = "diamaria-loupe-instruction";

export function LoupeChapter() {
  return (
    <DiaMariaChapter id={loupeChapter.id} title={loupeChapter.title} intro={loupeChapter.intro} width="fullBleed">
      <JewellersLoupe instructionId={LOUPE_INSTRUCTION_ID} />
      <p id={LOUPE_INSTRUCTION_ID} className="page-container mt-6 text-center text-sm text-case-ink-soft">
        <span className="[@media(pointer:coarse)]:hidden">{loupeInstruction.finePointer}</span>
        <span className="hidden [@media(pointer:coarse)]:inline">{loupeInstruction.coarsePointer}</span>
      </p>
    </DiaMariaChapter>
  );
}
