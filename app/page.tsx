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
import { HeroBackdrop } from "@/components/hero-backdrop";

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

const recordCount = awardRecord.reduce((n, g) => n + g.items.length, 0);

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

      <HeroBackdrop />

      <SiteNav
        items={nav
          .filter((s) => s.show)
          .map(({ id, label, href }) => ({ id, label, href }))}
        right={links}
        name={profile.shortName}
      />

      <main
        id="top"
        className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8"
      >
        {/* The name is in the bar now, and the first section carries it at
            full size, so the page opens straight into it. Every section is
            ruled off from the one above — except the first, whose rule would
            be a line across the top of the page with nothing above it. */}
        <div className="space-y-14 pt-16 [&>section:first-child]:border-t-0 sm:pt-24 lg:space-y-20">
          {bio.length > 0 && (
            <Section
              id="biography"
              label={profile.shortName}
              // The page's name, and so the page's only h1.
              as="h1"
              // Under the heading, in the heading's own column: square, and as
              // wide as that column is, so it fills it on a phone and on a
              // tablet alike without a size of its own to go wrong.
              aside={
                <Portrait
                  light={profile.photoLight}
                  name={profile.name}
                  className="mt-6 aspect-square w-full"
                />
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
              count={activities.length}
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
              count={videos.length}
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
            <Section id="honors" label="Selected Honors" count={recordCount}>
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

          {venues.length > 0 && (
            <Section id="venues" label="Venues" count={venues.length}>
              <Columns>
                {venues.map((v) => (
                  <Entry key={v.name} title={v.name} meta={v.city} />
                ))}
              </Columns>
            </Section>
          )}

          {languages.length > 0 && (
            <Section id="languages" label="Languages" count={languages.length}>
              <Columns>
                {languages.map((l) => (
                  <Entry key={l.name} title={l.name} meta={l.level} />
                ))}
              </Columns>
            </Section>
          )}

          {projects.length > 0 && (
            <Section id="projects" label="Projects" count={projects.length}>
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
            <Section id="writing" label="Writing" count={writing.length}>
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
