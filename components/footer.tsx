import { profile } from "@/lib/content";

export function Footer() {
  return (
    <footer className="foot no-print">
      <div className="wrap">
        <span>
          © {new Date().getFullYear()} {profile.name}
        </span>
      </div>
    </footer>
  );
}
