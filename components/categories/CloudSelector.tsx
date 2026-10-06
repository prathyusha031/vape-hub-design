"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { CTA } from "@/components/ui/CTA";
import { cn } from "@/lib/utils/cn";

export interface ProductWorld {
  id: string;
  index: string;
  title: string;
  subtitle: string;
  atmosphere: string;
  description: string;
  roomPhoto: string;
  primaryImage: string;
  secondaryImage: string;
  surfaceTone: string;
  accent: string;
  routeHref: string;
}

const WORLDS: ProductWorld[] = [
  {
    id: "disposables",
    index: "01",
    title: "DISPOSABLES",
    subtitle: "Minimal. Portable. Effortless.",
    atmosphere: "Room 01 · Limestone Architecture · Clean Daylight",
    description:
      "Ready the moment you unseal it — zero refilling, zero tuning. Balanced in weight and calibrated for effortless everyday companionship.",
    roomPhoto: "/images/rooms/disposable.jpg",
    primaryImage: "/images/day/hero.webp",
    secondaryImage: "/images/day/disp-white.webp",
    surfaceTone: "#EFE8DC",
    accent: "#9E7C55",
    routeHref: "#collection",
  },
  {
    id: "pods",
    index: "02",
    title: "POD SYSTEMS",
    subtitle: "Compact. Refillable. Refined.",
    atmosphere: "Room 02 · Sunlit Lounge · Natural Wood & Ocean Light",
    description:
      "Engineered for the pocket with magnetic drop-in pods you can replace or refill. We walk you through pods, coil longevity, and charging in store.",
    roomPhoto: "/images/rooms/pod.jpg",
    primaryImage: "/images/day/pod-gunmetal.webp",
    secondaryImage: "/images/day/pod-sand.webp",
    surfaceTone: "#E4D7C7",
    accent: "#7895A3",
    routeHref: "#collection",
  },
  {
    id: "mods",
    index: "03",
    title: "MODS & KITS",
    subtitle: "Performance. Control. Character.",
    atmosphere: "Room 03 · Deep Charcoal Stone · Architectural Evening",
    description:
      "For experienced adults who demand precision wattage and tailored draw resistance. Bring your setup in — we service tanks, atomizers, and upkeep.",
    roomPhoto: "/images/rooms/mod.jpg",
    primaryImage: "/images/day/mod-obsidian.webp",
    secondaryImage: "/images/day/mod-silver.webp",
    surfaceTone: "#1E211F",
    accent: "#C58E72",
    routeHref: "#collection",
  },
];

/**
 * SECTION 03 — PRODUCT WORLDS
 * Completely redesigned editorial product compositions:
 * - High-impact product cinematography with layered secondary silhouettes
 * - Large architectural typography: DISPOSABLES · POD SYSTEMS · MODS
 * - Interactive hover states where products lift, light shifts, and textures sharpen
 * - Distinct solid architectural room environments
 */
export function CloudSelector() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        gsap.from(q("[data-head] > *"), {
          y: 28,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-head]")[0], start: "top 80%" },
        });

        q("[data-world-spread]").forEach((spread) => {
          const r = gsap.utils.selector(spread);
          gsap.fromTo(
            r("[data-world-primary]"),
            { yPercent: 6, scale: 0.96 },
            {
              yPercent: -4,
              scale: 1,
              ease: "none",
              scrollTrigger: { trigger: spread, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
          gsap.fromTo(
            r("[data-world-secondary]"),
            { yPercent: 10 },
            {
              yPercent: -8,
              ease: "none",
              scrollTrigger: { trigger: spread, start: "top bottom", end: "bottom top", scrub: true },
            },
          );
          gsap.from(r("[data-world-copy] > *"), {
            y: 24,
            autoAlpha: 0,
            stagger: 0.07,
            duration: 1.1,
            ease: "expo.out",
            scrollTrigger: { trigger: spread, start: "top 68%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="cloud"
      data-nav="light"
      aria-labelledby="wyc-title"
      className="relative bg-[#F7F3EC] pb-24 pt-28 md:pb-36 md:pt-40"
    >
      {/* Chapter 03 Header */}
      <div data-head className="grid grid-cols-1 gap-8 px-gutter md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-[#59534c]">
            <span className="size-1.5 rounded-full bg-[#9E7C55]" />
            Chapter 03 — Product Worlds
          </p>
          <h2 id="wyc-title" className="text-[#1E211F]">
            <span className="display block text-[clamp(2.4rem,4.4vw,4.8rem)]">THREE FORMATS.</span>
            <span className="serif block text-[clamp(2.8rem,5.6vw,6rem)] italic leading-[0.9]">
              One standard of craft.
            </span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#59534c] md:col-span-4 md:col-start-9">
          Each format offers a different sensory cadence. Select the architecture that integrates seamlessly into your daily
          routine.
        </p>
      </div>

      {/* Three Distinct Editorial Product Compositions */}
      <div className="mt-20 space-y-28 md:mt-32 md:space-y-40">
        {WORLDS.map((w, idx) => {
          const isFlipped = idx % 2 === 1;
          const isDark = w.surfaceTone === "#1E211F";

          return (
            <article
              key={w.id}
              id={`format-${w.id}`}
              data-world-spread
              className="px-gutter"
              aria-labelledby={`world-title-${w.id}`}
            >
              <div
                className={cn(
                  "group relative grid grid-cols-1 items-center gap-10 overflow-hidden border border-[#1E211F]/10 p-6 md:grid-cols-12 md:gap-12 md:p-12 lg:p-16 transition-colors duration-700",
                  isDark ? "bg-[#1E211F] text-[#F7F3EC]" : "bg-[#EFE8DC] text-[#1E211F]",
                )}
              >
                {/* Visual Half: Layered Product Cinematography */}
                <div
                  className={cn(
                    "relative aspect-[4/3] w-full overflow-hidden border border-[#1E211F]/10 sm:aspect-[16/11] md:col-span-7 md:aspect-[16/10]",
                    isFlipped && "md:order-2 md:col-start-6",
                  )}
                >
                  {/* Architectural Room Plate in the background */}
                  <div className="absolute inset-[-4%]">
                    <Image
                      src={w.roomPhoto}
                      alt=""
                      fill
                      sizes="(max-width: 900px) 100vw, 60vw"
                      className="object-cover transition-transform duration-1000 ease-[var(--ease-expo)] group-hover:scale-105"
                    />
                  </div>

                  {/* Solid stone plinth baseline inside the frame */}
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-[22%]"
                    style={{ backgroundColor: w.surfaceTone }}
                  />
                  <div
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[22%] h-px bg-[#F7F3EC]/40"
                  />

                  {/* Secondary Product Silhouette (Depth Layer) */}
                  <div
                    data-world-secondary
                    className="absolute bottom-[10%] left-[24%] h-[56%] w-[32%] opacity-65 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:scale-105 group-hover:opacity-85"
                  >
                    <Image
                      src={w.secondaryImage}
                      alt=""
                      fill
                      sizes="220px"
                      className="object-contain object-bottom drop-shadow-md"
                    />
                  </div>

                  {/* Primary Hero Product (Dominant Focus, ~70% of frame height) */}
                  <div
                    data-world-primary
                    className="absolute bottom-[9%] left-[54%] h-[72%] w-[42%] -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2 group-hover:scale-105"
                  >
                    <div
                      aria-hidden="true"
                      className="contact-shadow absolute bottom-[12%] left-1/2 h-[5%] w-[38%] -translate-x-1/2"
                    />
                    <Image
                      src={w.primaryImage}
                      alt={`${w.title} flagship device`}
                      fill
                      sizes="(max-width: 900px) 60vw, 32vw"
                      className="object-contain object-bottom drop-shadow-xl"
                    />
                  </div>

                  {/* Specular sheen sweep on hover */}
                  <div
                    aria-hidden="true"
                    className="device-sheen pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-40"
                  />

                  {/* Discrete Atmosphere Caption Tag */}
                  <div className="absolute bottom-4 left-4 border border-[#E4D7C7] bg-[#F7F3EC]/90 px-3 py-1.5 backdrop-blur-sm">
                    <p className="eyebrow !text-[0.58rem] text-[#1E211F]">{w.atmosphere}</p>
                  </div>
                </div>

                {/* Editorial Content Half */}
                <div
                  data-world-copy
                  className={cn(
                    "md:col-span-5 md:py-6",
                    isFlipped ? "md:order-1 md:col-start-1 md:pr-6" : "md:col-start-8 md:pl-6",
                  )}
                >
                  <p className="eyebrow flex items-center gap-2" style={{ color: w.accent }}>
                    <span>{w.index}</span>
                    <span className="h-px w-6" style={{ backgroundColor: w.accent }} />
                    <span>The Format</span>
                  </p>

                  <h3
                    id={`world-title-${w.id}`}
                    className="display mt-4 text-[clamp(2.4rem,3.8vw,4.2rem)] tracking-tight leading-none"
                  >
                    {w.title}
                  </h3>

                  <p
                    className={cn(
                      "serif mt-3 text-[clamp(1.4rem,2vw,1.8rem)] italic leading-snug",
                      isDark ? "text-[#F7F3EC]/90" : "text-[#1E211F]/90",
                    )}
                  >
                    {w.subtitle}
                  </p>

                  <p
                    className={cn(
                      "mt-5 text-sm leading-relaxed",
                      isDark ? "text-[#F7F3EC]/70" : "text-[#59534c]",
                    )}
                  >
                    {w.description}
                  </p>

                  {/* Interactive CTA */}
                  <div className="mt-8 flex items-center gap-4">
                    <CTA href={w.routeHref} variant={isDark ? "line" : "solid"}>
                      EXPLORE {w.title} →
                    </CTA>
                  </div>
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
