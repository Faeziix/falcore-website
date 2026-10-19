import { cva } from "class-variance-authority";

const switchTrackVariants = cva("relative inline-flex h-3.5 w-7 shrink-0 items-center border p-0.5", {
  variants: {
    isSwitchedOn: {
      true: "justify-end border-(--sanaa-ouahmane-switch-on) bg-(--sanaa-ouahmane-switch-on)",
      false: "justify-start border-(--sanaa-ouahmane-switch-off-edge)",
    },
  },
});

const switchKnobVariants = cva("block size-2", {
  variants: {
    isSwitchedOn: {
      true: "bg-(--sanaa-ouahmane-switch-knob)",
      false: "bg-(--sanaa-ouahmane-switch-off-edge)",
    },
  },
});

export function SectionSwitch({ isSwitchedOn }: { isSwitchedOn: boolean }) {
  return (
    <span aria-hidden className={switchTrackVariants({ isSwitchedOn })}>
      <span className={switchKnobVariants({ isSwitchedOn })} />
    </span>
  );
}
