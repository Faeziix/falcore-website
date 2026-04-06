"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "motion/react";

export default function AboutFounder() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12 lg:gap-20 items-center">
          {/* Image */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="relative"
          >
            <div className="relative max-w-md mx-auto">
              <div className="relative aspect-[3/4] overflow-hidden border border-border/50">
                <Image
                  src="/professional-portrait.png"
                  alt="Faez Ansari — Founder of Falcore, full-stack developer and systems builder"
                  width={600}
                  height={800}
                  className="w-full h-full object-cover"
                  sizes="(max-width: 1024px) 100vw, 448px"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Accent line */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-accent/30" />
            </div>
          </motion.div>

          {/* Content */}
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="space-y-6"
          >
            <div>
              <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
                About the Founder
              </span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
                Meet Faez
              </h2>
            </div>

            <div className="space-y-5 text-muted-foreground text-base md:text-lg leading-relaxed">
              <p>
                I&apos;m a developer and systems builder based in the UAE,
                working with businesses across the US — the technical person your
                business has been looking for.
              </p>
              <p>
                My background is in agencies — building client websites, creating
                the tools that keep operations running, and connecting the
                systems that teams rely on every day. That taught me what growing
                businesses actually need: someone who gets the problem, builds
                the right solution, and ships it fast.
              </p>
              <p>
                Today, I bring that same approach to every business I work with
                through Falcore. Whether it&apos;s a website that actually
                converts, a custom dashboard your team needs, or the automation
                that eliminates hours of manual work — I find the fastest
                solution and ship it.
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
