import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Build to plain HTML/CSS/JS in out/ so GitHub Pages can serve it.
  // There is no server, so anything server-side (API routes, on-demand
  // rendering) won't work — this site doesn't need any of it.
  output: "export",

  // Next's image optimizer needs a server; without this, next/image breaks
  // on a static host.
  images: { unoptimized: true },

  // Emit about/index.html rather than about.html, which is what Pages expects.
  trailingSlash: true,
};

export default nextConfig;
