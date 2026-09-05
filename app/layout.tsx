import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: `${profile.name}-${profile.school}`,
  description: profile.metaDescription,
  openGraph: {
    title: profile.name,
    description: profile.metaDescription,
    type: "profile",
  },
};

// Applies the saved theme before first paint, so a dark-mode visitor never
// gets a white flash. Has to be inline and blocking to do that.
const THEME_INIT = `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){document.documentElement.setAttribute('data-theme',t)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The theme script below stamps data-theme on this element before React
    // hydrates, which React would otherwise report as a mismatch. The
    // attribute is deliberate, so tell React to leave it alone.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} h-full scroll-smooth`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: THEME_INIT }} />
      </head>
      <body className="min-h-full flex flex-col antialiased">{children}</body>
    </html>
  );
}
