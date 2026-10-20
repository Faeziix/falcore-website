const contentDateFormatter = new Intl.DateTimeFormat("en-GB", {
  day: "numeric",
  month: "long",
  year: "numeric",
  timeZone: "UTC",
});

export function formatContentDate(isoDate: string) {
  return contentDateFormatter.format(new Date(`${isoDate}T00:00:00Z`));
}
