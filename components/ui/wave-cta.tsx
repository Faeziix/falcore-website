"use client";

import { ArrowRight } from "lucide-react";
import { DitheringShader } from "@/components/ui/dithering-shader";

export function WaveCTABackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
      <DitheringShader
        shape="wave"
        type="8x8"
        colorBack="#00000000"
        colorFront="#4682b4"
        pxSize={3}
        speed={0.6}
        width={1400}
        height={1200}
        className="size-full"
        style={{ width: "100%", height: "100%" }}
      />
    </div>
  );
}

export function WaveCTA() {
  return (
    <section id="contact" className="relative z-10 py-24 md:py-32 w-full flex justify-center items-center px-4 md:px-6">
      <div className="relative z-10 px-6 max-w-3xl mx-auto text-center flex flex-col items-center">
        <h2 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-foreground mb-6 leading-[1.05]">
          Let&apos;s build something <br />
          <span className="text-foreground/80">your customers will remember.</span>
        </h2>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-10 leading-relaxed">
          No commitment. No jargon. Just a 30-minute call to see if we are a
          good fit.
        </p>

        <a
          href="https://calendly.com/amirfaezansari/30min"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-primary px-8 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.98] w-full sm:w-auto"
        >
          <span className="relative z-10">Book a Free Call</span>
          <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </section>
  );
}

export default WaveCTA;
