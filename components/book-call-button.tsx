import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, externalLinkProps } from "@/lib/site-config";

type BookCallButtonProps = Pick<
  React.ComponentProps<typeof Button>,
  "variant" | "size" | "width" | "className"
>;

export function BookCallButton({ variant, size, width, className }: BookCallButtonProps) {
  return (
    <Button asChild variant={variant} size={size} width={width} className={className}>
      <a href={BOOKING_URL} {...externalLinkProps}>
        Book a consultation call
        <ArrowUpRight aria-hidden className={size === "lg" ? "size-4.5" : undefined} />
      </a>
    </Button>
  );
}
