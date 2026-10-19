import { SectionHeading } from "@/components/ui/section-heading";
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
      </div>
    </section>
  );
}
