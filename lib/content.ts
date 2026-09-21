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
  tagline:
    "Award-winning pianist, National Symphony Orchestra Youth Chamber Fellow, passionate about languages and history!",
  location: "Great Falls, Virginia",
  school: "Langley High School, Class of 2028",
  // The site's own address. Search engines need the absolute URL to build a
  // canonical link and a sitemap, so everything that needs one reads it here.
  siteUrl: "https://yuzhe-chen.github.io",
  metaDescription:
    "Yuzhe (Julian) Chen, pianist and student at Langley High School in Great Falls, Virginia. Competition awards, National Symphony Orchestra chamber program, and service through music.",
  // One portrait per theme, swapped in CSS the same way the wallpaper is.
  // Set either to null to fall back to the monogram.
  photoLight: "/portrait-light.jpg" as string | null, // cropped from MVC_4948.jpg
  photoDark: "/portrait-dark.jpg" as string | null, // cropped from IMG_6103.jpg
  // Shown in full in the Contact section, so it stays readable and copyable
  // even where a mailto: link does nothing.
  email: "julianchen2011@gmail.com",
};

/** Nav and hero links. Email is deliberately not here. See Contact. */
export const links = [
  { label: "YouTube", href: "https://www.youtube.com/@julianchenmusic" },
  // { label: "Résumé (PDF)", href: "/resume.pdf" },
];

/** Julian's own words, put into first person. */
export const about = [
  "At fourteen, I'm a linguist, a musician, a globetrotter, and a booknerd. Heading into my junior year at Langley High School, I report for the Saxon Scope and am a dedicated member of the Latin club. I speak fluent Chinese, English, French, and Spanish.",
  "I serve as chief intern of the Tacy Foundation, a non-profit dedicated to helping my elderly community through the power of music, where I regularly perform at senior assisted living centers. It has taught me more about what a performance is for than any competition has.",
  "I've performed at the Kennedy Center, Merkin Hall, the Linehan Concert Hall, the Beethoven House, and Harris Theatre. I've been featured on NPR's Daily Joy program, and I'm an NSO Youth Fellow in the Chamber Program.",
  "I spend my free time playing tennis, hiking, and taking photos. My favorite museums are the Smithsonian National Museum of Natural History, the Museo Nacional del Prado, and the Louvre, and the artists I keep coming back to are Monet and Schumann.",
];

/**
 * The 6-8 that a reader should see first. Everything else lives in the full
 * list. Years are calendar years, matching `awardRecord`.
 */
export const honors = [
  {
    year: "2026",
    title: "3rd Place, National Finals, Junior Piano Performance Competition",
    org: "Music Teachers National Association",
    note: "Southern Division Winner the same year, Virginia State Winner in 2025, and Maryland State Winner in 2023 and 2024, advancing from the 2024 Maryland State win to Eastern Division Alternate in 2025.",
  },
  {
    year: "2023",
    title: "Grand Prix, II International Competition of Pianists Named After Maria and Nataliya Yeshchenko",
    org: "Kharkiv I.P. Kotlyarevsky National University of Arts, Ukraine",
    note: "The competition's single top award, given to one pianist across all six age groups, from under-10 to 25 and older. About 50 pianists from seven countries took part.",
  },
  {
    year: "2025",
    title: "2nd Prize, Division 3, Thomas F. Hulbert International Piano Competition",
    org: "Thomas F. Hulbert Music Institute",
    note: "Also 2nd Prize in the same division in 2023.",
  },
  {
    year: "2026",
    title: "Finalist, From the Top",
    org: "From the Top",
    note: "",
  },
  {
    year: "2026",
    title: "Featured Artist, Daily Joy",
    org: "NPR",
    note: "",
  },
  {
    year: "2025-present",
    title: "Youth Fellow, Chamber Music Program",
    org: "National Symphony Orchestra",
    note: "A performance-oriented training program for serious pre-college musicians.",
  },
  {
    year: "Summer 2026",
    title: "Young Artists Piano Program",
    org: "Boston University Tanglewood Institute",
    note: "",
  },
  {
    year: "2026",
    title: "1st Place, Piano Competition",
    org: "Friday Morning Music Club",
    note: "",
  },
  {
    year: "2022",
    title:
      "First Prize & Steinway & Sons Special Award for Best Performance of a Romantic Piece",
    org: "Kaufman Music Center International Youth Piano Competition",
    note: "Junior 1 Division.",
  },
  {
    year: "2026",
    title: "1st Place, Advanced Group, Gertrude S. Brown Memorial Piano Concerto Competition",
    org: "Maryland State Music Teachers Association",
    note: "",
  },
  {
    year: "2026",
    title: "AP Scholar with Distinction",
    org: "College Board",
    note: "Also a School Recognition Award from the College Board National Recognition Program.",
  },
  {
    year: "2026",
    title: "Gold Medal, Level IV, National Spanish Examinations",
    org: "American Association of Teachers of Spanish and Portuguese",
    note: "Gold Medal at Level III in 2025.",
  },
];

/**
 * The complete record, grouped by calendar year, using each competition's
 * official name rather than the abbreviation people say out loud.
 *
 * Academic awards are filed by the year they were conferred, not the school
 * year they were earned in: AP Scholar lands on the July score report, the
 * College Board National Recognition Program awards were announced June 23,
 * and National Spanish Examinations results post in late April.
 *
 * Programs Julian was accepted to rather than awards he won -- the NSO
 * fellowship, Tanglewood -- live in `activities`, not here.
 */
export const awardRecord = [
  {
    year: "2026",
    items: [
      { title: "3rd Place, National Finals, Music Teachers National Association Junior Piano Performance Competition", level: "National" },
      { title: "Winner, Southern Division, Music Teachers National Association Junior Piano Performance Competition", level: "Regional" },
      { title: "Finalist, From the Top", level: "National" },
      { title: "1st Place, Friday Morning Music Club Piano Competition", level: "Regional" },
      { title: "1st Place, Young Artist Award Competition, City of Gaithersburg and the Kentlands Community Foundation", level: "Regional" },
      { title: "1st Place, Advanced Group, Maryland State Music Teachers Association Gertrude S. Brown Memorial Piano Concerto Competition", level: "State" },
      { title: "2nd Place, James C. Macdonald Arts Scholarship Competition, McLean Community Center", level: "Regional" },
      { title: "Distinguished Theory Award, Maryland State Music Teachers Association Music Theory Testing Program", level: "State" },
      { title: "AP Scholar with Distinction, College Board", level: "National" },
      { title: "Score of 5, AP French Language and Culture, College Board", level: "National" },
      { title: "School Recognition Award, College Board National Recognition Program", level: "National" },
      { title: "Gold Medal, Level IV, National Spanish Examinations, American Association of Teachers of Spanish and Portuguese", level: "National" },
      { title: "Academic Excellence in Honors Chemistry, Langley High School", level: "School" },
    ],
  },
  {
    year: "2025",
    items: [
      { title: "2nd Place, Division 3, Thomas F. Hulbert International Piano Competition, William Knabe Piano Institute", level: "International" },
      { title: "Alternate, Eastern Division, Music Teachers National Association Junior Piano Performance Competition", level: "Regional" },
      { title: "Winner, Virginia State, Music Teachers National Association Junior Piano Performance Competition", level: "State" },
      { title: "1st Place, High School Division, Maryland State Music Teachers Association Elizabeth R. Davis Memorial Piano Competition", level: "Regional" },
      { title: "1st Place, Montgomery County Music Teachers Association Evelyn Swarthout and Patrick Hayes Competition for Piano", level: "Regional" },
      { title: "1st Place, Maryland State Music Teachers Association Miriam Shields Gottlieb Memorial Piano Competition", level: "Regional" },
      { title: "1st Place, Bland Music Scholarship Competition, Lions of Virginia Bland Music Scholarship Foundation", level: "State" },
      { title: "Advanced and Senior Theory Awards, Maryland State Music Teachers Association Music Theory Testing Program", level: "State" },
      { title: "Gold Medal, Level III, National Spanish Examinations, American Association of Teachers of Spanish and Portuguese", level: "National" },
      { title: "Academic Excellence in Spanish III, Langley High School", level: "School" },
    ],
  },
  {
    year: "2024",
    items: [
      { title: "1st Prize, Talents International Piano Competition Online", level: "International" },
      { title: "Winner, Maryland State, Music Teachers National Association Junior Piano Performance Competition", level: "State" },
      { title: "1st Place, Maryland State Music Teachers Association Doris Chase Sonata Competition", level: "Regional" },
      { title: "1st Place, Intermediate Group, Maryland State Music Teachers Association Gertrude S. Brown Memorial Piano Concerto Competition", level: "State" },
      { title: "1st Place, Piano Solo, Maryland State Music Teachers Association Spring Festival", level: "State" },
      { title: "All-A Honor Roll, Cooper Middle School", level: "School" },
    ],
  },
  {
    year: "2023",
    items: [
      { title: "Grand Prix, Age Category 2 (11-14), II International Competition of Pianists Named After Maria and Nataliya Yeshchenko", level: "International" },
      { title: "2nd Place, Division 3, Thomas F. Hulbert International Piano Competition, William Knabe Piano Institute", level: "International" },
      { title: "Winner, Maryland State, Music Teachers National Association Junior Piano Performance Competition", level: "State" },
      { title: "1st Place, Maryland State Music Teachers Association Miriam Shields Gottlieb Memorial Piano Competition", level: "Regional" },
      { title: "1st Place, Washington Music Teachers Association Viola M. Hartman Piano Performance Awards", level: "Regional" },
      { title: "Semi-Finalist, Concours Algoréa, Animath and France-ioi", level: "International" },
      { title: "Quarter-Finalist, Concours Alkindi, Animath and France-ioi", level: "International" },
    ],
  },
  {
    year: "2022",
    items: [
      { title: "First Prize and Steinway & Sons Special Award for Best Performance of a Romantic Piece, Junior 1 Division, Kaufman Music Center International Youth Piano Competition", level: "International" },
      { title: "1st Place, Junior Piano Division, Asian American Music Society International Music Competition", level: "International" },
      { title: "1st Place and Audience Award, Beginner Violin, 51st Annual Joseph and Goldie Feder Memorial String Competition, Washington Performing Arts", level: "Regional" },
      { title: "1st Place, Junior II Group, Maryland State Music Teachers Association Gertrude S. Brown Memorial Piano Concerto Competition", level: "State" },
      { title: "1st Place, Piano Solo, Maryland State Music Teachers Association Spring Festival", level: "State" },
      { title: "Semi-Finalist, Concours Algoréa, Animath and France-ioi", level: "International" },
    ],
  },
  {
    year: "2020",
    items: [
      { title: "1st Place, Northern Virginia Music Teachers Association Robert Spencer Piano Concerto Competition", level: "Regional" },
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
  {
    period: "2024-present",
    title: "Outreach Subteam",
    org: "Robotics Club, Langley High School",
    description:
      "I run outreach to local schools and younger students, introducing them to robotics.",
  },
];

export const languages = [
  { name: "Chinese", level: "Fluent" },
  { name: "English", level: "Fluent" },
  { name: "French", level: "Fluent · AP French Language and Culture: 5" },
  { name: "Spanish", level: "Fluent · National Spanish Examinations Gold Medal, Levels III & IV" },
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
    detail: "Robert Schumann Competition · 2025",
  },
  {
    id: "uzMtMw8RKIE",
    title: "Schumann: Variations on the Name “Abegg”, Op. 1",
    detail: "Thomas F. Hulbert International Piano Competition · 2025",
  },
  {
    id: "K52sT2QkNFg",
    title: "Kaufman International Youth Piano Competition, Final Round",
    detail: "First Prize & Steinway & Sons Award · 2022",
  },
];

/** Empty for now. These sections hide themselves until you add something. */
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
