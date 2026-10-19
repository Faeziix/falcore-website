import { cn } from "@/lib/utils";

export function QuestionBubble({
  question,
  typedLength,
  isTyping,
}: {
  question: string;
  typedLength: number;
  isTyping: boolean;
}) {
  const hasStartedTyping = typedLength > 0;

  return (
    <p
      className={cn(
        "grid max-w-[88%] rounded-(--company-operating-system-bubble-radius) bg-case-accent px-5 py-3.5 text-[1.0625rem] leading-snug text-(--company-operating-system-on-accent) transition-opacity duration-300 sm:text-lg",
        hasStartedTyping ? "opacity-100" : "opacity-0"
      )}
    >
      <span aria-hidden className="invisible col-start-1 row-start-1">
        {question}
      </span>
      <span className="sr-only">{question}</span>
      <span aria-hidden className="col-start-1 row-start-1">
        {question.slice(0, typedLength)}
        {isTyping ? (
          <span className="ml-px inline-block h-[1.05em] w-px translate-y-[0.15em] bg-(--company-operating-system-on-accent)" />
        ) : null}
      </span>
    </p>
  );
}
