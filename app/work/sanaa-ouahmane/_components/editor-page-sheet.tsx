import { cva } from "class-variance-authority";
import type { EditorPage } from "../_lib/editor-pages";
import { SectionSwitch } from "./section-switch";

const sectionTitleVariants = cva("min-w-0 text-[0.8125rem] leading-snug break-words hyphens-auto sm:text-sm", {
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
      <div className="flex items-baseline justify-between gap-4 lg:block">
        <h3 className="font-case-display text-display-sm font-medium text-case-ink">{page.title}</h3>
        <p className="shrink-0 font-(family-name:--sanaa-ouahmane-label-family) text-[0.8125rem] tracking-(--sanaa-ouahmane-label-tracking) text-case-ink-soft uppercase lg:mt-1">
          {switchedOnCount} of {page.sections.length} live
        </p>
      </div>
      <ol className="mt-4 columns-2 gap-x-4 border-t sm:gap-x-6 border-case-rule md:columns-3 md:gap-x-8 lg:mt-6 lg:columns-1">
        {page.sections.map((section) => (
          <li
            key={section.title}
            className="flex break-inside-avoid items-center justify-between gap-2 border-b border-case-rule py-2.5 sm:gap-3"
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
