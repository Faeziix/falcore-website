import type { Variants } from "motion/react";

export const easeOutExpo = [0.16, 1, 0.3, 1] as const;

const revealedFromBar = "inset(0 0 0% 0)";
const hiddenBehindBar = "inset(0 0 100% 0)";

export function revealFromBarVariants({
  revealSeconds,
  exitSeconds,
  prefersReducedMotion,
}: {
  revealSeconds: number;
  exitSeconds: number;
  prefersReducedMotion: boolean;
}): Variants {
  const staggerTiming = { staggerChildren: 0.04, delayChildren: 0.06 };

  if (prefersReducedMotion) {
    return {
      hidden: { opacity: 0 },
      shown: { opacity: 1, transition: { duration: revealSeconds, ...staggerTiming } },
      exit: { opacity: 0, transition: { duration: exitSeconds } },
    };
  }

  return {
    hidden: { clipPath: hiddenBehindBar, opacity: 1 },
    shown: {
      clipPath: revealedFromBar,
      transition: { duration: revealSeconds, ease: easeOutExpo, ...staggerTiming },
    },
    exit: { opacity: 0, transition: { duration: exitSeconds, ease: "easeOut" } },
  };
}

export const settleIntoPlaceVariants: Variants = {
  hidden: { opacity: 0, transform: "translateY(8px)" },
  shown: {
    opacity: 1,
    transform: "translateY(0px)",
    transition: { duration: 0.32, ease: easeOutExpo },
  },
};
