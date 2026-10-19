import { cva } from "class-variance-authority";
import type { EditorPage } from "../_lib/editor-pages";
import { SectionSwitch } from "./section-switch";

const sectionTitleVariants = cva("min-w-0 text-[0.8125rem] leading-snug sm:text-sm", {
  variants: {
    isSwitchedOn: {
      true: "text-(--sanaa-ouahmane-body-ink)",
      false: "text-case-ink-soft",
    },
  },
});

export function EditorPageSheet({ page }: { page: EditorPage }) {
  const switchedOnCount = page.sections.filter((section) => section.isSwitchedOn).length;

  return (
    <li className="min-w-0 border border-case-rule bg-case-paper p-4 sm:p-5 lg:p-6">
      <h3 className="font-case-display text-display-sm font-medium text-case-ink">{page.title}</h3>
      <p className="mt-1 font-(family-name:--sanaa-ouahmane-label-family) text-[0.625rem] tracking-(--sanaa-ouahmane-label-tracking) text-case-ink-soft uppercase">
        {switchedOnCount} of {page.sections.length} live
      </p>
      <ol className="mt-6 border-b border-case-rule">
        {page.sections.map((section) => (
          <li
            key={section.title}
            className="flex items-center justify-between gap-2 border-t border-case-rule py-2.5 sm:gap-3"
          >
            <span className={sectionTitleVariants({ isSwitchedOn: section.isSwitchedOn })}>
              {section.title}
              <span className="sr-only">{section.isSwitchedOn ? ", live" : ", switched off"}</span>
            </span>
            <SectionSwitch isSwitchedOn={section.isSwitchedOn} />
          </li>
        ))}
      </ol>
    </li>
  );
}
