"use client";

import { BookCallButton } from "@/components/book-call-button";
import { InteractiveDitheringBackground } from "@/components/ui/interactive-dithering";

export function WaveCTABackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-30 mix-blend-screen">
      <InteractiveDitheringBackground preset="waveCta" />
    </div>
  );
}

export function WaveCTA() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 w-full flex justify-center items-center px-4 md:px-6">
      <div className="relative z-10 px-6 max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-display-lg font-medium text-foreground mb-6">
          Tell me what&apos;s eating your team&apos;s week.
        </h2>

        <p className="text-foreground-soft text-lead max-w-2xl mb-10">
          A free 30-minute call to talk through what&apos;s slowing your
          business down and whether I&apos;m the right person to fix it.
        </p>

        <BookCallButton size="lg" width="fullOnMobile" />
      </div>
    </section>
  );
}

export default WaveCTA;
