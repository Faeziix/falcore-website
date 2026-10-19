import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { convoFlowChapterCopy } from "../_lib/convoflow-chapters";
import { LeadFlowSignature } from "./lead-flow-signature/lead-flow-signature";

export function LeadFlowSignatureChapter() {
  const { sendALead } = convoFlowChapterCopy;

  return (
    <CaseStudyChapter id={sendALead.id} title={sendALead.title} intro={sendALead.intro}>
      <LeadFlowSignature />
    </CaseStudyChapter>
  );
}
