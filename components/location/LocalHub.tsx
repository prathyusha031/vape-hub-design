"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { site } from "@/lib/data/site";
import { CTA } from "@/components/ui/CTA";

const pillars = [
  { t: "Local Expertise", d: "Ask neighbors who handle these devices every single day, right on West Pueblo Blvd." },
  { t: "Honest Guidance", d: "Not sure where to begin? We walk you through every option calmly, without pressure." },
  { t: "Hardware Support", d: "Pods, coils, refills, charging — bring your setup in and we’ll personally inspect it." },
];

/**
 * SECTION 07 — LOCAL EXPERIENCE
 * Introduce the physical store/location in Pueblo, Colorado.
 * Headline: COME VISIT. PUEBLO, COLORADO
 * Elegant architectural map/location treatment with verified store data.
 * CTA: GET DIRECTIONS →
 * Solid colors without gradient backgrounds.
 */
export function LocalHub() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        // Landscape subtle parallax
        gsap.fromTo(
          q("[data-land]"),
          { yPercent: -6, scale: 1.06 },
          {
            yPercent: 6,
            scale: 1,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // Headline entrance
        gsap.from(q("[data-place] > *"), {
          y: 34,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-place]")[0], start: "top 80%" },
        });

        // Destination card entrance
        gsap.from(q("[data-card-visit]"), {
          y: 40,
          autoAlpha: 0,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-card-visit]")[0], start: "top 90%" },
        });

        // Map vector entrance
        gsap.from(q("[data-map-vector]"), {
          scale: 0.94,
          autoAlpha: 0,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-map-vector]")[0], start: "top 85%" },
        });
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="visit" data-nav="light" aria-labelledby="local-title" className="relative bg-[#F7F3EC]">
      {/* Landscape Hero View (Pueblo Golden Hour) */}
      <div className="relative h-[72svh] min-h-[480px] overflow-hidden md:h-[90svh] md:min-h-[640px]">
        <div data-land className="absolute inset-0">
          <picture>
            <source media="(max-width: 899px)" srcSet="/images/place/pueblo-m.jpg" />
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/images/place/pueblo-d.jpg"
              alt="Golden hour landscape overlooking Pueblo, Colorado"
              loading="lazy"
              decoding="async"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </picture>
        </div>

        {/* Solid architectural frame overlay at base of image */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-28 bg-[#F7F3EC]" />

        {/* Main Section Headline: COME VISIT. */}
        <div data-place className="absolute inset-x-0 bottom-[4svh] px-gutter md:bottom-[6svh]">
          <p className="eyebrow flex items-center gap-3 text-[#1E211F]">
            <span className="size-1.5 rounded-full bg-[#9E7C55]" />
            Chapter 07 — The Destination
          </p>
          <h2 id="local-title" className="mt-3 text-[#1E211F]">
            <span className="display block text-[clamp(2.4rem,5.6vw,6rem)] leading-[0.88]">COME VISIT.</span>
            <span className="serif mt-1 block text-[clamp(2.6rem,7vw,7.6rem)] italic leading-[0.86]">
              PUEBLO<span className="not-italic text-[#9E7C55]">,</span> COLORADO
            </span>
          </h2>
        </div>

        <p className="eyebrow absolute right-[var(--gutter)] top-[7.5rem] hidden text-[#1E211F]/70 md:block">
          {site.coordinates}
        </p>
      </div>

      {/* Destination Card & Architectural Map Treatment */}
      <div className="relative px-gutter pb-24 pt-8 md:pb-36">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-12 md:gap-8">
          {/* Left Column: Why visit & Architectural Minimalist Map Treatment */}
          <div className="md:col-span-5">
            <p className="serif text-[clamp(1.6rem,2.4vw,2.2rem)] italic leading-[1.2] text-[#1E211F]">
              Come by. We&rsquo;ll help you find what fits — and tell you straight.
            </p>

            <ol className="mt-8 space-y-6">
              {pillars.map((p, i) => (
                <li key={p.t} className="grid grid-cols-[2.5rem_1fr] gap-x-3 border-t border-[#E4D7C7] pt-5">
                  <span className="serif text-base italic text-[#9E7C55]">{["I", "II", "III"][i]}</span>
                  <div>
                    <h3 className="text-sm font-medium tracking-tight text-[#1E211F]">{p.t}</h3>
                    <p className="mt-1 text-xs leading-relaxed text-[#59534c]">{p.d}</p>
                  </div>
                </li>
              ))}
            </ol>

            {/* Architectural Minimalist Map Vector Graphic */}
            <div
              data-map-vector
              className="mt-10 overflow-hidden border border-[#E4D7C7] bg-[#EFE8DC] p-5 shadow-[0_4px_16px_rgba(30,33,31,0.04)]"
            >
              <div className="flex items-center justify-between border-b border-[#E4D7C7] pb-3">
                <span className="eyebrow text-[#9E7C55]">Cartographic Reference</span>
                <span className="eyebrow text-[#8c8275]">38.2544° N · 104.6091° W</span>
              </div>
              <svg viewBox="0 0 400 180" className="mt-4 w-full text-[#1E211F]" fill="none" stroke="currentColor">
                {/* Arkansas River winding curve */}
                <path
                  d="M 10 30 Q 120 70 200 45 T 390 85"
                  stroke="#7895A3"
                  strokeWidth="2.5"
                  strokeDasharray="4 2"
                />
                {/* West Pueblo Blvd major route */}
                <path d="M 40 160 L 360 30" stroke="#9E7C55" strokeWidth="2" />
                {/* Cross street */}
                <path d="M 140 20 L 260 170" stroke="#1E211F" strokeWidth="1.2" strokeOpacity="0.4" />
                <path d="M 60 90 L 320 120" stroke="#1E211F" strokeWidth="1" strokeOpacity="0.25" />
                {/* Store Pin Target */}
                <circle cx="215" cy="85" r="7" fill="#9E7C55" stroke="#F7F3EC" strokeWidth="2" />
                <circle cx="215" cy="85" r="16" stroke="#9E7C55" strokeWidth="1" strokeDasharray="3 3" />
                <text x="228" y="82" fill="#1E211F" fontSize="10" fontFamily="var(--font-mono)" letterSpacing="1">
                  THE VAPE HUB
                </text>
                <text x="228" y="95" fill="#59534c" fontSize="8" fontFamily="var(--font-mono)">
                  1281 W PUEBLO BLVD
                </text>
              </svg>
            </div>
          </div>

          {/* Right Column: The Refined Destination Information Card */}
          <div className="scroll-mt-28 md:col-span-6 md:col-start-7">
            <div
              data-card-visit
              className="border border-[#E4D7C7] bg-[#F7F3EC] p-7 shadow-[0_12px_40px_-16px_rgba(30,33,31,0.12)] sm:p-10 md:p-12"
            >
              <div className="flex items-center justify-between border-b border-[#E4D7C7] pb-4">
                <span className="eyebrow text-[#9E7C55]">Destination</span>
                <span className="eyebrow text-[#8c8275]">Adults 21+ Only</span>
              </div>

              <h3 className="display mt-5 text-2xl tracking-wider text-[#1E211F]">The Vape Hub</h3>
              <p className="eyebrow mt-1 text-[#59534c]">Pueblo, Colorado</p>

              <address className="serif mt-6 text-[clamp(1.7rem,2.5vw,2.4rem)] not-italic leading-[1.15] text-[#1E211F]">
                {site.address.street}
                <br />
                {site.address.locality}
              </address>

              <div className="mt-8 grid grid-cols-1 gap-8 border-t border-[#E4D7C7] pt-8 sm:grid-cols-2">
                <div>
                  <p className="eyebrow mb-4 text-[#8c8275]">Hours</p>
                  <dl className="space-y-2 text-sm">
                    {site.hours.map((h) => (
                      <div key={h.days} className="flex justify-between gap-4">
                        <dt className="text-[#59534c]">{h.days}</dt>
                        <dd className="font-medium text-[#1E211F]">{h.time}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
                <div>
                  <p className="eyebrow mb-4 text-[#8c8275]">Contact</p>
                  <a
                    href={site.phone.href}
                    className="text-lg font-medium text-[#1E211F] underline decoration-[#9E7C55] underline-offset-4 transition-colors hover:text-[#9E7C55]"
                  >
                    {site.phone.display}
                  </a>
                  <p className="mt-4 text-xs leading-relaxed text-[#59534c]">
                    Adults 21+ only. Valid government-issued photo ID is strictly required for every purchase.
                  </p>
                </div>
              </div>

              <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3">
                <CTA href={site.address.mapsUrl} external>
                  Get directions
                </CTA>
                <CTA href={site.phone.href} variant="line">
                  Call the shop
                </CTA>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
