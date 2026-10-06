"use client";

import { useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { ProductViewer, type ProductViewMode } from "./ProductViewer";
import { CTA } from "@/components/ui/CTA";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";

export interface AnatomyState {
  index: string;
  title: string;
  tagline: string;
  details: string;
}

const ANATOMY_STATES: AnatomyState[] = [
  {
    index: "01",
    title: "FULL PRODUCT",
    tagline: "Architecture in Balance",
    details: "Machined from aerospace-grade aluminum with an unhurried, monolithic silhouette.",
  },
  {
    index: "02",
    title: "360° ROTATION",
    tagline: "Pure Symmetry",
    details: "Seamless curved surfaces sculpted to sit naturally and invisibly in the hand.",
  },
  {
    index: "03",
    title: "MOUTHPIECE MACRO",
    tagline: "Ergonomic Contour",
    details: "Satin-touch finish contoured specifically for a calm, comfortable seal.",
  },
  {
    index: "04",
    title: "BODY MATERIAL",
    tagline: "Tactile Precision",
    details: "Bead-blasted matte finish that repels fingerprints and resists daily wear.",
  },
  {
    index: "05",
    title: "LED / DETAIL",
    tagline: "Discrete Illumination",
    details: "Subtle micro-aperture LED indicator that pulses gently only upon draw.",
  },
  {
    index: "06",
    title: "ATMOSPHERIC VAPOR",
    tagline: "Calibrated Draw Resistance",
    details: "Precision airflow channel engineered for smooth, dense, unhurried vapor.",
  },
  {
    index: "07",
    title: "PRODUCT BREAKDOWN",
    tagline: "Engineered Inside & Out",
    details: "Internal isolated vapor path, magnetic battery coupling, and leak-resistant reservoir.",
  },
  {
    index: "08",
    title: "EXPLORE IN STORE",
    tagline: "Hands-on Guidance in Pueblo",
    details: "Visit our local showroom on West Pueblo Blvd to hold and inspect the full lineup.",
  },
];

/**
 * SECTION 05 — PRODUCT ANATOMY EXPERIENCE
 * A pinned product cinematography experience:
 * The vape commands central focus (~70% of viewport height).
 * As the user scrolls:
 * STATE 01: FULL PRODUCT
 * STATE 02: 360° ROTATION
 * STATE 03: MOUTHPIECE MACRO
 * STATE 04: BODY MATERIAL
 * STATE 05: LED / DETAIL
 * STATE 06: VAPOR
 * STATE 07: PRODUCT BREAKDOWN
 * STATE 08: EXPLORE IN STORE
 */
export function ProductStory() {
  const root = useRef<HTMLElement>(null);
  const [activeStep, setActiveStep] = useState(0);
  const [frameIdx, setFrameIdx] = useState(0);
  const [viewMode, setViewMode] = useState<ProductViewMode>("full");
  const [indicatorActive, setIndicatorActive] = useState(false);
  const [showVapor, setShowVapor] = useState(false);
  const [asideOffset, setAsideOffset] = useState(false);
  const { scrollTo } = useSmoothScroll();

  const current = ANATOMY_STATES[activeStep];

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };

        if (reduce) {
          setActiveStep(7);
          setFrameIdx(8);
          setViewMode("aside");
          setAsideOffset(true);
          return;
        }

        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: desktop ? "+=300%" : "+=220%",
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const p = self.progress;

              // STATE 01: 0.00 – 0.12 (FULL PRODUCT)
              if (p < 0.12) {
                setActiveStep(0);
                setViewMode("full");
                setIndicatorActive(false);
                setShowVapor(false);
                setAsideOffset(false);
                setFrameIdx(0);
              }
              // STATE 02: 0.12 – 0.26 (360° ROTATION)
              else if (p < 0.26) {
                setActiveStep(1);
                setViewMode("full");
                setIndicatorActive(false);
                setShowVapor(false);
                setAsideOffset(false);
                const rotP = (p - 0.12) / 0.14;
                setFrameIdx(Math.round(rotP * 24));
              }
              // STATE 03: 0.26 – 0.40 (MOUTHPIECE MACRO)
              else if (p < 0.4) {
                setActiveStep(2);
                setViewMode("mouthpiece");
                setIndicatorActive(false);
                setShowVapor(false);
                setAsideOffset(false);
              }
              // STATE 04: 0.40 – 0.54 (BODY MATERIAL)
              else if (p < 0.54) {
                setActiveStep(3);
                setViewMode("base");
                setIndicatorActive(false);
                setShowVapor(false);
                setAsideOffset(false);
              }
              // STATE 05: 0.54 – 0.66 (LED / DETAIL)
              else if (p < 0.66) {
                setActiveStep(4);
                setViewMode("base");
                setIndicatorActive(true);
                setShowVapor(false);
                setAsideOffset(false);
              }
              // STATE 06: 0.66 – 0.78 (VAPOR)
              else if (p < 0.78) {
                setActiveStep(5);
                setViewMode("full");
                setIndicatorActive(true);
                setShowVapor(true);
                setAsideOffset(false);
                setFrameIdx(4);
              }
              // STATE 07: 0.78 – 0.88 (PRODUCT BREAKDOWN)
              else if (p < 0.88) {
                setActiveStep(6);
                setViewMode("aside");
                setIndicatorActive(true);
                setShowVapor(true);
                setAsideOffset(true);
                setFrameIdx(4);
              }
              // STATE 08: 0.88 – 1.00 (EXPLORE IN STORE)
              else {
                setActiveStep(7);
                setViewMode("aside");
                setIndicatorActive(false);
                setShowVapor(false);
                setAsideOffset(true);
                setFrameIdx(4);
              }
            },
          },
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="anatomy"
      data-nav="light"
      aria-labelledby="anatomy-title"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden bg-[#F7F3EC]"
    >
      {/* Solid architectural background planes (NO gradients) */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#F7F3EC]" />

      {/* Travertine stone plinth surface where device rests */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[22svh] bg-[#EFE8DC] md:h-[24svh]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[22svh] h-px bg-[#E4D7C7] md:bottom-[24svh]" />

      {/* Top Header & Chapter Badge */}
      <div className="absolute inset-x-0 top-[max(3svh,1.25rem)] z-20 px-gutter md:top-[max(4svh,1.75rem)]">
        <div className="flex items-center justify-between border-b border-[#E4D7C7] pb-2.5">
          <p className="eyebrow flex items-center gap-3 text-[#59534c]">
            <span className="size-1.5 rounded-full bg-[#9E7C55]" />
            Chapter 05 — Product Anatomy
          </p>
          <p className="eyebrow text-[#8c8275]">
            State {current.index} / 08 · {current.title}
          </p>
        </div>
      </div>

      {/* Left Editorial Timeline Tracker (Desktop) */}
      <div className="pointer-events-none absolute bottom-[26svh] left-[var(--gutter)] z-30 hidden max-w-xs md:block">
        <div className="space-y-3">
          <div className="flex items-baseline gap-3">
            <span className="serif text-2xl italic text-[#9E7C55]">{current.index}</span>
            <h3 className="display text-lg tracking-wide text-[#1E211F]">{current.title}</h3>
          </div>
          <p className="serif text-base italic text-[#1E211F]">{current.tagline}</p>
          <p className="text-xs leading-relaxed text-[#59534c]">{current.details}</p>

          {/* Stepper indicator pills */}
          <div className="flex items-center gap-1.5 pt-2">
            {ANATOMY_STATES.map((s, idx) => (
              <span
                key={s.index}
                className={`h-0.5 transition-all duration-500 ${
                  idx === activeStep ? "w-6 bg-[#9E7C55]" : "w-2 bg-[#E4D7C7]"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Interactive Product Stage (Commands ~70% screen height) */}
      <div
        className={`absolute inset-x-0 bottom-[14svh] z-10 flex justify-center transition-all duration-700 ease-[var(--ease-expo)] md:bottom-[15svh] ${
          asideOffset ? "md:-translate-x-[20vw]" : "translate-x-0"
        }`}
      >
        <div className="relative h-[52svh] md:h-[65svh]" style={{ aspectRatio: "640 / 880" }}>
          <ProductViewer
            frameIndex={frameIdx}
            viewMode={viewMode}
            indicatorActive={indicatorActive}
            showVapor={showVapor}
            className="h-full w-full"
            alt="The Vape Hub product anatomy inspection"
          />

          {/* State 07: Visual Breakdown Callout Tags (Overlaid on device) */}
          {activeStep === 6 && (
            <div className="pointer-events-none absolute inset-0 z-30 transition-opacity duration-500">
              {/* Mouthpiece Callout */}
              <div className="absolute -top-3 left-[58%] border border-[#E4D7C7] bg-[#F7F3EC]/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <span className="eyebrow !text-[0.55rem] text-[#1E211F]">Ergonomic Satin Mouthpiece</span>
              </div>
              {/* Body Finish Callout */}
              <div className="absolute top-[42%] -left-12 border border-[#E4D7C7] bg-[#F7F3EC]/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <span className="eyebrow !text-[0.55rem] text-[#1E211F]">Aerospace Aluminum Body</span>
              </div>
              {/* Base / LED Callout */}
              <div className="absolute bottom-[16%] left-[60%] border border-[#E4D7C7] bg-[#F7F3EC]/95 px-3 py-1 shadow-sm backdrop-blur-sm">
                <span className="eyebrow !text-[0.55rem] text-[#1E211F]">Discrete Warm LED Intake</span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* State 08: Editorial Narrative Copy appearing on the right */}
      <div
        className={`pointer-events-none absolute bottom-[18svh] right-[var(--gutter)] z-30 max-w-md transition-all duration-700 md:bottom-[24svh] ${
          activeStep >= 6 ? "pointer-events-auto translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="border border-[#E4D7C7] bg-[#F7F3EC]/95 p-6 shadow-[0_16px_40px_-16px_rgba(30,33,31,0.12)] backdrop-blur-sm sm:p-8">
          <p className="eyebrow text-[#9E7C55]">Form Without Compromise</p>
          <h2 id="anatomy-title" className="mt-3 text-[#1E211F]">
            <span className="display block text-[clamp(1.8rem,3vw,2.6rem)]">CRAFTED FOR THE</span>
            <span className="serif block text-[clamp(2.2rem,4vw,3.4rem)] italic leading-none">
              quiet hand.
            </span>
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-[#59534c]">
            Every contour measured to rest naturally without visual clutter. No flashing displays or excessive menus —
            just balanced tactile weight, precision machining, and an immediate intuitive draw.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <CTA
              href="#visit"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#visit", -100);
              }}
            >
              EXPERIENCE IN STORE →
            </CTA>
            <CTA
              href="#collection"
              variant="line"
              onClick={(e) => {
                e.preventDefault();
                scrollTo("#collection");
              }}
            >
              View collection
            </CTA>
          </div>
        </div>
      </div>
    </section>
  );
}
