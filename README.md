# Yuzhe Chen

The personal site of Yuzhe (Julian) Chen, pianist: <https://yuzhe-chen.github.io>.
A Next.js static export, published to GitHub Pages on every push to `main`
(see `.github/workflows/deploy.yml`).

Read `AGENTS.md` first: this Next.js has breaking changes from the one most
documentation describes, and its docs are in `node_modules/next/dist/docs/`.

## Where things live

- **Content** — `lib/content.ts` holds the biography, activities, honors,
  performances, venues and languages. Edit that file to change the text.
  Projects are in `lib/projects.ts`, with their screenshots in
  `public/projects/`.
- **Pages** — `app/page.tsx` is the home page; `app/projects/` has the
  Projects page and one page per project. `app/research/` is a hidden page,
  reached only by typing its name in the site search.
- **Style** — `app/globals.css`, in one file: tokens at the top (type scale,
  spacing, colours), then one block per section. The look follows Apple's own
  pages: centred chapters alternating between a white and a light grey ground,
  with the performances chapter always dark. Everything reveals as it scrolls
  into view (`components/reveal.tsx`).
- **Photographs** — `public/`. The portrait sits under the biography; the
  three scenery photographs come in 800, 1400 and full widths for the browser
  to choose from.

## Running it

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # writes the static site to out/
```
