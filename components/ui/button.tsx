import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { Slot } from "radix-ui";
import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center gap-2.5 font-sans font-medium whitespace-nowrap transition-[background-color,border-color,color,transform] duration-300 ease-out-expo active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
        outline:
          "border border-border-strong text-foreground hover:border-foreground/70 hover:bg-foreground/[0.03]",
        ghost: "text-muted-foreground hover:text-foreground",
        inverse: "bg-foreground text-background hover:bg-foreground-soft",
      },
      size: {
        sm: "h-9 px-4 text-sm",
        md: "h-11 px-6 text-[0.9375rem]",
        lg: "h-14 px-8 text-base",
      },
      width: {
        auto: "",
        full: "w-full",
        fullOnMobile: "w-full sm:w-auto",
      },
    },
    defaultVariants: {
      variant: "primary",
      size: "md",
      width: "auto",
    },
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({
  className,
  variant,
  size,
  width,
  asChild = false,
  ...props
}: ButtonProps) {
  const Component = asChild ? Slot.Root : "button";

  return (
    <Component
      data-slot="button"
      className={cn(buttonVariants({ variant, size, width, className }))}
      {...props}
    />
  );
}

export { Button, buttonVariants };
