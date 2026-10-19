import { cn } from "@/lib/utils";
import { BookCallButton } from "@/components/book-call-button";

export function SectionCallToAction({
  prompt,
  className,
}: {
  prompt: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between sm:gap-10",
        className
      )}
    >
      <p className="max-w-xl text-balance text-lead text-foreground">{prompt}</p>
      <BookCallButton width="fullOnMobile" />
    </div>
  );
}
