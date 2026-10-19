import BrowserShowcaseClient from "./BrowserShowcaseClient";
import { SHOWCASE_WEBSITES } from "@/lib/data/showcase-websites";

export default function BrowserShowcaseSection() {
  return (
    <section id="work" className="md:py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto md:px-6 lg:px-8">
        <BrowserShowcaseClient websites={SHOWCASE_WEBSITES} />
      </div>
    </section>
  );
}
