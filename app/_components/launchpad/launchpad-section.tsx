import { SectionHeading } from "@/components/ui/section-heading";
import { LAUNCHPAD_SHOWCASE } from "@/app/_lib/launchpad-showcase";
import { LaunchpadShowcase } from "./launchpad-showcase";

export function LaunchpadSection() {
  return (
    <section id="launchpad" aria-labelledby="launchpad-heading" className="section-spacing">
      <div className="page-container">
        <SectionHeading
          id="launchpad-heading"
          title={LAUNCHPAD_SHOWCASE.name}
          intro={LAUNCHPAD_SHOWCASE.summary}
        />
        <div className="mt-14 lg:mt-20">
          <LaunchpadShowcase />
        </div>
      </div>
    </section>
  );
}
