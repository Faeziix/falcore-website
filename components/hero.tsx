"use client";

import { motion } from "framer-motion";
import MagneticButton from "./magnetic-button";
import { springTransition, staggerContainer, fadeInUp } from "@/lib/motion";

function FloatingShapes() {
  return (
    <div className="relative w-full h-full min-h-[400px]">
      <motion.div
        animate={{ y: [0, -14, 0] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-8 right-0 w-64 h-64 border border-accent/20 bg-accent/5"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
        className="absolute top-24 right-16 w-48 h-48 border border-border bg-card"
      />
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
        className="absolute bottom-16 right-8 w-32 h-32 bg-accent/10 border border-accent/15"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
        className="absolute top-4 right-48 w-16 h-16 bg-muted border border-border"
      />
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.7, 0.4] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-32 right-40 w-3 h-3 rounded-full bg-accent"
      />
    </div>
  );
}

export default function Hero() {
  return (
    <section className="min-h-[100dvh] flex items-center">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-8 w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-12 lg:gap-16 pt-24 lg:pt-0">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col justify-center"
        >
          <motion.h1
            variants={fadeInUp}
            className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tighter leading-[1.08] text-foreground"
          >
            Your business deserves a website that actually works.
          </motion.h1>
          <motion.p
            variants={fadeInUp}
            className="text-lg text-muted-foreground leading-relaxed max-w-lg mt-6"
          >
            Falcore designs and builds fast, modern websites for businesses that
            want to be taken seriously online. No templates. No filler. Just
            clean design that turns visitors into customers.
          </motion.p>
          <motion.div variants={fadeInUp} className="flex gap-4 mt-10">
            <MagneticButton href="#contact" variant="primary">
              Book a Free Call
            </MagneticButton>
            <MagneticButton href="#work" variant="secondary">
              See Our Work
            </MagneticButton>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ ...springTransition, delay: 0.3 }}
          className="hidden lg:flex items-center"
        >
          <FloatingShapes />
        </motion.div>
      </div>
    </section>
  );
}
