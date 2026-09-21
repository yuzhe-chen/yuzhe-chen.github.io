import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { profile } from "@/lib/content";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

// The title leads with the name and says what he does, because that is the
// line Google prints as the search result, and "pianist" is the word someone
// adds when more than one Julian Chen exists.
const pageTitle = `${profile.name} — Pianist`;

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
