import { cn } from "@/lib/utils";
import { MOBILE_NAVIGATION_SHEET_ID } from "./navigation-links";

const toggleLineClassName =
  "absolute inset-x-0 h-0.5 bg-current transition-transform duration-300 ease-out-expo";

type MobileMenuToggleProps = {
  isOpen: boolean;
  onToggle: () => void;
  toggleRef: React.RefObject<HTMLButtonElement | null>;
};

export function MobileMenuToggle({ isOpen, onToggle, toggleRef }: MobileMenuToggleProps) {
  return (
    <button
      ref={toggleRef}
      type="button"
      onClick={onToggle}
      aria-label={isOpen ? "Close menu" : "Open menu"}
      aria-expanded={isOpen}
      aria-controls={MOBILE_NAVIGATION_SHEET_ID}
      className="-mr-2 flex size-11 items-center justify-center text-foreground md:hidden"
    >
      <span aria-hidden className="relative block h-3.5 w-5">
        <span className={cn(toggleLineClassName, "top-0", isOpen && "translate-y-1.5 rotate-45")} />
        <span className={cn(toggleLineClassName, "bottom-0", isOpen && "-translate-y-1.5 -rotate-45")} />
      </span>
    </button>
  );
}
