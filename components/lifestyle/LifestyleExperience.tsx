"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { CTA } from "@/components/ui/CTA";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

/**
 * SECTION 06 — LIFESTYLE
 * Return to the resort story with an adult lifestyle editorial split-screen layout:
 * - Balcony ocean view
 * - Resort pool & palms
 * - Sunlit lounge table where the product sits naturally alongside everyday essentials
 * Calm, unhurried, expensive. Solid palette without gradients.
 */
export function LifestyleExperience() {
  const root = useRef<HTMLElement>(null);
  const { scrollTo } = useSmoothScroll();

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        // Parallax image movement
        gsap.fromTo(
          q("[data-exp-img]"),
          { yPercent: -4, scale: 1.05 },
          {
            yPercent: 4,
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

        // Editorial text reveal
        gsap.from(q("[data-exp-text] > *"), {
          y: 28,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: {
            trigger: q("[data-exp-text]")[0],
            start: "top 78%",
          },
        });

        // Pillar cards reveal
        gsap.from(q("[data-exp-pill]"), {
          y: 20,
          autoAlpha: 0,
          stagger: 0.1,
          duration: 1.1,
          ease: "expo.out",
          scrollTrigger: {
            trigger: q("[data-exp-pills]")[0],
            start: "top 85%",
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="experience"
      data-nav="light"
      aria-labelledby="experience-title"
      className="relative bg-[#F7F3EC] py-24 md:py-36"
    >
      <div className="px-gutter">
        {/* Split screen editorial layout */}
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Visual Column: Dual Photographic Spread */}
          <div className="relative order-2 space-y-6 lg:order-1 lg:col-span-6">
            {/* Primary Balcony & Ocean View Plate */}
            <div className="relative aspect-[16/11] w-full overflow-hidden border border-[#E4D7C7] bg-[#EFE8DC] shadow-[0_12px_32px_-12px_rgba(30,33,31,0.1)]">
              <div data-exp-img className="absolute inset-[-6%]">
                <picture>
                  <source media="(max-width: 899px)" srcSet="/images/resort2/m-B-out.jpg" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/resort2/d-B-out.jpg"
                    alt="Adult standing peacefully at resort balcony overlooking infinity pool and ocean"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
              </div>

              {/* Floating editorial caption badge */}
              <div className="absolute bottom-5 left-5 z-10 flex items-center gap-3 border border-[#E4D7C7] bg-[#F7F3EC]/90 px-4 py-2 backdrop-blur-md">
                <span className="size-1.5 rounded-full bg-[#9E7C55]" />
                <p className="eyebrow !text-[0.6rem] text-[#1E211F]">Sanctuary 01 · Ocean Terrace</p>
              </div>
            </div>

            {/* Secondary Inset: Lifestyle Table Still Life */}
            <div className="grid grid-cols-2 gap-4">
              <div className="relative aspect-[4/3] overflow-hidden border border-[#E4D7C7] bg-[#EFE8DC]">
                <Image
                  src="/images/rooms/pod.jpg"
                  alt="Sunlit resort lounge with natural wood and linen"
                  fill
                  sizes="(max-width: 900px) 50vw, 25vw"
                  className="object-cover"
                />
                <div className="absolute bottom-3 left-3 border border-[#E4D7C7] bg-[#F7F3EC]/90 px-2.5 py-1">
                  <p className="eyebrow !text-[0.55rem] text-[#1E211F]">Lounge Interior</p>
                </div>
              </div>

              <div className="relative aspect-[4/3] overflow-hidden border border-[#E4D7C7] bg-[#EFE8DC]">
                <picture>
                  <source media="(max-width: 899px)" srcSet="/images/resort2/m-A-out.jpg" />
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/images/resort2/d-A-out.jpg"
                    alt="Resort infinity pool and palm architecture at golden hour"
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover"
                  />
                </picture>
                <div className="absolute bottom-3 left-3 border border-[#E4D7C7] bg-[#F7F3EC]/90 px-2.5 py-1">
                  <p className="eyebrow !text-[0.55rem] text-[#1E211F]">Pool Horizon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Editorial Content Column */}
          <div data-exp-text className="order-1 lg:order-2 lg:col-span-6 lg:pl-6">
            <p className="eyebrow mb-6 flex items-center gap-3 text-[#59534c]">
              <span className="size-1.5 rounded-full bg-[#9E7C55]" />
              Chapter 06 — The Atmosphere
            </p>

            <h2 id="experience-title" className="text-[#1E211F]">
              <span className="display block text-[clamp(2.2rem,3.8vw,4.2rem)]">A CALMER</span>
              <span className="serif block text-[clamp(2.8rem,5.4vw,5.8rem)] italic leading-[0.9]">
                cadence<span className="not-italic text-[#9E7C55]">.</span>
              </span>
            </h2>

            <blockquote className="mt-6 border-l-2 border-[#9E7C55] pl-5 text-[clamp(1.2rem,1.8vw,1.5rem)] font-light italic leading-snug text-[#1E211F]/90">
              &ldquo;Good products are only part of the experience. The atmosphere makes the moment.&rdquo;
            </blockquote>

            <p className="mt-6 max-w-lg text-sm leading-relaxed text-[#59534c]">
              We designed The Vape Hub as a bright, welcoming refuge from ordinary vape shops — unhurried, thoughtful,
              and centered around personal guidance. Whether you are seeking a reliable everyday disposable or tuning
              a refined pod setup, our team in Pueblo takes the time to listen.
            </p>

            {/* Three lifestyle pillars */}
            <div data-exp-pills className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                data-exp-pill
                className="border border-[#E4D7C7] bg-[#EFE8DC]/60 p-4 transition-colors hover:border-[#9E7C55] hover:bg-[#EFE8DC]"
              >
                <span className="serif text-xs italic text-[#9E7C55]">01</span>
                <h3 className="mt-1 text-sm font-medium tracking-tight text-[#1E211F]">Unhurried Pace</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#59534c]">
                  Take your time exploring without aggressive sales talk.
                </p>
              </div>

              <div
                data-exp-pill
                className="border border-[#E4D7C7] bg-[#EFE8DC]/60 p-4 transition-colors hover:border-[#9E7C55] hover:bg-[#EFE8DC]"
              >
                <span className="serif text-xs italic text-[#9E7C55]">02</span>
                <h3 className="mt-1 text-sm font-medium tracking-tight text-[#1E211F]">Sensory Balance</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#59534c]">
                  Subtle notes designed to complement, not overpower.
                </p>
              </div>

              <div
                data-exp-pill
                className="border border-[#E4D7C7] bg-[#EFE8DC]/60 p-4 transition-colors hover:border-[#9E7C55] hover:bg-[#EFE8DC]"
              >
                <span className="serif text-xs italic text-[#9E7C55]">03</span>
                <h3 className="mt-1 text-sm font-medium tracking-tight text-[#1E211F]">Local Hands</h3>
                <p className="mt-1 text-xs leading-relaxed text-[#59534c]">
                  Hands-on assistance with coils, pods, and device care.
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <CTA
                href="#visit"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#visit", -100);
                }}
              >
                Discover the Hub
              </CTA>
              <CTA
                href="#flavors"
                variant="line"
                onClick={(e) => {
                  e.preventDefault();
                  scrollTo("#flavors");
                }}
              >
                Explore flavor notes
              </CTA>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
