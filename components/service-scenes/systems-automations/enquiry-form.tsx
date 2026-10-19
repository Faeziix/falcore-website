"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/utils";
import { SceneLabel, SceneObject } from "../scene-parts";
import { sceneUnits } from "../scene-units";
import { FORM_CARD, FORM_FIELD_WIDTHS, FORM_SPACING } from "./workflow-layout";
import { EXPO_OUT, STORY_BEAT_MILLISECONDS, typingEase } from "./workflow-story";

const TYPING_SECONDS = (STORY_BEAT_MILLISECONDS / 1000) * 0.85;

type FormFieldProps = { fullWidth: string; isFilled: boolean; isTyping: boolean; isBright: boolean; isPlaying: boolean };

function FormField({ fullWidth, isFilled, isTyping, isBright, isPlaying }: FormFieldProps) {
  return (
    <div className="flex items-center bg-scene-inset" style={{ height: sceneUnits(FORM_SPACING.fieldHeight), paddingInline: sceneUnits(FORM_SPACING.fieldInset) }}>
      <motion.span
        className={cn("block shrink-0", isBright ? "bg-muted-foreground" : "bg-border-strong")}
        style={{ height: sceneUnits(FORM_SPACING.inkHeight) }}
        initial={false}
        animate={{ width: isFilled ? fullWidth : "0%" }}
        transition={isTyping ? { duration: TYPING_SECONDS, ease: typingEase } : { duration: 0.55, ease: EXPO_OUT }}
      />
      <motion.span
        className="ml-px block shrink-0 bg-foreground"
        style={{ width: sceneUnits(1.5), height: sceneUnits(6) }}
        initial={{ opacity: 0 }}
        animate={isTyping && isPlaying ? { opacity: [1, 1, 0, 0] } : { opacity: 0 }}
        transition={isTyping && isPlaying ? { duration: 0.5, repeat: Infinity, times: [0, 0.5, 0.5, 1] } : { duration: 0.15 }}
      />
    </div>
  );
}

function SubmitButton({ isSubmitting, isPlaying }: { isSubmitting: boolean; isPlaying: boolean }) {
  return (
    <motion.span
      className={cn("block origin-left transition-colors duration-300", isSubmitting ? "bg-primary" : "bg-border-strong")}
      style={{ width: "46%", height: sceneUnits(FORM_SPACING.buttonHeight), marginTop: sceneUnits(3) }}
      initial={{ scale: 1 }}
      animate={isSubmitting && isPlaying ? { scale: [1, 0.9, 1] } : { scale: 1 }}
      transition={{ duration: 0.42, ease: EXPO_OUT, times: [0, 0.3, 1] }}
    />
  );
}

type EnquiryFormProps = {
  filledFieldCount: number;
  typingFieldIndex: number | null;
  isSubmitting: boolean;
  isPlaying: boolean;
};

export function EnquiryForm({ filledFieldCount, typingFieldIndex, isSubmitting, isPlaying }: EnquiryFormProps) {
  const isEmpty = filledFieldCount === 0;
  return (
    <SceneObject {...FORM_CARD} className="grid content-start" style={{ padding: sceneUnits(FORM_SPACING.padding), gap: sceneUnits(FORM_SPACING.gap) }}>
      <div className="flex items-center justify-between">
        <SceneLabel isBright={typingFieldIndex !== null}>NEW ENQUIRY</SceneLabel>
        <span
          className={cn("block transition-colors duration-300", isEmpty ? "bg-border" : typingFieldIndex !== null ? "bg-foreground" : "bg-border-strong")}
          style={{ width: sceneUnits(5), height: sceneUnits(5) }}
        />
      </div>
      {FORM_FIELD_WIDTHS.map((fullWidth, fieldIndex) => (
        <FormField
          key={fieldIndex}
          fullWidth={fullWidth}
          isFilled={fieldIndex < filledFieldCount}
          isTyping={fieldIndex === typingFieldIndex}
          isBright={fieldIndex === 0}
          isPlaying={isPlaying}
        />
      ))}
      <SubmitButton isSubmitting={isSubmitting} isPlaying={isPlaying} />
    </SceneObject>
  );
}
