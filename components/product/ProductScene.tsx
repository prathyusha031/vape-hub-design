"use client";

import { useEffect, useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";

const FRAMES = 48;
const frameSrc = (i: number) => `/images/sequence-day/device-${String(i).padStart(2, "0")}.webp`;

const principles = [
  {
    n: "01",
    tag: "Design",
    title: "THOUGHTFUL DESIGN",
    body: "Balanced weight, tactile satin finish, and an effortless silhouette crafted to fit your daily rhythm without distraction.",
    position: "left-top",
  },
  {
    n: "02",
    tag: "Guidance",
    title: "PERSONAL GUIDANCE",
    body: "No jargon or confusing spec sheets. We talk through your preferences and match you with what genuinely fits.",
    position: "right-mid",
  },
  {
    n: "03",
    tag: "Expertise",
    title: "LOCAL EXPERTISE",
    body: "Real support from neighbors right here in Pueblo. Coils, pods, battery questions — we take care of you.",
    position: "left-bottom",
  },
];

/**
 * SECTION 02 — MORE THAN A DEVICE
 * Transition from hero into a bright ivory/travertine environment.
 * Headline: MORE THAN A DEVICE.
 * Premium product pedestal.
 * The vape rotates slowly with scroll controlling rotation.
 * Three principles appear sequentially:
 * 01 THOUGHTFUL DESIGN
 * 02 PERSONAL GUIDANCE
 * 03 LOCAL EXPERTISE
 * Hairline rules. Subtle movement. No card-grid spam. Solid colors without gradients.
 */
export function ProductScene() {
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const frame = useRef({ i: 0 });
  const drawRef = useRef<() => void>(() => {});

  useEffect(() => {
    const c = canvas.current!;
    const ctx = c.getContext("2d")!;
    const mobile = window.matchMedia("(max-width: 899px)").matches;
    const step = mobile ? 2 : 1;
    const imgs: HTMLImageElement[] = [];

    const draw = () => {
      const want = Math.round(frame.current.i);
      let img: HTMLImageElement | undefined;
      for (let k = want - (want % step); k >= 0; k -= step) {
        const cand = imgs[k];
        if (cand && cand.complete && cand.naturalWidth) {
          img = cand;
          break;
        }
      }
      if (!img) return;
      const w = c.width;
      const h = c.height;
      ctx.clearRect(0, 0, w, h);
      const r = Math.min(w / img.naturalWidth, h / img.naturalHeight);
      const dw = img.naturalWidth * r;
      const dh = img.naturalHeight * r;
      ctx.drawImage(img, (w - dw) / 2, (h - dh) / 2, dw, dh);
    };
    drawRef.current = draw;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      c.width = Math.round(c.clientWidth * dpr);
      c.height = Math.round(c.clientHeight * dpr);
      draw();
    };
    const ro = new ResizeObserver(resize);
    ro.observe(c);

    const load = () => {
      for (let i = 0; i < FRAMES; i += step) {
        const im = new window.Image();
        im.decoding = "async";
        im.src = frameSrc(i);
        im.onload = () => (i === 0 || Math.abs(i - frame.current.i) < step * 2) && draw();
        imgs[i] = im;
      }
    };

    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          load();
          io.disconnect();
        }
      },
      { rootMargin: "150% 0px" },
    );
    io.observe(c);

    return () => {
      ro.disconnect();
      io.disconnect();
    };
  }, []);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const mm = gsap.matchMedia();

      mm.add({ desktop: MQ.desktop, mobile: MQ.mobile, reduce: MQ.reduce }, (ctx) => {
        const { desktop, reduce } = ctx.conditions as { desktop: boolean; reduce: boolean };

        if (reduce) {
          frame.current.i = 4;
          drawRef.current();
          if (window.matchMedia("(max-width: 899px)").matches) {
            q("[data-principle]").slice(1).forEach((n) => gsap.set(n, { autoAlpha: 0 }));
          }
          return;
        }

        gsap.set(q("[data-principle]"), { autoAlpha: 0, y: 24 });
        gsap.set(q("[data-guide-line]"), { scaleX: 0 });

        const tl = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: desktop ? "+=200%" : "+=150%",
            pin: true,
            scrub: 0.8,
          },
        });

        // Device rotation + subtle rise
        tl.to(frame.current, { i: FRAMES - 1, duration: 1, onUpdate: () => drawRef.current() }, 0)
          .fromTo(
            q("[data-device]"),
            { scale: 1.08, yPercent: 4 },
            { scale: 0.96, yPercent: 0, duration: 0.6, ease: "power1.inOut" },
            0,
          )
          .fromTo(
            q("[data-title] > *"),
            { autoAlpha: 0, y: 28 },
            { autoAlpha: 1, y: 0, stagger: 0.05, duration: 0.16, ease: "power2.out" },
            0.02,
          );

        // Principles reveal sequentially with hairline rule drawing
        const starts = [0.28, 0.52, 0.74];
        q("[data-principle]").forEach((el, i) => {
          const line = el.querySelector("[data-guide-line]");
          tl.to(el, { autoAlpha: 1, y: 0, duration: 0.1, ease: "power2.out" }, starts[i]);
          if (line) {
            tl.to(line, { scaleX: 1, duration: 0.12, ease: "expo.out" }, starts[i] + 0.02);
          }
          if (!desktop) {
            tl.to(el, { autoAlpha: 0, y: -16, duration: 0.06 }, starts[i] + 0.16);
          }
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="story"
      aria-labelledby="story-title"
      data-nav="light"
      className="relative h-[100svh] min-h-[620px] w-full overflow-hidden bg-[#F7F3EC]"
    >
      {/* Solid architectural travertine background (NO gradients) */}
      <div aria-hidden="true" className="absolute inset-0 bg-[#F7F3EC]" />

      {/* The stone plinth pedestal where the device stands */}
      <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[22svh] bg-[#EFE8DC] md:h-[24svh]" />
      <div aria-hidden="true" className="absolute inset-x-0 bottom-[22svh] h-px bg-[#E4D7C7] md:bottom-[24svh]" />

      {/* Section Header */}
      <div
        data-title
        className="absolute inset-x-0 top-[max(11svh,6.25rem)] z-20 px-gutter text-center md:top-[max(13svh,7.25rem)]"
      >
        <p className="eyebrow flex items-center justify-center gap-3 text-[#59534c]">
          <span className="h-px w-8 bg-[#9E7C55]/40" />
          Chapter 02 — The Philosophy
          <span className="h-px w-8 bg-[#9E7C55]/40" />
        </p>
        <h2 id="story-title" className="mt-4 text-[#1E211F]">
          <span className="display text-[clamp(2rem,3.8vw,4rem)]">MORE THAN </span>
          <span className="serif text-[clamp(2.7rem,5vw,5.6rem)] italic leading-none">A DEVICE.</span>
        </h2>
      </div>

      {/* Rotating Vape on Pedestal */}
      <div className="absolute inset-x-0 bottom-[13.5svh] z-10 flex justify-center md:bottom-[14.5svh]">
        <div data-device className="relative h-[50svh] origin-bottom md:h-[60svh]" style={{ aspectRatio: "640 / 880" }}>
          <div
            aria-hidden="true"
            className="contact-shadow absolute bottom-[11.5%] left-1/2 h-[5%] w-[34%] -translate-x-1/2"
          />
          <canvas
            ref={canvas}
            className="absolute inset-0 h-full w-full"
            role="img"
            aria-label="The featured Vape Hub device rotating slowly on the travertine pedestal"
          />
        </div>
      </div>

      {/* Three Sequential Principles */}
      <ul className="pointer-events-none absolute inset-0 z-20">
        {principles.map((p, i) => (
          <li
            key={p.n}
            data-principle
            className={[
              "absolute inset-x-0 bottom-[5svh] px-gutter text-center md:bottom-auto md:max-w-[21rem] md:px-0 md:text-left",
              i === 0 && "md:left-[8%] md:top-[42%]",
              i === 1 && "md:left-auto md:right-[8%] md:top-[48%] md:text-right",
              i === 2 && "md:left-[10%] md:top-[68%]",
            ]
              .filter(Boolean)
              .join(" ")}
          >
            <div className={`flex items-baseline gap-3 ${i === 1 ? "md:justify-end" : ""}`}>
              <span className="serif text-[1.2rem] italic text-[#9E7C55]">{p.n}</span>
              <span className="eyebrow !text-[0.62rem] text-[#8c8275]">{p.tag}</span>
            </div>

            {/* Hairline rule that draws out */}
            <div
              data-guide-line
              aria-hidden="true"
              className={`my-2 hidden h-px w-24 bg-[#9E7C55]/60 md:block ${
                i === 1 ? "origin-right md:ml-auto" : "origin-left"
              }`}
            />

            <h3 className="display text-base tracking-wide text-[#1E211F]">{p.title}</h3>
            <p className="mx-auto mt-2 max-w-[20rem] text-[0.92rem] leading-relaxed text-[#59534c] md:mx-0">
              {p.body}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}
