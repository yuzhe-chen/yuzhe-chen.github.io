import type { Metadata } from "next";
import { links, profile } from "@/lib/content";
import { researchIdeas } from "@/lib/research";
import { SiteNav } from "@/components/site-nav";
import { navFromElsewhere } from "@/lib/nav";

// Hidden on purpose: not in the menu, the sitemap or any link, and asked to
// stay out of search engines. The site search opens it only when "research"
// is typed in full and Enter is pressed.
export const metadata: Metadata = {
  title: `Research - ${profile.shortName}`,
  alternates: { canonical: "/research/" },
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function ResearchPage() {
  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} right={links} name={profile.shortName} />

      <main className="relative z-10 mx-auto w-full max-w-[1600px] grow px-5 pb-16 sm:px-8">
        <section className="pt-20 sm:pt-24 lg:pt-28">
          <h1 className="display">Research</h1>
          <p className="mt-4 max-w-xl text-[17px] leading-snug text-muted">
            Draft ideas. None of these has been run, and none of them has a result yet.
          </p>
          <h2 className="sr-only">Ideas</h2>
          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:mt-14 lg:grid-cols-3">
            {researchIdeas.map((r) => (
              <li key={r.title} className="flex flex-col border border-rule p-5">
                <p className="text-[13px] text-muted">{r.area}</p>
                <h3 className="t-h3 mt-2">{r.title}</h3>
                <p className="mt-3 text-[15px] leading-6">{r.question}</p>
                <p className="mt-3 text-[15px] leading-6 text-muted">{r.method}</p>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 text-[13px] text-muted sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
