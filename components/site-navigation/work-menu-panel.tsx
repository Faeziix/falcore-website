"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { TextLink } from "@/components/ui/text-link";
import { CASE_STUDIES, caseStudyPath } from "@/app/work/_lib/case-study-index";
import { WORK_INDEX_LINK, WORK_MENU_PANEL_ID } from "./navigation-links";
import { revealFromBarVariants, settleIntoPlaceVariants } from "./navigation-motion";
import { WorkMenuPreview } from "./work-menu-preview";
import { WorkMenuStudyLink } from "./work-menu-study-link";

function findOpenCaseStudySlug(pathname: string) {
  return CASE_STUDIES.find((caseStudy) => pathname === caseStudyPath(caseStudy.slug))?.slug;
}

function WorkMenuContents({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const openCaseStudySlug = findOpenCaseStudySlug(pathname);
  const [previewedSlug, setPreviewedSlug] = useState(openCaseStudySlug ?? CASE_STUDIES[0].slug);

  return (
    <div className="page-container grid grid-cols-12 gap-x-8 py-10">
      <motion.div variants={settleIntoPlaceVariants} className="col-span-5 flex flex-col">
        <ul className="flex flex-col">
          {CASE_STUDIES.map((caseStudy) => (
            <WorkMenuStudyLink
              key={caseStudy.slug}
              caseStudy={caseStudy}
              isPreviewed={caseStudy.slug === previewedSlug}
              isCurrentPage={caseStudy.slug === openCaseStudySlug}
              onPreview={() => setPreviewedSlug(caseStudy.slug)}
              onNavigate={onNavigate}
            />
          ))}
        </ul>
        <TextLink
          asChild
          tone="muted"
          underline="always"
          size="sm"
          className="mt-auto self-start pt-8"
        >
          <Link
            href={WORK_INDEX_LINK.href}
            onClick={onNavigate}
            aria-current={pathname === WORK_INDEX_LINK.href ? "page" : undefined}
          >
            {WORK_INDEX_LINK.label}
          </Link>
        </TextLink>
      </motion.div>
      <motion.div variants={settleIntoPlaceVariants} className="col-span-7 lg:col-span-6 lg:col-start-7">
        <WorkMenuPreview previewedSlug={previewedSlug} />
      </motion.div>
    </div>
  );
}

export function WorkMenuPanel({ isOpen, onNavigate }: { isOpen: boolean; onNavigate: () => void }) {
  const panelVariants = revealFromBarVariants({
    revealSeconds: 0.24,
    exitSeconds: 0.15,
  });

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          id={WORK_MENU_PANEL_ID}
          variants={panelVariants}
          initial="hidden"
          animate="shown"
          exit="exit"
          className="absolute inset-x-0 top-full hidden border-b border-border bg-background md:block"
        >
          <WorkMenuContents onNavigate={onNavigate} />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
