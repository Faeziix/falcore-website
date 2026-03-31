"use client";

import { useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  href?: string;
  variant?: "primary" | "secondary";
  className?: string;
  size?: "sm" | "md";
  onClick?: () => void;
}

const springConfig = { stiffness: 150, damping: 15, mass: 0.1 };

export default function MagneticButton({
  children,
  href,
  variant = "primary",
  className = "",
  size = "md",
  onClick,
}: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(
    useTransform(mouseX, [-1, 0, 1], [-8, 0, 8]),
    springConfig
  );
  const springY = useSpring(
    useTransform(mouseY, [-1, 0, 1], [-8, 0, 8]),
    springConfig
  );

  function handleMouseMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    mouseX.set((e.clientX - cx) / (rect.width / 2));
    mouseY.set((e.clientY - cy) / (rect.height / 2));
  }

  function handleMouseLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  const base =
    variant === "primary"
      ? "bg-primary text-primary-foreground hover:bg-primary/80"
      : "border border-border text-muted-foreground hover:border-foreground/20 hover:text-foreground";

  const sizeClass =
    size === "sm"
      ? "px-4 py-2 text-sm"
      : "px-6 py-3 text-sm";

  const content = (
    <motion.div
      ref={ref}
      style={{ x: springX, y: springY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`inline-block font-medium transition-colors cursor-pointer active:scale-[0.98] ${base} ${sizeClass} ${className}`}
      onClick={onClick}
    >
      {href ? (
        <a href={href} className="block">
          {children}
        </a>
      ) : (
        children
      )}
    </motion.div>
  );

  return content;
}
