/**
 * The ways the title introduces him, in the order they turn over. Each is what
 * goes before his name, so the name is the same in all of them and only the
 * greeting changes. They are what a speaker of the language would say, not
 * translations of one another; the Chinese is in pinyin, the Latin letters
 * the rest are in, never in characters.
 *
 * `code` is the language tag the browser and screen readers use. The first is
 * what the page opens on, and what is on the page for search engines.
 */
export const greetings = [
  { code: "en", before: "Hello, I'm" },
  { code: "fr", before: "Bonjour, je suis" },
  { code: "es", before: "Hola, soy" },
  { code: "zh-Latn", before: "Nǐ hǎo, wǒ jiào" },
  { code: "de", before: "Hallo, ich bin" },
  { code: "it", before: "Ciao, sono" },
  { code: "la", before: "Salvē, ego sum" },
] as const;
