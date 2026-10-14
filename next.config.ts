import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: { formats: ["image/avif", "image/webp"] },
  async redirects() {
    // the founder story now lives on the About page
    return [{ source: "/story", destination: "/about#story", statusCode: 301 }];
  },
};

export default nextConfig;
