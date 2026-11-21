import { Img } from "@/components/img";
import { PIECE_MARGIN, puzzleLayout } from "@/lib/puzzle";

type Activity = {
  title: string;
  org: string;
  period: string;
  description?: string;
};

/** The saved photographs that fill out the grid, in the order they are used. */
type Photo = { base: string; show3: boolean; show2: boolean };

type Cell =
  | { kind: "text"; a: Activity }
  | { kind: "photo"; photo: Photo };

const srcSet = (base: string) =>
  `${base}-800.webp 800w, ${base}-1400.webp 1400w, ${base}.webp 1800w`;

/** How many cells it takes to finish the last row of a grid `cols` across. */
const need = (n: number, cols: number) => (cols - (n % cols)) % cols;

/**
 * The activities as separate puzzle pieces, each its own shape, with photographs
 * mixed in so that every row is full.
 *
 * The grid is three across on a laptop, two on a tablet and one on a phone, and
 * seven activities leave the last row short in the first two. So the number of
 * photographs is worked out from the number of activities and the columns: as
 * many as the widest layout needs are drawn, and the CSS hides the ones a
 * narrower layout doesn't (`data-c3`, `data-c2`). On a phone there is only one
 * column, so none are shown. Add or remove an activity and the count follows.
 *
 * The outlines are cut to fit their neighbours (see lib/puzzle.ts), and who the
 * neighbours are depends on the number of columns, so each piece carries one
 * outline per layout, as `--c3`, `--c2` and `--c1`, and the CSS picks the one for
 * the width it is on.
 */
export function Puzzle({
  activities,
  photos,
}: {
  activities: Activity[];
  photos: string[];
}) {
  const n = activities.length;
  const need3 = need(n, 3);
  const need2 = need(n, 2);
  const extra: Photo[] = photos.slice(0, Math.max(need3, need2)).map((base, k) => ({
    base,
    show3: k + 1 <= need3,
    show2: k + 1 <= need2,
  }));

  // Spread the photographs through the list rather than piling them at the end.
  const cells: Cell[] = activities.map((a) => ({ kind: "text", a }));
  const total = n + extra.length;
  // Each one a place further along than an even spread would put it, so that
  // three across they land in different columns rather than stacking in one.
  extra.forEach((photo, k) => {
    const at = Math.min(Math.round(((k + 1) * total) / (extra.length + 1)) + k, total - 1);
    cells.splice(at, 0, { kind: "photo", photo });
  });

  // Who is shown at each layout, in order, and the outlines cut for just them.
  const shown = {
    3: cells.map((x, i) => (x.kind === "text" || x.photo.show3 ? i : -1)).filter((i) => i >= 0),
    2: cells.map((x, i) => (x.kind === "text" || x.photo.show2 ? i : -1)).filter((i) => i >= 0),
    1: cells.map((x, i) => (x.kind === "text" ? i : -1)).filter((i) => i >= 0),
  } as const;
  const outlines = ([3, 2, 1] as const).map((cols) => ({
    cols,
    paths: puzzleLayout(shown[cols].length, cols, 100 * cols + 7),
    index: shown[cols],
  }));
  const clipVars = (i: number) => {
    const v: Record<string, string> = {};
    for (const o of outlines) if (o.index.includes(i)) v[`--c${o.cols}`] = `url(#pz${o.cols}-${i})`;
    return v;
  };

  return (
    <>
      {/* The outlines. Zero-sized rather than display:none, which some browsers
          take as a reason to ignore a clip-path that points into it. */}
      <svg width="0" height="0" aria-hidden className="pz-defs">
        <defs>
          {outlines.flatMap((o) =>
            o.index.map((cellIndex, k) => (
              <clipPath
                key={`${o.cols}-${cellIndex}`}
                id={`pz${o.cols}-${cellIndex}`}
                clipPathUnits="objectBoundingBox"
              >
                <path d={o.paths[k]} />
              </clipPath>
            )),
          )}
        </defs>
      </svg>

      {/* The margin is set here, from the same number the outlines are drawn
          with, so the grid is pulled out by exactly as much as the tabs need. */}
      <ul className="puzzle" style={{ ["--edge" as string]: PIECE_MARGIN }}>
        {cells.map((cell, i) => {
          const clip = clipVars(i);
          if (cell.kind === "photo") {
            return (
              <li
                key={cell.photo.base}
                className="pz-cell pz-photo reveal-scale"
                data-c3={cell.photo.show3 ? "1" : "0"}
                data-c2={cell.photo.show2 ? "1" : "0"}
                aria-hidden
                style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
              >
                <div className="pz" style={clip}>
                  <Img
                    src={`${cell.photo.base}.webp`}
                    srcSet={srcSet(cell.photo.base)}
                    sizes="(min-width: 1100px) 360px, 50vw"
                    alt=""
                    width={1400}
                    height={1050}
                  />
                </div>
              </li>
            );
          }
          const { a } = cell;
          return (
            <li
              key={a.title + a.org}
              className="pz-cell reveal"
              style={{ ["--d" as string]: `${(i % 3) * 80}ms` }}
            >
              <div className="pz pz-text" style={clip}>
                <h3 className="pz-title">{a.title}</h3>
                <p className="pz-meta">
                  {a.org} - {a.period}
                </p>
                {a.description && <p className="pz-body">{a.description}</p>}
              </div>
            </li>
          );
        })}
      </ul>
    </>
  );
}
