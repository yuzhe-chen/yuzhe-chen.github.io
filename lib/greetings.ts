/**
 * The ways the title introduces him, in the order they turn over. Each is what
 * goes before his name, so the name is the same in all of them and only the
 * greeting changes. They are what a speaker of the language would say, not
 * translations of one another. The Chinese is in characters, and there the
 * name is too: Chen (surname first) Yu (language) Zhe (the wheel track, with
 * the cart on the left): 陈语辙. `name` replaces the Latin name where given.
 *
 * `code` is the language tag the browser and screen readers use. The first is
 * what the page opens on, and what is on the page for search engines.
 */
export const greetings = [
  { code: "en", before: "Hi, I'm" },
  { code: "fr", before: "Bonjour, je suis" },
  { code: "es", before: "Hola, soy" },
  { code: "zh-Hans", before: "你好，我是", name: "陈语辙" },
  { code: "de", before: "Hallo, ich bin" },
  { code: "it", before: "Ciao, sono" },
  { code: "la", before: "Salvē, ego sum" },
] as { code: string; before: string; name?: string }[];
