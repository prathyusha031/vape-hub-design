"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";

export type ProductViewMode = "full" | "mouthpiece" | "base" | "aside";

export interface ProductViewerProps {
  /** Frame index for 360 rotation (0 to 47) */
  frameIndex?: number;
  /** Active view framing */
  viewMode?: ProductViewMode;
  /** Whether the discrete base indicator light is illuminated */
  indicatorActive?: boolean;
  /** Whether a subtle translucent vapor plume rises from the mouthpiece */
  showVapor?: boolean;
  /** Optional 3D GLB model URL for future 3D extension */
  modelUrl?: string;
  className?: string;
  alt?: string;
}

const TOTAL_FRAMES = 48;
const getFrameSrc = (idx: number) =>
  `/images/sequence-day/device-${String(Math.min(TOTAL_FRAMES - 1, Math.max(0, Math.round(idx)))).padStart(2, "0")}.webp`;

/**
 * ProductViewer
 * A luxury product viewer abstraction.
 * Currently renders high-performance 360-degree image sequences and macro lens focus plates,
 * with slots for discrete LED indicator illumination and translucent vapor.
 * Architected so a Three.js / React Three Fiber GLB model can be seamlessly inserted via `modelUrl`.
 */
export function ProductViewer({
  frameIndex = 0,
  viewMode = "full",
  indicatorActive = false,
  showVapor = false,
  modelUrl,
  className = "",
  alt = "The Vape Hub luxury device in natural sunlight",
}: ProductViewerProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vaporCanvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Preload and cache rotation frames
  useEffect(() => {
    let active = true;
    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches;
    const step = isMobile ? 2 : 1;
    const imgs: HTMLImageElement[] = [];

    let loadedCount = 0;
    const totalToLoad = Math.ceil(TOTAL_FRAMES / step);

    for (let i = 0; i < TOTAL_FRAMES; i += step) {
      const img = new window.Image();
      img.decoding = "async";
      img.src = getFrameSrc(i);
      img.onload = () => {
        if (!active) return;
        loadedCount++;
        if (loadedCount >= Math.min(6, totalToLoad)) {
          setLoaded(true);
        }
      };
      imgs[i] = img;
    }
    imagesRef.current = imgs;

    return () => {
      active = false;
    };
  }, []);

  // Draw current frame to canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const isMobile = typeof window !== "undefined" && window.matchMedia("(max-width: 899px)").matches;
    const step = isMobile ? 2 : 1;

    const target = Math.round(frameIndex) % TOTAL_FRAMES;
    const normalized = target < 0 ? target + TOTAL_FRAMES : target;
    const nearestIndex = normalized - (normalized % step);

    const img = imagesRef.current[nearestIndex] || imagesRef.current[0];
    if (img && img.complete && img.naturalWidth) {
      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);
      const ratio = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * ratio;
      const dh = img.naturalHeight * ratio;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    }
  }, [frameIndex, loaded]);

  // Handle high-DPI canvas resizing
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(canvas.clientWidth * dpr);
      canvas.height = Math.round(canvas.clientHeight * dpr);
    };

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);
    resize();

    return () => ro.disconnect();
  }, []);

  // Subtle rising vapor animation when showVapor is true
  useEffect(() => {
    if (!showVapor) return;
    const vc = vaporCanvasRef.current;
    if (!vc) return;
    const ctx = vc.getContext("2d");
    if (!ctx) return;

    let animId = 0;
    let t = 0;

    const renderVapor = () => {
      t += 0.03;
      const w = vc.width;
      const h = vc.height;
      ctx.clearRect(0, 0, w, h);

      // Subtle, translucent warm white plume
      ctx.save();
      const numParticles = 6;
      for (let i = 0; i < numParticles; i++) {
        const offset = (t + i * 0.4) % 2.5;
        const progress = offset / 2.5;
        const y = h * (0.85 - progress * 0.7);
        const x = w * 0.5 + Math.sin(offset * 2.5 + i) * (14 * progress);
        const radius = 8 + progress * 24;
        const alpha = Math.sin(progress * Math.PI) * 0.18;

        const grad = ctx.createRadialGradient(x, y, 0, x, y, radius);
        grad.addColorStop(0, `rgba(247, 243, 236, ${alpha})`);
        grad.addColorStop(0.6, `rgba(239, 232, 220, ${alpha * 0.5})`);
        grad.addColorStop(1, "rgba(239, 232, 220, 0)");

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
  }, [showVapor]);

  // If a 3D GLB model URL is supplied in the future, it can be loaded here
  if (modelUrl) {
    return (
      <div className={`relative flex items-center justify-center ${className}`}>
        {/* Placeholder for future Three.js Canvas */}
        <p className="eyebrow text-smoke">3D Model Mount: {modelUrl}</p>
      </div>
    );
  }

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* 360 Full Frame / Aside View */}
      <div
        className={`relative h-full w-full transition-opacity duration-700 ${
          viewMode === "full" || viewMode === "aside" ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        style={{ aspectRatio: "640 / 880" }}
      >
        {/* Contact shadow on travertine plinth */}
        <div
          aria-hidden="true"
          className="contact-shadow absolute bottom-[11.5%] left-1/2 h-[5%] w-[34%] -translate-x-1/2"
        />

        <canvas
          ref={canvasRef}
          className="relative z-10 h-full w-full object-contain"
          role="img"
          aria-label={alt}
        />

        {/* Discrete LED base indicator */}
        <div
          className={`pointer-events-none absolute bottom-[14%] left-1/2 z-20 size-2.5 -translate-x-1/2 rounded-full transition-all duration-700 ${
            indicatorActive
              ? "bg-[#C58E72] shadow-[0_0_14px_6px_rgba(197,142,114,0.65)] opacity-100"
              : "bg-[#25231F]/20 opacity-0"
          }`}
          aria-hidden="true"
        />

        {/* Mouthpiece micro vapor */}
        <canvas
          ref={vaporCanvasRef}
          width={180}
          height={180}
          aria-hidden="true"
          className={`pointer-events-none absolute -top-8 left-1/2 z-20 -translate-x-1/2 transition-opacity duration-700 ${
            showVapor ? "opacity-100" : "opacity-0"
          }`}
        />
      </div>

      {/* Mouthpiece Macro Focus Plate */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-700 ${
          viewMode === "mouthpiece"
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="relative aspect-square w-[85%] max-w-[28rem] overflow-hidden border border-[#E4D7C7] bg-[#EFE8DC] shadow-[0_24px_48px_-12px_rgba(30,33,31,0.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/film-day/macro-top.webp"
            alt="Close-up detail of the sculpted ergonomic mouthpiece"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          <div className="absolute bottom-4 left-4 border border-[#E4D7C7] bg-[#F7F3EC]/90 px-3 py-1.5 backdrop-blur-sm">
            <p className="eyebrow !text-[0.58rem] text-[#1E211F]">Detail 01 · Sculpted Ergonomic Mouthpiece</p>
          </div>
        </div>
      </div>

      {/* Base Macro Focus Plate */}
      <div
        className={`absolute inset-0 z-20 flex items-center justify-center transition-all duration-700 ${
          viewMode === "base"
            ? "scale-100 opacity-100"
            : "pointer-events-none scale-95 opacity-0"
        }`}
      >
        <div className="relative aspect-square w-[85%] max-w-[28rem] overflow-hidden border border-[#E4D7C7] bg-[#EFE8DC] shadow-[0_24px_48px_-12px_rgba(30,33,31,0.12)]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/images/film-day/macro-base.webp"
            alt="Close-up detail of the machined champagne base and discrete indicator"
            loading="lazy"
            className="h-full w-full object-cover"
          />
          {/* Subtle indicator pulse overlay on base plate */}
          <div
            className={`pointer-events-none absolute bottom-[26%] left-[48%] size-3 -translate-x-1/2 rounded-full transition-all duration-500 ${
              indicatorActive
                ? "bg-[#C58E72] shadow-[0_0_16px_8px_rgba(197,142,114,0.7)] opacity-100"
                : "opacity-0"
            }`}
          />
          <div className="absolute bottom-4 left-4 border border-[#E4D7C7] bg-[#F7F3EC]/90 px-3 py-1.5 backdrop-blur-sm">
            <p className="eyebrow !text-[0.58rem] text-[#1E211F]">Detail 02 · Machined Base & Indicator Light</p>
          </div>
        </div>
      </div>
    </div>
  );
}
