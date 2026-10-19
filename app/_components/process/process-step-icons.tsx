"use client";

import type { ReactNode } from "react";
import { motion, useTransform, type MotionValue } from "motion/react";
import type { ProcessStepIconName } from "@/app/_lib/process-steps";

type IconDrawProgress = {
  outlineDrawProgress: MotionValue<number>;
  signalDrawProgress: MotionValue<number>;
};

type DrawnStrokeStyle = {
  pathLength: MotionValue<number>;
  opacity: MotionValue<number>;
};

type IconStrokeStyles = {
  outlineStrokeStyle: DrawnStrokeStyle;
  signalStrokeStyle: DrawnStrokeStyle;
};

function hideUndrawnStroke(drawProgress: number): number {
  return drawProgress > 0.001 ? 1 : 0;
}

function useDrawnStrokeStyle(drawProgress: MotionValue<number>): DrawnStrokeStyle {
  const opacity = useTransform(drawProgress, hideUndrawnStroke);
  return { pathLength: drawProgress, opacity };
}

function ProcessIconFrame({ children }: { children: ReactNode }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.25}
      strokeLinecap="square"
      strokeLinejoin="miter"
      aria-hidden
      className="size-10 text-foreground-soft"
    >
      {children}
    </svg>
  );
}

const signalStrokeClassName = "stroke-primary";

function ScopingCallIcon({ outlineStrokeStyle, signalStrokeStyle }: IconStrokeStyles) {
  return (
    <ProcessIconFrame>
      <motion.path
        d="M5 7.5H35V26.5H18L11 32.5V26.5H5Z"
        style={outlineStrokeStyle}
      />
      <motion.path
        d="M10 17H13.5L15.5 12.5L18.5 21.5L21.5 13.5L24 19.5L25.5 17H30"
        className={signalStrokeClassName}
        style={signalStrokeStyle}
      />
    </ProcessIconFrame>
  );
}

function WrittenPlanIcon({ outlineStrokeStyle, signalStrokeStyle }: IconStrokeStyles) {
  return (
    <ProcessIconFrame>
      <motion.path
        d="M8.5 4.5H25L31.5 11V35.5H8.5Z"
        style={outlineStrokeStyle}
      />
      <motion.path d="M25 4.5V11H31.5" style={outlineStrokeStyle} />
      <motion.path
        d="M13.5 15H26.5M13.5 19.5H26.5M13.5 24H21"
        strokeOpacity={0.6}
        style={outlineStrokeStyle}
      />
      <motion.path
        d="M13.5 30.5C15 27.5 16.5 27.5 16.5 30.5C16.5 33 18.5 32 20 29.5C21 28 22 28.5 22.5 30.5H26.5"
        className={signalStrokeClassName}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={signalStrokeStyle}
      />
    </ProcessIconFrame>
  );
}

function BuildIcon({ outlineStrokeStyle, signalStrokeStyle }: IconStrokeStyles) {
  return (
    <ProcessIconFrame>
      <motion.rect
        x="6.5"
        y="21.5"
        width="12"
        height="12"
        style={outlineStrokeStyle}
      />
      <motion.rect
        x="21.5"
        y="21.5"
        width="12"
        height="12"
        style={outlineStrokeStyle}
      />
      <motion.rect
        x="6.5"
        y="6.5"
        width="12"
        height="12"
        style={outlineStrokeStyle}
      />
      <motion.path
        d="M21.5 9.5V6.5H24.5M30.5 6.5H33.5V9.5M33.5 15.5V18.5H30.5M24.5 18.5H21.5V15.5"
        strokeOpacity={0.6}
        style={outlineStrokeStyle}
      />
      <motion.rect
        x="23.5"
        y="8.5"
        width="8"
        height="8"
        className={signalStrokeClassName}
        style={signalStrokeStyle}
      />
    </ProcessIconFrame>
  );
}

function LaunchIcon({ outlineStrokeStyle, signalStrokeStyle }: IconStrokeStyles) {
  return (
    <ProcessIconFrame>
      <motion.path d="M4.5 34.5H24.5" style={outlineStrokeStyle} />
      <motion.path
        d="M8.5 37V34.5M14.5 37V34.5M20.5 37V34.5"
        strokeOpacity={0.6}
        style={outlineStrokeStyle}
      />
      <motion.g style={{ opacity: outlineStrokeStyle.pathLength }}>
        <path
          d="M6.5 32C14 31.5 19.5 27.5 24 20.5"
          strokeDasharray="1.5 2.5"
          className="opacity-60"
        />
      </motion.g>
      <motion.path
        d="M36 6.5L23 11.5L27.5 14L28.5 19.5Z M27.5 14L36 6.5"
        className={signalStrokeClassName}
        style={signalStrokeStyle}
      />
    </ProcessIconFrame>
  );
}

function SupportIcon({ outlineStrokeStyle, signalStrokeStyle }: IconStrokeStyles) {
  return (
    <ProcessIconFrame>
      <motion.path
        d="M20 6.5A13.5 13.5 0 1 1 6.5 20"
        style={outlineStrokeStyle}
      />
      <motion.path d="M3 23L6.5 19.5L10 23" style={outlineStrokeStyle} />
      <g transform="translate(18.5 22.5) rotate(45) scale(0.9)">
        <motion.path
          d="M-1.5 8V-2.5L-4.5 -5V-9.5L-2.5 -11.5V-8H2.5V-11.5L4.5 -9.5V-5L1.5 -2.5V8Z"
          className={signalStrokeClassName}
          strokeWidth={1.25 / 0.9}
          style={signalStrokeStyle}
        />
      </g>
    </ProcessIconFrame>
  );
}

const PROCESS_STEP_ICONS: Record<
  ProcessStepIconName,
  (props: IconStrokeStyles) => ReactNode
> = {
  scopingCall: ScopingCallIcon,
  writtenPlan: WrittenPlanIcon,
  build: BuildIcon,
  launch: LaunchIcon,
  support: SupportIcon,
};

type ProcessStepIconProps = IconDrawProgress & {
  iconName: ProcessStepIconName;
};

export function ProcessStepIcon({
  iconName,
  outlineDrawProgress,
  signalDrawProgress,
}: ProcessStepIconProps) {
  const outlineStrokeStyle = useDrawnStrokeStyle(outlineDrawProgress);
  const signalStrokeStyle = useDrawnStrokeStyle(signalDrawProgress);
  const StepIcon = PROCESS_STEP_ICONS[iconName];
  return (
    <StepIcon
      outlineStrokeStyle={outlineStrokeStyle}
      signalStrokeStyle={signalStrokeStyle}
    />
  );
}
