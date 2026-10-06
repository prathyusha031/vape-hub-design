"use client";

import type { ExhaleHandle } from "./ExhaleVapor";

/**
 * "Golden Hour" — the hero film. One clock; every layer is a pure function of
 * time, so seeking (skip / scroll / returning visitors) is always exact.
 * When real footage is present it owns the picture and this director only
 * drives the brand card, type and UI against video time.
 *
 *  0.0 – 2.7   A  The suite. Ocean, infinity pool, palms, sheer curtains.
 *                 Someone stands at the glass. Slow dolly in.
 *  2.3 – 4.7   B  Behind them, into the low sun. The camera drifts sideways.
 *  4.7 – 6.3   C  Cut. On the stone table: sunglasses, a room key — and the
 *                 device. Focus racks from the window to the product.
 *  6.3 – 8.05  M  Macro: gold base and indicator, then the mouthpiece.
 *  8.05 – 10.6 U  Back at the window. A quiet draw; soft vapor drifts out
 *                 into the sunlight.
 *  9.6 – 11.2     The vapor crosses the frame and carries us to…
 * 10.35 →     F  …the device, close, the room falling softly out of focus.
 * 10.9 – 12.1     THE VAPE HUB
 * 12.1 →          FIND YOUR cloud. · copy · actions
 */

export const FILM = { typeIn: 12.1, end: 14.0, returnStart: 10.35, exhale: 8.55 } as const;

const clamp = (v: number, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const lin = (t: number, a: number, b: number) => clamp((t - a) / (b - a));
const E = {
  inOut: (x: number) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2),
  out: (x: number) => 1 - Math.pow(1 - x, 3),
  expo: (x: number) => (x >= 1 ? 1 : 1 - Math.pow(2, -10 * x)),
  sine: (x: number) => -(Math.cos(Math.PI * x) - 1) / 2,
};
const k = (t: number, a: number, b: number, e: (x: number) => number = E.inOut) => e(lin(t, a, b));

type El = HTMLElement | null;
export type ResortEls = {
  root: HTMLElement;
  flash: El;
  aShot: El; aFar: El; aNear: El;
  bShot: El; bFar: El; bNear: El;
  cShot: El; cBg: El; cFg: El;
  m1: El; m1Img: El;
  m2: El; m2Img: El;
  uShot: El; uFar: El; uNear: El;
  fShot: El; fBg: El; fFg: El;
  wash: El;
  card: El;
  lines: HTMLElement[];
  fades: HTMLElement[];
  skip: El;
  shot01Label?: El;
};

export type VaporGeometry = () => { origin: [number, number]; dir: [number, number]; light: [number, number] } | null;

export class ResortDirector {
  t = 0;
  private raf = 0;
  private last = 0;
  private playing = false;
  private mode: "film" | "video" = "film";
  private video: HTMLVideoElement | null = null;
  private videoMax = 0;
  private typeOffset = 0;

  constructor(
    private els: ResortEls,
    private vapor: () => ExhaleHandle | null,
    private geometry: VaporGeometry,
    private opts: { startAt?: number; still?: boolean } = {},
  ) {
    this.t = opts.still ? FILM.end + 2 : opts.startAt ?? 0;
    this.render();
  }

  useVideo(v: HTMLVideoElement, typeAt: number) {
    this.mode = "video";
    this.video = v;
    this.typeOffset = typeAt - FILM.typeIn;
    this.els.root.dataset.mode = "video";
    this.render();
  }
  useFilm() {
    this.mode = "film";
    this.video = null;
    this.typeOffset = 0;
    this.els.root.dataset.mode = "film";
    this.render();
  }

  play() {
    if (this.playing || this.opts.still) return;
    this.playing = true;
    this.last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.1, (now - this.last) / 1000);
      this.last = now;
      if (this.mode === "video" && this.video) {
        this.videoMax = Math.max(this.videoMax, this.video.currentTime || 0);
        this.t = this.videoMax - this.typeOffset;
      } else this.t += dt;
      this.render();
      // keep ticking a while after the type lands (idle drift), then rest
      if (this.t < FILM.end + 30) this.raf = requestAnimationFrame(loop);
      else this.playing = false;
    };
    this.raf = requestAnimationFrame(loop);
  }

  seek(t: number) {
    if (t <= this.t) return;
    if (this.mode === "video") this.videoMax = Math.max(this.videoMax, t + this.typeOffset);
    this.t = t;
    this.render();
  }

  stop() {
    cancelAnimationFrame(this.raf);
    this.playing = false;
  }

  render() {
    const t = this.t;
    const e = this.els;
    const S = (el: El, css: Record<string, string>) => {
      if (!el) return;
      for (const key in css) (el.style as unknown as Record<string, string>)[key] = css[key];
    };
    const blur = (px: number) => (px > 0.15 ? `blur(${px.toFixed(2)}px)` : "none");
    const op = (v: number) => v.toFixed(3);

    if (this.mode === "film") {
      // the eye adjusting to bright light
      S(e.flash, { opacity: op(1 - k(t, 0.0, 1.5, E.out)) });

      // --- A: the suite — slow dolly in
      const aP = lin(t, 0, 2.75);
      S(e.aShot, { opacity: t < 2.75 ? "1" : "0" });
      S(e.aNear, { transform: `scale(${(1 + 0.07 * E.sine(aP)).toFixed(4)})` });
      S(e.aFar, { transform: `scale(${(1 + 0.028 * E.sine(aP)).toFixed(4)})` });

      // --- B: behind them, the camera drifts sideways (parallax)
      const bIn = k(t, 2.3, 2.75, E.sine);
      const bP = lin(t, 2.3, 4.7);
      S(e.bShot, { opacity: op(t < 4.7 ? bIn : 0) });
      S(e.bNear, { transform: `translate3d(${(1.6 - 2.6 * bP).toFixed(3)}%,0,0) scale(${(1.05 + 0.035 * bP).toFixed(4)})` });
      S(e.bFar, { transform: `translate3d(${(0.5 - 0.8 * bP).toFixed(3)}%,0,0) scale(${(1.02 + 0.012 * bP).toFixed(4)})` });

      // --- C: still life; focus racks from the window to the device
      const rack = k(t, 4.95, 5.75);
      S(e.cShot, { opacity: t >= 4.7 && t < 6.3 ? "1" : "0", transform: `scale(${(1 + 0.04 * lin(t, 4.7, 6.3)).toFixed(4)})` });
      S(e.cBg, { filter: blur(9 * rack) });
      S(e.cFg, { filter: blur(7 * (1 - rack)) });

      // --- macro inserts (still camera, focus pulls only)
      S(e.m1, { opacity: t >= 6.3 && t < 7.15 ? "1" : "0" });
      S(e.m1Img, { filter: blur(12 * (1 - k(t, 6.32, 6.9, E.out))), transform: `scale(${(1.06 - 0.025 * lin(t, 6.3, 7.15)).toFixed(4)})` });
      S(e.m2, { opacity: t >= 7.15 && t < 8.05 ? "1" : "0" });
      S(e.m2Img, { filter: blur(10 * (1 - k(t, 7.17, 7.6, E.out))), transform: `translate3d(0,${(-1.4 * lin(t, 7.15, 8.05)).toFixed(2)}%,0) scale(1.04)` });

      // --- U: back at the window, the draw and the exhale
      const uP = lin(t, 8.05, 10.6);
      const uOut = k(t, 10.15, 10.6, E.sine);
      S(e.uShot, { opacity: op(t >= 8.05 && t < 10.6 ? 1 - uOut : 0) });
      S(e.uNear, { transform: `scale(${(1.0 + 0.045 * E.sine(uP)).toFixed(4)})` });
      S(e.uFar, { transform: `scale(${(1.0 + 0.018 * E.sine(uP)).toFixed(4)})` });

      // --- F: the device, close; the room softens behind it
      const fVis = t < 10.15 ? 0 : 1;
      const settle = 1.06 - 0.06 * k(t, 10.15, 13.2, E.out);
      const idle = 1 + 0.018 * lin(t, FILM.end, FILM.end + 30);
      S(e.fShot, { opacity: String(fVis), transform: `scale(${(settle * idle).toFixed(4)})` });
      S(e.fBg, { filter: blur(3.2 * k(t, 10.9, 12.6)) });

      const v = this.vapor();
      const g = this.geometry();
      if (v && t <= FILM.end + 0.5) {
        const age = t - FILM.exhale;
        v.set({
          age: t >= 8.05 && t < 11.4 ? age : -1,
          intensity: 0.95,
          drift: lin(t, 9.6, 11.3),
          wisp: 0.3 * k(t, 10.6, 13.5),
          haze: 0.5 * k(t, 8.2, 9.2) * (1 - k(t, 10.4, 11.2)),
          ...(g ?? {}),
        });
      }
    }

    // --- brand card
    const cardIn = k(t, 10.9, 11.6, E.out);
    const cardOut = k(t, 11.75, 12.15);
    S(e.card, {
      opacity: op(cardIn * (1 - cardOut)),
      letterSpacing: `${(0.5 - 0.16 * cardIn).toFixed(3)}em`,
    });

    // --- type, copy, actions
    S(e.wash, { opacity: op(k(t, 11.2, 12.6)) });
    e.lines.forEach((line, i) => {
      const p = k(t, FILM.typeIn + i * 0.18, FILM.typeIn + 1.3 + i * 0.18, E.expo);
      S(line, {
        transform: `translate3d(0, ${((1 - p) * 102).toFixed(2)}%, 0)`,
        filter: p < 1 ? `blur(${((1 - p) * 6).toFixed(2)}px)` : "none",
        opacity: op(Math.min(1, p * 1.5)),
      });
    });
    e.fades.forEach((el, i) => {
      const p = k(t, FILM.typeIn - 0.25 + i * 0.13, FILM.typeIn + 0.75 + i * 0.13, E.out);
      S(el, { opacity: op(p), transform: `translate3d(0, ${((1 - p) * 10).toFixed(1)}px, 0)` });
    });

    const chromeOut = 1 - k(t, 10.7, 11.2);
    S(e.skip, { opacity: op(k(t, 0.8, 1.4) * chromeOut), pointerEvents: t > 10.7 ? "none" : "auto" });

    if (e.shot01Label) {
      const labelOp = k(t, 0.4, 1.2, E.out) * (1 - k(t, 2.2, 2.75, E.sine));
      S(e.shot01Label, { opacity: op(labelOp) });
    }
  }
}
