import { cva, type VariantProps } from "class-variance-authority";
import BrowserShowcaseClient from "./BrowserShowcaseClient";
import { SHOWCASE_WEBSITES } from "@/lib/data/showcase-websites";

const showcaseSectionVariants = cva("", {
  variants: {
    spacing: {
      standalone: "md:py-24 lg:py-32",
      followsSection: "pb-[var(--section-space)]",
    },
  },
  defaultVariants: { spacing: "standalone" },
});

export default function BrowserShowcaseSection({
  spacing,
}: VariantProps<typeof showcaseSectionVariants>) {
  return (
    <section id="work" className={showcaseSectionVariants({ spacing })}>
      <div className="max-w-[1400px] mx-auto md:px-6 lg:px-8">
        <BrowserShowcaseClient websites={SHOWCASE_WEBSITES} />
      </div>
    </section>
  );
}
