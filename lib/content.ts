/**
 * ─────────────────────────────────────────────────────────────
 *  EDIT THIS FILE, and only this file, to update the site.
 *
 *  Content pulled from yuzhe-chen.github.io (Sept 2026).
 *  Anything marked TODO is a guess or a gap. Fix those first.
 * ─────────────────────────────────────────────────────────────
 */

export const profile = {
  name: "Yuzhe (Julian) Chen",
  // What the hero is headed with. The full name above still carries the page
  // title, the structured data and the alt text.
  shortName: "Yuzhe Chen",
  tagline:
    "Award-winning pianist, connoisseur of languages and aficionado of history.",
  school: "Langley High School, Class of 2028",
  // The site's own address. Search engines need the absolute URL to build a
  // canonical link and a sitemap, so everything that needs one reads it here.
  siteUrl: "https://yuzhe-chen.github.io",
  metaDescription:
    "Yuzhe (Julian) Chen, pianist and student at Langley High School. Competition awards, National Symphony Orchestra chamber program, and service through music.",
  // One portrait, both themes. Set to null to fall back to the monogram.
  photoLight: "/portrait-light.jpg" as string | null, // cropped from MVC_4948.jpg
};

/** Nav and hero links. No contact details: the site deliberately carries none. */
export const links = [
  { label: "YouTube", href: "https://www.youtube.com/@julianchenmusic" },
  // { label: "Résumé (PDF)", href: "/resume.pdf" },
];

/** Julian's biography, in the third person. */
export const bio = [
  "Yuzhe (Julian) is a junior at Langley High School. Currently, he studies piano with Dr. Dmitri Nazarenko and music theory with Ms. Lora Baronian.",
  "Julian has won top prizes in piano competitions at regional, national, and international levels, including the MTNA Piano Competition (Virginia State Winner in 2026-2027; 3rd place in the National Final and Winner in Southern Division and Virginia State in 2025-2026; 2nd place in Eastern Division and Maryland State Winner in 2024-2025), Friday Morning Music Club Piano Competition (1st Place and George Manos Prize), MSMTA Gertrude Brown Memorial Concerto Competition (winner in 2022, 2024, and 2026), Maryland State Music Teachers Association Elizabeth R. Davis Memorial Piano Competition (1st place in 2025), Thomas F. Hulbert International Piano Competition, William Knabe Piano Institute (2nd place in 2023, 2025), MSMTA Chase Sonata Competition (2024), Maria and Nataliya Yeshchenko International II Piano Competition (Grand Prix among 6 age categories in 2023), and Kaufman International Youth Piano Competition (1st place and the Steinway & Sons Prize for the best Romantic Piece in Junior I group, 2022).",
  "Julian has performed at the Kennedy Center, Merkin Hall, the Linehan Concert Hall, the Beethoven House, and Harris Theatre. He has been featured on NPR's Daily Joy program, and was an NSO Youth Fellow in the Chamber Program (2025-2026).",
  "Apart from being a musician, Julian is a linguist, a globetrotter, and a booknerd. He speaks fluent Chinese, English, French, and Spanish, and reports for the school magazine Saxon Scope. He also serves as chief intern of the Tacy Foundation, a non-profit dedicated to helping his elderly community through the power of music. He spends his free time playing tennis, hiking, and taking photos. His favorite museums are the Smithsonian National Museum of Natural History, the Museo Nacional del Prado, and the Louvre, and the artists he keeps coming back to are Monet and Schumann.",
];

/**
 * The complete record, grouped by academic year, using each competition's
 * official name rather than the abbreviation people say out loud.
 *
 * Which year an award belongs to follows the school calendar, not the
 * calendar year: September to December falls in the year that just started,
 * and January to August -- summer competitions included -- falls in the year
 * that is finishing. So the MTNA state round in the autumn, the division
 * round the following January and the national final that March all land in
 * the same academic year, which is the point of grouping them this way.
 *
 * Order within a year: every music award comes before any academic one, so a
 * second place in music still sits above a school prize. Within the music
 * awards, the MTNA run leads, highest round down, so the progression reads;
 * then first places; then anything below a first.
 *
 * `kind` marks which side of that split an award falls on. The page draws a
 * hairline where music ends and academics begin, so the two read as groups
 * without a second row of headings.
 *
 * Programs Julian was accepted to rather than awards he won -- the NSO
 * fellowship, Tanglewood -- live in `activities`, not here.
 */
export const awardRecord = [
  {
    year: "2026-2027",
    items: [
      { title: "Winner, Virginia State, Music Teachers National Association Senior Piano Performance Competition", level: "State", kind: "music" },
    ],
  },
  {
    year: "2025-2026",
    items: [
      { title: "3rd Place, National Finals, Music Teachers National Association Junior Piano Performance Competition", level: "National", kind: "music" },
      { title: "Winner, Southern Division, Music Teachers National Association Junior Piano Performance Competition", level: "Regional", kind: "music" },
      { title: "Winner, Virginia State, Music Teachers National Association Junior Piano Performance Competition", level: "State", kind: "music" },
      { title: "Finalist, From the Top", level: "National", kind: "music" },
      { title: "1st Place, Friday Morning Music Club Piano Competition", level: "Regional", kind: "music" },
      { title: "Distinguished Theory Award, Maryland State Music Teachers Association Music Theory Testing Program", level: "Regional", kind: "music" },
      { title: "1st Place, Young Artist Award Competition, City of Gaithersburg and the Kentlands Community Foundation", level: "Regional", kind: "music" },
      { title: "1st Place, Advanced Group, Maryland State Music Teachers Association Gertrude S. Brown Memorial Piano Concerto Competition", level: "Regional", kind: "music" },
      // The "National" here is the one way into the projects page.
      { title: "AP Scholar with Distinction, College Board", level: "National", kind: "academic", href: "/projects/" },
      { title: "School Recognition Award, College Board National Recognition Program", level: "National", kind: "academic" },
      { title: "Gold Medal, Level IV, National Spanish Examinations, American Association of Teachers of Spanish and Portuguese", level: "National", kind: "academic" },
      { title: "Academic Excellence in Honors Chemistry, Langley High School", level: "School", kind: "academic" },
    ],
  },
  {
    year: "2024-2025",
    items: [
      { title: "Alternate (2nd Place), Eastern Division, Music Teachers National Association Junior Piano Performance Competition", level: "Regional", kind: "music" },
      { title: "Winner, Maryland State, Music Teachers National Association Junior Piano Performance Competition", level: "State", kind: "music" },
      { title: "1st Place, High School Division, Maryland State Music Teachers Association Elizabeth R. Davis Memorial Piano Competition", level: "Regional", kind: "music" },
      { title: "1st Place, Montgomery County Music Teachers Association Evelyn Swarthout and Patrick Hayes Competition for Piano", level: "Regional", kind: "music" },
      { title: "1st Place, Maryland State Music Teachers Association Miriam Shields Gottlieb Memorial Piano Competition", level: "Regional", kind: "music" },
      { title: "1st Place, Bland Music Scholarship Competition, Lions of Virginia Bland Music Scholarship Foundation", level: "State", kind: "music" },
      { title: "Advanced and Senior Theory Awards, Maryland State Music Teachers Association Music Theory Testing Program", level: "Regional", kind: "music" },
      { title: "2nd Place, Thomas F. Hulbert International Piano Competition, William Knabe Piano Institute", level: "International", kind: "music" },
      { title: "Gold Medal, Level III, National Spanish Examinations, American Association of Teachers of Spanish and Portuguese", level: "National", kind: "academic" },
      { title: "Academic Excellence in Spanish III, Langley High School", level: "School", kind: "academic" },
    ],
  },
  {
    year: "2023-2024",
    items: [
      { title: "Grand Prix, Age Category 2 (11-14), II International Competition of Pianists Named After Maria and Nataliya Yeshchenko", level: "International", kind: "music" },
      { title: "Winner, Maryland State, Music Teachers National Association Junior Piano Performance Competition", level: "State", kind: "music" },
      { title: "1st Place, Maryland State Music Teachers Association Doris Chase Sonata Competition", level: "Regional", kind: "music" },
      { title: "1st Place, Intermediate Group, Maryland State Music Teachers Association Gertrude S. Brown Memorial Piano Concerto Competition", level: "Regional", kind: "music" },
    ],
  },
  {
    year: "2022-2023",
    items: [
      { title: "1st Place, Junior Piano Division, Asian American Music Society International Music Competition", level: "International", kind: "music" },
      { title: "1st Place, Maryland State Music Teachers Association Miriam Shields Gottlieb Memorial Piano Competition", level: "Regional", kind: "music" },
      { title: "1st Place, Washington Music Teachers Association Viola M. Hartman Piano Performance Awards", level: "Regional", kind: "music" },
      { title: "2nd Place, Thomas F. Hulbert International Piano Competition, William Knabe Piano Institute", level: "International", kind: "music" },
      { title: "Semi-Finalist, Concours Algoréa, Animath and France-ioi", level: "International", kind: "academic" },
      { title: "Quarter-Finalist, Concours Alkindi, Animath and France-ioi", level: "International", kind: "academic" },
    ],
  },
  {
    year: "2021-2022",
    items: [
      { title: "First Prize and Steinway & Sons Special Award for Best Performance of a Romantic Piece, Junior 1 Division, Kaufman Music Center International Youth Piano Competition", level: "International", kind: "music" },
      { title: "1st Place and Audience Award, 51st Annual Joseph and Goldie Feder Memorial String Competition, Washington Performing Arts", level: "Regional", kind: "music" },
      { title: "1st Place, Junior II Group, Maryland State Music Teachers Association Gertrude S. Brown Memorial Piano Concerto Competition", level: "Regional", kind: "music" },
      { title: "Semi-Finalist, Concours Algoréa, Animath and France-ioi", level: "International", kind: "academic" },
    ],
  },
  {
    year: "2019-2020",
    items: [
      { title: "1st Place, Northern Virginia Music Teachers Association Robert Spencer Piano Concerto Competition", level: "Regional", kind: "music" },
    ],
  },
];

/** Halls Julian has played. */
export const venues = [
  { name: "The Kennedy Center", city: "Washington, DC" },
  { name: "Merkin Hall", city: "New York, New York" },
  { name: "Linehan Concert Hall", city: "Baltimore, Maryland" },
  { name: "The Beethoven House", city: "Bonn, Germany" },
  { name: "Harris Theatre", city: "Fairfax, Virginia" },
];

export const activities = [
  {
    period: "Summer 2026",
    title: "Young Artists Piano Program",
    org: "Boston University Tanglewood Institute",
    description:
      "Selective summer program for pre-college pianists at Tanglewood, the Boston Symphony's summer home.",
  },
  {
    period: "2025-present",
    title: "Youth Fellow, Chamber Music Program",
    org: "National Symphony Orchestra",
    description:
      "Performance-oriented training program for serious pre-college musicians, coached by NSO players.",
  },
  {
    period: "2026",
    title: "Featured Artist, Daily Joy",
    org: "NPR",
    description:
      "Featured as a performing artist on NPR's short daily music program.",
  },
  {
    period: "Summer 2024-present",
    title: "Chief Intern",
    org: "Tacy Foundation",
    description:
      "Non-profit that supports elderly and hospitalized people through music. I perform regularly at senior assisted living centers and help coordinate other student musicians.",
  },
  {
    period: "2024-present",
    title: "Reporter",
    org: "The Saxon Scope, Langley High School",
    description:
      "I write opinion and reviews for Langley's student newspaper.",
  },
  {
    period: "2025-present",
    title: "Runner",
    org: "Cross Country, Langley High School",
    description: "Two seasons of 5K cross country.",
  },
  {
    period: "2024-present",
    title: "Member",
    org: "Latin Club, Langley High School",
    description: "Member since freshman year.",
  },
];

export const languages = [
  { name: "Chinese", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent - AP French: 5" },
  { name: "Spanish", level: "Fluent - National Spanish Examinations Gold Medal, Levels III & IV" },
];

/**
 * Performances. Add the 11-character ID from a YouTube URL. For
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
    title: "Horowitz: Variations on Themes from Bizet's Carmen",
    detail: "2026",
  },
  {
    id: "x-QbMrCqPxw",
    title: "Liszt: Spanish Rhapsody, S. 254",
    detail: "2025",
  },
  {
    id: "b-uOBh1JqaM",
    title: "Ravel: Jeux d'eau",
    detail: "2025",
  },
  {
    id: "zOJ_GQH1Jgc",
    title: "Bach, Schumann & Chopin",
    detail: "Robert Schumann Competition - 2025",
  },
  {
    id: "uzMtMw8RKIE",
    title: "Schumann: Variations on the Name “Abegg”, Op. 1",
    detail: "Thomas F. Hulbert International Piano Competition - 2025",
  },
  {
    id: "K52sT2QkNFg",
    title: "Kaufman International Youth Piano Competition, Final Round",
    detail: "First Prize & Steinway & Sons Award - 2022",
  },
];

/** Empty for now. These sections hide themselves until you add something. */
/**
 * The projects page. It isn't in the menu, the sitemap or anywhere else on the
 * site: the only way in is the "National" beside AP Scholar with Distinction in
 * Selected Honors. Keep it that way -- nothing on the home page reads this.
 */
export const projects: {
  title: string;
  status: string;
  description: string;
  why: string;
  links: { label: string; href: string }[];
}[] = [
  {
    title: "ProfeGPT",
    status: "Live",
    description:
      "A Spanish learning site: a two-way translator, full conjugation tables, the RAE dictionary, and a tutor that answers only from the site's own data. Typing \"mode: french\" or \"mode: latin\" turns the whole site into another language.",
    why: "I wanted one place for everything I kept opening five tabs for in Spanish class, and a tutor that never makes things up.",
    links: [
      { label: "Website", href: "https://profegpt.github.io/" },
      { label: "GitHub", href: "https://github.com/profegpt/profegpt.github.io" },
      { label: "Apps Script", href: "https://script.google.com/macros/s/AKfycbzQJSe8rHdR9ZDTmpEfFtOtUaHbirB9jQd0rP8GuOYqA-5MNLCDGZYBfOPirBDVybsObQ/exec" },
      { label: "TinyURL", href: "https://tinyurl.com/profegpt-spanish" },
    ],
  },
  {
    title: "Interpres",
    status: "Live",
    description:
      "A Latin site: a translator that builds its Latin from grammar rules rather than guessing, conjugation and declension tables, Whitaker's Words, and Cambridge Latin Course vocabulary by stage.",
    why: "Free translators are bad at Latin. I wanted one that parses a sentence the way I'm taught to, and shows its work.",
    links: [
      { label: "Website", href: "https://interpres-latin.github.io/" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/interpres" },
      { label: "Apps Script", href: "https://script.google.com/macros/s/AKfycbyfS0EeA5rlHcOyaDjO88BjaxAes0Zwvsh92wXzPKYgDciVoRuDa2eQXZ_eiJNECofn/exec" },
      { label: "TinyURL", href: "https://tinyurl.com/interpres-latin" },
    ],
  },
  {
    title: "Saxlan",
    status: "In progress",
    description:
      "A planner for Langley students: assignments, tasks, a calendar, courses, shared resources and chat in one place, with an arcade for the breaks in between.",
    why: "Schoolwork lives in too many apps. I wanted one screen that tells me what's due and what to do next.",
    links: [
      { label: "Website", href: "https://saxlan.github.io/" },
      { label: "GitHub", href: "https://github.com/saxlan/saxlan.github.io" },
    ],
  },
  {
    title: "Harmonizing Latin with Opera",
    status: "Upcoming research",
    description:
      "Harmonizing Latin words with a sorting mechanism built from past operas: sort how composers have already set words to music, then use that to harmonize new Latin text.",
    why: "I play music and study Latin. I want to see whether the operas that came before can tell us how Latin wants to be sung.",
    links: [],
  },
];

/** Research ideas -- on the projects page only, like everything above. */
export const researchIdeas: { title: string; description: string }[] = [
  {
    title: "Rameau's French vs. Carmen's \"French\"",
    description:
      "Rameau wrote his operas around the rhythm of spoken French. Carmen is set in Spain and sung in French, with an exotic \"Spanish\" color that's mostly invented. I want to compare how each one treats the language.",
  },
  {
    title: "Music and Racism",
    description:
      "Music has been used to fight racism, and also to justify it. I want to trace both sides and what made the difference.",
  },
  {
    title: "What Seniors Listen To, by Mood",
    description:
      "A difference-in-differences survey of seniors: does the music they choose change with their mood, and how?",
  },
];

export const writing: {
  year: string;
  title: string;
  where: string;
  href?: string;
}[] = [];
