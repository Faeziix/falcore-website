import Image from "next/image";
import { cn } from "@/lib/utils";
import type { FamilySite } from "../../_lib/family-sites";

const CAPTURE_QUALITY = 90;

type FamilySiteFrameProps = {
  sites: FamilySite[];
  activeSite: FamilySite;
  panelId: string;
  labelledById: string;
};

function crossfadeClassName(isActive: boolean) {
  return cn(
    "object-cover object-top transition-opacity duration-500 ease-out-expo",
    isActive ? "opacity-100" : "opacity-0"
  );
}

export function FamilySiteFrame({ sites, activeSite, panelId, labelledById }: FamilySiteFrameProps) {
  return (
    <div role="tabpanel" id={panelId} aria-labelledby={labelledById} className="mt-5 sm:mt-10 lg:mt-12">
      <div className="hidden border border-(--xma-agency-frame) sm:block">
        <div className="flex h-10 items-center bg-(--xma-agency-frame) px-4">
          <span className="mx-auto text-sm text-(--xma-agency-frame-text)">{activeSite.address}</span>
        </div>
        <div className="relative aspect-[16/10] bg-case-paper-raised">
          {sites.map((site) => (
            <Image
              key={site.id}
              src={site.desktop.src}
              alt={site.id === activeSite.id ? site.desktop.alt : ""}
              aria-hidden={site.id !== activeSite.id}
              fill
              quality={CAPTURE_QUALITY}
              sizes="(min-width: 1400px) 1336px, (min-width: 640px) 96vw, 1px"
              className={crossfadeClassName(site.id === activeSite.id)}
            />
          ))}
        </div>
      </div>

      <div className="mx-auto w-(--xma-agency-phone-frame-width) max-w-full border-[6px] border-(--xma-agency-frame) sm:hidden">
        <div className="relative aspect-[828/1792] bg-case-paper-raised">
          {sites.map((site) => (
            <Image
              key={site.id}
              src={site.phone.src}
              alt={site.id === activeSite.id ? site.phone.alt : ""}
              aria-hidden={site.id !== activeSite.id}
              fill
              quality={CAPTURE_QUALITY}
              sizes="(max-width: 639px) 320px, 1px"
              className={crossfadeClassName(site.id === activeSite.id)}
            />
          ))}
        </div>
        <p className="bg-(--xma-agency-frame) py-2 text-center text-sm text-(--xma-agency-frame-text)">
          {activeSite.address}
        </p>
      </div>
    </div>
  );
}
