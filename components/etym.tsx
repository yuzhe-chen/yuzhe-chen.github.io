import { etymologies } from "@/lib/etymology";

/** The line, or lines, of etymology under a section heading: one per word in it. */
export function Etym({ k }: { k: keyof typeof etymologies }) {
  return (
    <p className="etym reveal" style={{ ["--d" as string]: "80ms" }}>
      {etymologies[k].map((e) => (
        <span key={e.word} className="etym-line">
          {e.word} ·{" "}
          {e.parts.map((p, i) => (typeof p === "string" ? p : <em key={i}>{p.t}</em>))}
        </span>
      ))}
    </p>
  );
}
