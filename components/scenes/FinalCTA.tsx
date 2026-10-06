"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { CTA } from "@/components/ui/CTA";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

/**
 * SECTION 09 — FINAL CINEMATIC SCENE
 * Return to the resort sunset: ocean, pool, architecture, person walking away looking toward horizon.
 * The device appears one final time resting quietly on the terrace balustrade.
 * Headline: FIND YOUR CLOUD.
 * CTA: EXPLORE THE HUB →
 * The final transition feels like the ending of a luxury campaign film.
 * Solid palette without gradient backgrounds.
 */
export function FinalCTA() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        gsap.fromTo(
          q("[data-sunset]"),
          { scale: 1.12, yPercent: -4 },
          {
            scale: 1,
            yPercent: 3,
            ease: "none",
            scrollTrigger: {
              trigger: root.current,
              start: "top bottom",
              end: "bottom top",
              scrub: true,
            },
          },
        );

        // Product reveal at sunset
        gsap.fromTo(
          q("[data-sunset-product]"),
          { yPercent: 12, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            duration: 1.6,
            ease: "expo.out",
            scrollTrigger: { trigger: root.current, start: "top 60%" },
          },
        );

        const tl = gsap.timeline({ scrollTrigger: { trigger: root.current, start: "top 55%" } });
        tl.from(q("[data-end-eyebrow]"), { y: 20, autoAlpha: 0, duration: 1.2, ease: "expo.out" })
          .from(
            q("[data-end-line]"),
            { yPercent: 105, duration: 1.6, stagger: 0.14, ease: "expo.out" },
            0.15,
          )
          .from(q("[data-end-fade]"), { y: 24, autoAlpha: 0, duration: 1.2, stagger: 0.1, ease: "expo.out" }, 0.5);
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="cta"
      data-nav="light"
      aria-labelledby="cta-title"
      className="relative flex min-h-[100svh] w-full flex-col justify-between overflow-hidden bg-[#EFE8DC]"
    >
      {/* Sunset Resort Cinematic Visual: Ocean, sunset, palms, infinity pool */}
      <div data-sunset aria-hidden="true" className="absolute inset-0">
        <picture>
          <source media="(max-width: 899px)" srcSet="/images/place/sunset-m.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/place/sunset-d.jpg"
            alt="Warm sunset over the resort infinity pool and ocean horizon"
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover"
          />
        </picture>
      </div>

      {/* Main Campaign Message */}
      <div className="relative z-10 w-full px-gutter pt-[24svh] text-center md:pt-[max(16svh,8rem)]">
        <p data-end-eyebrow className="eyebrow tracking-[0.28em] text-[#1E211F]">
          The Vape Hub <span className="mx-2 text-[#9E7C55]">·</span> Pueblo, Colorado
        </p>

        {/* Minimal Hero Headline: FIND YOUR CLOUD. */}
        <h2 id="cta-title" className="mt-5 text-[#1E211F]">
          <span className="line-mask">
            <span
              data-end-line
              className="display block text-[clamp(2.4rem,4.8vw,5.5rem)] font-medium leading-[1.05] tracking-tight"
            >
              FIND YOUR <span className="serif italic font-normal text-[clamp(2.8rem,5.8vw,6.5rem)]">cloud<span className="not-italic text-[#9E7C55]">.</span></span>
            </span>
          </span>
        </h2>

        {/* Brand Tagline */}
        <p data-end-fade className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-[#1E211F]/90">
          Premium devices. Distinct flavors. Local expertise.
        </p>

        {/* Editorial Action: [ EXPLORE THE HUB → ] */}
        <div data-end-fade className="mt-8 flex flex-col items-center justify-center gap-x-7 gap-y-4 sm:flex-row">
          <CTA
            href="#collection"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#collection");
            }}
          >
            EXPLORE THE HUB →
          </CTA>
          <CTA
            href="#visit"
            variant="line"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("#visit", -100);
            }}
          >
            Plan your visit
          </CTA>
        </div>

        <p data-end-fade className="eyebrow mt-10 text-[#1E211F]/70">
          Adults 21+ only · Valid government-issued ID required for every purchase
        </p>
      </div>

      {/* The Product Appears Heroically on the Sunset Terrace Ledge (Reversed Hierarchy: Vape = 55%, Environment = 45%) */}
      <div
        data-sunset-product
        className="relative z-10 mx-auto mb-8 h-64 w-44 md:mb-14 md:h-80 md:w-56"
      >
        <div
          aria-hidden="true"
          className="contact-shadow absolute bottom-3 left-1/2 h-5 w-36 -translate-x-1/2"
        />
        <Image
          src="/images/day/hero.webp"
          alt="The Vape Hub flagship device resting prominently on the resort sunset terrace"
          fill
          sizes="280px"
          className="object-contain object-bottom drop-shadow-2xl"
        />
      </div>

      {/* Natural Solid Navy Baseline Meeting the Footer */}
      <div aria-hidden="true" className="h-12 w-full bg-[#16232B]" />
    </section>
  );
}
