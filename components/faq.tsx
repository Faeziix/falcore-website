"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import type { FrequentlyAskedQuestion } from "@/lib/data/faq";

function AccordionItem({
  itemId,
  question,
  answer,
  isOpen,
  onToggle,
}: {
  itemId: string;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
}) {

  return (
    <div className="border-b border-border">
      <h3 className="font-sans">
        <button
          id={`${itemId}-trigger`}
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          aria-controls={`${itemId}-answer`}
          className="flex w-full items-center justify-between gap-6 py-6 text-left text-foreground transition-colors duration-200 hover:text-accent"
        >
          <span className="text-base font-medium md:text-lg">{question}</span>
          <Plus
            aria-hidden
            className={cn(
              "size-5 shrink-0 text-muted-foreground transition-transform duration-300 ease-out-expo",
              isOpen && "rotate-45 text-foreground"
            )}
          />
        </button>
      </h3>
      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            id={`${itemId}-answer`}
            role="region"
            aria-labelledby={`${itemId}-trigger`}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-clip"
          >
            <p className="max-w-2xl pb-7 text-base leading-relaxed text-foreground-soft">
              {answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const defaultFaqIntro =
  "Something else on your mind? Ask it on the call. It’s free and there’s no pitch.";

export default function FAQ({
  items,
  intro = defaultFaqIntro,
}: {
  items: FrequentlyAskedQuestion[];
  intro?: string;
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" aria-labelledby="faq-heading" className="section-spacing">
      <div className="page-container grid gap-10 border-t border-border pt-8 lg:grid-cols-12 lg:gap-8">
        <div className="lg:col-span-5">
          <h2 id="faq-heading" className="text-display-lg font-medium text-foreground">
            Common questions
          </h2>
          <p className="mt-6 max-w-sm text-foreground-soft">{intro}</p>
        </div>
        <div className="border-t border-border lg:col-span-7">
          {items.map((item, index) => (
            <AccordionItem
              key={item.question}
              itemId={`faq-${index}`}
              question={item.question}
              answer={item.answer}
              isOpen={openIndex === index}
              onToggle={() => setOpenIndex(openIndex === index ? null : index)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
