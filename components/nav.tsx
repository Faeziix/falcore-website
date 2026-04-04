"use client";

import { useState, useEffect, useCallback } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useMotionValueEvent,
} from "motion/react";
import MagneticButton from "./magnetic-button";

const links = [
  { label: "Services", href: "#services" },
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

// --- Animated Hamburger Icon ---
function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  const lineProps = {
    strokeWidth: 2,
    vectorEffect: "non-scaling-stroke" as const,
    stroke: "currentColor",
    strokeLinecap: "round" as const,
  };

  return (
    <motion.svg
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="w-6 h-6"
      aria-hidden="true"
    >
      {/* Top line */}
      <motion.line
        x1="4"
        x2="20"
        {...lineProps}
        animate={
          isOpen
            ? { y1: 12, y2: 12, rotate: 45 }
            : { y1: 7, y2: 7, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ originX: "50%", originY: "50%", transformOrigin: "center" }}
      />
      {/* Middle line */}
      <motion.line
        x1="4"
        x2="20"
        y1="12"
        y2="12"
        {...lineProps}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15 }}
        style={{ originX: "50%", originY: "50%" }}
      />
      {/* Bottom line */}
      <motion.line
        x1="4"
        x2="20"
        {...lineProps}
        animate={
          isOpen
            ? { y1: 12, y2: 12, rotate: -45 }
            : { y1: 17, y2: 17, rotate: 0 }
        }
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
        style={{ originX: "50%", originY: "50%", transformOrigin: "center" }}
      />
    </motion.svg>
  );
}

// --- Full-Screen Mobile Menu Overlay ---
const overlayVariants = {
  closed: {
    clipPath: "inset(0 0 100% 0)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 35,
      when: "afterChildren" as const,
      staggerChildren: 0.04,
      staggerDirection: -1 as const,
    },
  },
  open: {
    clipPath: "inset(0 0 0% 0)",
    transition: {
      type: "spring" as const,
      stiffness: 300,
      damping: 35,
      when: "beforeChildren" as const,
      staggerChildren: 0.08,
      delayChildren: 0.15,
    },
  },
};

const linkVariants = {
  closed: {
    opacity: 0,
    x: -60,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  open: {
    opacity: 1,
    x: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 20 },
  },
};

const accentLineVariants = {
  closed: { scaleX: 0 },
  open: {
    scaleX: 1,
    transition: {
      duration: 0.6,
      ease: [0.76, 0, 0.24, 1] as [number, number, number, number],
      delay: 0.1,
    },
  },
};

const ctaVariants = {
  closed: {
    opacity: 0,
    y: 20,
    transition: { type: "spring" as const, stiffness: 300, damping: 30 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { type: "spring" as const, stiffness: 120, damping: 20, delay: 0.4 },
  },
};

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (v) => {
    setScrolled(v > 50);
  });

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  // Close on Escape key
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape" && mobileOpen) setMobileOpen(false);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [mobileOpen]);

  const closeMenu = useCallback(() => setMobileOpen(false), []);

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled && !mobileOpen
            ? "bg-background/80 backdrop-blur-xl border-b border-border"
            : "bg-transparent border-b border-transparent"
        }`}
      >
        <div className="max-w-[1400px] mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
          <a
            href="/"
            className="text-xl font-bold tracking-tighter text-foreground"
          >
            FALCORE
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
            <MagneticButton href="#contact" variant="primary" size="sm">
              Book a Call
            </MagneticButton>
          </div>

          {/* Hamburger Toggle */}
          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen((prev) => !prev)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
          >
            <HamburgerIcon isOpen={mobileOpen} />
          </button>
        </div>
      </nav>

      {/* Full-screen Mobile Overlay */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            key="mobile-menu"
            variants={overlayVariants}
            initial="closed"
            animate="open"
            exit="closed"
            className="fixed inset-0 z-40 bg-background flex flex-col justify-center md:hidden"
          >
            {/* Accent line */}
            <motion.div
              variants={accentLineVariants}
              className="absolute top-16 left-6 right-6 h-px bg-primary origin-left"
            />

            <div className="px-6 flex flex-col gap-2 mt-8">
              {links.map((link, i) => (
                <motion.div key={link.href} variants={linkVariants}>
                  <a
                    href={link.href}
                    onClick={closeMenu}
                    className="group flex items-center gap-4 py-3"
                  >
                    {/* Index number */}
                    <span className="font-mono text-xs text-primary/60 tabular-nums w-6">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {/* Link label */}
                    <span className="text-4xl sm:text-5xl font-bold tracking-tight text-foreground group-hover:text-primary transition-colors duration-200">
                      {link.label}
                    </span>
                    {/* Hover arrow */}
                    <motion.span
                      className="text-primary text-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-200 ml-auto"
                      aria-hidden="true"
                    >
                      &rarr;
                    </motion.span>
                  </a>
                  {/* Separator */}
                  {i < links.length - 1 && (
                    <div className="h-px bg-border/40 ml-10" />
                  )}
                </motion.div>
              ))}
            </div>

            {/* CTA at bottom */}
            <motion.div variants={ctaVariants} className="px-6 mt-12">
              <MagneticButton
                href="#contact"
                variant="primary"
                size="md"
                onClick={closeMenu}
              >
                Book a Call
              </MagneticButton>
            </motion.div>

            {/* Bottom accent detail */}
            <motion.div
              variants={accentLineVariants}
              className="absolute bottom-[max(2rem,env(safe-area-inset-bottom))] left-6 right-6 h-px bg-border/20 origin-right"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
