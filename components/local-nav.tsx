import Link from "next/link";

/**
 * The page's own bar, sticking under the global one: the page's name on the
 * left, its anchors, and one action at the right, as on a product page.
 */
export function LocalNav({
  title,
  anchors = [],
  action,
}: {
  title: string;
  anchors?: { href: string; label: string }[];
  action?: { href: string; label: string; external?: boolean };
}) {
  return (
    <div className="local no-print">
      <div className="local-in">
        <p className="local-title">{title}</p>
        <div className="local-right">
          <nav aria-label={`${title} sections`} className="local-links">
            {anchors.map((a) => (
              <a key={a.href} href={a.href}>
                {a.label}
              </a>
            ))}
          </nav>
          {action &&
            (action.external ? (
              <a
                className="btn btn-sm"
                href={action.href}
                target="_blank"
                rel="noopener noreferrer"
              >
                {action.label}
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            ) : (
              <Link className="btn btn-sm" href={action.href}>
                {action.label}
              </Link>
            ))}
        </div>
      </div>
    </div>
  );
}
