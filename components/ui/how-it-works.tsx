"use client";

import React from "react";
import {
  Phone,
  PenTool,
  Code,
  Rocket,
  Headphones,
  Search,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { FeatureCard } from "@/components/ui/grid-feature-cards";

const steps = [
  {
    title: "Discovery Call",
    icon: Phone,
    description:
      "We talk about your business, your customers, and what you need. Free, no pressure.",
  },
  {
    title: "Design",
    icon: PenTool,
    description:
      "You get mockups to review. We refine until it feels right for your brand.",
  },
  {
    title: "Development",
    icon: Code,
    description:
      "We build your site with clean code, fast load times, and mobile-first design.",
  },
  {
    title: "SEO Setup",
    icon: Search,
    description:
      "On-page optimization so local customers can actually find you on Google.",
  },
  {
    title: "Launch",
    icon: Rocket,
    description:
      "Your site goes live. We handle hosting, DNS, and make sure everything runs smooth.",
  },
  {
    title: "Ongoing Support",
    icon: Headphones,
    description:
      "Updates, fixes, and improvements whenever you need them. You focus on your business.",
  },
];

export function HowItWorks() {
  return (
    <section id="process" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] space-y-8 px-6 lg:px-8">
        <AnimatedContainer className="mx-auto max-w-3xl text-center">
          <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
            Our Process
          </span>
          <h2 className="text-3xl font-medium tracking-tight text-balance md:text-4xl lg:text-5xl">
            How it works
          </h2>
          <p className="text-muted-foreground mt-4 text-sm tracking-wide text-balance md:text-base">
            Six straightforward steps from first call to launch day and beyond.
          </p>
        </AnimatedContainer>

        <AnimatedContainer
          delay={0.4}
          className="grid grid-cols-1 divide-x divide-y divide-dashed divide-border border border-dashed border-border sm:grid-cols-2 md:grid-cols-3"
        >
          {steps.map((step, i) => (
            <FeatureCard key={i} feature={step} />
          ))}
        </AnimatedContainer>
      </div>
    </section>
  );
}

type ViewAnimationProps = {
  delay?: number;
  className?: React.ComponentProps<typeof motion.div>["className"];
  children: React.ReactNode;
};

function AnimatedContainer({
  className,
  delay = 0.1,
  children,
}: ViewAnimationProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return children;
  }

  return (
    <motion.div
      initial={{ filter: "blur(4px)", translateY: -8, opacity: 0 }}
      whileInView={{ filter: "blur(0px)", translateY: 0, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ delay, duration: 0.8 }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default HowItWorks;
