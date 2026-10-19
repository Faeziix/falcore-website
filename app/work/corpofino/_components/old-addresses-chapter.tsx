import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { CHAPTER_COPY } from "../_lib/case-study-content";
import { OldAddressLedger } from "./old-address-ledger";

export function OldAddressesChapter() {
  return (
    <CaseStudyChapter
      id="old-addresses"
      tone="raised"
      title={CHAPTER_COPY.oldAddresses.title}
      intro={CHAPTER_COPY.oldAddresses.intro}
    >
      <OldAddressLedger />
    </CaseStudyChapter>
  );
}
