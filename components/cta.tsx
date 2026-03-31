"use client";

import { motion } from "framer-motion";
import MagneticButton from "./magnetic-button";
import ScrollReveal from "./scroll-reveal";

function DecorativeElement() {
  return (
    <div className="relative w-full h-64 lg:h-full">
      <motion.div
        animate={{ y: [0, -10, 0], rotate: [0, 3, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-primary/20"
      />
      <motion.div
        animate={{ y: [0, 8, 0], rotate: [0, -2, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 rounded-full bg-primary/5 border border-primary/10"
      />
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-primary"
      />
    </div>
  );
}

export default function Cta() {
  return (
    <section id="contact" className="py-24 lg:py-32">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_0.8fr] gap-12 items-center">
          <ScrollReveal>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tighter">
              Let&apos;s build something your customers will remember.
            </h2>
            <p className="text-muted-foreground text-lg mt-4 max-w-lg">
              No commitment. No jargon. Just a 15-minute call to see if we are a
              good fit.
            </p>
            <div className="mt-8">
              <MagneticButton href="#" variant="primary">
                Book a Free Call
              </MagneticButton>
            </div>
          </ScrollReveal>
          <div className="hidden lg:block">
            <DecorativeElement />
          </div>
        </div>
      </div>
    </section>
  );
}
