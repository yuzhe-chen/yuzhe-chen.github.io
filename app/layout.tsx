import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/lib/content";
import { RevealInit } from "@/components/reveal";
import "./globals.css";

// The fallback for systems without San Francisco. Apple devices use their own
// system font through the stack in globals.css.
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// Just the name, as it's headed on the page itself. This is also the line
// Google prints as the search result, so the description below is left to do
// the work of saying which Yuzhe Chen this is.
const pageTitle = profile.shortName;

export const metadata: Metadata = {
  // Makes the relative URLs below absolute. Without it, a relative path in any
  // URL-based metadata field is a build error.
  metadataBase: new URL(profile.siteUrl),
  title: pageTitle,
  description: profile.metaDescription,
  // One page, one address. Stops the same content being indexed under several
  // near-identical URLs, which splits whatever ranking it earns.
  alternates: { canonical: "/" },
  authors: [{ name: profile.name, url: profile.siteUrl }],
  creator: profile.name,
  // Proves to Google Search Console that this site is his. Search Console
  // re-checks it periodically, so it has to stay on the page -- removing it
  // later drops the verification.
  verification: {
    google: "DQcjKmVSjrZ2JVfw5XWrty3bvBaI3k-5MMs2LYxleK8",
  },
  openGraph: {
    title: pageTitle,
    description: profile.metaDescription,
    type: "profile",
    url: "/",
    siteName: profile.name,
    images: [{ url: "/portrait-light.jpg", alt: profile.name }],
  },
  twitter: {
    card: "summary",
    title: pageTitle,
    description: profile.metaDescription,
    images: ["/portrait-light.jpg"],
  },
  // Said out loud rather than left to the default. The large-image preview is
  // what lets Google show the portrait beside the result.
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

// Sets the saved theme and marks the page as script-enabled before first paint,
// so there is no white flash and the reveal styles apply only when scripts run.
// Has to be inline and blocking to do either.
const INIT = `(function(){var d=document.documentElement;d.classList.add('js');try{var t=localStorage.getItem('theme');if(t==='dark'||t==='light'){d.setAttribute('data-theme',t)}}catch(e){}})()`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    // The script below stamps data-theme and the js class on this element
    // before React hydrates, which React would otherwise report as a mismatch.
    // Both are deliberate, so tell React to leave them alone.
    <html
      lang="en"
      // Next 16 leaves a page-wide smooth scroll alone on navigation, so a new
      // page would glide down from wherever the last one was left. This asks
      // it to jump to the top first, as it did before.
      data-scroll-behavior="smooth"
      suppressHydrationWarning
      className={`${inter.variable} h-full`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: INIT }} />
      </head>
      <body className="flex min-h-full flex-col antialiased">
        {children}
        <RevealInit />
      </body>
    </html>
  );
}
