import type { Metadata } from "next";
import { links, profile } from "@/lib/content";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectCard } from "@/components/project-parts";
import { SiteNav } from "@/components/site-nav";
import { navFromElsewhere } from "@/lib/nav";

export const metadata: Metadata = {
  title: `Projects - ${profile.shortName}`,
  description: "Websites and apps built by Yuzhe Chen: language tools, games and a planner.",
  alternates: { canonical: "/projects/" },
};

/** The Apple version's layout: a centred opening, the wheel, then every project in a card. */
export default function ProjectsPage() {
  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} right={links} name={profile.shortName} home="/" />

      <main className="grow">
        <section className="pj-hero" aria-labelledby="projects-title">
          <div className="pj-wrap">
            <p className="pj-eyebrow reveal">Websites and apps</p>
            <h1 id="projects-title" className="display reveal" style={{ ["--d" as string]: "80ms" }}>
              Projects
            </h1>
            <p className="pj-lead reveal" style={{ ["--d" as string]: "160ms" }}>
              Websites and apps I have built.
            </p>
          </div>
        </section>

        <section id="gallery" className="pj-band" aria-label="Projects">
          <ProjectGallery projects={projects} />

          <div id="all" className="pj-wide" style={{ marginTop: "clamp(3.5rem, 8vw, 6rem)" }}>
            <h2 className="display pj-head reveal">Everything</h2>
            <ul className="pgrid">
              {projects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </ul>
          </div>
        </section>
      </main>

      <footer className="no-print relative z-10 mx-auto w-full max-w-[1600px] px-5 pb-10 pt-10 text-[13px] sm:px-8">
        © {new Date().getFullYear()} {profile.name}
      </footer>
    </>
  );
}
