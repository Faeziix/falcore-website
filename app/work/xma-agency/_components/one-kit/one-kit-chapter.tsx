"use client";

import { useId, useState } from "react";
import { CaseStudyChapter } from "@/app/work/_components/case-study-chapter";
import { oneKitCaption, oneKitChapter } from "../../_lib/case-study-chapters";
import { FAMILY_SITES, type FamilySite } from "../../_lib/family-sites";
import { FamilySiteFrame } from "./family-site-frame";
import { FamilySiteTabs } from "./family-site-tabs";

export function OneKitChapter() {
  const [activeSiteIndex, setActiveSiteIndex] = useState(0);
  const switcherId = useId();
  const panelId = `${switcherId}-panel`;
  const tabIdForSite = (site: FamilySite) => `${switcherId}-${site.id}`;
  const activeSite = FAMILY_SITES[activeSiteIndex];

  return (
    <CaseStudyChapter id={oneKitChapter.id} title={oneKitChapter.title} intro={oneKitChapter.intro}>
      <FamilySiteTabs
        sites={FAMILY_SITES}
        activeSiteIndex={activeSiteIndex}
        onSelectSite={setActiveSiteIndex}
        tabIdForSite={tabIdForSite}
        panelId={panelId}
      />
      <FamilySiteFrame
        sites={FAMILY_SITES}
        activeSite={activeSite}
        panelId={panelId}
        labelledById={tabIdForSite(activeSite)}
      />
      <p className="mt-6 text-sm text-case-ink-soft">{oneKitCaption}</p>
    </CaseStudyChapter>
  );
}
