"use client";

import { ArrowRight } from "lucide-react";
import { useState, Suspense, lazy } from "react";

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({
    default: mod.Dithering,
  }))
);

export function HeroSection() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      className="relative w-full min-h-[100dvh] flex items-center justify-center overflow-hidden"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Suspense
        fallback={<div className="absolute inset-0 bg-muted/20" />}
      >
        <div className="absolute inset-0 z-0 pointer-events-none opacity-40 dark:opacity-30 mix-blend-multiply dark:mix-blend-screen">
          <Dithering
            colorBack="#061e29"
            colorFront="#4682b4"
            shape="warp"
            type="4x4"
            speed={isHovered ? 0.6 : 0.2}
            className="size-full"
            minPixelRatio={1}
          />
        </div>
      </Suspense>

      <div className="relative z-10 px-6 max-w-4xl mx-auto text-center flex flex-col items-center">
        <div className="mb-8 inline-flex items-center gap-2 border border-primary/10 bg-primary/5 px-4 py-1.5 text-sm font-medium text-primary backdrop-blur-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
          </span>
          Now Accepting Projects
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-8xl font-medium tracking-tight text-foreground mb-8 leading-[1.05]">
          Future Proof Your Business
        </h1>

        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mb-12 leading-relaxed">
          Falcore is the technical arm your business is missing. From
          websites to custom platforms to the systems that run behind the
          scenes — we solve the problems that slow you down.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <a
            href="#contact"
            className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-primary px-8 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.98] w-full sm:w-auto"
          >
            <span className="relative z-10">Book a Free Call</span>
            <ArrowRight className="h-5 w-5 relative z-10 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
          <a
            href="#work"
            className="inline-flex h-14 items-center justify-center px-8 md:px-12 text-base font-medium border border-border text-muted-foreground hover:text-foreground hover:border-foreground/20 transition-all duration-300 active:scale-[0.98] w-full sm:w-auto"
          >
            See Our Work
          </a>
        </div>
      </div>
    </section>
  );
}

export default HeroSection;
