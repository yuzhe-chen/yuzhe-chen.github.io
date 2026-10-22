import { activities, awardRecord, bio, venues, videos } from "@/lib/content";
import type { NavItem } from "@/components/site-nav";

// Document order matters — the nav highlights the topmost visible entry.
const all: (NavItem & { show: boolean })[] = [
  // No href of its own: it goes to its own section, like every other tab. The
  // name in the bar used to share this target and now reaches past it, to the
  // picture above the writing.
  { id: "biography", label: "Biography", show: bio.length > 0 },
  { id: "activities", label: "Activities", show: activities.length > 0 },
  { id: "performances", label: "Performances", show: videos.length > 0 },
  { id: "honors", label: "Honors", show: awardRecord.length > 0 },
  { id: "venues", label: "Venues", show: venues.length > 0 },
];

/** The menu bar's tabs, shared by every page so the bar reads the same. */
export const nav: NavItem[] = all
  .filter((s) => s.show)
  .map(({ id, label, href }) => ({ id, label, href }));

/** The same tabs from another page: each one goes back to its home section. */
export const navFromElsewhere: NavItem[] = nav.map((i) => ({
  ...i,
  href: i.href ?? `/#${i.id}`,
}));
