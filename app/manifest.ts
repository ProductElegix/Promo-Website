import type { MetadataRoute } from "next";
import { META } from "@/lib/content";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Elegix",
    short_name: "Elegix",
    description: META.description,
    start_url: "/",
    display: "browser",
    background_color: "#f3f2ed",
    theme_color: "#f3f2ed",
    icons: [
      { src: "/icon.svg", type: "image/svg+xml", sizes: "any" },
      { src: "/apple-icon.png", type: "image/png", sizes: "180x180" },
    ],
  };
}
