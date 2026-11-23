import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { researchIdeas } from "@/lib/research";
import { SiteNav } from "@/components/site-nav";
import { Footer } from "@/components/footer";
import { navFromElsewhere } from "@/lib/nav";

// Hidden on purpose: not in the menu, the sitemap or any link. The site search
// opens it only when "research" is typed in full and Enter is pressed.
export const metadata: Metadata = {
  title: `Research - ${profile.shortName}`,
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
};

export default function ResearchPage() {
  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} name={profile.shortName} />
      <main>
        <section className="hero" aria-labelledby="research-title" style={{ paddingBottom: "var(--sp-5)" }}>
          <div className="wrap">
            <p className="eyebrow reveal">Draft ideas</p>
            <h1 id="research-title" className="t-hero reveal" style={{ ["--d" as string]: "80ms" }}>
              Research
            </h1>
            <p className="t-lead reveal" style={{ ["--d" as string]: "160ms" }}>
              Only the Mother Tongue map is underway, and none has a result yet.
            </p>
          </div>
        </section>
        <section className="ch ch-b" aria-label="Research ideas">
          <div className="wrap-wide">
            <ul className="cards three">
              {researchIdeas.map((r, i) => (
                <li key={r.title} className="card reveal" style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}>
                  <div className="idea">
                    <p className="area">{r.area}</p>
                    <h2 className="t-h3">{r.title}</h2>
                    <p>{r.question}</p>
                    <p className="method">{r.method}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
