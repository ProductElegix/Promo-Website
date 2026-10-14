"use client";

import { useEffect } from "react";
import { captureAttribution } from "@/lib/attribution";

/** Records UTM tags and the referrer on the visitor's first page view (see lib/attribution.ts). */
export function Attribution() {
  useEffect(() => captureAttribution(), []);
  return null;
}
