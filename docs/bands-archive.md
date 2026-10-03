# Archived: the bands system

**Parked 2026-10-03, during the mobile redesign.** Nothing imports this; it is
here to be pasted back if we want it again. Git history has it too, at commit
`e831093` and earlier.

A reminder on the vocabulary (see the README): **band** is a mobile-only idea —
the short strip of picture behind a heading, below `lg`, where the label sits
above the writing rather than beside it. **Wallpaper** is the laptop two-column
format and is **not** archived; it is still live. The **profile picture** was
never part of this system.

What replaced it: on mobile the photograph now fills the whole section, under
the writing as well as the label, with a much heavier wash over it
(`.section-veil` / `MobileBackdrop`).

## Which section wore which band

Taken from `app/page.tsx` as it stood. `WALLPAPERS` was
`["/hero-bridge", "/hero-houses", "/hero-canal"]`.

| Section | Photograph | Crop |
| --- | --- | --- |
| Biography | `WALLPAPERS[0]` hero-bridge | `object-[50%_16%]` |
| Activities | `WALLPAPERS[0]` hero-bridge | `object-[50%_16%]` |
| Performances | `WALLPAPERS[0]` hero-bridge | `object-[50%_74%]` |
| Selected Honors | `WALLPAPERS[1]` hero-houses | `object-[50%_16%]` |
| Venues | `WALLPAPERS[2]` hero-canal | `object-[50%_14%]` |
| Languages | `WALLPAPERS[2]` hero-canal | `object-[50%_72%]` |

Performances was the one section that had a band and no wallpaper: a strip
behind its heading, nothing behind the videos on a laptop.

## The component

From `app/page.tsx`. It relied on `Photo`, which is still there — though `Photo`
now takes an `overlay` prop, so restoring this means passing nothing (the
default is still `section-fade`).

```tsx
/**
 * A band: the strip of photograph behind a heading, below `lg`, where the
 * label sits above the writing. Its height is the heading's own, with matching
 * air above and below — see `heading-band`.
 *
 * A section can have one of these without having a wallpaper, and the other
 * way round. `position` is which part of the picture survives the crop, so two
 * sections can share a photograph and show different parts of it.
 */
function HeadingBand({ base, position }: { base: string; position: string }) {
  return (
    <div
      aria-hidden
      className="heading-band absolute left-1/2 top-0 -z-10 w-screen -translate-x-1/2 overflow-hidden lg:hidden"
    >
      <Photo base={base} position={position} />
    </div>
  );
}
```

## The height rule

From `app/globals.css`. The clamps have to stay in step with `.display`, which
is still live — if its sizes have changed since, these need changing with them.

```css
/*
 * The band behind a heading is the heading's own line plus equal air above and
 * below it, so the picture shows the same amount over the words as under them.
 * Derived from the label's size rather than set to a number, or the two sides
 * stop matching the moment the type scales.
 *
 * `2.5rem` is the section's top padding counted twice — once for the real
 * space above the words, once to answer it underneath. `0.88` is the label's
 * line-height, which turns its font size into the height of the line itself.
 *
 * Any further space between the band and the writing below is the page's own
 * colour: the grid's row gap, not more photograph.
 */
.heading-band {
  height: calc(2.5rem + 0.88 * clamp(1.5rem, 9vw, 3rem));
}
@media (min-width: 640px) {
  .heading-band {
    height: calc(2.5rem + 0.88 * clamp(2.5rem, 7.5vw, 5.5rem));
  }
}
/* From `lg` the label moves beside the text and the photograph fills the
   section instead, so the height comes from the insets. */
@media (min-width: 1024px) {
  .heading-band {
    height: auto;
  }
}
```

## The lightened wash

Also from `app/globals.css`. A band carried one line of giant type and nothing
else, so the wash over it could be far lighter than the one the laptop
wallpapers need. This override is what made that true, and it is the piece that
does **not** come back as-is: the mobile picture now sits under paragraphs, so
it needs `.section-veil`'s much heavier cover instead.

```css
/*
 * Below `lg` the same fade is covering a band — a strip behind a heading, not
 * a field behind paragraphs — so it can be laid on much more lightly. There is
 * only one line of type over it, and that line has no block of page colour
 * behind it at these widths precisely so the photograph can be seen.
 */
@media (max-width: 1023px) {
  .section-fade {
    background:
      linear-gradient(
        to right,
        color-mix(in srgb, var(--bg) 18%, transparent) 0%,
        color-mix(in srgb, var(--bg) 40%, transparent) 42%,
        var(--bg) 78%
      );
  }
}
```

## Restoring it

1. Paste `HeadingBand` back into `app/page.tsx` beside `SectionWallpaper`.
2. Paste `.heading-band` back into `app/globals.css`.
3. Decide whether mobile keeps the full-section picture as well. If not, drop
   the `mobileBackdrop` props and `.section-veil`, and bring the
   `max-width: 1023px` `.section-fade` override back.
4. Wire the table above through `Section`'s `mobileBackdrop` slot — the prop
   that now carries whatever mobile puts behind a section.
