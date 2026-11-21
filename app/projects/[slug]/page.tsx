import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { profile } from "@/lib/content";
import { projectBySlug, projects } from "@/lib/projects";
import { SiteNav } from "@/components/site-nav";
import { LocalNav } from "@/components/local-nav";
import { Footer } from "@/components/footer";
import { Img } from "@/components/img";
import { navFromElsewhere } from "@/lib/nav";

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const p = projectBySlug((await params).slug);
  if (!p) return {};
  return {
    title: `${p.title} - ${profile.shortName}`,
    description: p.does,
    alternates: { canonical: `/projects/${p.slug}/` },
  };
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
/** "2026-09-05" to "Sep 5, 2026", with no time zone involved. */
function when(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${MONTHS[m - 1]} ${d}, ${y}`;
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const p = projectBySlug((await params).slug);
  if (!p) notFound();
  const i = projects.findIndex((x) => x.slug === p.slug);
  const prev = projects[(i - 1 + projects.length) % projects.length];
  const next = projects[(i + 1) % projects.length];
  const site = p.links[0];
  const repo = p.links.find((l) => l !== site && /github\.com/.test(l.href));
  const shots = p.shots.length > 1 ? p.shots.slice(1) : p.shots;

  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} name={profile.shortName} current="projects" />
      <LocalNav
        title={p.title}
        anchors={[
          { href: "#overview", label: "Overview" },
          { href: "#history", label: "History" },
          { href: "#screens", label: "Screens" },
        ]}
        action={site ? { href: site.href, label: site.label, external: true } : undefined}
      />

      <main>
        <section className="pp-hero" aria-labelledby="pp-title">
          <div className="wrap">
            <p className="eyebrow reveal">{p.status}</p>
            <h1 id="pp-title" className="t-hero reveal" style={{ ["--d" as string]: "80ms" }}>
              {p.title}
            </h1>
            <p className="t-lead reveal" style={{ ["--d" as string]: "160ms" }}>
              {p.tagline}
            </p>
            <div className="cta-row reveal" style={{ ["--d" as string]: "240ms" }}>
              {site && (
                <a className="btn" href={site.href} target="_blank" rel="noopener noreferrer">
                  {site.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
              {repo && (
                <a className="tlink" href={repo.href} target="_blank" rel="noopener noreferrer">
                  {repo.label}
                  <span className="sr-only"> (opens in a new tab)</span>
                </a>
              )}
            </div>
          </div>
          <div className="pp-shot reveal-scale" style={{ ["--d" as string]: "200ms" }}>
            <Img
              src={p.shots[0].src}
              alt={p.shots[0].alt}
              width={1280}
              height={800}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </section>

        <section id="overview" className="ch ch-b" aria-label="Overview">
          <div className="wrap" style={{ display: "grid", gap: "var(--chapter)" }}>
            <div className="split">
              <h2 className="t-h2 reveal">Motivation</h2>
              <div className="big-p reveal">
                {p.story.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
            <div className="split">
              <h2 className="t-h2 reveal">Features</h2>
              <div className="reveal">
                {p.features.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
            <div className="split">
              <h2 className="t-h2 reveal">Build</h2>
              <div className="reveal">
                {p.build.map((t) => (
                  <p key={t}>{t}</p>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="history" className="ch" aria-labelledby="history-h">
          <div className="wrap">
            <h2 id="history-h" className="t-h2 reveal">
              History
            </h2>
          </div>
          {p.timeline.length > 0 ? (
            <div className="tl-wrap reveal">
              <ol className="tl" tabIndex={0} aria-label={`${p.title} history, scroll sideways`}>
                {p.timeline.map((t) => (
                  <li key={t.date + t.label}>
                    <time dateTime={t.date}>{when(t.date)}</time>
                    <p>{t.label}</p>
                  </li>
                ))}
              </ol>
            </div>
          ) : (
            <div className="wrap">
              <p className="muted reveal" style={{ marginTop: "var(--sp-3)", maxWidth: "52ch" }}>
                The code for this project is private, so there is no public commit history to show here.
              </p>
            </div>
          )}
        </section>

        <section id="screens" className="ch ch-dark" aria-labelledby="screens-h">
          <div className="wrap-wide">
            <div className="ch-head reveal">
              <h2 id="screens-h" className="t-h2">
                Screens
              </h2>
            </div>
            <ul className="shots">
              {shots.map((s, n) => (
                <li key={s.src} className="reveal" style={{ ["--d" as string]: `${(n % 2) * 80}ms` }}>
                  <figure>
                    <Img src={s.src} alt={s.alt} width={1280} height={800} loading={n < 2 ? "eager" : "lazy"} />
                    <figcaption>{s.alt}</figcaption>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section id="next" className="ch" aria-labelledby="next-h">
          <div className="wrap">
            <div className="split">
              <h2 id="next-h" className="t-h2 reveal">
                Next
              </h2>
              <ul className="nextlist reveal">
                {p.next.map((t) => (
                  <li key={t}>{t}</li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        <section className="ch ch-b" style={{ paddingBlock: "var(--sp-6)" }} aria-label="More projects">
          <div className="wrap pager">
            <Link href={`/projects/${prev.slug}/`}>
              <span className="t-cap muted">Previous project</span>
              <span className="t-h3" style={{ display: "block", marginTop: 4 }}>
                {prev.title}
              </span>
            </Link>
            <Link href={`/projects/${next.slug}/`}>
              <span className="t-cap muted">Next project</span>
              <span className="t-h3" style={{ display: "block", marginTop: 4 }}>
                {next.title}
              </span>
            </Link>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
