"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/lib/data/faq";

function AccordionItem({
  question,
  answer,
  isOpen,
  onToggle,
}: {
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <div className="border-b border-border/30">
      <button
        onClick={onToggle}
        className="flex w-full items-center justify-between py-6 text-left text-foreground transition-colors hover:text-accent"
        aria-expanded={isOpen}
      >
        <span className="text-base md:text-lg font-medium pr-4">
          {question}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={
            shouldReduceMotion
              ? { duration: 0 }
              : { type: "spring", stiffness: 300, damping: 25 }
          }
          className="shrink-0"
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.span>
      </button>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="overflow-hidden"
          >
            <p className="pb-6 text-base text-muted-foreground leading-relaxed">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const shouldReduceMotion = useReducedMotion();

  return (
    <section id="faq" className="py-24 md:py-32">
      <div className="mx-auto w-full max-w-[1400px] px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12 md:mb-16"
          >
            <span className="text-[10px] font-mono text-muted-foreground/60 uppercase tracking-[0.3em] block mb-3">
              FAQ
            </span>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-medium tracking-tight text-foreground">
              Common questions
            </h2>
          </motion.div>

          <motion.div
            initial={shouldReduceMotion ? {} : { opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
          >
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                question={item.question}
                answer={item.answer}
                isOpen={openIndex === i}
                onToggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
