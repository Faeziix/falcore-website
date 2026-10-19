import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const textLinkVariants = cva(
  "inline-flex items-center gap-1.5 transition-colors duration-200 underline-offset-[0.3em] decoration-1",
  {
    variants: {
      tone: {
        muted: "text-muted-foreground hover:text-foreground",
        foreground: "text-foreground hover:text-accent",
        accent: "text-accent hover:text-accent-hover",
      },
      underline: {
        none: "",
        hover: "hover:underline",
        always: "underline decoration-border-strong hover:decoration-current",
      },
      size: {
        inherit: "",
        sm: "text-sm",
        md: "text-base",
      },
    },
    defaultVariants: {
      tone: "muted",
      underline: "none",
      size: "inherit",
    },
  }
);

type TextLinkProps = React.ComponentProps<"a"> &
  VariantProps<typeof textLinkVariants> & {
    asChild?: boolean;
  };

function TextLink({
  className,
  tone,
  underline,
  size,
  asChild = false,
  ...props
}: TextLinkProps) {
  const Component = asChild ? Slot.Root : "a";

  return (
    <Component
      data-slot="text-link"
      className={cn(textLinkVariants({ tone, underline, size, className }))}
      {...props}
    />
  );
}

export { TextLink, textLinkVariants };
