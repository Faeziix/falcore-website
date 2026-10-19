import { cva } from "class-variance-authority";
import type { StripLanguage } from "../_lib/department-swatches";

const languageOptionVariants = cva(
  "h-10 min-w-24 px-4 text-sm transition-colors duration-200 focus-visible:-outline-offset-4 focus-visible:outline-current",
  {
    variants: {
      isSelected: {
        true: "bg-case-ink text-case-paper",
        false: "text-case-ink-soft hover:text-case-ink",
      },
    },
  }
);

const LANGUAGE_OPTIONS: { language: StripLanguage; label: string; labelLanguage: string }[] = [
  { language: "english", label: "English", labelLanguage: "en" },
  { language: "arabic", label: "العربية", labelLanguage: "ar" },
];

export function StripLanguageToggle({
  selectedLanguage,
  onLanguageChange,
}: {
  selectedLanguage: StripLanguage;
  onLanguageChange: (language: StripLanguage) => void;
}) {
  return (
    <div role="group" aria-label="Language of the department strip" className="inline-flex border border-case-ink">
      {LANGUAGE_OPTIONS.map((option) => {
        const isSelected = option.language === selectedLanguage;
        return (
          <button
            key={option.language}
            type="button"
            lang={option.labelLanguage}
            aria-pressed={isSelected}
            onClick={() => onLanguageChange(option.language)}
            className={languageOptionVariants({ isSelected })}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
