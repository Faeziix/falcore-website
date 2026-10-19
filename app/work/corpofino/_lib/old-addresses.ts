export type OldAddressRedirect = {
  oldPath: string;
  newPath: string;
  isOldPathArabic?: boolean;
};

export const OLD_ADDRESS_REDIRECTS: OldAddressRedirect[] = [
  { oldPath: "/ourspa.aspx", newPath: "/en/about" },
  { oldPath: "/slimming-treatments.aspx", newPath: "/en/services/slimming" },
  { oldPath: "/spa-type/skin-care", newPath: "/en/services/skin-care" },
  { oldPath: "/العناية-بالبشرة.aspx", newPath: "/ar/services/skin-care", isOldPathArabic: true },
  { oldPath: "/spa-type/nail-care", newPath: "/en/services/nail-spa" },
  { oldPath: "/تقليمالاظافر.aspx", newPath: "/ar/services/nail-spa", isOldPathArabic: true },
];
