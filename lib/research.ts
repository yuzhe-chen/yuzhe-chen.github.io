/**
 * Research ideas, for the hidden /research/ page. Every card is a draft idea
 * written for the owner to edit: none of these studies has been run, and none
 * of them claims a result. Reached only by typing "research" in the site
 * search. It is not in the menu, the sitemap or any link.
 */
export type ResearchIdea = {
  title: string;
  /** Where the idea comes from on the rest of the site. */
  area: string;
  question: string;
  method: string;
};

export const researchIdeas: ResearchIdea[] = [
  {
    title: "Harmonizing Latin with Opera",
    area: "Music and Latin",
    question:
      "Can the way composers have already set words to music tell us how new Latin text wants to be harmonized?",
    method:
      "Sort the settings of Latin words in past operas by rhythm and interval, then use the groups to propose harmonies for new Latin text.",
  },
  {
    title: "Rameau's French vs. Carmen's \"French\"",
    area: "Music and language",
    question:
      "How does each opera treat the French language, when one follows its rhythm and the other borrows an invented \"Spanish\" color?",
    method:
      "Compare the rhythm of spoken French with the rhythm of the vocal lines in sample passages from each opera.",
  },
  {
    title: "Music and Racism",
    area: "Music and history",
    question:
      "Music has been used to fight racism and also to justify it. What made the difference?",
    method:
      "Collect documented examples from both sides and compare who used the music, for what audience and in what setting.",
  },
  {
    title: "What Seniors Listen To, by Mood",
    area: "Music and survey",
    question:
      "Does the music older people choose change with their mood, and how?",
    method:
      "A short survey with a before and after comparison between two groups, a difference-in-differences design.",
  },
  {
    title: "Word Order in Free Latin Translators",
    area: "Latin and Interpres",
    question:
      "How often do free translators keep the meaning of a Latin sentence when the word order is changed?",
    method:
      "Write short sentences with the same meaning in several word orders, run them through a few free translators and score the results by hand.",
  },
  {
    title: "Tables or Flashcards for Verb Forms",
    area: "Languages and ProfeGPT",
    question:
      "Do students remember verb forms better after studying a full conjugation table or after flashcards?",
    method:
      "Two small groups, one method each, and the same short quiz a week later.",
  },
  {
    title: "Paper Money and Risk",
    area: "Games and Stonks",
    question:
      "Does playing a paper trading game change how teenagers describe risk?",
    method:
      "Ask the same short questions before and after a few weeks of play, and compare them with players who did not play.",
  },
  {
    title: "What Makes a Score Easy to Read",
    area: "Piano and Mazurka",
    question:
      "Which engraving choices make a piano score easier to sight-read?",
    method:
      "Give pianists the same short piece in two layouts and compare the errors and the time to the first correct play-through.",
  },
  {
    title: "Practice Length and Memory",
    area: "Piano",
    question:
      "Do several short practice sessions help memorizing a piece more than one long session?",
    method:
      "Learn two similar pieces, one with split sessions and one with a single block, and test recall after a week.",
  },
];
