/**
 * The projects. One entry per site, used by the gallery wheel and the boxes on
 * /projects/ and by each project's own page at /projects/<slug>/.
 *
 * Timelines come from commit history: the public repositories where there is
 * one, and the owner's own repositories otherwise, summarised without private
 * detail. Screenshots are of the public pages (or of a test account), and show
 * no other person's data.
 */
export type Shot = { src: string; alt: string };
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  status: "Live" | "In development";
  /** One short line for the gallery. */
  tagline: string;
  /** The motivation in a sentence or two, for the box. */
  summary: string;
  /** What it does in a sentence or two, for the box. */
  does: string;
  /** Page sections: Motivation, Features, Build, Next. */
  story: string[];
  features: string[];
  build: string[];
  next: string[];
  /** Dated nodes, oldest first. `date` is shown as written. */
  timeline: { date: string; label: string }[];
  /** Live site first, then the public repository when there is one. */
  links: ProjectLink[];
  shots: Shot[];
  /** Words the search also matches. */
  keywords: string;
};

const shot = (slug: string, n: number, alt: string): Shot => ({
  src: `/projects/${slug}-${n}.webp`,
  alt,
});

export const projects: Project[] = [
  {
    slug: "profegpt",
    title: "ProfeGPT",
    status: "Live",
    tagline: "Six languages, one reference to open.",
    summary:
      "Language study spreads across translators, conjugation charts and dictionaries. I wanted them together, with a tutor whose answers can be traced.",
    does: "A translator, full conjugation tables, a dictionary and a tutor for Spanish, French, Italian, German, Dutch and Portuguese.",
    story: [
      "In Spanish class I moved constantly between a translator, a conjugation chart, a dictionary and a chat window. Each answered in its own format and from its own sources.",
      "I wanted a single site where every answer comes from data I can inspect, and a tutor that states plainly when the site does not have the answer.",
    ],
    features: [
      "Each language has a two-way translator, conjugation tables for every verb, a dictionary and a chat page with a tutor. The tutor answers only from the site's own data: dictionary entries and a corpus of example sentences.",
      "Spanish came first and draws on the dictionary of the Real Academia Española. French, Italian, German, Dutch and Portuguese followed.",
    ],
    build: [
      "A plain HTML and JavaScript front end with a small server written for Google Apps Script. The same site is published on GitHub Pages and on Firebase Hosting.",
      "Example sentences come from a corpus rather than a model, and \"how do I say this\" questions are answered from a search index. The icons are drawn for the site.",
    ],
    next: [
      "Keep the tutor's answers tied to the site's own data as new languages arrive.",
      "Check the newer languages against additional sources.",
    ],
    timeline: [
      { date: "2026-09-05", label: "First version: Spanish translator, conjugator, dictionary and a tutor that needs no paid key" },
      { date: "2026-09-06", label: "French added, with a Latin section that later became Interpres" },
      { date: "2026-09-07", label: "Example sentences drawn from a corpus; translators for French and Latin" },
      { date: "2026-10-07", label: "The server is adapted to run on Google Apps Script" },
      { date: "2026-10-22", label: "Italian and a new home page; published on GitHub Pages" },
      { date: "2026-11-10", label: "German, Dutch and Portuguese added the same day" },
    ],
    links: [
      { label: "Live site", href: "https://profegpt.web.app" },
      { label: "GitHub", href: "https://github.com/profegpt/profegpt.github.io" },
    ],
    shots: [
      shot("profegpt", 1, "The ProfeGPT home page with the language picker and a French word of the day"),
      shot("profegpt", 2, "The ProfeGPT language picker with a landmark for each language"),
      shot("profegpt", 3, "A ProfeGPT French dictionary entry for ordinateur with example sentences"),
      shot("profegpt", 4, "The ProfeGPT French conjugation page with the verb parler"),
      shot("profegpt", 5, "The ProfeGPT French translator with English on the left"),
      shot("profegpt", 6, "The ProfeGPT chat page with suggested questions about French"),
      shot("profegpt", 7, "A ProfeGPT German dictionary entry for Zahnfleisch with example sentences"),
    ],
    keywords: "spanish french italian german dutch portuguese language translator conjugation dictionary tutor",
  },
  {
    slug: "interpres",
    title: "Interpres",
    status: "Live",
    tagline: "Latin tables, a dictionary and course vocabulary.",
    summary:
      "Most language tools are built around modern languages. I wanted Latin tables and a dictionary organized the way the language is taught.",
    does: "Conjugation and declension tables, a dictionary built on Whitaker's Words, grammar pages and Cambridge Latin Course vocabulary by stage.",
    story: [
      "Latin is usually an afterthought in general-purpose tools, which treat it like a modern language with a different vocabulary. I wanted a reference arranged around how Latin is actually studied: forms, principal parts and stages of a course.",
    ],
    features: [
      "You can conjugate any verb, decline any noun or adjective and look up any word with its principal parts. Grammar pages cover adjectives and other topics, and each stage of the Cambridge Latin Course has its own word list.",
      "A translator that builds Latin from grammar rules is being rebuilt and is not on the site at the moment.",
    ],
    build: [
      "It began in the ProfeGPT code and became its own site on 2026-10-22. The server runs on Google Apps Script, and the pages are published on GitHub Pages and Firebase Hosting.",
      "The dictionary is built on Whitaker's Words, the long-standing Latin parser.",
    ],
    next: [
      "Rebuild the translator from the grammar rules up.",
      "Add more grammar pages.",
    ],
    timeline: [
      { date: "2026-09-06", label: "A Latin section appears inside the ProfeGPT code" },
      { date: "2026-10-22", label: "Becomes its own site on Google Apps Script, with a new design" },
      { date: "2026-10-23", label: "Grammar pages and a page for each course stage; published on GitHub Pages" },
      { date: "2026-10-26", label: "The Apps Script page recommends the faster Firebase address" },
    ],
    links: [
      { label: "Live site", href: "https://interpres.web.app" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/interpres" },
    ],
    shots: [
      shot("interpres", 1, "The Interpres home page with its Colosseum illustration"),
      shot("interpres", 2, "The Interpres conjugation page with the indicative tables for amo"),
      shot("interpres", 3, "The Interpres declension page with the cases of puella"),
      shot("interpres", 4, "The Interpres dictionary with a lookup of canem"),
      shot("interpres", 5, "The Interpres grammar page with sheets on adjectives, participles and cases"),
    ],
    keywords: "latin dictionary conjugation declension grammar cambridge whitaker words",
  },
  {
    slug: "trajans-column",
    title: "Trajan's Column",
    status: "Live",
    tagline: "A hundred feet of carved story, up close.",
    summary:
      "The top of the real column is out of sight from the ground. I wanted to read the whole frieze, with the Latin explained as you go.",
    does: "A scroll-through site with a 3D column, the inscription, the coins, a map of the conquests and what Romans wrote about Trajan.",
    story: [
      "The column in Rome carries a story around its full height, and from the street most of it cannot be read. I wanted to follow it from base to summit, with the Latin explained alongside.",
    ],
    features: [
      "You climb a 3D model with the whole frieze wrapped around it and pause at the major scenes. Then you read the inscription, examine Trajan's coins with a magnifying glass, follow his conquests on a map and read what Roman writers said about him.",
    ],
    build: [
      "A static site with a 3D model of the column, published on GitHub Pages with a Firebase Hosting copy. The design follows the British Museum's online exhibit, and its rules are written down in a DESIGN.md file in the repository.",
    ],
    next: [
      "More scenes along the climb.",
      "More coins in the gallery.",
    ],
    timeline: [
      { date: "2026-10-27", label: "First version: the climb, the lens, the map and the Latin tools" },
      { date: "2026-10-27", label: "Rebuilt the same day on the British Museum's design, with a coin gallery and a full-screen inscription" },
      { date: "2026-10-27", label: "Plainer text, a decorated pedestal and a copy on Firebase Hosting" },
      { date: "2026-11-13", label: "Design rules recorded in DESIGN.md" },
    ],
    links: [
      { label: "Live site", href: "https://trajans-column.web.app" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/trajans-column" },
    ],
    shots: [
      shot("trajans", 1, "The opening screen of the Trajan's Column site with the column and the Roman Forum"),
      shot("trajans", 2, "The Trajan's Column overview with the column in numbers"),
      shot("trajans", 3, "A silver denarius showing the column, front and back"),
      shot("trajans", 4, "The inscription at the base of the column read with a magnifying glass"),
      shot("trajans", 5, "The portrait of Trajan with his birth, reign and death"),
      shot("trajans", 6, "The map of the empire at AD 117 with a timeline of his conquests"),
      shot("trajans", 7, "What the Romans said about Trajan, in Latin and English"),
    ],
    keywords: "rome roman history latin inscription coins map 3d",
  },
  {
    slug: "saxon-planner",
    title: "Saxon Planner",
    status: "Live",
    tagline: "One screen for what is due and what comes next.",
    summary:
      "Assignments, tests and notes were scattered across several apps. I wanted one place that shows what is due and what to do next.",
    does: "Classes, a calendar that knows the two kinds of school day, assignments, resources, chat, news, games and a card collection.",
    story: [
      "Assignments, tests and notes lived in different apps, and none of them knew which kind of school day it was. I wanted a single page that answers what is due and what to do next.",
    ],
    features: [
      "You add your classes and the planner builds a calendar for both kinds of school day. Assignments, tests, sticky-note to-dos and a shelf of resources for each class sit together, with chat for study sessions, a news tab and a games menu.",
      "The newest additions are a home page that sets assignments beside the games, and a trading card collection with fusing and trading.",
    ],
    build: [
      "A single-page web app with its own accounts. Data lives in a Google Sheet behind a Google Apps Script server, and the pages are served from Firebase Hosting.",
    ],
    next: [
      "Keep load times short as more people use it.",
    ],
    timeline: [
      { date: "2026-10-12", label: "The first game builds are added to the planner's games menu" },
      { date: "2026-11-13", label: "Chat with study sessions, shared classes and a three-part onboarding" },
      { date: "2026-11-18", label: "A new home layout, a news tab and the trading card collection" },
    ],
    links: [{ label: "Live site", href: "https://saxonplanner.web.app" }],
    shots: [
      shot("planner", 1, "The Saxon Planner home page with assignments beside the games, using a test account"),
      shot("planner", 2, "The Courses page with a card for each class"),
      shot("planner", 3, "The Calendar page in month view with the two kinds of school day marked"),
      shot("planner", 4, "The Assignments page, sorted by due date"),
      shot("planner", 5, "The Resources page with a shelf for each class"),
      shot("planner", 6, "The Tools page with the graphing calculator, GPA calculator, timer and clock"),
      shot("planner", 7, "The Games menu with a featured game and the most played"),
      shot("planner", 8, "Scrapyard Trading inside the planner with five freshly revealed cards"),
    ],
    keywords: "planner school assignments calendar to-do homework",
  },
  {
    slug: "stonks",
    title: "Stonks",
    status: "Live",
    tagline: "A paper trading game on a made-up market.",
    summary:
      "I wanted to see how prices respond to the news without real money at stake, in a game friends could play against each other.",
    does: "Two hundred invented companies move every five minutes, pushed by real news. You trade, finish quests and climb a leaderboard.",
    story: [
      "I wanted to learn how prices react to the news without risking anything, and to build something my friends could compete in. An invented market means no one can lose real money and no real company is affected.",
    ],
    features: [
      "Two hundred invented companies in twenty real sectors, plus four index funds, move every five minutes. Real news headlines become signals for the sectors they mention, and the game retells each one as an invented headline.",
      "You buy and sell, follow your portfolio, finish quests, spend tendies in the shop and climb the When Lambo leaderboard. There is a weekly showdown and a light mode.",
    ],
    build: [
      "A GitHub Action runs every five minutes, reads public news feeds, moves the market and publishes the result to a data branch. The game is a static page that reads that data, hosted on Firebase. Accounts and the leaderboard use a Google Apps Script server with a Google Sheet.",
      "The invented companies follow four real curves: a broad market index, a semiconductor index, bitcoin and crude oil.",
    ],
    next: [
      "Rename the in-game index fund.",
      "More events for the weekly showdown.",
    ],
    timeline: [
      { date: "2026-11-18 00:20 UTC", label: "First version: the invented world, the news market, the game page and the scheduled tick" },
      { date: "2026-11-18 00:43 UTC", label: "Real sector names, parody company names, options and a settings panel" },
      { date: "2026-11-18 03:13 UTC", label: "A history shaped by four real curves and stricter news matching" },
      { date: "2026-11-18 03:15 UTC", label: "Accounts move to a Google Sheet" },
      { date: "2026-11-18 23:07 UTC", label: "When Lambo leaderboard, inbox and shop" },
    ],
    links: [
      { label: "Live site", href: "https://brrr.web.app" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/stonks" },
    ],
    shots: [
      shot("stonks", 1, "The Stonks feed with the next events and a headline from the news"),
      shot("stonks", 2, "The Stonks market with index funds and watchlists"),
      shot("stonks", 3, "A Stonks company page with a chart and a position in Northrop Grumpman"),
      shot("stonks", 4, "The Stonks portfolio with three holdings"),
      shot("stonks", 5, "The Stonks quests with daily goals"),
    ],
    keywords: "trading game market stocks news paper money brrr",
  },
  {
    slug: "departed",
    title: "Departed",
    status: "Live",
    tagline: "A daily mystery on a train through time.",
    summary:
      "I like puzzles that reward careful reading. A train crossing history let me set seven deaths in seven different eras.",
    does: "Seven passengers die at seven moments in history. You date each death from its clue, then identify the murderer.",
    story: [
      "I prefer puzzles that reward close reading over quick reflexes. A train that passes through history gave me a reason to place seven deaths in seven different eras, and a daily case gives people a reason to come back.",
    ],
    features: [
      "You date each death by placing a clue on a timeline, lock in your pin and photograph the murderer's train. A rule book explains the scoring, and there is a list of trains to choose from. Orange Pip is a multiplayer mode.",
    ],
    build: [
      "A browser game published on Firebase Hosting, with a new case each day and photographs treated in a single duotone style.",
    ],
    next: [
      "More trains and more cases.",
    ],
    timeline: [
      { date: "2026-11-10", label: "First commit: a daily history timeline game in a journal style" },
      { date: "2026-11-11", label: "A new design with duotone photographs, then a second stage of evidence with four suspects" },
      { date: "2026-11-13", label: "Quick trains, each with its own picture" },
      { date: "2026-11-15", label: "Moves to its own Firebase project and address; Orange Pip multiplayer in progress" },
    ],
    links: [{ label: "Live site", href: "https://epitaph.web.app" }],
    shots: [
      shot("departed", 1, "A Departed case in progress: a clue card about the Organization of Afro-American Unity above the timeline"),
      shot("departed", 2, "A Departed clue placed on the timeline at 1309 with the pin set"),
      shot("departed", 3, "The Departed photograph stage after locking in a pin"),
      shot("departed", 4, "The Departed rule book"),
      shot("departed", 5, "The Departed list of trains at the station"),
    ],
    keywords: "mystery murder puzzle train history daily game orange pip",
  },
  {
    slug: "jamborine",
    title: "Jamborine",
    status: "Live",
    tagline: "Party games for a room of friends.",
    summary:
      "I wanted games that start from a link and run on everyone's own phone, with nothing to install.",
    does: "In Jamboree everyone builds a beat and performs it on one stage. In Mashup everyone pitches an invention made from two everyday objects, and the room votes.",
    story: [
      "Party games usually ask for an app or a shared screen. I wanted games that begin with a link and run on each person's phone.",
    ],
    features: [
      "Jamboree: everyone composes an eight-measure beat on a set of pads, then the blobs perform together on one stage. Mashup: each round shows two everyday objects, everyone pitches an invention that combines them, and the room votes. Stead, a shared pixel canvas, belongs to the same series.",
    ],
    build: [
      "Browser games on Firebase Hosting, with players joining a room by its code and a backup path for networks that block one provider.",
    ],
    next: [
      "More games in the series.",
    ],
    timeline: [
      { date: "2026-11-14", label: "First commit: a sixty-second beat-making game with four sound packs" },
      { date: "2026-11-15", label: "Becomes Jamborine: multiplayer lobby, Jamboree and Mashup with 108 cut-out pictures and credits" },
      { date: "2026-11-15", label: "A Stead link joins the title screen" },
      { date: "2026-11-16", label: "Rooms gain backup servers for networks that block one provider" },
    ],
    links: [{ label: "Live site", href: "https://jamborine.web.app" }],
    shots: [
      shot("jamborine", 1, "The Jamborine home page with its Jamboree, Mashup and Stead buttons"),
      shot("jamborine", 2, "A Jamborine lobby with four players and a room code"),
      shot("jamborine", 3, "A Mashup round asking for a pitch that combines a trumpet and a lollipop"),
      shot("jamborine", 4, "A Mashup scoreboard between rounds"),
      shot("jamborine", 5, "The Jamboree beat pads"),
      shot("jamborine", 6, "The Jamboree stage with a blob performing"),
      shot("jamborine", 7, "How to play Jamboree and Mashup"),
    ],
    keywords: "party games music beat mashup friends room",
  },
  {
    slug: "stead",
    title: "Stead",
    status: "Live",
    tagline: "One shared canvas, one pixel at a time.",
    summary:
      "I wanted to see what happens when strangers share a canvas and each gets a single pixel every half hour.",
    does: "A shared pixel canvas where each player places one pixel every 30 minutes. A new canvas starts every 72 hours, with a chat beside it.",
    story: [
      "A canvas where everyone has one pixel per half hour rewards patience and coordination. I wanted to watch what people make under that limit.",
    ],
    features: [
      "A shared pixel canvas. Each player can place one pixel every 30 minutes, a new canvas starts every 72 hours, and a chat sits beside the canvas.",
    ],
    build: [
      "A browser app on Firebase Hosting, part of the Jamborine series.",
    ],
    next: [
      "A gallery of past canvases.",
    ],
    timeline: [
      { date: "2026-11-15", label: "First commit: a shared pixel canvas with rules, a room and a client" },
      { date: "2026-11-15", label: "Linked from the Jamborine title screen" },
      { date: "2026-11-16", label: "Moves into its own repository" },
    ],
    links: [{ label: "Live site", href: "https://stead.web.app" }],
    shots: [
      shot("stead", 1, "The Stead shared pixel canvas with its color palette"),
      shot("stead", 2, "The Stead canvas with a pixel chosen and the Place button ready"),
      shot("stead", 3, "The Stead canvas on a phone"),
    ],
    keywords: "pixel canvas shared place chat jamborine",
  },
  {
    slug: "scrapyard",
    title: "Scrapyard",
    status: "In development",
    tagline: "Dig up parts, fuse them, enter the Expo.",
    summary:
      "I wanted a collecting game in which combining parts matters more than owning them.",
    does: "Your yard digs up parts, you fuse them into inventions, and a daily Expo decides whose invention is best. It is deployed but not finished.",
    story: [
      "I like collecting games where combining things matters more than owning them. Parts that fuse into new inventions came from that idea.",
    ],
    features: [
      "Your yard digs up parts. You fuse two parts into an invention and enter it in a daily Expo, where players decide whose invention is best. The game is deployed but not finished. The cards can also be opened, fused and traded inside Saxon Planner as Scrapyard Trading.",
    ],
    build: [
      "A browser game with a 3D yard, published on Firebase Hosting, with a server on Cloudflare and a relay for restricted networks. The part pictures are cut-outs from Wikimedia Commons.",
    ],
    next: [
      "Finish the first full version and the daily Expo.",
    ],
    timeline: [
      { date: "2026-11-15", label: "First commit: a card game with a 3D yard and photo cut-out cards" },
      { date: "2026-11-15", label: "Accounts, a parts market and the first deployment" },
      { date: "2026-11-16", label: "A builder hub, an expo hall and a baked yard for weaker devices" },
      { date: "2026-11-18", label: "Every revealed card can be turned over to its back" },
    ],
    links: [{ label: "Live site", href: "https://scrapyard-expo.web.app" }],
    shots: [
      shot("scrapyard", 1, "The Scrapyard yard from above with the welcome tour on a new account"),
      shot("scrapyard", 2, "Five face-down cards in Scrapyard Trading before a pack is opened"),
      shot("scrapyard", 3, "Five cards revealed from a pack"),
      shot("scrapyard", 4, "The Scrapyard Trading album with silhouettes for parts not found yet"),
      shot("scrapyard", 5, "The fuse screen with a base slot and an added slot"),
      shot("scrapyard", 6, "The Scrapyard account screen with the avatar picker"),
    ],
    keywords: "junkyard cards fuse inventions expo game collecting",
  },
  {
    slug: "mazurka",
    title: "Mazurka",
    status: "Live",
    tagline: "Write music and hear the harmony.",
    summary:
      "As a pianist I wanted a notation tool where the score itself is the interface.",
    does: "A notation and composition studio in the browser. Harmonizing proposes changes instead of overwriting what you wrote.",
    story: [
      "Notation programs often route everything through menus. As a pianist I wanted the score to be the interface, with harmony help that suggests changes instead of replacing what I wrote.",
    ],
    features: [
      "A notation and composition studio in the browser. You write on the staff, hear it play and ask the harmonizer for candidates, which you accept or reject. It is free to open, and projects stay in your browser.",
    ],
    build: [
      "A browser app published on Firebase Hosting. Projects are stored in the browser.",
    ],
    next: [
      "More harmonizing styles.",
    ],
    timeline: [
      { date: "2026-11-15", label: "First commit as Nocturne: notation with a Chopin-style harmonizer, import and export" },
      { date: "2026-11-15", label: "Renamed Polonaise and then Mazurka, with saved projects migrating" },
      { date: "2026-11-16", label: "A cover page is added and the studio moves to its own page" },
    ],
    links: [{ label: "Live site", href: "https://mazurka.web.app" }],
    shots: [
      shot("mazurka", 1, "The Mazurka home page: Write music, hear the harmony"),
      shot("mazurka", 2, "The Mazurka features: engraved notation, chords and a harmonizer"),
      shot("mazurka", 3, "Mazurka in three steps: write or open, harmonize, accept and share"),
      shot("mazurka", 4, "The Mazurka studio with a Chopin nocturne melody on the staff"),
      shot("mazurka", 5, "The Mazurka harmonizer panel with its three styles and textures"),
    ],
    keywords: "music notation composition harmony piano score studio",
  },
  {
    slug: "ambicant",
    title: "Ambicant",
    status: "Live",
    tagline: "Typing, reimagined.",
    summary:
      "I wanted text to arrive the way typing does, with natural pauses, and a way to paste only what changed.",
    does: "A set of Chrome extensions. Candid and Ambicant type text at a chosen speed with human touches, and Poignant pastes only the parts that changed.",
    story: [
      "Pasted text arrives all at once, and typed text does not. I wanted extensions that type at a speed I choose, with pauses and the occasional correction, and one that pastes only what changed.",
    ],
    features: [
      "Candid (free) and Ambicant (paid) type text at a chosen speed with human touches such as pauses and typos. Poignant (free) pastes only the parts of a text that changed. Ambivalence, the first one, is retired.",
    ],
    build: [
      "Chrome extensions, with a website and accounts on Firebase Hosting.",
    ],
    next: [
      "More small tools in the same family.",
    ],
    timeline: [
      { date: "2026-11-04", label: "Candid, the first free extension, is created" },
      { date: "2026-11-05", label: "Ambicant and Poignant are created and packaged for download" },
      { date: "2026-11-08", label: "Accounts and a license server are added for the paid extension" },
    ],
    links: [{ label: "Live site", href: "https://ambicant.web.app" }],
    shots: [
      shot("ambicant", 1, "The Ambicant home page with the extension popup: Typing, reimagined"),
      shot("ambicant", 2, "The Candid, Ambicant and Poignant popups side by side, the typing rings charged"),
      shot("ambicant", 3, "The Touches tabs of Candid and Ambicant with their human typing options"),
      shot("ambicant", 4, "The Poignant popup switched on beside the Candid popup"),
      shot("ambicant", 5, "The install steps on the Ambicant site"),
    ],
    keywords: "chrome extension typing candid poignant paste",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
