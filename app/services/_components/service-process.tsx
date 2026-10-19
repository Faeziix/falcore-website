import { SectionHeading } from "@/components/ui/section-heading";
import { ProcessTimeline } from "@/components/process/process-timeline";

export function ServiceProcess() {
  return (
    <section aria-labelledby="process-heading" className="pb-[var(--section-space)]">
      <SectionHeading
        id="process-heading"
        title="What happens next"
        intro="Five steps, from the first call to support after launch."
      />
      <div className="mt-16 lg:mt-20">
        <ProcessTimeline />
      </div>
    </section>
  );
}
