"use client";

import Lenis from "lenis";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger } from "@/lib/animations/gsap";

type Ctx = { lenis: Lenis | null; scrollTo: (target: string | number | HTMLElement, offset?: number) => void };
const LenisContext = createContext<Ctx>({ lenis: null, scrollTo: () => {} });

export const useSmoothScroll = () => useContext(LenisContext);

/**
 * One Lenis instance, driven by GSAP's ticker so ScrollTrigger and Lenis share
 * a single RAF loop (no competing scroll listeners).
 * Disabled for prefers-reduced-motion — native scrolling takes over.
 */
export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.95,
    });
    lenisRef.current = instance;
    setLenis(instance);
    // The age gate may have locked scrolling before this effect ran (child effects run first)
    if (document.documentElement.style.overflow === "hidden") instance.stop();

    instance.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => instance.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      instance.destroy();
      lenisRef.current = null;
      setLenis(null);
    };
  }, []);

  // Lock scroll while the age gate is open
  useEffect(() => {
    const onLock = (e: Event) => {
      const locked = (e as CustomEvent<boolean>).detail;
      const l = lenisRef.current;
      if (locked) l?.stop();
      else l?.start();
    };
    window.addEventListener("vh:scroll-lock", onLock);
    return () => window.removeEventListener("vh:scroll-lock", onLock);
  }, []);

  const scrollTo: Ctx["scrollTo"] = (target, offset = 0) => {
    const l = lenisRef.current;
    if (l) {
      l.scrollTo(target as never, { offset, duration: 1.6 });
      return;
    }
    if (typeof target === "number") window.scrollTo({ top: target + offset });
    else {
      const el = typeof target === "string" ? document.querySelector(target) : target;
      if (el) window.scrollTo({ top: (el as HTMLElement).getBoundingClientRect().top + window.scrollY + offset });
    }
  };

  return <LenisContext.Provider value={{ lenis, scrollTo }}>{children}</LenisContext.Provider>;
}
