/**
 * Jigsaw outlines for the Activities pieces, drawn as SVG paths in the unit
 * square so a clip-path with `clipPathUnits="objectBoundingBox"` stretches them
 * to whatever size the piece ends up.
 *
 * Each piece is a rounded square with a margin all round for its tabs to stand
 * in. The pieces are never joined: the margins leave a clear space between any
 * two of them. But they are cut to fit. Wherever two pieces face each other in
 * the grid, one has a tab on that side and the other has a notch of the same
 * size in the same place, dead centre on the edge, so each one could be pushed
 * into the next. Edges with nobody facing them are flat. Which side gets the tab
 * and how big it is are picked at random from a seeded generator, so the pieces
 * differ but are the same on every build and every visit.
 *
 * The grid is three across on a laptop, two on a tablet and one on a phone, and
 * who faces whom changes with it, so the outlines are worked out for each.
 */

/** The margin the tabs stand in, as a share of the piece's own width. */
export const PIECE_MARGIN = 0.085;
/**
 * How far each piece's box reaches into its neighbours' cells, as a share of the
 * cell. The boxes overlap, the pieces inside them don't: this is what closes the
 * space between two pieces without shrinking their tabs, which need the margin
 * above to stand in. The gap between two bodies comes out at about 9% of a cell.
 */
export const PIECE_PULL = 0.05;
/**
 * How far a piece's body sits in from the edge of its cell once the boxes are
 * pulled out. The grid is pulled out by this much on each side, so the outer
 * pieces line up with the page's margin.
 */
export const PIECE_OUT = PIECE_MARGIN * (1 + 2 * PIECE_PULL) - PIECE_PULL;
const CORNER = 0.03;

/** A small seeded generator (mulberry32): the same seed gives the same run. */
function seeded(seed: number) {
  let a = seed | 0;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** One edge: nothing, a tab sticking out (1) or a notch cut in (-1). */
type Edge = { kind: 0 | 1 | -1; c: number; nw: number; d: number };
/** A piece's four edges, clockwise from the top. */
type Sides = [Edge, Edge, Edge, Edge];

const TOP = 0;
const RIGHT = 1;
const BOTTOM = 2;
const LEFT = 3;

/**
 * The outlines for `n` pieces laid out `cols` across, in reading order.
 * Neighbours get matching tab and notch; edges on the outside of the grid, with
 * nobody to face, get a free choice.
 */
export function puzzleLayout(n: number, cols: number, seed: number): string[] {
  const r = seeded(seed);
  const flat: Edge = { kind: 0, c: 0.5, nw: 0.09, d: 0.05 };
  const sides: Sides[] = Array.from({ length: n }, () => [flat, flat, flat, flat] as Sides);

  const fresh = (kind: 1 | -1): Edge => ({
    kind,
    // dead centre on its edge; how wide the neck is, how deep it goes. The depth
    // stays within the gap between two bodies, so a tab never reaches the
    // piece it faces.
    c: 0.5,
    nw: 0.036 + r() * 0.012,
    d: 0.04 + r() * 0.012,
  });
  // Two pieces facing each other: a tab on one, the same notch on the other. The
  // two edges run in opposite directions, so the position is mirrored.
  const pair = (a: number, ea: number, b: number, eb: number) => {
    const out = fresh(r() < 0.5 ? 1 : -1);
    sides[a][ea] = out;
    sides[b][eb] = { ...out, kind: (out.kind * -1) as 1 | -1, c: 1 - out.c };
  };

  for (let k = 0; k < n; k++) {
    if (k % cols < cols - 1 && k + 1 < n) pair(k, RIGHT, k + 1, LEFT);
    if (k + cols < n) pair(k, BOTTOM, k + cols, TOP);
  }
  // The outside edges stay flat: they point at nothing.
  return sides.map(outline);
}

function outline(edges: Sides): string {
  const M = PIECE_MARGIN;
  const L = 1 - 2 * M;
  const a = CORNER / L;
  // A point on edge i: u along it (0 to 1), v out from it (positive is outward).
  // The edges run clockwise: top, right, bottom, left.
  const at = (i: number, u: number, v: number): [number, number] => {
    switch (i) {
      case TOP:
        return [M + u * L, M - v];
      case RIGHT:
        return [1 - M + v, M + u * L];
      case BOTTOM:
        return [1 - M - u * L, 1 - M + v];
      default:
        return [M - v, 1 - M - u * L];
    }
  };
  const p = ([x, y]: [number, number]) => `${x.toFixed(4)} ${y.toFixed(4)}`;

  let path = `M ${p(at(0, a, 0))}`;
  edges.forEach((e, i) => {
    if (e.kind !== 0) {
      const dd = e.kind * e.d;
      const hw = e.nw * 1.5; // the head is wider than the neck
      const { c, nw } = e;
      path +=
        ` L ${p(at(i, c - nw, 0))}` +
        ` C ${p(at(i, c - nw, 0.25 * dd))} ${p(at(i, c - hw, 0.25 * dd))} ${p(at(i, c - hw, 0.6 * dd))}` +
        ` C ${p(at(i, c - hw, 1.05 * dd))} ${p(at(i, c - hw * 0.45, 1.05 * dd))} ${p(at(i, c, 1.05 * dd))}` +
        ` C ${p(at(i, c + hw * 0.45, 1.05 * dd))} ${p(at(i, c + hw, 1.05 * dd))} ${p(at(i, c + hw, 0.6 * dd))}` +
        ` C ${p(at(i, c + hw, 0.25 * dd))} ${p(at(i, c + nw, 0.25 * dd))} ${p(at(i, c + nw, 0))}`;
    }
    path += ` L ${p(at(i, 1 - a, 0))}`;
    // round the corner into the next edge
    path += ` Q ${p(at(i, 1, 0))} ${p(at((i + 1) % 4, a, 0))}`;
  });
  return path + " Z";
}
