/**
 * The small line of etymology under each section's heading: where the word
 * comes from. Each was checked against Wiktionary's entry for the word itself,
 * and the Latin is given in full: a verb by its four principal parts (the first
 * person present, the present infinitive, the perfect and the supine), a noun by
 * its nominative, its genitive and its gender.
 *
 * No middle dots (the "·" kind) anywhere. The gender is written the usual way,
 * with a full stop: "m." and "f.". A string is plain text and `{ t }` is a
 * foreign term, set in italics.
 *
 * A heading of two words gets a line for each, in the order of the words, so
 * "Selected Honors" has a line for "select" and one for "honor".
 */
export type EtymPart = string | { t: string };

export type Etymology = EtymPart[];

export const etymologies: Record<string, Etymology[]> = {
  biography: [
    ["Greek ", { t: "bíos, bíou, m." }, ", “life” + ", { t: "-graphía" }, ", “writing”"],
  ],
  activities: [
    ["Latin ", { t: "agō, agere, ēgī, āctum" }, ", “to do”"],
  ],
  performances: [
    ["Old French ", { t: "parfornir" }, ", “to accomplish”"],
  ],
  honors: [
    ["Latin ", { t: "sēligō, sēligere, sēlēgī, sēlēctum" }, ", “to choose out”"],
    ["Latin ", { t: "honor, honōris, m." }, ", “esteem, dignity”"],
  ],
  venues: [
    [
      "Old French ",
      { t: "venue" },
      ", from ",
      { t: "venir" },
      ", from Latin ",
      { t: "veniō, venīre, vēnī, ventum" },
      ", “to come”",
    ],
  ],
  languages: [
    ["Latin ", { t: "lingua, linguae, f." }, ", “tongue”"],
  ],
};
