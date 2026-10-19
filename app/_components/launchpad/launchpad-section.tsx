import { SectionHeading } from "@/components/ui/section-heading";
import { SectionCallToAction } from "@/components/section-call-to-action";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { LaunchpadShowcase } from "./launchpad-showcase";

export function LaunchpadSection() {
  return (
    <section id="operating-system" aria-labelledby="operating-system-heading" className="section-spacing">
      <div className="page-container">
        <SectionHeading
          id="operating-system-heading"
          title={LAUNCHPAD_SHOWCASE.title}
          intro={LAUNCHPAD_SHOWCASE.summary}
        />
        <div className="mt-14 lg:mt-20">
          <LaunchpadShowcase />
        </div>
        <SectionCallToAction
          prompt="Want a system like this running your business?"
          className="mt-14 lg:mt-20"
        />
      </div>
    </section>
  );
}
