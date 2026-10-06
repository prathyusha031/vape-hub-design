"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Image from "next/image";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { CTA } from "@/components/ui/CTA";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import type { HeroVideoFiles } from "@/lib/server/heroVideo";
import { ExhaleVapor, type ExhaleHandle } from "./ExhaleVapor";
import { cn } from "@/lib/utils/cn";

export interface HeroFlavor {
  id: string;
  name: string;
  series: string;
  notes: string;
  accent: string;
  tone: string;
  deviceImage: string;
}

export const HERO_FLAVORS: HeroFlavor[] = [
  {
    id: "peach",
    name: "White Peach Raspberry",
    series: "50,000 Puffs · Smart Display",
    notes: "Sun-ripened orchard white peach · Tart mountain raspberry frost",
    accent: "#D27D60",
    tone: "#F5ECE6",
    deviceImage: "/images/hero/flavor-peach.jpg",
  },
  {
    id: "ice",
    name: "Glacier Blue Freeze",
    series: "50,000 Puffs · Sub-Zero Core",
    notes: "Chilled alpine peppermint · Arctic winterberry frost",
    accent: "#6AA4C4",
    tone: "#E6EFF2",
    deviceImage: "/images/hero/flavor-ice.jpg",
  },
  {
    id: "vanilla",
    name: "Cream Vanilla Reserve",
    series: "50,000 Puffs · Double Bean",
    notes: "Tahitian double-cured vanilla bean · Silky whipped custard",
    accent: "#BA9A73",
    tone: "#F2ECE1",
    deviceImage: "/images/hero/flavor-vanilla.jpg",
  },
  {
    id: "bronze",
    name: "Smoked Bronze Oak",
    series: "50,000 Puffs · Flue-Cured Leaf",
    notes: "Cured Virginia leaf · Aged Kentucky cedar & burnt caramel",
    accent: "#8C6A4F",
    tone: "#EBE3D7",
    deviceImage: "/images/hero/flavor-bronze.jpg",
  },
];

// Physical Table Device Pins on the Honed Travertine Platter
const TABLE_DEVICES = [
  { id: "peach", flavorIdx: 0, x: "46.2%", y: "49%", name: "White Peach", accent: "#D27D60" },
  { id: "ice", flavorIdx: 1, x: "39.5%", y: "49%", name: "Glacier Blue", accent: "#6AA4C4" },
  { id: "vanilla", flavorIdx: 2, x: "53.1%", y: "49%", name: "Vanilla Cream", accent: "#BA9A73" },
  { id: "bronze", flavorIdx: 3, x: "59.8%", y: "49%", name: "Bronze Oak", accent: "#8C6A4F" },
];

const CHAPTERS = [
  { n: "01", label: "The Suite Arrival", range: "0% — 20%" },
  { n: "02", label: "The Flavor Table", range: "20% — 45%" },
  { n: "03", label: "Flavor Selection", range: "45% — 65%" },
  { n: "04", label: "Pickup & Usage", range: "65% — 80%" },
  { n: "05", label: "Volumetric Exhale", range: "80% — 92%" },
  { n: "06", label: "Product Hero Reveal", range: "92% — 100%" },
];

/**
 * HERO SCENE — CINEMATIC COMMERCIAL (15-YEAR CREATIVE DIRECTOR ARCHITECTURE)
 * 
 * SCROLL AS THE DIRECTOR:
 * - 0% — 25%: Wide Resort / Ocean Penthouse / Adult Person in Linen
 * - 25% — 50%: Discovery of the Table / Multiple Real Flavor Vapes on Marble
 * - 50% — 70%: Flavor Selection & Pickup Moment (Hand interacts with chosen vape)
 * - 70% — 88%: Tasteful Usage at Window & Massive Volumetric Sunlit Vapor Exhale
 * - 88% — 100%: Vapor Transition → The Vape becomes the 60% Hero Star on Stone
 * 
 * NO CLUTTERED ECOMMERCE SIDEBARS. QUIET, REFINED EDITORIAL LUXURY.
 */
export function HeroScene({ video: _videoFiles }: { video?: HeroVideoFiles }) {
  const root = useRef<HTMLElement>(null);
  const vapor = useRef<ExhaleHandle>(null);
  const { scrollTo } = useSmoothScroll();

  // Active state
  const [activeFlavorIdx, setActiveFlavorIdx] = useState(0);
  const [activeChapterIdx, setActiveChapterIdx] = useState(0);
  const [scrollPercent, setScrollPercent] = useState(0);

  // Layer references for pure GSAP GPU-driven interpolation
  const shot1Ref = useRef<HTMLDivElement>(null); // Wide Suite (Man at Ocean)
  const shot2Ref = useRef<HTMLDivElement>(null); // Table with multiple vapes
  const shot3Ref = useRef<HTMLDivElement>(null); // Man holding vape & exhaling
  const shot4Ref = useRef<HTMLDivElement>(null); // Macro flagship beauty shot

  const text1Ref = useRef<HTMLDivElement>(null);
  const text2Ref = useRef<HTMLDivElement>(null);
  const text3Ref = useRef<HTMLDivElement>(null);
  const text4Ref = useRef<HTMLDivElement>(null);

  const activeFlavor = HERO_FLAVORS[activeFlavorIdx];

  // Quick jump to scroll chapter
  const seekToChapter = (chapterIdx: number) => {
    if (!root.current) return;
    const trigger = ScrollTrigger.getById("hero-film-trigger");
    if (!trigger) return;
    const targets = [0.05, 0.32, 0.55, 0.72, 0.85, 0.96];
    const scrollPos = trigger.start + (trigger.end - trigger.start) * targets[chapterIdx];
    window.scrollTo({ top: scrollPos, behavior: "smooth" });
  };

  // GSAP SCROLLTRIGGER MASTER FILM DIRECTOR
  useGSAP(
    () => {
      const el = root.current;
      if (!el) return;

      const s1 = shot1Ref.current;
      const s2 = shot2Ref.current;
      const s3 = shot3Ref.current;
      const s4 = shot4Ref.current;

      const t1 = text1Ref.current;
      const t2 = text2Ref.current;
      const t3 = text3Ref.current;
      const t4 = text4Ref.current;

      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile }, (ctx) => {
        const { desktop } = ctx.conditions as { desktop: boolean };

        const scrollDist = desktop ? "+=360%" : "+=280%";

        const masterTl = gsap.timeline({
          scrollTrigger: {
            id: "hero-film-trigger",
            trigger: el,
            start: "top top",
            end: scrollDist,
            pin: true,
            scrub: 0.6,
            anticipatePin: 1,
            onUpdate: (self) => {
              const p = self.progress;
              setScrollPercent(Math.round(p * 100));

              // Compute active chapter index
              if (p < 0.22) setActiveChapterIdx(0);
              else if (p < 0.45) setActiveChapterIdx(1);
              else if (p < 0.65) setActiveChapterIdx(2);
              else if (p < 0.80) setActiveChapterIdx(3);
              else if (p < 0.92) setActiveChapterIdx(4);
              else setActiveChapterIdx(5);

              // Vapor physics tied directly to scroll progress
              const v = vapor.current;
              if (v) {
                if (p >= 0.68 && p <= 0.94) {
                  // Volumetric vapor bloom
                  const vaporAge = (p - 0.68) * 16; // 0.0 to 4.1
                  const rect = el.getBoundingClientRect();
                  v.set({
                    origin: [rect.width * 0.52, rect.height * 0.44],
                    dir: [0.94, -0.22],
                    light: [rect.width * 0.44, rect.height * 0.28],
                    age: vaporAge,
                    intensity: 3.2,
                    wisp: 0.95,
                    haze: 0.8,
                    drift: Math.min(1, (p - 0.75) * 4),
                  });
                } else {
                  v.set({ age: -1, wisp: 0.2, haze: 0.1 });
                }
              }
            },
          },
        });

        // -------------------------------------------------------------
        // BEAT 1: SHOT 01 · THE SUITE & PERSON LOOKING AT OCEAN (0.00 – 0.28)
        // -------------------------------------------------------------
        masterTl
          .to(s1, { scale: 1.05, duration: 0.35, ease: "none" }, 0)
          .to(t1, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.02)
          .to(t1, { autoAlpha: 0, y: -25, duration: 0.1 }, 0.22);

        // -------------------------------------------------------------
        // BEAT 2 & 3: SHOT 02 · TABLE & FLAVOR SELECTION (0.24 – 0.65)
        // -------------------------------------------------------------
        masterTl
          .fromTo(s2, { autoAlpha: 0, scale: 1.0 }, { autoAlpha: 1, scale: 1.04, duration: 0.22, ease: "power1.inOut" }, 0.22)
          .to(s1, { autoAlpha: 0, duration: 0.15 }, 0.28)
          .to(t2, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.28)
          .to(t2, { autoAlpha: 0, y: -25, duration: 0.1 }, 0.58);

        // -------------------------------------------------------------
        // BEAT 4 & 5: SHOT 03 · ADULT USAGE & VOLUMETRIC EXHALE (0.58 – 0.86)
        // -------------------------------------------------------------
        masterTl
          .fromTo(s3, { autoAlpha: 0, scale: 1.0 }, { autoAlpha: 1, scale: 1.05, duration: 0.22, ease: "power1.inOut" }, 0.58)
          .to(s2, { autoAlpha: 0, duration: 0.15 }, 0.64)
          .to(t3, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.66)
          .to(t3, { autoAlpha: 0, y: -25, duration: 0.1 }, 0.84);

        // -------------------------------------------------------------
        // BEAT 6: SHOT 04 · PRODUCT HERO REVEAL (0.84 – 1.00)
        // -------------------------------------------------------------
        masterTl
          .fromTo(s4, { autoAlpha: 0, scale: 1.0 }, { autoAlpha: 1, scale: 1.06, duration: 0.22, ease: "power1.inOut" }, 0.84)
          .to(s3, { autoAlpha: 0, duration: 0.15 }, 0.90)
          .to(t4, { autoAlpha: 1, y: 0, duration: 0.15 }, 0.88);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="top"
      aria-labelledby="hero-title"
      data-nav="light"
      className="hero-film relative h-[100svh] min-h-[660px] w-full overflow-hidden bg-[#16232B] select-none"
    >
      {/* ================= 1. CINEMATIC BACKGROUND FILM STACK ================= */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* SHOT 01: PENTHOUSE SUITE & ADULT PERSON AT OCEAN BALCONY */}
        <div
          ref={shot1Ref}
          className="absolute inset-0 z-10 will-change-transform"
        >
          <Image
            src="/images/hero/hero-01-resort-man.jpg"
            alt="Adult man in linen standing by resort ocean balcony"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* SHOT 02: THE FLAVOR TABLE WITH MULTIPLE PHYSICAL VAPES */}
        <div
          ref={shot2Ref}
          className="absolute inset-0 z-20 opacity-0 will-change-transform"
        >
          <Image
            src="/images/hero/hero-02-table-flavors.jpg"
            alt="Four distinct luxury flavor vapes on travertine table"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />

          {/* Interactive Physical Table Spotlights */}
          <div
            aria-label="Interactive Flavor Devices on Table"
            className="pointer-events-auto absolute inset-0 z-30"
          >
            {TABLE_DEVICES.map((dev) => {
              const isSelected = dev.flavorIdx === activeFlavorIdx;
              return (
                <button
                  key={dev.id}
                  type="button"
                  onClick={() => setActiveFlavorIdx(dev.flavorIdx)}
                  style={{ left: dev.x, top: dev.y }}
                  className="group absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
                  title={`Select ${dev.name}`}
                >
                  {/* Subtle Glowing Spotlight Ring */}
                  <div
                    className={cn(
                      "relative flex size-10 items-center justify-center rounded-full border transition-all duration-500",
                      isSelected
                        ? "border-[#F7F3EC] bg-white/95 shadow-[0_0_30px_rgba(255,255,255,1)] scale-115"
                        : "border-white/50 bg-black/40 backdrop-blur-sm group-hover:scale-110 group-hover:border-white",
                    )}
                  >
                    <span
                      className={cn(
                        "size-3 rounded-full transition-transform duration-300",
                        isSelected ? "scale-125" : "group-hover:scale-110",
                      )}
                      style={{ backgroundColor: dev.accent }}
                    />
                  </div>

                  {/* Micro Tooltip */}
                  <div
                    className={cn(
                      "pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-sm border border-[#E4D7C7]/80 bg-[#F7F3EC]/95 px-2.5 py-0.5 text-center shadow-lg backdrop-blur-md transition-all duration-300",
                      isSelected
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0",
                    )}
                  >
                    <span className="eyebrow !text-[0.52rem] font-bold text-[#1E211F]">
                      {dev.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* SHOT 03: ADULT MAN TAKING A DRAW & VOLUMETRIC VAPOR IN SUNLIGHT */}
        <div
          ref={shot3Ref}
          className="absolute inset-0 z-30 opacity-0 will-change-transform"
        >
          <Image
            src="/images/hero/hero-03-adult-vapor.jpg"
            alt="Adult man taking a vape draw by resort window"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* SHOT 04: PRODUCT HERO REVEAL ON ARCHITECTURAL TRAVERTINE */}
        <div
          ref={shot4Ref}
          className="absolute inset-0 z-40 opacity-0 will-change-transform"
        >
          <Image
            src="/images/hero/hero-04-macro-flagship.jpg"
            alt="Flagship Vape Hub device macro photography"
            fill
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>

        {/* Natural Sunlit Vignette */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-t from-[#16232B]/85 via-black/15 to-[#16232B]/40"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 z-40 bg-gradient-to-r from-[#16232B]/75 via-transparent to-[#16232B]/35"
        />
      </div>

      {/* ================= 2. VOLUMETRIC SUNLIT VAPOR SHADER ================= */}
      <ExhaleVapor
        ref={vapor}
        day
        className="pointer-events-none absolute inset-0 z-50 size-full"
      />

      {/* ================= 3. MINIMAL QUIET MASTHEAD (TOP) ================= */}
      <div className="pointer-events-none absolute inset-x-0 top-6 z-50 flex items-center justify-between px-gutter md:top-8">
        <div>
          <p className="eyebrow !text-[0.68rem] !tracking-[0.28em] text-[#F7F3EC]">
            THE VAPE HUB
          </p>
          <p className="eyebrow mt-0.5 !text-[0.52rem] !tracking-[0.22em] text-[#E4D7C7]/75">
            1281 WEST PUEBLO BOULEVARD · COLORADO 81004
          </p>
        </div>

        {/* Chapter Progress Pill */}
        <div className="flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-3 py-1 backdrop-blur-md">
          <span
            className="size-1.5 rounded-full animate-pulse"
            style={{ backgroundColor: activeFlavor.accent }}
          />
          <span className="eyebrow !text-[0.55rem] text-[#F7F3EC]/90">
            {CHAPTERS[activeChapterIdx].n} · {CHAPTERS[activeChapterIdx].label.toUpperCase()}
          </span>
          <span className="font-mono text-[0.55rem] text-white/50">
            {scrollPercent}%
          </span>
        </div>
      </div>

      {/* ================= 4. CINEMATIC EDITORIAL TEXT STACK ================= */}

      {/* ACT 01 TEXT: THE SUITE ARRIVAL */}
      <div
        ref={text1Ref}
        className="pointer-events-none absolute bottom-24 left-0 z-50 w-full max-w-xl px-gutter md:bottom-28 lg:max-w-2xl opacity-0 translate-y-5"
      >
        <div className="pointer-events-auto">
          <p className="eyebrow mb-2 !text-[0.62rem] !tracking-[0.24em] text-[#E4D7C7]">
            WELCOME TO THE VAPE HUB · PUEBLO, CO
          </p>
          <h1 id="hero-title" className="text-[#F7F3EC]">
            <span className="sr-only">The Vape Hub — The Art of the Draw</span>
            <span className="display block text-[clamp(2.4rem,4.5vw,4.8rem)] font-light leading-[1.04] tracking-[-0.02em]">
              The Art of the{" "}
              <span className="serif italic font-normal text-[clamp(2.8rem,5.2vw,5.5rem)] text-[#EFE8DC]">
                Draw<span className="not-italic text-[#C58E72]">.</span>
              </span>
            </span>
          </h1>
          <p className="mt-3.5 max-w-lg text-[0.95rem] leading-relaxed text-[#EFE8DC]/85 md:text-[1.08rem]">
            A new standard in vapor craftsmanship. Unhurried coastal luxury paired with small-batch formulations.
          </p>
          <div className="mt-5 flex items-center gap-3">
            <span className="border border-white/25 px-1.5 py-0.5 text-[0.55rem] font-mono text-[#F7F3EC]">
              21+
            </span>
            <span className="eyebrow !text-[0.58rem] text-[#E4D7C7]/70">
              Scroll down to discover the collection →
            </span>
          </div>
        </div>
      </div>

      {/* ACT 02 TEXT: THE FLAVOR TABLE */}
      <div
        ref={text2Ref}
        className="pointer-events-none absolute bottom-24 left-0 z-50 w-full max-w-xl px-gutter md:bottom-28 lg:max-w-2xl opacity-0 translate-y-5"
      >
        <div className="pointer-events-auto">
          <div className="mb-2 flex items-center gap-2">
            <span
              className="size-2 rounded-full"
              style={{ backgroundColor: activeFlavor.accent }}
            />
            <p className="eyebrow !text-[0.62rem] !tracking-[0.24em] text-[#E4D7C7]">
              02 · THE FLAVOR TABLE
            </p>
          </div>
          <h2 className="display text-[clamp(2.2rem,4vw,4.2rem)] font-light leading-[1.05] text-[#F7F3EC]">
            Customize Your{" "}
            <span className="serif italic text-[clamp(2.5rem,4.8vw,4.8rem)] text-[#EFE8DC]">
              Puff<span className="not-italic text-[#C58E72]">.</span>
            </span>
          </h2>
          <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-[#EFE8DC]/85 md:text-[1.02rem]">
            Four distinct profiles presented on honed travertine: White Peach Raspberry, Glacier Blue, Cream Vanilla, and Smoked Bronze Oak.
          </p>

          {/* Quiet Flavor Pill Selector */}
          <div className="mt-4 flex flex-wrap items-center gap-2">
            {HERO_FLAVORS.map((f, i) => {
              const isSelected = i === activeFlavorIdx;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setActiveFlavorIdx(i)}
                  className={cn(
                    "flex items-center gap-1.5 rounded-full border px-3 py-1.5 transition-all duration-300",
                    isSelected
                      ? "border-[#F7F3EC] bg-white/20 text-[#F7F3EC] shadow-sm backdrop-blur-md"
                      : "border-white/25 bg-black/30 text-white/70 hover:border-white/50 hover:text-white",
                  )}
                >
                  <span
                    className="size-2 rounded-full"
                    style={{ backgroundColor: f.accent }}
                  />
                  <span className="eyebrow !text-[0.56rem]">{f.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* ACT 03 TEXT: USAGE & VOLUMETRIC EXHALE */}
      <div
        ref={text3Ref}
        className="pointer-events-none absolute bottom-24 left-0 z-50 w-full max-w-xl px-gutter md:bottom-28 lg:max-w-2xl opacity-0 translate-y-5"
      >
        <div className="pointer-events-auto">
          <p className="eyebrow mb-2 !text-[0.62rem] !tracking-[0.24em] text-[#E4D7C7]">
            03 · VOLUMETRIC SUNLIT EXHALE
          </p>
          <h2 className="display text-[clamp(2.2rem,4vw,4.2rem)] font-light leading-[1.05] text-[#F7F3EC]">
            The Golden{" "}
            <span className="serif italic text-[clamp(2.5rem,4.8vw,4.8rem)] text-[#EFE8DC]">
              Draw<span className="not-italic text-[#C58E72]">.</span>
            </span>
          </h2>
          <p className="mt-3 max-w-lg text-[0.92rem] leading-relaxed text-[#EFE8DC]/85 md:text-[1.02rem]">
            Instant auto-aero sensor activation. Dense, velvety vapor rolls across the room, catching the morning sunbeams.
          </p>
          <div className="mt-4 flex items-center gap-2">
            <span
              className="size-2 rounded-full animate-ping"
              style={{ backgroundColor: activeFlavor.accent }}
            />
            <span className="eyebrow !text-[0.58rem] text-[#EFE8DC]">
              ACTIVE FLAVOR: {activeFlavor.name.toUpperCase()}
            </span>
          </div>
        </div>
      </div>

      {/* ACT 04 TEXT: PRODUCT HERO REVEAL */}
      <div
        ref={text4Ref}
        className="pointer-events-none absolute bottom-24 left-0 z-50 w-full max-w-xl px-gutter md:bottom-28 lg:max-w-2xl opacity-0 translate-y-5"
      >
        <div className="pointer-events-auto">
          <div className="mb-2 flex items-center gap-2">
            <span className="size-2 rounded-full bg-[#9E7C55]" />
            <p className="eyebrow !text-[0.62rem] !tracking-[0.24em] text-[#E4D7C7]">
              {activeFlavor.series.toUpperCase()}
            </p>
          </div>
          <h2 className="display text-[clamp(2.4rem,4.4vw,4.6rem)] font-light leading-[1.04] text-[#F7F3EC]">
            {activeFlavor.name}
          </h2>
          <p className="mt-2.5 max-w-lg text-[0.94rem] leading-relaxed text-[#EFE8DC]/90 md:text-[1.05rem]">
            {activeFlavor.notes}. Dual mesh 1.2Ω core, aerospace aluminum chassis, and small-batch organic nicotine salt reserve.
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CTA href="#story" onClick={() => scrollTo("#story")}>
              EXPLORE 360° ANATOMY →
            </CTA>
            <CTA href="#flavors" variant="line" onClick={() => scrollTo("#flavors")}>
              Explore 6 Flavor Worlds
            </CTA>
          </div>
        </div>
      </div>

      {/* ================= 5. MINIMAL BOTTOM DIRECTOR DOCK ================= */}
      <div className="pointer-events-auto absolute inset-x-0 bottom-5 z-50 flex items-center justify-between px-gutter md:bottom-7">
        {/* Chapter Stepper Buttons */}
        <div className="flex items-center gap-1.5 rounded-full border border-white/20 bg-black/45 p-1 px-3 backdrop-blur-md">
          {CHAPTERS.map((ch, idx) => {
            const isActive = idx === activeChapterIdx;
            return (
              <button
                key={ch.n}
                type="button"
                onClick={() => seekToChapter(idx)}
                className="group relative flex items-center gap-1 py-1"
                title={`${ch.n} · ${ch.label}`}
              >
                <span
                  className={cn(
                    "eyebrow !text-[0.52rem] transition-colors",
                    isActive ? "text-[#F7F3EC] font-bold" : "text-white/45 group-hover:text-white",
                  )}
                >
                  {ch.n}
                </span>
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-1 w-5 sm:w-8 rounded-full transition-all duration-300",
                    isActive ? "bg-[#EFE8DC]" : "bg-white/20 group-hover:bg-white/40",
                  )}
                />
              </button>
            );
          })}
        </div>

        {/* Scroll Instruction Cue */}
        <div className="hidden items-center gap-3 md:flex">
          <span className="eyebrow !text-[0.58rem] !tracking-[0.2em] text-white/60">
            SCROLL TO DIRECT THE FILM
          </span>
          <span className="relative h-px w-12 overflow-hidden bg-white/25">
            <span className="scroll-cue-x absolute inset-0 bg-white/80" />
          </span>
        </div>
      </div>
    </section>
  );
}
