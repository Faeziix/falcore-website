import { ArrowUpRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { BOOKING_URL, externalLinkProps } from "@/lib/site-config";

type BookCallButtonProps = Pick<React.ComponentProps<typeof Button>, "size" | "width" | "className">;

export function BookCallButton({ size, width, className }: BookCallButtonProps) {
  return (
    <Button asChild size={size} width={width} className={className}>
      <a href={BOOKING_URL} {...externalLinkProps}>
        Book a free call
        <ArrowUpRight aria-hidden />
      </a>
    </Button>
  );
}
