"use client";

import Image from "next/image";
import { ArrowRight, Check } from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import type { Service } from "@/lib/data/services";

export default function ServicePage({ service }: { service: Service }) {
  const shouldReduceMotion = useReducedMotion();
  const initial = shouldReduceMotion ? {} : { opacity: 0, y: 20 };
  const animate = { opacity: 1, y: 0 };
  const transition = { duration: 0.6 };

  return (
    <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
      {/* Hero */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center mb-24 md:mb-32">
        <motion.div
          initial={initial}
          animate={animate}
          transition={transition}
        >
          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
            Services
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tight text-foreground mb-6">
            {service.title}
          </h1>
          <p className="text-muted-foreground text-lg md:text-xl leading-relaxed mb-8">
            {service.longDescription}
          </p>
          <a
            href="https://calendly.com/amirfaezansari/30min"
            target="_blank"
            rel="noopener noreferrer nofollow"
            className="group inline-flex h-14 items-center justify-center gap-3 bg-primary px-8 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.98]"
          >
            <span>Book a Free Call</span>
            <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
          </a>
        </motion.div>

        <motion.div
          initial={shouldReduceMotion ? {} : { opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6, delay: 0.15 }}
          className="relative aspect-[16/10] overflow-hidden border border-border/50"
        >
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* What's Included */}
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.1 }}
        className="mb-24 md:mb-32"
      >
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
            What&apos;s Included
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            Everything you get
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {service.bullets.map((bullet) => (
            <div
              key={bullet}
              className="flex items-start gap-3 border border-border/50 p-6"
            >
              <Check
                className="size-5 text-accent mt-0.5 shrink-0"
                strokeWidth={2}
                aria-hidden
              />
              <span className="text-base text-foreground/80">{bullet}</span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div
        initial={initial}
        whileInView={animate}
        viewport={{ once: true }}
        transition={{ ...transition, delay: 0.1 }}
        className="mb-24 md:mb-32"
      >
        <div className="text-center mb-12 md:mb-16">
          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
            Use Cases
          </span>
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
            How businesses use this
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {service.useCases.map((useCase, i) => (
            <div key={i} className="border border-border/50 p-8">
              <span className="font-mono text-xs text-accent/60 tabular-nums block mb-4">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-medium text-foreground mb-3">
                {useCase.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {useCase.description}
              </p>
            </div>
          ))}
        </div>
      </motion.div>

      {/* CTA */}
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground mb-6">
          Ready to get started?
        </h2>
        <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Book a free 30-minute call. We&apos;ll talk about what you need and
          give you a clear plan.
        </p>
        <a
          href="https://calendly.com/amirfaezansari/30min"
          target="_blank"
          rel="noopener noreferrer nofollow"
          className="group inline-flex h-14 items-center justify-center gap-3 bg-primary px-8 md:px-12 text-base font-medium text-primary-foreground transition-all duration-300 hover:bg-primary/90 active:scale-[0.98]"
        >
          <span>Book a Free Call</span>
          <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
        </a>
      </div>
    </div>
  );
}
