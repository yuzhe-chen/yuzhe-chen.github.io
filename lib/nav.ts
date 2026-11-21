import { activities, awardRecord, bio, venues, videos } from "@/lib/content";

export type NavItem = { id: string; label: string; href?: string };

const all: (NavItem & { show: boolean })[] = [
  { id: "biography", label: "Biography", show: bio.length > 0 },
  { id: "activities", label: "Activities", show: activities.length > 0 },
  { id: "performances", label: "Performances", show: videos.length > 0 },
  { id: "honors", label: "Awards", show: awardRecord.length > 0 },
  { id: "venues", label: "Venues", show: venues.length > 0 },
  { id: "projects", label: "Projects", href: "/projects/", show: true },
];

/** The bar's tabs on the home page: sections scroll, Projects is its own page. */
export const nav: NavItem[] = all
  .filter((s) => s.show)
  .map(({ id, label, href }) => ({ id, label, href }));

/** The same tabs from another page: each one goes back to its home section. */
export const navFromElsewhere: NavItem[] = nav.map((i) => ({
  ...i,
  href: i.href ?? `/#${i.id}`,
}));
