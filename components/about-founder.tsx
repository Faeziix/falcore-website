"use client";

import { motion, useReducedMotion } from "motion/react";

export default function AboutFounder() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="about" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
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
                <img
                  src="/Professional Portrait.PNG"
                  alt="Faez — Founder of Falcore"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
              </div>

              {/* Accent line */}
              <div className="absolute -bottom-3 -right-3 w-20 h-20 border-r-2 border-b-2 border-primary/30" />
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
                I&apos;m the technical person your business has been looking for.
                A full-stack developer and systems builder who solves the
                problems that slow companies down.
              </p>
              <p>
                At my previous agency, I built 13+ client websites and created
                the internal tools that kept the operation running — proposal
                generators, client portals, membership platforms, project
                tracking systems. If it needed to be built, I built it.
              </p>
              <p>
                Today, I bring that same approach to every business I work with.
                Whether it&apos;s a website that actually converts, a custom
                dashboard your team needs, or the automations that eliminate
                hours of manual work — I find the fastest, most efficient
                solution and ship it.
              </p>
            </div>

            <div className="pt-4 flex flex-wrap gap-x-8 gap-y-4 border-t border-border/30">
              <div>
                <span className="text-2xl md:text-3xl font-medium text-foreground">
                  13+
                </span>
                <span className="block text-sm text-muted-foreground mt-1">
                  Client Projects
                </span>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-medium text-foreground">
                  5+
                </span>
                <span className="block text-sm text-muted-foreground mt-1">
                  Internal Tools Built
                </span>
              </div>
              <div>
                <span className="text-2xl md:text-3xl font-medium text-foreground">
                  Full-Stack
                </span>
                <span className="block text-sm text-muted-foreground mt-1">
                  End-to-End Delivery
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
