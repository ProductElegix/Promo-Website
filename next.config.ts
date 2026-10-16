import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // the founder story now lives on the About page
    return [
      { source: "/story", destination: "/about#story", statusCode: 301 },
      // the check lives on the home page; keep old links working
      { source: "/life-balance-check", destination: "/#check", permanent: true },
      // What is Elegix and About are one page
      { source: "/what-is-elegix", destination: "/about", permanent: true },
    ];
  },
};

export default nextConfig;
