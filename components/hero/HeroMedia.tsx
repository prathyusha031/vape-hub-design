"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { heroMedia } from "@/lib/data/site";
import type { HeroVideoFiles, VideoSource } from "@/lib/server/heroVideo";

export type MediaStatus = "checking" | "video" | "fallback";

function pick(list: VideoSource[]): VideoSource | null {
  const probe = document.createElement("video");
  return list.find((s) => probe.canPlayType(s.type) !== "") ?? null;
}

/**
 * Real hero footage, when it exists (checked on the server).
 * - desktop and mobile cuts with their own `typeAt`
 * - autoplay · muted · loop · playsInline · object-cover
 * - falls back (onStatus "fallback") on decode error or a stall
 */
export const HeroMedia = forwardRef<
  HTMLVideoElement,
  { files: HeroVideoFiles; onStatus: (s: MediaStatus, typeAt?: number) => void }
>(function HeroMedia({ files, onStatus }, ref) {
  const [src, setSrc] = useState<VideoSource | null>(null);
  const typeAt = useRef(11.9);
  const [poster, setPoster] = useState<string | undefined>(undefined);
  const playing = useRef(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const saveData = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData;
    if (reduce || saveData) {
      onStatus("fallback");
      return;
    }
    const mobile = window.matchMedia("(max-width: 899px)").matches;
    const m = mobile ? pick(files.mobile.sources) : null;
    const found = m ?? pick(files.desktop.sources);
    typeAt.current = m ? files.mobile.typeAt : files.desktop.typeAt;
    setPoster(mobile ? heroMedia.poster.mobile : heroMedia.poster.desktop);
    if (!found) onStatus("fallback");
    else setSrc(found);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (!src) return;
    const id = window.setTimeout(() => {
      if (!playing.current) {
        setSrc(null);
        onStatus("fallback");
      }
    }, 6000);
    return () => window.clearTimeout(id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  if (!src) return null;

  return (
    <div data-hero-video className="absolute inset-0">
      <video
        ref={ref}
        src={src.src}
        poster={poster}
        autoPlay
        muted
        loop
        playsInline
        preload="auto"
        disablePictureInPicture
        onPlaying={() => {
          playing.current = true;
          onStatus("video", typeAt.current);
        }}
        onError={() => {
          setSrc(null);
          onStatus("fallback");
        }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </div>
  );
});
