import Image from "next/image";
import Link from "next/link";
import type { Project } from "@/lib/projects";

/** One project's card on the projects page. The whole card opens its page. */
export function ProjectCard({ p }: { p: Project }) {
  const site = p.links[0];
  const repo = p.links.find((l) => l !== site && /github\.com/.test(l.href));
  return (
    <li id={`project-${p.slug}`} className="pcard reveal">
      <div className="pcard-img fade-img">
        <Image
          src={p.shots[0].src}
          alt={p.shots[0].alt}
          width={1280}
          height={800}
          sizes="(min-width: 1180px) 30vw, (min-width: 760px) 45vw, 92vw"
          loading="lazy"
        />
      </div>
      <div className="pcard-body">
        <div className="pcard-top">
          <h3 className="card-title">
            <Link href={`/projects/${p.slug}/`}>{p.title}</Link>
          </h3>
          <span className="status">{p.status}</span>
        </div>
        <p className="detail">{p.summary}</p>
        <p className="detail">{p.does}</p>
        <div className="cta-row">
          <Link className="btn btn-sm" href={`/projects/${p.slug}/`}>
            Read more
          </Link>
          {site && (
            <a className="tlink" href={site.href} target="_blank" rel="noopener noreferrer">
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
    </li>
  );
}
