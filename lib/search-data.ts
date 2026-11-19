import { projects } from "@/lib/projects";

/**
 * What the header search looks through. The hidden research page is never in
 * this list: it is reached only by typing its name and pressing Enter.
 */
export type SearchEntry = {
  title: string;
  description: string;
  href: string;
  kind: "Page" | "Section" | "Project";
  keywords: string;
};

export const searchEntries: SearchEntry[] = [
  { title: "Home", description: "The top of the site", href: "/", kind: "Page", keywords: "yuzhe chen pianist" },
  { title: "Biography", description: "A short biography", href: "/#biography", kind: "Section", keywords: "about" },
  { title: "Activities", description: "Programs, festivals and fellowships", href: "/#activities", kind: "Section", keywords: "fellowship festival" },
  { title: "Performances", description: "Videos of recent performances", href: "/#performances", kind: "Section", keywords: "video piano youtube" },
  { title: "Honors", description: "Competitions and awards", href: "/#honors", kind: "Section", keywords: "awards competition prize" },
  { title: "Venues", description: "Halls and places performed", href: "/#venues", kind: "Section", keywords: "hall concert" },
  { title: "Projects", description: "Websites and apps I have built", href: "/projects/", kind: "Page", keywords: "websites apps code" },
  ...projects.map((p) => ({
    title: p.title,
    description: p.tagline,
    href: `/projects/${p.slug}/`,
    kind: "Project" as const,
    keywords: `${p.keywords} ${p.does}`,
  })),
];
