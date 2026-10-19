import Image from "next/image";
import { BookCallButton } from "@/components/book-call-button";

export default function AboutFounder() {
  return (
    <section id="about" aria-labelledby="about-heading" className="section-spacing">
      <div className="page-container">
        <div className="flex flex-col gap-10 border-t border-border pt-16 md:flex-row md:items-center md:gap-16 lg:gap-20">
          <Image
            src="/founder-portrait.jpg"
            alt="Faez Ansari, founder of Falcore"
            width={1200}
            height={1490}
            className="aspect-[4/5] w-full object-cover md:w-[40%] lg:w-[34%]"
            sizes="(max-width: 768px) 100vw, 34vw"
          />
          <div className="max-w-xl">
            <h2 id="about-heading" className="text-display-lg font-medium text-foreground">
              Meet Faez
            </h2>
            <p className="mt-6 text-lead text-foreground-soft">
              I&apos;m a developer and systems builder based in the UAE, working
              with businesses across the US. Years of agency work taught me what
              growing businesses need: someone who understands the problem,
              builds the right thing and ships it fast. When you work with
              Falcore, you work with me.
            </p>
            <BookCallButton width="fullOnMobile" className="mt-9" />
          </div>
        </div>
      </div>
    </section>
  );
}
