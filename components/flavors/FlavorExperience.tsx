"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { CTA } from "@/components/ui/CTA";
import { cn } from "@/lib/utils/cn";

export interface FlavorFamily {
  id: string;
  label: string;
  place: string;
  atmosphere: string;
  line: string;
  notes: string[];
  photo: string;
  productImage: string;
  focus: string;
  solidBg: string;
  accent: string;
  textTone: string;
}

const FLAVOR_FAMILIES: FlavorFamily[] = [
  {
    id: "fruit",
    label: "White Peach Raspberry",
    place: "Garden terrace · Afternoon Sun",
    atmosphere: "Warm velvet peach · Sweet raspberry frost · Crystalline daylight",
    line: "Bright, layered, unmistakable. Sun-ripened orchard white peach and tart mountain raspberries.",
    notes: ["Sun-ripened white peach", "Tart mountain raspberries", "Chilled finish"],
    photo: "/images/flavors/fruit.jpg",
    productImage: "/images/hero/flavor-peach.jpg",
    focus: "64% 60%",
    solidBg: "#F2DCD2",
    accent: "#D27D60",
    textTone: "#25231F",
  },
  {
    id: "ice",
    label: "Glacier Blue Freeze",
    place: "Morning ocean horizon",
    atmosphere: "Cool pale blue · Clean daylight · Sub-zero arctic air",
    line: "Crisp, cold and clean on the finish. Alpine peppermint and iced mountain winterberries.",
    notes: ["Alpine peppermint", "Iced mountain berries", "Crisp sub-zero exhale"],
    photo: "/images/flavors/ice.jpg",
    productImage: "/images/hero/flavor-ice.jpg",
    focus: "64% 60%",
    solidBg: "#D9E4E8",
    accent: "#6AA4C4",
    textTone: "#16232B",
  },
  {
    id: "dessert",
    label: "Dessert",
    place: "The lounge, golden hour",
    atmosphere: "Cream · Vanilla · Warm stone",
    line: "Rich, warm and unhurried. Slow-folded custard, Tahitian vanilla, and butterscotch.",
    notes: ["Custard", "Vanilla bakery", "Warm caramel"],
    photo: "/images/flavors/dessert.jpg",
    productImage: "/images/hero/flavor-vanilla.jpg",
    focus: "64% 60%",
    solidBg: "#EFE8DC",
    accent: "#BA9A73",
    textTone: "#25231F",
  },
  {
    id: "menthol",
    label: "Menthol",
    place: "The pool deck",
    atmosphere: "Soft sage · Botanical breeze · Natural shade",
    line: "Sharp, minty, direct. Fresh eucalyptus and crushed peppermint leaves.",
    notes: ["Classic menthol", "Spearmint leaf", "Eucalyptus"],
    photo: "/images/flavors/menthol.jpg",
    productImage: "/images/day/menthol.webp",
    focus: "64% 60%",
    solidBg: "#DEE7E2",
    accent: "#8A9A86",
    textTone: "#1E211F",
  },
  {
    id: "tobacco",
    label: "Smoked Tobacco",
    place: "The reading room",
    atmosphere: "Warm brown · Natural wood · Leather · Sunset",
    line: "Deep, dry and familiar. Toasted Virginia leaf, smooth cedar, and dark roast.",
    notes: ["Classic Virginia", "Smooth cured leaf", "Dark roast"],
    photo: "/images/flavors/tobacco.jpg",
    productImage: "/images/hero/flavor-bronze.jpg",
    focus: "64% 60%",
    solidBg: "#E4D7C7",
    accent: "#8C6A4F",
    textTone: "#1E211F",
  },
  {
    id: "signature",
    label: "Signature",
    place: "Sunset, the terrace",
    atmosphere: "Warm champagne · Premium editorial salon",
    line: "Our team’s current favorites. Rotating small-batch arrivals and zero-nicotine options.",
    notes: ["Staff reserve picks", "Seasonal blends", "Zero-nicotine options"],
    photo: "/images/flavors/signature.jpg",
    productImage: "/images/day/zero.webp",
    focus: "64% 60%",
    solidBg: "#EFE2CF",
    accent: "#B8925A",
    textTone: "#1E211F",
  },
];

/**
 * SECTION 04 — FLAVOR EXPERIENCE
 * Pinned Product Film controlled by scroll & timeline interaction:
 * The vape is the ANCHORED HERO (Product = 65%, Environment = 35%).
 * As the user scrolls through the film:
 * - The device remains front & center, rotating slightly and updating its dedicated finish
 * - The solid architectural background transforms smoothly
 * - The letterbox photographic scene crossfades with scale
 * - The real-time atmospheric vapor reacts to the flavor family
 * - Editorial typography and tasting notes update
 */
export function FlavorExperience() {
  const root = useRef<HTMLElement>(null);
  const vaporRef = useRef<HTMLCanvasElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const activeFlavor = FLAVOR_FAMILIES[activeIndex];

  // Dynamic atmospheric micro-vapor canvas tuned per flavor
  useEffect(() => {
    const vc = vaporRef.current;
    if (!vc) return;
    const ctx = vc.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const renderVapor = () => {
      t += 0.035;
      const w = vc.width;
      const h = vc.height;
      ctx.clearRect(0, 0, w, h);

      // Tuned vapor personality per flavor
      const isIce = activeFlavor.id === "ice";
      const isDessert = activeFlavor.id === "dessert";
      const numParticles = isIce ? 4 : isDessert ? 7 : 5;
      const speed = isIce ? 0.7 : isDessert ? 0.4 : 0.55;

      ctx.save();
      for (let i = 0; i < numParticles; i++) {
        const offset = (t * speed + i * 0.45) % 2.4;
        const progress = offset / 2.4;
        const y = h * (0.85 - progress * 0.75);
        const sway = isIce ? 6 : 14;
        const x = w * 0.5 + Math.sin(offset * 2.8 + i) * (sway * progress);
        const radius = (8 + progress * 26) * (isDessert ? 1.3 : 1.0);
        const alpha = Math.sin(progress * Math.PI) * (isIce ? 0.16 : 0.22);

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        if (isIce) {
          grad.addColorStop(0, `rgba(217, 228, 232, ${alpha * 1.2})`);
          grad.addColorStop(0.7, `rgba(247, 243, 236, ${alpha * 0.4})`);
        } else if (activeFlavor.id === "fruit") {
          grad.addColorStop(0, `rgba(242, 220, 210, ${alpha * 1.1})`);
          grad.addColorStop(0.7, `rgba(247, 243, 236, ${alpha * 0.5})`);
        } else {
          grad.addColorStop(0, `rgba(247, 243, 236, ${alpha})`);
          grad.addColorStop(0.7, `rgba(239, 232, 220, ${alpha * 0.4})`);
        }
        grad.addColorStop(1, "rgba(247, 243, 236, 0)");

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(x, y, radius, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();

      animId = requestAnimationFrame(renderVapor);
    };

    renderVapor();
    return () => cancelAnimationFrame(animId);
  }, [activeIndex, activeFlavor]);

  // Pinned GSAP ScrollTrigger timeline
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };

        if (reduce) {
          setActiveIndex(0);
          return;
        }

        const totalSteps = FLAVOR_FAMILIES.length;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: desktop ? `+=${totalSteps * 75}%` : `+=${totalSteps * 55}%`,
            pin: true,
            scrub: 0.8,
            onUpdate: (self) => {
              const p = self.progress;
              const idx = Math.min(totalSteps - 1, Math.floor(p * totalSteps));
              setActiveIndex((prev) => (prev !== idx ? idx : prev));
            },
          },
        });

        // Device gentle rotation on scroll scrub
        tl.to(
          q("[data-flavor-device]"),
          { rotateY: 25, duration: 1, ease: "none" },
          0,
        );
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="flavors"
      data-nav="light"
      aria-labelledby="flavor-title"
      className="relative h-[100svh] min-h-[640px] w-full overflow-hidden transition-colors duration-700 ease-[var(--ease-expo)]"
      style={{ backgroundColor: activeFlavor.solidBg }}
    >
      {/* Upper Architectural Letterbox Backdrop: Resort Environment Photo */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[var(--gutter)] top-[max(9svh,5rem)] h-[28svh] overflow-hidden border border-[#1E211F]/10 md:top-[max(11svh,6.25rem)] md:h-[34svh]"
      >
        {FLAVOR_FAMILIES.map((f, i) => (
          <div
            key={f.id}
            className={`absolute inset-0 transition-opacity duration-1000 ease-[var(--ease-expo)] ${
              i === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={f.photo}
              alt=""
              fill
              sizes="100vw"
              className="object-cover"
              style={{ objectPosition: f.focus }}
            />
            {/* Subtle solid vignette for seamless blend */}
            <div
              aria-hidden="true"
              className="absolute inset-0"
              style={{ backgroundColor: `${f.solidBg}40` }}
            />
          </div>
        ))}
      </div>

      {/* Travertine Stone Plinth Surface where the hero vape stands */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[22svh] bg-[#EFE8DC] md:h-[24svh]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[22svh] h-px bg-[#E4D7C7] md:bottom-[24svh]" />

      {/* Top Header & Chapter Badge */}
      <div className="absolute inset-x-0 top-[max(3svh,1.25rem)] z-20 px-gutter md:top-[max(4svh,1.75rem)]">
        <div className="flex items-center justify-between border-b border-[#1E211F]/15 pb-2.5">
          <p className="eyebrow flex items-center gap-3 text-[#59534c]">
            <span className="size-1.5 rounded-full" style={{ backgroundColor: activeFlavor.accent }} />
            Chapter 04 — Interactive Flavor Film
          </p>
          <p className="eyebrow hidden text-[#59534c] md:block">
            Family 0{activeIndex + 1} / 06 · {activeFlavor.atmosphere}
          </p>
        </div>
      </div>

      {/* THE ANCHORED HERO PRODUCT (Occupies ~65% viewport height in the center) */}
      <div className="pointer-events-none absolute inset-x-0 bottom-[13svh] z-20 flex justify-center md:bottom-[14svh]">
        <div
          data-flavor-device
          className="relative h-[48svh] md:h-[58svh]"
          style={{ aspectRatio: "640 / 880" }}
        >
          {/* Contact shadow on plinth */}
          <div
            aria-hidden="true"
            className="contact-shadow absolute bottom-[11.5%] left-1/2 h-[5%] w-[34%] -translate-x-1/2"
          />

          {/* Dedicated colorway layer for each flavor family */}
          {FLAVOR_FAMILIES.map((f, i) => (
            <div
              key={f.id}
              className={`absolute inset-0 transition-all duration-700 ease-[var(--ease-expo)] ${
                i === activeIndex
                  ? "scale-100 opacity-100"
                  : "pointer-events-none scale-95 opacity-0"
              }`}
            >
              <Image
                src={f.productImage}
                alt={`${f.label} edition Vape Hub device`}
                fill
                sizes="(max-width: 900px) 70vw, 36vw"
                className="object-contain object-bottom drop-shadow-md"
              />
            </div>
          ))}

          {/* Micro atmospheric vapor rising from the mouthpiece */}
          <canvas
            ref={vaporRef}
            width={160}
            height={160}
            aria-hidden="true"
            className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2"
          />
        </div>
      </div>

      {/* Left Flank Editorial Information (Desktop & Mobile) */}
      <div className="pointer-events-none absolute bottom-[26svh] left-[var(--gutter)] z-30 max-w-xs md:bottom-[28svh]">
        <div className="space-y-2.5">
          <span className="serif text-xs italic" style={{ color: activeFlavor.accent }}>
            Family 0{activeIndex + 1}
          </span>
          <h2 id="flavor-title" className="display text-3xl tracking-tight text-[#1E211F] md:text-4xl">
            {activeFlavor.label}
          </h2>
          <p className="eyebrow text-[#59534c]">{activeFlavor.place}</p>
          <p className="hidden text-xs leading-relaxed text-[#59534c] md:block">
            {activeFlavor.line}
          </p>
          {/* Notes tags */}
          <div className="flex flex-wrap gap-1.5 pt-1">
            {activeFlavor.notes.map((note) => (
              <span
                key={note}
                className="border border-[#1E211F]/15 bg-[#F7F3EC]/80 px-2.5 py-0.5 text-[0.7rem] text-[#1E211F] backdrop-blur-sm"
              >
                {note}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Right Flank Narrative & Action (Desktop) */}
      <div className="pointer-events-none absolute bottom-[26svh] right-[var(--gutter)] z-30 hidden max-w-xs text-right md:bottom-[28svh] md:block">
        <p className="eyebrow text-[#8c8275]">Curated Experience</p>
        <p className="serif mt-2 text-lg italic text-[#1E211F]">
          &ldquo;{activeFlavor.atmosphere}&rdquo;
        </p>
        <div className="pointer-events-auto mt-4 flex justify-end">
          <CTA href="#visit" variant="line">
            Ask about {activeFlavor.label.toLowerCase()} arrivals →
          </CTA>
        </div>
      </div>

      {/* Interactive Film Controller: The 6 Flavor Families */}
      <div
        role="tablist"
        aria-label="Flavor family film chapters"
        className="no-scrollbar absolute inset-x-0 bottom-4 z-40 flex snap-x items-center justify-center gap-2 px-gutter overflow-x-auto md:bottom-6 md:gap-3"
      >
        {FLAVOR_FAMILIES.map((f, idx) => {
          const isActive = idx === activeIndex;
          return (
            <button
              key={f.id}
              role="tab"
              aria-selected={isActive}
              tabIndex={isActive ? 0 : -1}
              onClick={() => setActiveIndex(idx)}
              className={cn(
                "group relative flex min-w-[7.5rem] items-center justify-between border px-3.5 py-2 text-left transition-all duration-500 sm:min-w-[9rem] md:px-4 md:py-2.5",
                isActive
                  ? "border-[#1E211F] bg-[#F7F3EC] shadow-[0_4px_16px_rgba(30,33,31,0.12)]"
                  : "border-[#1E211F]/15 bg-[#F7F3EC]/60 hover:border-[#1E211F]/30 hover:bg-[#F7F3EC]/90",
              )}
            >
              <div className="flex items-baseline gap-2">
                <span className="eyebrow !text-[0.6rem] text-[#8c8275]">0{idx + 1}</span>
                <span className="display text-sm tracking-wide text-[#1E211F]">{f.label}</span>
              </div>
              <span
                aria-hidden="true"
                className="size-1.5 rounded-full transition-transform duration-300 group-hover:scale-150"
                style={{ backgroundColor: f.accent }}
              />
            </button>
          );
        })}
      </div>
    </section>
  );
}
