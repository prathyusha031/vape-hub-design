import fs from "node:fs";
import path from "node:path";
import { heroMedia } from "@/lib/data/site";

export type VideoSource = { src: string; type: string };
export type HeroVideoFiles = {
  desktop: { sources: VideoSource[]; typeAt: number };
  mobile: { sources: VideoSource[]; typeAt: number };
};

/**
 * Server-side check for the hero film files in /public/videos.
 * Runs during render (at build time in production), so the browser never
 * requests a file that isn't there — no 404s, no probing.
 */
export function availableHeroVideo(): HeroVideoFiles {
  const exists = (s: VideoSource) => {
    try {
      return fs.statSync(path.join(process.cwd(), "public", s.src)).size > 0;
    } catch {
      return false;
    }
  };
  return {
    desktop: { sources: heroMedia.desktop.sources.filter(exists), typeAt: heroMedia.desktop.typeAt },
    mobile: { sources: heroMedia.mobile.sources.filter(exists), typeAt: heroMedia.mobile.typeAt },
  };
}
