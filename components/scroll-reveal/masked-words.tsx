import { Fragment } from "react";
import { cn } from "@/lib/utils";
import { revealOrder } from "./reveal-order";

const wordMaskClassName = "overflow-clip pb-[0.1em] -mb-[0.1em]";
const lineMaskWithUnderlineClearanceClassName = "overflow-clip pb-[0.35em] -mb-[0.35em]";

export function MaskedWords({ text, firstOrder = 0 }: { text: string; firstOrder?: number }) {
  const words = text.split(" ");

  return words.map((word, wordIndex) => (
    <Fragment key={wordIndex}>
      <span className={cn("inline-block align-top", wordMaskClassName)}>
        <span className="reveal-mask-rise inline-block" style={revealOrder(firstOrder + wordIndex)}>
          {word}
        </span>
      </span>
      {wordIndex < words.length - 1 ? " " : null}
    </Fragment>
  ));
}

export function MaskedLine({ children, order = 0 }: { children: React.ReactNode; order?: number }) {
  return (
    <span className={cn("block", lineMaskWithUnderlineClearanceClassName)}>
      <span className="reveal-mask-rise block [--reveal-mask-travel:140%]" style={revealOrder(order)}>
        {children}
      </span>
    </span>
  );
}

export function countWords(text: string) {
  return text.split(" ").length;
}
