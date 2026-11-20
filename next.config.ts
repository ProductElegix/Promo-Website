import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // the founder story now lives on the About page
    return [
      { source: "/story", destination: "/about#story", statusCode: 301 },
      // the check lives on the home page; keep old links working
      { source: "/life-balance-check", destination: "/#check", permanent: true },
      // life area pages live inside Guides now (/guides/health), and the areas overview is part of /guides
      // personal stories live under About
      { source: "/stories/:slug", destination: "/about/stories/:slug", permanent: true },
      { source: "/uk/stories/:slug", destination: "/uk/about/stories/:slug", permanent: true },
      { source: "/life-areas", destination: "/guides#areas", permanent: true },
      { source: "/life-areas/:area", destination: "/guides/:area", permanent: true },
      { source: "/uk/life-areas", destination: "/uk/guides#areas", permanent: true },
      { source: "/uk/life-areas/:area", destination: "/uk/guides/:area", permanent: true },
    ];
  },
};

export default nextConfig;
