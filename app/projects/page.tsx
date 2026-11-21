import type { Metadata } from "next";
import { profile } from "@/lib/content";
import { projects } from "@/lib/projects";
import { ProjectGallery } from "@/components/project-gallery";
import { ProjectCard } from "@/components/project-parts";
import { SiteNav } from "@/components/site-nav";
import { LocalNav } from "@/components/local-nav";
import { Footer } from "@/components/footer";
import { navFromElsewhere } from "@/lib/nav";

export const metadata: Metadata = {
  title: `Projects - ${profile.shortName}`,
  description: "Websites and apps built by Yuzhe Chen: language tools, games and a planner.",
  alternates: { canonical: "/projects/" },
};

export default function ProjectsPage() {
  return (
    <>
      <div id="top" aria-hidden />
      <SiteNav items={navFromElsewhere} name={profile.shortName} current="projects" />
      <LocalNav
        title="Projects"
        anchors={[
          { href: "#gallery", label: "Gallery" },
          { href: "#all", label: "All projects" },
        ]}
      />

      <main>
        <section className="hero" aria-labelledby="projects-title" style={{ paddingBottom: "var(--sp-5)" }}>
          <div className="wrap">
            <p className="eyebrow reveal">Websites and apps</p>
            <h1 id="projects-title" className="t-hero reveal" style={{ ["--d" as string]: "80ms" }}>
              Projects
            </h1>
            <p className="t-lead reveal" style={{ ["--d" as string]: "160ms" }}>
              Tools for languages, a few games, and a planner for school.
            </p>
          </div>
        </section>

        <section id="gallery" className="ch ch-b" style={{ paddingBlock: "var(--sp-5)" }} aria-label="Project gallery">
          <ProjectGallery projects={projects} />
        </section>

        <section id="all" className="ch" aria-labelledby="all-h">
          <div className="wrap-wide">
            <div className="ch-head reveal">
              <h2 id="all-h" className="t-h2">
                Everything
              </h2>
            </div>
            <ul className="pgrid">
              {projects.map((p) => (
                <ProjectCard key={p.slug} p={p} />
              ))}
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
