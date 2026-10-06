"use client";

import Image from "next/image";
import { useState } from "react";
import { cn } from "@/lib/utils/cn";

export interface HeroFlavorOption {
  id: string;
  name: string;
  series: string;
  finish: string;
  notes: string;
  image: string;
  accent: string;
  glow: string;
  cooling: number; // 1-5
  sweetness: number; // 1-5
  throatHit: number; // 1-5
  tag: string;
}

export const HERO_FLAVORS: HeroFlavorOption[] = [
  {
    id: "peach",
    name: "White Peach Raspberry",
    series: "THE VAPE HUB // 50K PUFFS",
    finish: "Velvet Coral Frost with Smart LED Display",
    notes: "Sun-ripened orchard white peach · Tart mountain raspberry · Chilled exhale",
    image: "/images/hero/flavor-peach.jpg",
    accent: "#D27D60",
    glow: "rgba(210, 125, 96, 0.45)",
    cooling: 3,
    sweetness: 4,
    throatHit: 3,
    tag: "Pueblo Bestseller",
  },
  {
    id: "ice",
    name: "Glacier Blue Freeze",
    series: "THE VAPE HUB // 50K PUFFS",
    finish: "Satin Cyan Anodized with Crystal Trim",
    notes: "Sub-zero mountain peppermint · Crisp alpine winterberry frost",
    image: "/images/hero/flavor-ice.jpg",
    accent: "#6AA4C4",
    glow: "rgba(106, 164, 196, 0.45)",
    cooling: 5,
    sweetness: 2,
    throatHit: 4,
    tag: "Arctic Frost",
  },
  {
    id: "vanilla",
    name: "Cream Vanilla Reserve",
    series: "THE VAPE HUB // 50K PUFFS",
    finish: "Honed Warm Cream Ceramic Matte Coating",
    notes: "Tahitian double-cured vanilla bean · Silky whipped custard",
    image: "/images/hero/flavor-vanilla.jpg",
    accent: "#BA9A73",
    glow: "rgba(186, 154, 115, 0.45)",
    cooling: 1,
    sweetness: 5,
    throatHit: 3,
    tag: "Lounge Reserve",
  },
  {
    id: "bronze",
    name: "Smoked Bronze Oak",
    series: "THE VAPE HUB // 50K PUFFS",
    finish: "Brushed Espresso Bronze Titanium Finish",
    notes: "Flue-cured Virginia leaf · Aged Kentucky cedar & burnt caramel",
    image: "/images/hero/flavor-bronze.jpg",
    accent: "#8C6A4F",
    glow: "rgba(140, 106, 79, 0.45)",
    cooling: 1,
    sweetness: 2,
    throatHit: 5,
    tag: "Heritage Leaf",
  },
];

interface HeroProductHUDProps {
  currentShot: number; // 0: Penthouse, 1: Table, 2: Draw, 3: Macro
  onSelectShot: (shotIdx: number) => void;
  onExplore: () => void;
  selectedFlavorIndex: number;
  onSelectFlavor: (flavorIdx: number) => void;
  onTriggerSmoke?: () => void;
  className?: string;
}

const SHOT_STOPS = [
  { n: "01", name: "Suite Horizon", role: "Penthouse Ambience" },
  { n: "02", name: "Flavor Platter", role: "Table Presentation" },
  { n: "03", name: "Volumetric Exhale", role: "Golden Smoke Draw" },
  { n: "04", name: "Apex Macro", role: "Hardware Engineering" },
];

/**
 * HeroProductHUD
 * High-End Luxury Hardware Showcase Console (15-Year Creative Direction Standard)
 * Displays the exact vape hardware alongside the cinematic background animation:
 * - Live model specs & serial identification
 * - Studio product portrait with interactive 3D perspective tilt
 * - Real-time flavor switcher with sensory profile meters
 * - Interactive smoke pulse trigger
 * - Direct local Pueblo inventory confirmation
 */
export function HeroProductHUD({
  currentShot,
  onSelectShot,
  onExplore,
  selectedFlavorIndex,
  onSelectFlavor,
  onTriggerSmoke,
  className,
}: HeroProductHUDProps) {
  const activeFlavor = HERO_FLAVORS[selectedFlavorIndex] || HERO_FLAVORS[0];
  const [isHovered, setIsHovered] = useState(false);

  return (
    <aside
      aria-label="Active Hardware Showcase Console"
      className={cn(
        "pointer-events-auto flex flex-col justify-between border border-[#E4D7C7]/80 bg-[#F7F3EC]/94 p-5 shadow-[0_28px_65px_-18px_rgba(22,35,43,0.22)] backdrop-blur-xl sm:p-6",
        className,
      )}
    >
      {/* 1. TOP STATUS BAR: Active Hardware Indicator */}
      <div className="border-b border-[#E4D7C7]/90 pb-3.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span
              className="relative flex size-2.5 items-center justify-center"
            >
              <span
                className="absolute inline-flex size-full animate-ping rounded-full opacity-75"
                style={{ backgroundColor: activeFlavor.accent }}
              />
              <span
                className="relative inline-flex size-2 rounded-full"
                style={{ backgroundColor: activeFlavor.accent }}
              />
            </span>
            <span className="eyebrow !text-[0.62rem] !tracking-[0.24em] text-[#1E211F]">
              FEATURED HARDWARE
            </span>
          </div>
          <span className="eyebrow !text-[0.58rem] !tracking-[0.2em] text-[#8c8275]">
            21+ ADULT LUXURY
          </span>
        </div>

        {/* Scene Director Bar (Mini Timeline Controller) */}
        <div className="mt-3 flex items-center gap-1">
          {SHOT_STOPS.map((s, i) => {
            const isActive = i === currentShot;
            return (
              <button
                key={s.n}
                type="button"
                onClick={() => onSelectShot(i)}
                className={cn(
                  "group relative flex-1 py-1 text-left transition-all",
                  isActive ? "opacity-100" : "opacity-55 hover:opacity-90",
                )}
                title={`${s.name} · ${s.role}`}
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow !text-[0.55rem] font-medium text-[#1E211F]">{s.n}</span>
                  {isActive && (
                    <span className="size-1 rounded-full bg-[#9E7C55]" />
                  )}
                </div>
                <div
                  aria-hidden="true"
                  className={cn(
                    "mt-1 h-[2px] w-full transition-all duration-500",
                    isActive ? "bg-[#1E211F]" : "bg-[#E4D7C7] group-hover:bg-[#9E7C55]",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* 2. THE VAPE HERO DISPLAY: High-Resolution Real Studio Hardware Shot */}
      <div
        className="group relative my-3.5 flex flex-col items-center justify-center overflow-hidden rounded-sm border border-[#E4D7C7]/70 bg-[#EFE8DC]/40 p-3 transition-all duration-500 hover:border-[#1E211F]/30"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Ambient Halo Backlight matched to active flavor */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 left-1/2 size-36 -translate-x-1/2 rounded-full opacity-40 blur-2xl transition-all duration-700"
          style={{ backgroundColor: activeFlavor.glow }}
        />

        {/* Device Image Container with specular sheen and smooth transition */}
        <div className="relative h-44 w-32 sm:h-52 sm:w-36">
          <Image
            src={activeFlavor.image}
            alt={`${activeFlavor.name} luxury vape device`}
            fill
            sizes="200px"
            priority
            className={cn(
              "object-contain transition-transform duration-700 ease-[var(--ease-expo)]",
              isHovered ? "scale-105 -translate-y-1" : "scale-100",
            )}
          />
        </div>

        {/* Floating Spec Badge Overlay */}
        <div className="mt-2 flex w-full items-center justify-between border-t border-[#E4D7C7]/60 pt-2">
          <span className="eyebrow !text-[0.54rem] !tracking-[0.16em] text-[#59534c]">
            {activeFlavor.series}
          </span>
          <span
            className="eyebrow !text-[0.54rem] font-semibold"
            style={{ color: activeFlavor.accent }}
          >
            {activeFlavor.tag}
          </span>
        </div>
      </div>

      {/* 3. FLAVOR INFORMATION & SENSORY PROFILES */}
      <div>
        <div className="flex items-baseline justify-between">
          <h4 className="serif text-lg font-medium text-[#1E211F] sm:text-xl">
            {activeFlavor.name}
          </h4>
          <span className="eyebrow !text-[0.56rem] text-[#8c8275]">
            40mg Salt Reserve
          </span>
        </div>

        <p className="mt-1 text-xs leading-relaxed text-[#59534c]">
          {activeFlavor.notes}
        </p>

        {/* Sensory Metrics Radar Meters */}
        <div className="mt-2.5 grid grid-cols-3 gap-2 border-y border-[#E4D7C7]/80 py-2">
          <div>
            <div className="flex items-center justify-between text-[0.55rem] text-[#8c8275]">
              <span>COOLING</span>
              <span className="font-mono text-[#1E211F]">{activeFlavor.cooling}/5</span>
            </div>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div
                  key={lvl}
                  className={cn(
                    "h-1 flex-1 transition-colors duration-300",
                    lvl <= activeFlavor.cooling ? "bg-[#6AA4C4]" : "bg-[#E4D7C7]",
                  )}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[0.55rem] text-[#8c8275]">
              <span>SWEET</span>
              <span className="font-mono text-[#1E211F]">{activeFlavor.sweetness}/5</span>
            </div>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div
                  key={lvl}
                  className={cn(
                    "h-1 flex-1 transition-colors duration-300",
                    lvl <= activeFlavor.sweetness ? "bg-[#D27D60]" : "bg-[#E4D7C7]",
                  )}
                />
              ))}
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between text-[0.55rem] text-[#8c8275]">
              <span>THROAT</span>
              <span className="font-mono text-[#1E211F]">{activeFlavor.throatHit}/5</span>
            </div>
            <div className="mt-1 flex gap-0.5">
              {[1, 2, 3, 4, 5].map((lvl) => (
                <div
                  key={lvl}
                  className={cn(
                    "h-1 flex-1 transition-colors duration-300",
                    lvl <= activeFlavor.throatHit ? "bg-[#8C6A4F]" : "bg-[#E4D7C7]",
                  )}
                />
              ))}
            </div>
          </div>
        </div>

        {/* 4. INTERACTIVE FLAVOR SWATCH SELECTOR (Highlighted Vape Finishes) */}
        <div className="mt-3">
          <div className="mb-1.5 flex items-center justify-between">
            <span className="eyebrow !text-[0.56rem] text-[#59534c]">
              SELECT FLAVOR FINISH
            </span>
            <span className="eyebrow !text-[0.52rem] text-[#8c8275]">
              {selectedFlavorIndex + 1} of {HERO_FLAVORS.length}
            </span>
          </div>

          <div className="grid grid-cols-4 gap-1.5">
            {HERO_FLAVORS.map((f, i) => {
              const isSelected = i === selectedFlavorIndex;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => onSelectFlavor(i)}
                  className={cn(
                    "group relative flex flex-col items-center rounded-sm border p-1.5 transition-all duration-300",
                    isSelected
                      ? "border-[#1E211F] bg-[#F7F3EC] shadow-sm ring-1 ring-[#1E211F]/20"
                      : "border-[#E4D7C7] bg-[#EFE8DC]/50 hover:border-[#1E211F]/40 hover:bg-[#F7F3EC]",
                  )}
                  title={`${f.name} · ${f.finish}`}
                >
                  <span
                    aria-hidden="true"
                    className="size-3.5 rounded-full border border-black/15 shadow-inner"
                    style={{ backgroundColor: f.accent }}
                  />
                  <span className="eyebrow mt-1 block truncate !text-[0.52rem] font-medium text-[#1E211F]">
                    {f.name.split(" ")[0]}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* 5. HARDWARE SPECS PILLS */}
        <div className="mt-3 flex items-center justify-between rounded-sm border border-[#E4D7C7]/70 bg-[#EFE8DC]/30 px-2.5 py-1.5 text-[0.58rem] font-medium text-[#1E211F]">
          <span>50,000 Puffs</span>
          <span className="text-[#9E7C55]">·</span>
          <span>Smart LED Screen</span>
          <span className="text-[#9E7C55]">·</span>
          <span>Dual Mesh Core</span>
        </div>

        {/* 6. ACTION CONTROLS: Exhale Smoke Trigger + Pueblo Reservation */}
        <div className="mt-3.5 flex flex-col gap-2">
          {onTriggerSmoke && (
            <button
              type="button"
              onClick={onTriggerSmoke}
              className="eyebrow flex w-full items-center justify-center gap-2 border border-[#9E7C55]/60 bg-[#9E7C55]/10 py-2 !text-[0.6rem] !tracking-[0.18em] text-[#9E7C55] transition-colors hover:bg-[#9E7C55] hover:text-[#16232B]"
            >
              <span>💨</span>
              <span>TEST VOLUMETRIC EXHALE</span>
            </button>
          )}

          <button
            type="button"
            onClick={onExplore}
            className="eyebrow flex w-full items-center justify-between border border-[#1E211F] bg-[#1E211F] px-4 py-2.5 !text-[0.62rem] !tracking-[0.18em] text-[#F7F3EC] transition-all duration-300 hover:bg-[#9E7C55] hover:text-[#16232B]"
          >
            <span>RESERVE AT PUEBLO STORE</span>
            <span>→</span>
          </button>
        </div>

        <div className="mt-2 flex items-center justify-center gap-1.5 text-center text-[0.54rem] text-[#8c8275]">
          <span className="size-1 rounded-full bg-emerald-600" />
          <span>In Stock at 3904 Pueblo Blvd · 21+ ID Required</span>
        </div>
      </div>
    </aside>
  );
}
