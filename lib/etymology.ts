/**
 * The small line of etymology under each section's heading: where the word
 * comes from. Each was checked against Wiktionary's etymology for the word
 * itself. A string is plain text and `{ t }` is a foreign term, set in italics.
 *
 * A heading of two words gets a line for each, so "Selected Honors" has
 * "select" and "honor".
 */
export type EtymPart = string | { t: string };

export type Etymology = { word: string; parts: EtymPart[] };

export const etymologies: Record<string, Etymology[]> = {
  biography: [
    {
      word: "biography",
      parts: ["Greek ", { t: "bíos" }, ", “life” + ", { t: "-graphía" }, ", “writing”"],
    },
  ],
  activities: [
    {
      word: "active",
      parts: ["Latin ", { t: "āctīvus" }, ", from ", { t: "agere" }, ", “to do”"],
    },
  ],
  performances: [
    {
      word: "perform",
      parts: ["Old French ", { t: "parfornir" }, ", “to accomplish”"],
    },
  ],
  honors: [
    {
      word: "select",
      parts: ["Latin ", { t: "sēligere" }, ", “to choose out”"],
    },
    {
      word: "honor",
      parts: ["Latin ", { t: "honor" }, ", “esteem, dignity”"],
    },
  ],
  venues: [
    {
      word: "venue",
      parts: ["Old French ", { t: "venue" }, ", from ", { t: "venir" }, ", “to come”"],
    },
  ],
  languages: [
    {
      word: "language",
      parts: ["Latin ", { t: "lingua" }, ", “tongue”"],
    },
  ],
};
