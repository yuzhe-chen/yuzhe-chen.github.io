/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE — and only this file — to update the site.
 *
 *  Content pulled from yuzhe-chen.github.io (Sept 2026).
 *  Anything marked TODO is a guess or a gap — fix those first.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Yuzhe (Julian) Chen",
  tagline:
    "Pianist. National Symphony Orchestra chamber fellow, MTNA national prizewinner, and a student who reads four languages and builds too much LEGO.",
  location: "Great Falls, Virginia",
  school: "Langley High School, Class of 2028",
  metaDescription:
    "Yuzhe (Julian) Chen — pianist and student at Langley High School. Competition awards, National Symphony Orchestra chamber program, and service through music.",
  photo: "/portrait.jpg" as string | null, // cropped from IMG_0211.jpeg
};

export const links = [
  { label: "Email", href: "mailto:julianchen2011@gmail.com" },
  { label: "YouTube", href: "https://www.youtube.com/@julianchenmusic" },
  // { label: "Résumé (PDF)", href: "/resume.pdf" },
];

/** Julian's own words, put into first person. */
export const about = [
  "At fourteen, I'm a linguist, a musician, a globetrotter, and a booknerd. Heading into my junior year at Langley High School, I report for the Saxon Scope and am a dedicated member of the Latin club. I speak fluent Chinese, English, French, and Spanish.",
  "I serve as chief intern of the Tacy Foundation, a non-profit dedicated to helping my elderly community through the power of music, where I regularly perform at senior assisted living centers. It has taught me more about what a performance is for than any competition has.",
  "I've performed at the Kennedy Center, Merkin Hall, the Linehan Concert Hall, the Beethoven House, and Harris Theatre. I've been featured on NPR's Daily Joy program, and I'm an NSO Youth Fellow in the Chamber Program.",
  "I spend my free time playing tennis, hiking, and taking photos.",
];

/** The 6–8 that a reader should see first. Everything else lives in the full list. */
export const honors = [
  {
    year: "2025–26",
    title: "3rd Place, National Round — MTNA Junior Piano Performance",
    org: "Music Teachers National Association",
    note: "Southern Division Winner and Virginia State Winner the same year. Also Maryland State Winner in 2023–24 and 2024–25.",
  },
  {
    year: "2025–26",
    title: "Finalist, From the Top",
    org: "From the Top",
    note: "",
  },
  {
    // TODO: give me the year and I'll add it here and to the record below.
    year: "",
    title: "Featured Artist, Daily Joy",
    org: "NPR",
    note: "",
  },
  {
    year: "2025 — present",
    title: "Youth Fellow, Chamber Music Program",
    org: "National Symphony Orchestra",
    note: "A performance-oriented training program for serious pre-college musicians.",
  },
  {
    year: "2023–24",
    title: "1st Prize & Grand Prix",
    org: "Maria and Natalia Yeshchenko International II Piano Competition",
    note: "",
  },
  {
    year: "2021–22",
    title:
      "First Prize & Steinway & Sons Award for Best Performance of a Romantic Piece",
    org: "Kaufman Music Center International Youth Piano Competition",
    note: "Junior I division.",
  },
  {
    year: "2025–26",
    title: "1st Place, Concerto Competition (Advanced Division)",
    org: "Maryland State Music Teachers Association",
    note: "",
  },
  {
    year: "2025–26",
    title: "AP Scholar with Distinction",
    org: "College Board",
    note: "Also named to the College Board National Recognition Program.",
  },
  {
    year: "2025–26",
    title: "Gold Award, National Spanish Exam Level IV",
    org: "American Association of Teachers of Spanish and Portuguese",
    note: "Gold at Level III the previous year.",
  },
];

/** The complete record, grouped by school year. Shown behind a toggle. */
export const awardRecord = [
  {
    year: "2025–2026",
    items: [
      { title: "3rd Place, MTNA Piano Competition (National Round)", level: "National" },
      { title: "Southern Division Winner, MTNA Piano Competition", level: "Regional" },
      { title: "Winner, MTNA Piano Competition (Virginia State)", level: "State" },
      { title: "Finalist, From the Top", level: "National" },
      { title: "National Symphony Orchestra Fellow", level: "National" },
      { title: "1st Place, MSMTA Concerto Competition (Advanced)", level: "State" },
      { title: "1st Place, Friday Morning Music Club Competition", level: "Regional" },
      { title: "1st Place, Ketlands Young Artists Competition", level: "Regional" },
      { title: "2nd Place, James C. Macdonald Arts Scholarship Competition", level: "Regional" },
      { title: "Distinguished Theory Award, MSMTA Music Theory Program", level: "State" },
      { title: "AP Scholar with Distinction, College Board", level: "National" },
      { title: "College Board National Recognition Program: School Recognition Award", level: "National" },
      { title: "Gold Award, National Spanish Exam Level IV", level: "National" },
      { title: "Academic Excellence in Honors Chemistry, Langley High School", level: "School" },
    ],
  },
  {
    year: "2024–2025",
    items: [
      { title: "Winner, MTNA Piano Competition (Maryland State)", level: "State" },
      { title: "Eastern Division Alternate, MTNA Piano Competition", level: "Regional" },
      { title: "2nd Place, Thomas F. Hulbert International Piano Competition (Division 3)", level: "International" },
      { title: "1st Place, Elizabeth R. Davis Memorial Piano Competition (High School Division)", level: "Regional" },
      { title: "1st Place, Evelyn Swarthout and Patrick Hayes Competition for Piano", level: "Regional" },
      { title: "1st Place, Miriam Shields Gottlieb Memorial Piano Competition", level: "Regional" },
      { title: "1st Place, Lions of Virginia James Bland Music Scholarship Foundation", level: "State" },
      { title: "Advanced & Senior Awards, MSMTA Theory", level: "State" },
      { title: "Gold Award, National Spanish Exam Level III", level: "National" },
      { title: "Academic Excellence in Spanish III, Langley High School", level: "School" },
    ],
  },
  {
    year: "2023–2024",
    items: [
      { title: "1st Prize & Grand Prix, Maria and Natalia Yeshchenko International II Piano Competition", level: "International" },
      { title: "2nd Place, Thomas F. Hulbert International Piano Competition (Division 3)", level: "International" },
      { title: "1st Prize, TIPCO (Talents International Piano Competition Online)", level: "International" },
      { title: "Winner, MTNA Piano Competition (Maryland State)", level: "State" },
      { title: "1st Place, Chase Sonata Competition", level: "Regional" },
      { title: "1st Place, Miriam Shields Gottlieb Memorial Piano Competition", level: "Regional" },
      { title: "1st Place, WMTA Viola Hartman Piano Competition", level: "Regional" },
      { title: "1st Place, MSMTA Spring Festival", level: "State" },
      { title: "All-A Honor Roll, Cooper Middle School", level: "School" },
    ],
  },
  {
    year: "2022–2023",
    items: [
      { title: "1st Place, AAMS International Competition (Junior Division: Piano)", level: "International" },
      { title: "Semi-Finalist, Concours Algorea", level: "International" },
      { title: "Quarter-Finalist, Concours Alkindi", level: "International" },
    ],
  },
  {
    year: "2021–2022",
    items: [
      { title: "First Prize & Steinway & Sons Special Award, Kaufman Music Center International Youth Piano Competition (Junior I)", level: "International" },
      { title: "Winner, Gertrude Brown Memorial Piano Concerto Competition (Junior II)", level: "Regional" },
      { title: "1st Place & Audience Award, 51st Joseph and Goldie Feder Memorial String Competition (Beginner Violin)", level: "Regional" },
      { title: "1st Place, MSMTA Spring Festival", level: "State" },
      { title: "Semi-Finalist, Concours Algorea", level: "International" },
      { title: "DELF French A2", level: "International" },
    ],
  },
  {
    year: "2019–2020",
    items: [
      { title: "1st Place, NVMTA Robert Spencer Piano Concerto Competition", level: "Regional" },
    ],
  },
];

/**
 * Halls Julian has played. Names only for now — see my note: I'm not
 * putting cities on the site until you confirm which Harris Theatre and
 * which Beethoven House.
 */
export const venues = [
  "The Kennedy Center",
  "Merkin Hall",
  "Linehan Concert Hall",
  "The Beethoven House",
  "Harris Theatre",
];

export const activities = [
  {
    period: "2025 — present",
    title: "Youth Fellow, Chamber Music Program",
    org: "National Symphony Orchestra",
    description:
      "Performance-oriented training program for serious pre-college musicians, coached by NSO players.",
  },
  {
    period: "Summer 2024 — present",
    title: "Chief Intern",
    org: "Tacy Foundation",
    description:
      "Non-profit that supports elderly and hospitalized people through music. I perform regularly at senior assisted living centers and help coordinate other student musicians.",
  },
  {
    period: "2024 — present",
    title: "Reporter",
    org: "The Saxon Scope, Langley High School",
    description:
      "I write opinion and reviews for Langley's student newspaper.",
  },
  {
    period: "2025 — present",
    title: "Runner",
    org: "Cross Country, Langley High School",
    description: "Two seasons of 5K cross country.",
  },
  {
    period: "2024 — present",
    title: "Member",
    org: "Latin Club, Langley High School",
    description:
      "Member since freshman year. (Add your National Latin Exam result here once you've sat it — that's the line that will matter.)",
  },
  {
    period: "2024 — present",
    title: "Outreach Subteam",
    org: "Robotics Club, Langley High School",
    description:
      "I run outreach to local schools and younger students, introducing them to robotics.",
  },
];

export const languages = [
  { name: "Chinese", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent · DELF A2" },
  { name: "Spanish", level: "Fluent · National Spanish Exam Gold, Levels III & IV" },
];

/**
 * Performances. Add the 11-character ID from a YouTube URL — for
 * youtube.com/watch?v=dQw4w9WgXcQ the id is "dQw4w9WgXcQ".
 * Order them yourself; put the strongest playing first, not the newest.
 */
export const videos: {
  id: string;
  title: string;
  detail?: string;
}[] = [
  // Newest and hardest first. The Kaufman final stays last because it's the
  // video evidence for a first prize listed above, not because of its views.
  {
    id: "6zPwgr40SmE",
    title: "Horowitz — Variations on Themes from Bizet's Carmen",
    detail: "2026",
  },
  {
    id: "x-QbMrCqPxw",
    title: "Liszt — Spanish Rhapsody, S. 254",
    detail: "2025",
  },
  {
    id: "b-uOBh1JqaM",
    title: "Ravel — Jeux d'eau",
    detail: "2025",
  },
  {
    id: "zOJ_GQH1Jgc",
    title: "Bach, Schumann & Chopin",
    detail: "Robert Schumann Competition · 2025",
  },
  {
    id: "tDUKPhlZDD0",
    title: "Mozart — Piano Concerto No. 21 in C, K. 467 (I)",
    detail: "with the New England Youth Ensemble · 2024",
  },
  {
    id: "K52sT2QkNFg",
    title: "Kaufman International Youth Piano Competition — Final Round",
    detail: "2022 · First Prize & Steinway & Sons Award",
  },
];

/** Empty for now — these sections hide themselves until you add something. */
export const projects: {
  title: string;
  year: string;
  role: string;
  description: string;
  skills: string[];
  href?: string;
}[] = [];

export const writing: {
  year: string;
  title: string;
  where: string;
  href?: string;
}[] = [];
