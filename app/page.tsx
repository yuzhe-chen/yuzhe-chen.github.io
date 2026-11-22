import {
  activities,
  awardRecord,
  bio,
  languages,
  links,
  profile,
  venues,
  videos,
  writing,
} from "@/lib/content";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { VideoGrid } from "@/components/video-grid";
import { Img } from "@/components/img";
import { Etym } from "@/components/etym";
import { Puzzle } from "@/components/puzzle";
import { nav } from "@/lib/nav";

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
      <div id="top" aria-hidden />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd) }}
      />
      <SiteNav items={nav} name={profile.shortName} />

      <main>
        {bio.length > 0 && (
          <section id="biography" className="ch ch-b ch-first" aria-labelledby="biography-h">
            <div className="wrap">
              {/* The name is the title: above the heading and the text, which
                  are then level with each other as they were. */}
              <h1 className="bio-name reveal">{profile.shortName}</h1>
              <div className="bio-grid">
              {/* The left column holds the heading and the portrait, and sticks
                  as one while the biography scrolls past. The portrait takes
                  the width of the column and no more; it does not have to
                  match the height of the text. */}
              <div className="bio-side">
                <h2 id="biography-h" className="t-h2 reveal">
                  Biography
                </h2>
                <Etym k="biography" />
                {profile.photoLight && (
                  <figure className="bio-photo reveal-scale">
                    <Img
                      src={profile.photoLight}
                      alt={profile.name}
                      width={640}
                      height={640}
                    />
                  </figure>
                )}
              </div>
              <div className="bio-copy">
                {bio.map((p, i) => (
                  <p key={i} className="reveal" style={{ ["--d" as string]: `${Math.min(i, 3) * 80}ms` }}>
                    {p}
                  </p>
                ))}
              </div>
              </div>
            </div>
          </section>
        )}

        {activities.length > 0 && (
          <section id="activities" className="ch" aria-labelledby="activities-h">
            {/* The same width as every other section, not the wider one the
                cards used. */}
            <div className="wrap">
              <div className="ch-head center reveal">
                <h2 id="activities-h" className="t-h2">
                  Activities
                </h2>
                <Etym k="activities" />
              </div>
              <Puzzle activities={activities} photos={["/hero-bridge", "/hero-houses"]} />
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section id="performances" className="ch ch-dark" aria-labelledby="performances-h">
            <div className="wrap">
              <div className="ch-head reveal">
                <h2 id="performances-h" className="t-h2">
                  Performances
                </h2>
                <Etym k="performances" />
              </div>
            </div>
            <div className="wrap">
              <VideoGrid videos={videos} />
            </div>
          </section>
        )}

        {awardRecord.length > 0 && (
          <section id="honors" className="ch" aria-labelledby="honors-h">
            <div className="wrap">
              <div className="ch-head reveal">
                <h2 id="honors-h" className="t-h2">
                  Selected Honors
                </h2>
                <Etym k="honors" />
              </div>
              <ol className="years">
                {awardRecord.map((g) => (
                  <li key={g.year} className="year reveal">
                    <h3 className="year-n">{g.year}</h3>
                    <ul>
                      {g.items.map((item, i) => (
                        <li
                          key={item.title}
                          className={`award${
                            item.kind === "academic" && g.items[i - 1]?.kind === "music" ? " sep" : ""
                          }`}
                        >
                          <span>{item.title}</span>
                          <span className="pill">{item.level}</span>
                        </li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ol>
            </div>
          </section>
        )}

        {venues.length > 0 && (
          <section id="venues" className="ch ch-b" aria-labelledby="venues-h">
            <div className="wrap">
              <div className="ch-head reveal">
                <h2 id="venues-h" className="t-h2">
                  Venues
                </h2>
                <Etym k="venues" />
              </div>
              <ul className="rows">
                {venues.map((v) => (
                  <li key={v.name} className="row reveal">
                    <span className="row-n">{v.name}</span>
                    <span className="row-m">{v.city}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        {languages.length > 0 && (
          <section id="languages" className="ch" aria-labelledby="languages-h">
            <div className="wrap">
              <div className="ch-head reveal">
                <h2 id="languages-h" className="t-h2">
                  Languages
                </h2>
                <Etym k="languages" />
              </div>
              <ul className="langs">
                {languages.map((l, i) => (
                  <li key={l.name} className="lang reveal" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
                    <h3 className="t-h3">{l.name}</h3>
                    <p>{l.level}</p>
                  </li>
                ))}
              </ul>
              <div className="photo-break reveal-scale">
                <Img
                  src="/hero-canal-1400.webp"
                  alt="A tree-lined canal with moored boats and parked bicycles along the quay"
                  width={1400}
                  height={1050}
                />
              </div>
            </div>
          </section>
        )}

        {writing.length > 0 && (
          <section id="writing" className="ch ch-b" aria-labelledby="writing-h">
            <div className="wrap">
              <h2 id="writing-h" className="t-h2">
                Writing
              </h2>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </>
  );
}
