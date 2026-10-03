This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Vocabulary

Three words for the photographs, used in the code and when talking about it.
Which one applies often depends on the format — laptop (`lg` and up) or mobile
(below `lg`, phones and iPads alike).

- **Profile picture** — the portrait of Julian, as opposed to the three scenery
  photographs. On mobile it stands on its own at the top of the page, filling
  the screen with the chevron at its foot, and the Biography below it has a band
  of its own. On laptop it moves behind the Biography, bleeding in beside the
  writing. Changes to bands never affect it: it answers to `portrait-wash`,
  `portrait-fade-x` and `portrait-breathe`, not to `.heading-band` or
  `.section-fade`.
- **Wallpaper** — the two-column picture format on laptops: the photograph fills
  the whole section, running behind the label and the text beside it. Most
  sections get one from `SectionWallpaper` in `app/page.tsx`; the Biography's is
  the profile picture.
- **Band** — the short strip of picture behind a heading on mobile, where the
  label sits above the writing rather than beside it. Rendered by `HeadingBand`
  in `app/page.tsx`; its height is derived from the label's own type size by
  `.heading-band` in `app/globals.css`.

A section can have a band without a wallpaper or the other way round, and two
sections can share a photograph by cropping it differently — that is what
`position` sets.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
