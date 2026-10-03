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
 * The photographs don't sit behind the whole page: each one belongs to a
 * section, and what it does there depends on the format.
 *
 * On laptop it fills the section behind the two-column row, fading rightward
 * into solid page colour before it reaches the text — a wallpaper. On mobile it
 * fills the section outright, under the writing as well as the label, and pays
 * for that with a far heavier wash.
 *
 * Mobile used to take a band instead: a strip behind the heading alone. That is
 * archived in `docs/bands-archive.md`, not deleted.
 *
 * Three widths each, and the browser takes what it needs.
 */
const WALLPAPERS = ["/hero-bridge", "/hero-houses", "/hero-canal"];

const srcSet = (base: string) =>
  `${base}-800.webp 800w, ${base}-1400.webp 1400w, ${base}.webp 1800w`;

/* The picture itself, bleeding to both edges of the screen. */
function Photo({
  base,
  position,
  overlay = "section-fade",
}: {
  base: string;
  position: string;
  /**
   * The wash laid over the picture: `section-fade` where text sits beside it,
   * `section-veil` where text sits on top of it.
   */
  overlay?: string;
}) {
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
      <div className={`${overlay} absolute inset-0`} />
    </>
  );
}

/**
 * The mobile backdrop: the photograph filling a whole section below `lg`, where
 * the label sits above the writing and the text runs the full width of the
 * screen. There is no solid column for the writing to stand on at these widths,
 * so the wash has to do that work instead — see `section-veil`.
 *
 * A section can have one of these without having a wallpaper, and the other way
 * round. `position` is which part of the picture survives the crop, so two
 * sections can share a photograph and show different parts of it.
 */
function MobileBackdrop({
  base,
  position,
}: {
  base: string;
  position: string;
}) {
  return (
    <div
      aria-hidden
      className="absolute inset-y-0 left-1/2 -z-10 w-screen -translate-x-1/2 overflow-hidden lg:hidden"
    >
      <Photo base={base} position={position} overlay="section-veil" />
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
        * Below `lg` — phones and tablets alike — the page opens on the portrait
        * itself, filling the screen edge to edge, with the arrow at its foot
        * going down to the Biography. A laptop has it bleeding in beside the
        * text instead, so this stops there.
        *
        * The crop is held high: the face is the reason the picture is here, and
        * a centred crop on a tall box puts the chin at the bottom edge.
        */}
      <div className="relative h-[78svh] w-full overflow-hidden lg:hidden">
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
              // On mobile the profile picture has already had the screen above
              // this section, so the section itself takes a scenery photograph
              // like every other one — hero-bridge, which nothing else wears at
              // these widths.
              mobileBackdrop={
                <MobileBackdrop
                  base={WALLPAPERS[0]}
                  position="object-[50%_22%]"
                />
              }
              // On laptop the profile picture is this section's wallpaper: it
              // sits on the heading side and bleeds to the edge of the screen,
              // fading rightward into the page colour so the text sits on solid
              // ground.
              backdrop={
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
              // Two different photographs, one per format: hero-bridge is the
              // Biography's on mobile, so this takes hero-houses there — the one
              // Selected Honors wears on laptop, which no longer carries a
              // picture at those widths.
              mobileBackdrop={
                <MobileBackdrop
                  base={WALLPAPERS[1]}
                  position="object-[50%_28%]"
                />
              }
              backdrop={
                <SectionWallpaper
                  base={WALLPAPERS[0]}
                  position="object-[50%_28%]"
                />
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
              // No picture in either format. The videos are the pictures here,
              // and a photograph behind a grid of them was one too many.
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
              // Laptop only. On mobile this is a long list of names and years,
              // and it reads better off plain page colour; its photograph has
              // gone to Activities at those widths.
              backdrop={
                <SectionWallpaper
                  base={WALLPAPERS[1]}
                  position="object-[50%_28%]"
                />
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
              On mobile the two share it the way they always have — the same
              photograph, cropped differently for each, so the pair reads as one
              stretch of wall without either section repeating the other. */}
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
                  mobileBackdrop={
                    <MobileBackdrop
                      base={WALLPAPERS[2]}
                      position="object-[50%_18%]"
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
                  mobileBackdrop={
                    <MobileBackdrop
                      base={WALLPAPERS[2]}
                      position="object-[50%_70%]"
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
