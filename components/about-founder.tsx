import Image from "next/image";
import { BookCallButton } from "@/components/book-call-button";
import { AcquireFrame } from "@/components/scroll-reveal/acquire-frame";
import { MaskedWords } from "@/components/scroll-reveal/masked-words";
import { PlotterHairline } from "@/components/scroll-reveal/plotter-hairline";
import { revealOrder } from "@/components/scroll-reveal/reveal-order";

export default function AboutFounder() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-spacing">
      <div className="page-container">
        <div
          data-reveal
          className="relative flex flex-col gap-10 pt-16 md:flex-row md:items-center md:gap-16 lg:gap-20"
        >
          <PlotterHairline />
          <AcquireFrame order={2} className="aspect-[4/5] w-full shrink-0 md:w-[40%] lg:w-[34%]">
            <Image
              src="/founder-portrait.jpg"
              alt="Faez Ansari, founder of Falcore"
              width={1200}
              height={1490}
              className="reveal-parallax size-full object-cover"
              sizes="(max-width: 768px) 100vw, 34vw"
            />
          </AcquireFrame>
          <div className="max-w-xl">
            <h2 id="about-heading" className="text-display-lg font-medium text-foreground">
              <MaskedWords text="Meet Faez" firstOrder={8} />
            </h2>
            <p className="reveal-rise mt-6 text-lead text-foreground-soft" style={revealOrder(12)}>
              I&apos;m a developer and systems builder based in Dubai, working
              with businesses in the UAE and US. Years of agency work taught me what
              growing businesses need: someone who understands the problem,
              builds the right thing and ships it fast. When you work with
              Falcore, you work with me.
            </p>
            <div className="reveal-rise mt-9" style={revealOrder(14)}>
              <BookCallButton width="fullOnMobile" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
