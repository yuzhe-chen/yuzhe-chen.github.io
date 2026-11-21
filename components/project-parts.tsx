import Link from "next/link";
import type { Project } from "@/lib/projects";
import { Img } from "@/components/img";

/** One project's card on the projects page. The whole card opens its page. */
export function ProjectCard({ p }: { p: Project }) {
  const site = p.links[0];
  const repo = p.links.find((l) => /github/i.test(l.label) || /github\.com/.test(l.href));
  return (
    <li id={`project-${p.slug}`} className="pcard reveal">
      <div className="pcard-img fade-img">
        <Img src={p.shots[0].src} alt={p.shots[0].alt} width={1280} height={800} />
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <h3 className="t-h3">
            <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
          </h3>
          <span className="status">{p.status}</span>
        </div>
        <p>{p.summary}</p>
        <p>{p.does}</p>
        <div className="cta-row">
          {site && (
            <a className="btn btn-sm" href={site.href} target="_blank" rel="noopener noreferrer">
              {site.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
          {repo && repo !== site && (
            <a className="tlink t-small" href={repo.href} target="_blank" rel="noopener noreferrer">
              {repo.label}
              <span className="sr-only"> (opens in a new tab)</span>
            </a>
          )}
        </div>
      </div>
    </li>
  );
}
