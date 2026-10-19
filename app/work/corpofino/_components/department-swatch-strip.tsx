"use client";

import { useState, type CSSProperties } from "react";
import { flushSync } from "react-dom";
import {
  DEPARTMENT_SWATCHES,
  INITIALLY_OPEN_DEPARTMENT_ID,
  type StripLanguage,
} from "../_lib/department-swatches";
import { holdElementInPlaceWhileLayoutSettles } from "../_lib/hold-element-in-place";
import { DepartmentSwatchBand } from "./department-swatch-band";
import { StripLanguageToggle } from "./strip-language-toggle";

const OPEN_BAND_SHARE = "3fr";
const CLOSED_BAND_SHARE = "1fr";
const BAND_REVEAL_SETTLE_MILLISECONDS = 950;

function bandColumnTemplate(openDepartmentId: string): CSSProperties {
  const columns = DEPARTMENT_SWATCHES.map((swatch) =>
    swatch.id === openDepartmentId ? OPEN_BAND_SHARE : CLOSED_BAND_SHARE
  ).join(" ");
  return { "--band-columns": columns } as CSSProperties;
}

function canAnimateLanguageFlip() {
  return typeof document.startViewTransition === "function";
}

export function DepartmentSwatchStrip() {
  const [openDepartmentId, setOpenDepartmentId] = useState(INITIALLY_OPEN_DEPARTMENT_ID);
  const [language, setLanguage] = useState<StripLanguage>("english");
  const isArabic = language === "arabic";

  function openDepartment(departmentId: string, bandPart: HTMLElement) {
    if (departmentId === openDepartmentId) return;
    holdElementInPlaceWhileLayoutSettles(bandPart, BAND_REVEAL_SETTLE_MILLISECONDS);
    setOpenDepartmentId(departmentId);
  }

  function changeLanguage(nextLanguage: StripLanguage) {
    if (nextLanguage === language) return;
    if (!canAnimateLanguageFlip()) {
      setLanguage(nextLanguage);
      return;
    }
    document.startViewTransition(() => flushSync(() => setLanguage(nextLanguage)));
  }

  return (
    <div>
      <div className="page-container flex justify-start">
        <StripLanguageToggle selectedLanguage={language} onLanguageChange={changeLanguage} />
      </div>
      <div
        dir={isArabic ? "rtl" : "ltr"}
        lang={isArabic ? "ar" : "en"}
        style={bandColumnTemplate(openDepartmentId)}
        className="mt-8 grid transition-[grid-template-columns] duration-700 ease-out-expo lg:h-[min(80svh,760px)] lg:grid-cols-(--band-columns)"
      >
        {DEPARTMENT_SWATCHES.map((swatch) => (
          <DepartmentSwatchBand
            key={swatch.id}
            swatch={swatch}
            language={language}
            isOpen={swatch.id === openDepartmentId}
            onOpen={(bandPart) => openDepartment(swatch.id, bandPart)}
          />
        ))}
      </div>
    </div>
  );
}
