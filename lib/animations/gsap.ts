"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  gsap.config({ nullTargetWarn: false });
}

/** Shared media-query conditions for gsap.matchMedia(). */
export const MQ = {
  desktop: "(min-width: 900px) and (prefers-reduced-motion: no-preference)",
  mobile: "(max-width: 899px) and (prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  wide: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
} as const;

export const EASE = {
  expo: "expo.out",
  cine: "power4.inOut",
  soft: "power2.out",
} as const;

export { gsap, ScrollTrigger, useGSAP };
