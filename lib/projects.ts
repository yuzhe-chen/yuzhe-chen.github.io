/**
 * The projects. One entry per site, used by the gallery and the boxes on
 * /projects/ and by each project's own page at /projects/<slug>/.
 *
 * Timelines come from the public commit history of the public repositories. A
 * project whose code is private has no timeline, and its page says so.
 * Screenshots are of the public pages only, in public/projects/, and show no
 * other person's data.
 */
export type Shot = { src: string; alt: string };
export type ProjectLink = { label: string; href: string };

export type Project = {
  slug: string;
  title: string;
  status: "Live" | "In development";
  /** One short line for the gallery. */
  tagline: string;
  /** Why it exists, two sentences at most, for the box. */
  motivation: string;
  /** What it does, two sentences at most, for the box. */
  does: string;
  /** The project's own page. */
  why: string[];
  what: string[];
  built: string[];
  next: string[];
  /** Real commit dates from the public repository, oldest first. */
  timeline: { date: string; text: string }[];
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
    tagline: "Six languages and one place to look things up.",
    motivation:
      "I kept opening five tabs for everything in Spanish class, and I wanted a tutor that never makes things up.",
    does: "A translator, full conjugation tables, a dictionary and a tutor for Spanish, French, Italian, German, Dutch and Portuguese.",
    why: [
      "In Spanish class I was always switching between a translator, a conjugation chart, a dictionary and a chat window. Each one answered in a different style and sometimes in a different way.",
      "I wanted one site where every answer comes from data I can check, and a tutor that says so when it does not know.",
    ],
    what: [
      "For each language there is a two-way translator, conjugation tables for every verb, a dictionary and a chat page with a tutor. The tutor answers only from the site's own data, such as the dictionary entries and a corpus of example sentences.",
      "Spanish came first and uses the dictionary of the Real Academia Española. French, Italian, German, Dutch and Portuguese followed.",
    ],
    built: [
      "A plain HTML and JavaScript front end, with a small server written for Google Apps Script. The same site is published on GitHub Pages and on Firebase Hosting.",
      "Example sentences come from a corpus instead of a model, and \"how do I say this\" questions are answered from a search index. The icons are drawn for the site rather than borrowed from emoji.",
    ],
    next: [
      "Keep the tutor's answers tied to the site's own data as new languages are added.",
      "Check the newest languages against more sources.",
    ],
    timeline: [
      { date: "2026-09-05", text: "First commit: translator, conjugator, Spanish dictionary and chat. A tutor that works without any paid key the same day." },
      { date: "2026-09-06", text: "Icons are drawn for the site instead of using emoji and text symbols." },
      { date: "2026-09-07", text: "Example sentences come from a corpus, \"to say in Spanish\" answers come from the search index, and French and Latin get translators." },
      { date: "2026-10-07", text: "The server is reworked to run on Google Apps Script." },
      { date: "2026-11-05", text: "The home cards animate: the food fades in after the landmark is built." },
      { date: "2026-11-10", text: "Dutch is added with its own conjugator, dictionary source, grammar notes and tutor pack." },
    ],
    links: [
      { label: "Live site", href: "https://profegpt.web.app" },
      { label: "GitHub", href: "https://github.com/profegpt/profegpt.github.io" },
    ],
    shots: [
      shot("profegpt", 1, "The ProfeGPT home page with the language picker and a French to Spanish lookup"),
      shot("profegpt", 2, "The ProfeGPT language picker with a landmark for each language"),
      shot("profegpt", 3, "A ProfeGPT French dictionary entry for ordinateur with example sentences"),
    ],
    keywords: "spanish french italian german dutch portuguese language translator conjugation dictionary tutor",
  },
  {
    slug: "interpres",
    title: "Interpres",
    status: "Live",
    tagline: "Latin tables, a dictionary and the Cambridge course words.",
    motivation:
      "Free tools are bad at Latin, so I built the tables and the dictionary I wanted to use for homework.",
    does: "Conjugation and declension tables, a Latin dictionary built on Whitaker's Words, grammar pages and Cambridge Latin Course vocabulary by stage.",
    why: [
      "Free translators handle Latin badly, and the tables I found were scattered across old pages. I wanted one clean place that matches how Latin is taught in class.",
    ],
    what: [
      "You can conjugate any verb, decline any noun or adjective and look up any word with its principal parts. Grammar pages cover adjectives and other topics, and each stage of the Cambridge Latin Course has its own word list.",
      "The translator that builds Latin from grammar rules was taken out so it could be rebuilt properly. It is not on the site right now.",
    ],
    built: [
      "It started from the ProfeGPT code and split into its own site on 2026-10-22. The server runs on Google Apps Script, and the pages are published on GitHub Pages and Firebase Hosting.",
      "The dictionary builds on Whitaker's Words, the long-running Latin parser.",
    ],
    next: [
      "Rebuild the translator from the ground up, starting from the grammar rules.",
      "Add more grammar pages.",
    ],
    timeline: [
      { date: "2026-10-22", text: "Becomes its own site: runs entirely on Google Apps Script, with a new look and the translator removed to be rebuilt." },
      { date: "2026-10-23", text: "Grammar pages, a page for each stage and a menu linking the sibling sites. Published on GitHub Pages." },
      { date: "2026-10-26", text: "The Apps Script page gets a popup that recommends the faster web.app version." },
      { date: "2026-11-07", text: "The favicon becomes a helmet." },
      { date: "2026-11-17", text: "An anonymous visit counter is added to both builds." },
    ],
    links: [
      { label: "Live site", href: "https://interpres.web.app" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/interpres" },
    ],
    shots: [
      shot("interpres", 1, "The Interpres home page with its Colosseum illustration"),
      shot("interpres", 2, "The Interpres conjugation page showing the verb amo"),
      shot("interpres", 3, "The Interpres declension page showing the noun puella"),
      shot("interpres", 4, "The Interpres dictionary with its search box"),
    ],
    keywords: "latin dictionary conjugation declension grammar cambridge whitaker words",
  },
  {
    slug: "trajans-column",
    title: "Trajan's Column",
    status: "Live",
    tagline: "Climb a hundred feet of carved story.",
    motivation:
      "You cannot see the top of the real column from the ground, so I built a way to climb it.",
    does: "A scroll-through site with a 3D column, the inscription, the coins, a map of the conquests and what Romans wrote about Trajan.",
    why: [
      "The column in Rome has a story wrapped around it for a hundred feet, and from the ground you cannot read most of it. I wanted to see it close up, all the way to the top, with the Latin explained on the way.",
    ],
    what: [
      "You climb a 3D model with the whole frieze wrapped around it and stop at the big scenes. Then you read the inscription, look at Trajan's coins with a magnifying glass, follow his conquests on a map and read what the Romans themselves wrote about him.",
    ],
    built: [
      "A static site with a 3D model of the column, published on GitHub Pages with a Firebase Hosting copy. The design follows the British Museum's online exhibit, and the design rules are written down in a DESIGN.md file in the repository.",
    ],
    next: [
      "More scenes along the climb.",
      "More coins in the gallery.",
    ],
    timeline: [
      { date: "2026-10-27", text: "First commit: the climb, the lens, the map and the Latin tools." },
      { date: "2026-10-27", text: "Rebuilt on the British Museum's design, with a full-screen inscription, a coin gallery and a new map." },
      { date: "2026-10-27", text: "Text rewritten in a plainer voice, a detailed statue, and a Firebase Hosting copy." },
      { date: "2026-10-27", text: "Decorated pedestal and capital, a smoother inscription, and a tour with next buttons." },
      { date: "2026-11-13", text: "The \"fake historical\" styling is removed and the design rules move into DESIGN.md." },
    ],
    links: [
      { label: "Live site", href: "https://trajans-column.web.app" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/trajans-column" },
    ],
    shots: [
      shot("trajans", 1, "The opening screen of the Trajan's Column site with the column and the Roman Forum"),
      shot("trajans", 2, "A slider that grows Trajan's full name through his reign next to a statue"),
      shot("trajans", 3, "A silver denarius showing the column, front and back"),
      shot("trajans", 4, "The inscription at the base of the column read with a magnifying glass"),
    ],
    keywords: "rome roman history latin inscription coins map 3d",
  },
  {
    slug: "saxon-planner",
    title: "Saxon Planner",
    status: "Live",
    tagline: "One screen for what is due and what to do next.",
    motivation:
      "Schoolwork lives in too many apps, and I wanted one screen that answers what is due.",
    does: "Classes, a calendar that knows the two kinds of school day, assignments, to-dos and study resources. This is the version without the games.",
    why: [
      "Assignments, tests and notes were spread across a handful of apps, and none of them knew which kind of school day it was. I wanted a single page that tells me what is due and what to do next.",
    ],
    what: [
      "You add your classes, and the planner builds a calendar for the two kinds of school day. Assignments, tests, sticky-note to-dos and a shelf of study resources for each class sit in the same place.",
      "This copy leaves out the games that the main version has.",
    ],
    built: [
      "A single-page web app with its own account system. The data lives in a Google Sheet behind a Google Apps Script server, and the pages are served from Firebase Hosting.",
    ],
    next: [
      "Keep the load times short as more people use it.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://lectern.web.app" }],
    shots: [
      shot("planner", 1, "The Saxon Planner log in screen next to its backpack and globe illustration"),
      shot("planner", 2, "The Saxon Planner log in screen on a phone"),
    ],
    keywords: "planner school assignments calendar to-do homework",
  },
  {
    slug: "stonks",
    title: "Stonks",
    status: "Live",
    tagline: "A paper trading game with a made-up market.",
    motivation:
      "I wanted to see how a market reacts to the news without risking real money, in a game friends could compete in.",
    does: "Two hundred invented companies move every five minutes, pushed by real news. You trade, finish quests and climb a leaderboard.",
    why: [
      "I wanted to learn how prices react to the news without risking anything, and to build something my friends could compete in. A made-up market means nobody can lose real money and nobody can profit from real companies.",
    ],
    what: [
      "Two hundred invented companies in twenty real sectors, plus four index funds, move every five minutes. Real news headlines are turned into signals for the sectors they mention, and the game retells each one as a made-up headline.",
      "You buy and sell, watch your portfolio, finish quests, spend tendies in the shop and climb the When Lambo leaderboard. There is a weekly showdown and a light mode.",
    ],
    built: [
      "A GitHub Action runs every five minutes, reads public news feeds, moves the market and publishes the result to a data branch. The game is a static page that reads that data, hosted on Firebase. Accounts and the leaderboard use a Google Apps Script server with a Google Sheet.",
      "The history of the invented companies follows four real curves: a broad market index, a semiconductor index, bitcoin and crude oil.",
    ],
    next: [
      "Rename the in-game index fund.",
      "More events for the weekly showdown.",
    ],
    timeline: [
      { date: "2026-11-18", text: "First commit: the world, the news market, the game page and the scheduled tick." },
      { date: "2026-11-18", text: "Real sector names, parody company names, options and a settings panel." },
      { date: "2026-11-18", text: "A history shaped by four real curves, stricter news matching and a shop." },
      { date: "2026-11-18", text: "Accounts and a leaderboard, with a Google Sheet as storage." },
      { date: "2026-11-18", text: "When Lambo: a podium, weekly and friends boards, an inbox and a share button." },
    ],
    links: [
      { label: "Live site", href: "https://brrr.web.app" },
      { label: "GitHub", href: "https://github.com/yuzhe-chen/stonks" },
    ],
    shots: [
      shot("stonks", 1, "The Stonks feed with the net worth, upcoming events and the ticker of invented companies"),
      shot("stonks", 2, "The Stonks market list of companies and sectors"),
      shot("stonks", 3, "The Stonks portfolio page"),
      shot("stonks", 4, "The Stonks quests page"),
    ],
    keywords: "trading game market stocks news paper money brrr",
  },
  {
    slug: "departed",
    title: "Departed",
    status: "Live",
    tagline: "A daily murder mystery on a train through time.",
    motivation:
      "I wanted a puzzle that rewards reading the clues, with one new case every day.",
    does: "Seven passengers are killed at seven moments in history. You date each death from its clue, then find the murderer.",
    why: [
      "I like puzzles that reward careful reading more than quick reflexes. A train that passes through history gave me a reason to put seven deaths in seven different eras.",
    ],
    what: [
      "A daily mystery on a train through time. You date each death from its clue, then work out who the murderer is. There is also Orange Pip, a multiplayer mode.",
    ],
    built: [
      "A browser game published on Firebase Hosting, with a new case generated each day.",
    ],
    next: [
      "More trains and more cases.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://epitaph.web.app" }],
    shots: [
      shot("departed", 1, "The Departed start screen with a red train crossing a stone viaduct"),
      shot("departed", 2, "The Departed rule book"),
      shot("departed", 3, "The Departed list of trains at the station"),
    ],
    keywords: "mystery murder puzzle train history daily game orange pip",
  },
  {
    slug: "jamborine",
    title: "Jamborine",
    status: "Live",
    tagline: "Party games for a room of friends.",
    motivation:
      "I wanted games that work with a room of people on their own phones, with nothing to install.",
    does: "In Jamboree everyone builds a beat and performs it on one stage. In Mashup everyone pitches an invention made from two everyday objects, and the room votes.",
    why: [
      "Most party games need an app or a shared screen setup. I wanted games that start from a link and work on everyone's own phone.",
    ],
    what: [
      "Jamboree: everyone builds a beat and performs it together on one stage. Mashup: everyone pitches an invention made from two everyday objects, and the room votes for the best pitch. Stead, a shared pixel canvas, is part of the same series.",
    ],
    built: [
      "Browser games on Firebase Hosting, with players joining a room by its code.",
    ],
    next: [
      "More games in the series.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://jamborine.web.app" }],
    shots: [
      shot("jamborine", 1, "The Jamborine home page with its Jamboree, Mashup and Stead buttons"),
      shot("jamborine", 2, "How to play Jamboree and Mashup"),
      shot("jamborine", 3, "The Jamborine credits page listing the photographs used in Mashup"),
    ],
    keywords: "party games music beat mashup friends room",
  },
  {
    slug: "stead",
    title: "Stead",
    status: "Live",
    tagline: "One shared canvas and one pixel at a time.",
    motivation:
      "I wanted to see what strangers make when each of them gets only one pixel every half hour.",
    does: "A shared pixel canvas where each player places one pixel every 30 minutes. A new canvas starts every 72 hours, with a chat beside it.",
    why: [
      "A canvas where everyone gets one pixel every half hour forces people to cooperate or to compete slowly. I wanted to watch what that produces.",
    ],
    what: [
      "A shared pixel canvas. Each player can place one pixel every 30 minutes, a new canvas starts every 72 hours, and a chat sits beside the canvas.",
    ],
    built: [
      "A browser app on Firebase Hosting. It is part of the Jamborine series.",
    ],
    next: [
      "A gallery of past canvases.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://stead.web.app" }],
    shots: [
      shot("stead", 1, "The Stead shared pixel canvas with its color palette"),
      shot("stead", 2, "The Stead canvas on a phone"),
    ],
    keywords: "pixel canvas shared place chat jamborine",
  },
  {
    slug: "scrapyard",
    title: "Scrapyard",
    status: "In development",
    tagline: "Dig up parts, fuse them, enter the Expo.",
    motivation:
      "I wanted a collecting game where the best part of the collection is inventing something new.",
    does: "Your yard digs up parts, you fuse them into inventions, and a daily Expo decides whose invention is best. It is deployed but not finished.",
    why: [
      "I like collecting games where combining things matters more than owning them. Parts that fuse into new inventions came from that.",
    ],
    what: [
      "Your yard digs up parts. You fuse two parts into an invention, and a daily Expo decides whose invention is best. The game is deployed but not finished.",
    ],
    built: [
      "A browser game with a 3D yard, published on Firebase Hosting.",
    ],
    next: [
      "Finish the first full version and the daily Expo.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://scrapyard-expo.web.app" }],
    shots: [
      shot("scrapyard", 1, "The Scrapyard account screen with the avatar picker"),
      shot("scrapyard", 2, "The Scrapyard sign in screen"),
      shot("scrapyard", 3, "The Scrapyard account screen on a phone"),
    ],
    keywords: "junkyard cards fuse inventions expo game collecting",
  },
  {
    slug: "mazurka",
    title: "Mazurka",
    status: "Live",
    tagline: "Write music and hear the harmony.",
    motivation:
      "I play piano and wanted a notation tool where the score itself is the interface.",
    does: "A notation and composition studio in the browser. Harmonizing proposes changes instead of overwriting what you wrote.",
    why: [
      "Notation programs make you work through menus. I play piano, and I wanted the score to be the interface, with harmony help that suggests changes instead of replacing what I wrote.",
    ],
    what: [
      "A music notation and composition studio in the browser. The score is the interface, and harmonizing is a tool that proposes changes rather than overwriting what you wrote. It is free to open, and your projects stay in your browser.",
    ],
    built: [
      "A browser app published on Firebase Hosting. Projects are stored in the browser.",
    ],
    next: [
      "More harmonizing styles.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://mazurka.web.app" }],
    shots: [
      shot("mazurka", 1, "The Mazurka home page: Write music, hear the harmony"),
      shot("mazurka", 2, "The Mazurka features: engraved notation, chords and a harmonizer"),
      shot("mazurka", 3, "Mazurka in three steps: write or open, harmonize, accept and share"),
      shot("mazurka", 4, "The Mazurka studio"),
    ],
    keywords: "music notation composition harmony piano score studio",
  },
  {
    slug: "ambicant",
    title: "Ambicant",
    status: "Live",
    tagline: "Typing, reimagined.",
    motivation:
      "I wanted text that types itself the way a person does, with pauses and the odd typo.",
    does: "A set of Chrome extensions. Candid and Ambicant type text at a chosen speed with human touches, and Poignant pastes only the parts that changed.",
    why: [
      "Pasting text looks nothing like typing it. I wanted extensions that type at a speed I choose, with pauses and the occasional typo, and one that pastes only what changed.",
    ],
    what: [
      "Candid (free) and Ambicant (paid) type text at a chosen speed with human touches such as pauses and typos. Poignant (free) pastes only the parts of a text that changed. Ambivalence, the first one, is retired.",
    ],
    built: [
      "Chrome extensions, with a website and accounts on Firebase Hosting.",
    ],
    next: [
      "More small tools in the same family.",
    ],
    timeline: [],
    links: [{ label: "Live site", href: "https://ambicant.web.app" }],
    shots: [
      shot("ambicant", 1, "The Ambicant home page with the extension popup: Typing, reimagined"),
      shot("ambicant", 2, "The Candid section of the Ambicant site"),
      shot("ambicant", 3, "The Poignant section of the Ambicant site"),
      shot("ambicant", 4, "The install section of the Ambicant site"),
    ],
    keywords: "chrome extension typing candid poignant paste",
  },
];

export const projectBySlug = (slug: string) => projects.find((p) => p.slug === slug);
