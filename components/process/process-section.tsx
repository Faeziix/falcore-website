import { SectionHeading } from "@/components/ui/section-heading";
import { SectionCallToAction } from "@/components/section-call-to-action";
import { ProcessTimeline } from "./process-timeline";

export function ProcessSection() {
  return (
    <section id="process" aria-labelledby="process-heading" className="section-spacing">
      <div className="page-container">
        <SectionHeading
          id="process-heading"
          title="How a project runs"
          intro="Five steps, from the first call to support after launch."
        />
        <div className="mt-16 lg:mt-20">
          <ProcessTimeline />
        </div>
        <SectionCallToAction
          prompt="Step one is a free 30-minute call."
          className="mt-16 lg:mt-20"
        />
      </div>
    </section>
  );
}
