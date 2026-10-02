import {
  activities,
  awardRecord,
  bio,
  languages,
  links,
  profile,
  projects,
  venues,
  videos,
  writing,
} from "@/lib/content";
import {
  Columns,
  Entry,
  LevelTag,
  Portrait,
  Section,
  VideoEmbed,
} from "@/components/sections";
import { SiteNav } from "@/components/site-nav";

/**
 * The photographs don't sit behind the whole page any more. Each one belongs
 * to a section, on the heading side, fading out into solid page colour before
 * it reaches the text. Sections alternate: one plain, one carrying a photo.
 *
 * Three widths each, as before, and the browser takes what it needs.
 */
const WALLPAPERS = ["/hero-bridge", "/hero-houses", "/hero-canal"];

const srcSet = (base: string) =>
  `${base}-800.webp 800w, ${base}-1400.webp 1400w, ${base}.webp 1800w`;

/* The picture itself, bleeding to both edges of the screen. */
function Photo({ base, position }: { base: string; position: string }) {
  return (
    <>
      {/* eslint-disable-next-line @next/next/no-img-element -- static export,
          so next/image would serve one size with no srcset at all. */}
      <img
        src={`${base}.webp`}
        srcSet={srcSet(base)}
        sizes="100vw"
        alt=""
        decoding="async"
        loading="lazy"
        className={`h-full w-full object-cover ${position}`}
      />
      <div className="section-fade absolute inset-0" />
    </>
  );
}

/**
 * A band: the strip of photograph behind a heading, below `lg`, where the
 * label sits above the writing. Its height is the heading's own, with matching
 * air above and below — see `heading-band`.
 *
 * A section can have one of these without having a wallpaper, and the other
 * way round. `position` is which part of the picture survives the crop, so two
 * sections can share a photograph and show different parts of it.
 */
function HeadingBand({ base, position }: { base: string; position: string }) {
  return (
    <div
      aria-hidden
      className="heading-band absolute left-1/2 top-0 -z-10 w-screen -translate-x-1/2 overflow-hidden lg:hidden"
    >
      <Photo base={base} position={position} />
    </div>
  );
}

/**
 * A wallpaper: the photograph filling a whole section, from `lg` up, where the
 * label has moved beside the text and there is a field for it to fill.
 */
function SectionWallpaper({
  base,
  position,
}: {
  base: string;
  position: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 overflow-hidden lg:block"
    >
      <Photo base={base} position={position} />
    </div>
  );
}

// Document order matters — the nav highlights the topmost visible entry.
const nav: { id: string; label: string; href?: string; show: boolean }[] = [
  // Its section is the first thing on the page, so the tab and the name in
  // the corner of the bar go to the same place.
  { id: "biography", label: "Biography", href: "#top", show: bio.length > 0 },
  { id: "activities", label: "Activities", show: activities.length > 0 },
  { id: "performances", label: "Performances", show: videos.length > 0 },
  { id: "honors", label: "Honors", show: awardRecord.length > 0 },
  { id: "venues", label: "Venues", show: venues.length > 0 },
];

/**
 * Structured data. The prose on this page tells a reader who Julian is; this
 * tells Google the same thing in the form it actually parses -- a person, a
 * pianist, at this school, with this channel -- so a search for his name can
 * match this page rather than one of the other pianists named Chen.
 */
const personJsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: profile.name,
  alternateName: ["Julian Chen", "Yuzhe Chen"],
  jobTitle: "Pianist",
  description: profile.metaDescription,
  url: profile.siteUrl,
  image: `${profile.siteUrl}${profile.photoLight ?? "/portrait-light.jpg"}`,
  affiliation: [
    { "@type": "EducationalOrganization", name: "Langley High School" },
    { "@type": "MusicGroup", name: "National Symphony Orchestra" },
  ],
  // The awards carry the competition names people search alongside his.
  award: awardRecord.flatMap((g) =>
    g.items.map((i) => `${i.title} (${g.year})`),
  ),
  knowsLanguage: languages.map((l) => l.name),
  // Ties this page to the channel, so the two reinforce each other.
  sameAs: links.map((l) => l.href),
};

export default function Home() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />

      <SiteNav
        items={nav
          .filter((s) => s.show)
          .map(({ id, label, href }) => ({ id, label, href }))}
        right={links}
        name={profile.shortName}
      />

      {/*
        * On a tablet the page opens on the portrait itself, filling the screen
        * edge to edge, with the arrow at its foot going down to the Biography.
        * A phone has the portrait standing behind the biography text instead,
        * and a laptop has it bleeding in beside that text, so this belongs to
        * the width in between and to nothing else.
        *
        * The crop is held high: the face is the reason the picture is here, and
        * a centred crop on a tall box puts the chin at the bottom edge.
        */}
      <div className="relative hidden h-[78svh] w-full overflow-hidden sm:block lg:hidden">
        <Portrait
          light={profile.photoLight}
          name={profile.name}
          className="portrait-breathe absolute inset-0 h-full w-full"
          position="object-[50%_18%]"
        />
        <div className="portrait-wash absolute inset-0" />

        <a
          href="#biography"
          aria-label="Skip to the biography"
          className="absolute inset-x-0 bottom-6 z-10 mx-auto flex w-12 justify-center text-fg"
        >
          <svg
            className="hero-nudge h-7 w-7 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M6 9.5L12 15.5L18 9.5" />
          </svg>
        </a>
      </div>

      <main
        id="top"
        className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8"
      >
        {/* The name is in the bar now, and the first section carries it at
            full size, so the page opens straight into it. Every section is
            ruled off from the one above — except the first, whose rule would
            be a line across the top of the page with nothing above it. */}
        {/* Only the bar's own thickness above the first section — nothing
            else between the menu and the picture under it. */}
        <div className="space-y-14 pt-14 [&>section:first-child]:border-t-0 sm:pt-[4.25rem] lg:space-y-20">
          {bio.length > 0 && (
            <Section
              id="biography"
              label="Biography"
              // The portrait sits on the heading side and bleeds to the edge
              // of the screen, like every other section's photograph, fading
              // rightward into the page colour so the text sits on solid
              // ground. Hidden on a phone, where there is no room beside the
              // text for it to be anything but a wash behind the words.
              backdrop={
                <>
                  {/* On a phone the portrait stands behind the writing rather
                      than beside it: anchored to the foot of the section,
                      reaching up past the text and thinning as it goes, so
                      there is picture under the lower half of the biography
                      and plain page above it. */}
                  <div
                    aria-hidden
                    className="absolute inset-0 -z-10 overflow-hidden sm:hidden"
                  >
                    <Portrait
                      light={profile.photoLight}
                      name=""
                      className="portrait-up portrait-breathe absolute inset-x-0 bottom-0 h-[82%]"
                      position="object-[50%_18%]"
                    />
                    <div className="portrait-wash absolute inset-0" />
                  </div>

                  {/* On a tablet the portrait has already had the screen
                      above, so here the heading takes a band like every other
                      section's — from the same photograph as Activities. */}
                  <HeadingBand base={WALLPAPERS[0]} position="object-[50%_16%]" />

                  <div
                    aria-hidden
                    className="absolute inset-y-0 left-1/2 -z-10 hidden w-screen -translate-x-1/2 overflow-hidden lg:block"
                  >
                  {/* Pulled left so the head clears the writing. The box is
                      wider than the picture's aspect, so cover fills it across
                      and crops top and bottom — horizontal object-position has
                      nothing left to move, and shifting the box is what shifts
                      the face. Its right edge still lands past the point where
                      the fade above reaches solid colour, or the picture's own
                      edge would show as a seam. */}
                  <div className="portrait-breathe absolute inset-y-0 left-[-7%] w-[72%]">
                    <Portrait
                      light={profile.photoLight}
                      name=""
                      className="h-full w-full"
                      // On a very wide screen this box is wide and shallow, and
                      // a centred crop cuts straight through the head. Holding
                      // the crop high keeps him in it.
                      position="object-[50%_26%]"
                    />
                  </div>
                    <div className="portrait-fade-x absolute inset-0" />
                  </div>
                </>
              }
            >
              <div className="space-y-4 text-[17px] leading-7">
                {bio.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            </Section>
          )}

          {activities.length > 0 && (
            <Section
              id="activities"
              label="Activities"
              backdrop={
                <>
                  <HeadingBand base={WALLPAPERS[0]} position="object-[50%_16%]" />
                  <SectionWallpaper
                    base={WALLPAPERS[0]}
                    position="object-[50%_28%]"
                  />
                </>
              }
            >
              <Columns>
                {activities.map((a) => (
                  <Entry
                    key={a.title + a.org}
                    title={a.title}
                    meta={`${a.org} - ${a.period}`}
                    body={a.description}
                  />
                ))}
              </Columns>
            </Section>
          )}

          {videos.length > 0 && (
            <Section
              id="performances"
              label="Performances"
              // A band only: no wallpaper behind the videos on a laptop. The
              // same photograph as Activities, further down it.
              backdrop={
                <HeadingBand base={WALLPAPERS[0]} position="object-[50%_74%]" />
              }
              below={
                <ul className="mt-8 grid gap-x-8 gap-y-10 sm:grid-cols-2 lg:mt-10">
                  {videos.map((v) => (
                    <VideoEmbed
                      key={v.id}
                      id={v.id}
                      title={v.title}
                      detail={v.detail}
                    />
                  ))}
                </ul>
              }
            />
          )}

          {awardRecord.length > 0 && (
            <Section
              id="honors"
              label="Selected Honors"
              backdrop={
                <>
                  <HeadingBand base={WALLPAPERS[1]} position="object-[50%_16%]" />
                  <SectionWallpaper
                    base={WALLPAPERS[1]}
                    position="object-[50%_28%]"
                  />
                </>
              }
            >
              <Columns>
                {awardRecord.map((group) => (
                  <div key={group.year} className="mb-8">
                    <p className="mb-2.5 text-[13px] uppercase tracking-wider text-muted">
                      {group.year}
                    </p>
                    <ul className="space-y-2">
                      {group.items.map((item, i) => (
                        <li
                          key={item.title}
                          // A hairline where the music awards end. It rides on
                          // the first academic entry rather than sitting in its
                          // own row, so there's nothing to collapse or overflow
                          // on a narrow screen.
                          className={`text-[16px] leading-snug ${
                            item.kind === "academic" &&
                            group.items[i - 1]?.kind === "music"
                              ? "border-t border-rule pt-2.5"
                              : ""
                          }`}
                        >
                          {item.title}
                          <LevelTag level={item.level} />
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </Columns>
            </Section>
          )}

          {/* One wallpaper behind the pair on a laptop, rather than one each.
              Below that each keeps a band of its own behind its own heading,
              taken from different parts of the same photograph. */}
          {(venues.length > 0 || languages.length > 0) && (
            <div className="relative isolate space-y-14 lg:space-y-20 lg:pb-16">
              <SectionWallpaper
                base={WALLPAPERS[2]}
                position="object-[50%_28%]"
              />

              {venues.length > 0 && (
                <Section
                  id="venues"
                  label="Venues"
                  backdrop={
                    <HeadingBand
                      base={WALLPAPERS[2]}
                      position="object-[50%_14%]"
                    />
                  }
                >
                  <Columns>
                    {venues.map((v) => (
                      <Entry key={v.name} title={v.name} meta={v.city} />
                    ))}
                  </Columns>
                </Section>
              )}

              {languages.length > 0 && (
                <Section
                  id="languages"
                  label="Languages"
                  backdrop={
                    <HeadingBand
                      base={WALLPAPERS[2]}
                      position="object-[50%_72%]"
                    />
                  }
                >
                  <Columns>
                    {languages.map((l) => (
                      <Entry key={l.name} title={l.name} meta={l.level} />
                    ))}
                  </Columns>
                </Section>
              )}
            </div>
          )}

          {projects.length > 0 && (
            <Section id="projects" label="Projects">
              <Columns>
                {projects.map((p) => (
                  <Entry
                    key={p.title}
                    title={p.title}
                    meta={`${p.role} - ${p.year}`}
                    body={p.description}
                    href={p.href}
                  />
                ))}
              </Columns>
            </Section>
          )}

          {writing.length > 0 && (
            <Section id="writing" label="Writing">
              <Columns>
                {writing.map((w) => (
                  <Entry
                    key={w.title}
                    title={w.title}
                    meta={`${w.where} - ${w.year}`}
                    href={w.href}
                  />
                ))}
              </Columns>
            </Section>
          )}

        </div>

        {/* At the foot of the page rather than under the name — there's no
            screenful of hero for it to sit at the bottom of any more. It
            points back the way you came; the smooth scroll is already set in
            the stylesheet, so the plain anchor is the whole mechanism. */}
        <a
          href="#top"
          aria-label="Back to the top"
          className="mx-auto mt-16 flex w-12 justify-center text-muted"
        >
          <svg
            className="hero-nudge h-7 w-7 stroke-current [stroke-linecap:round] [stroke-linejoin:round] [stroke-width:2]"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden
          >
            <path d="M6 15.5L12 9.5L18 15.5" />
          </svg>
        </a>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
