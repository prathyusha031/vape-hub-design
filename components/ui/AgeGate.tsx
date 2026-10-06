"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/animations/gsap";
import { setScrollLock, signalEnter } from "@/lib/utils/enter";
import { legal } from "@/lib/data/site";

const KEY = "vh-age-verified";

/**
 * 21+ AGE GATE — LUXURY RESORT CONCIERGE EXPERIENCE
 * Redesigned in ivory, cream, soft navy and subtle gold.
 * Preserves 21+ age verification logic and legally required nicotine warnings.
 */
export function AgeGate() {
  const [state, setState] = useState<"checking" | "ask" | "denied" | "done">("checking");
  const root = useRef<HTMLDivElement>(null);
  const firstBtn = useRef<HTMLButtonElement>(null);

  const dissolve = (fast = false) => {
    const el = root.current;
    const finish = () => {
      setState("done");
      setScrollLock(false);
      signalEnter();
    };
    if (!el) return finish();
    gsap.to(el, {
      autoAlpha: 0,
      duration: fast ? 0.4 : 1.1,
      ease: "power2.inOut",
      onComplete: finish,
    });
  };

  useEffect(() => {
    setScrollLock(true);
    let ok = false;
    try {
      ok = window.localStorage.getItem(KEY) === "1";
    } catch {
      /* storage unavailable */
    }
    if (ok) {
      dissolve(true);
    } else {
      setState("ask");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (state === "ask") {
      gsap.fromTo(
        "[data-gate-in]",
        { y: 24, autoAlpha: 0 },
        { y: 0, autoAlpha: 1, duration: 1.1, stagger: 0.08, ease: "expo.out", delay: 0.15 },
      );
      firstBtn.current?.focus({ preventScroll: true });
    }
  }, [state]);

  const confirm = () => {
    try {
      window.localStorage.setItem(KEY, "1");
    } catch {
      /* ignore */
    }
    dissolve();
  };

  if (state === "done") return null;

  return (
    <div
      ref={root}
      role="dialog"
      aria-modal="true"
      aria-labelledby="age-title"
      className={`fixed inset-0 z-[100] flex items-center justify-center px-5 transition-[background-color,backdrop-filter] duration-700 ${
        state === "checking" ? "bg-[#16232B]" : "bg-[#16232B]/80 backdrop-blur-2xl"
      }`}
    >
      {state !== "checking" && (
        <div
          data-gate-in
          className="relative w-full max-w-[32rem] border border-[#E4D7C7] bg-[#F7F3EC] p-8 text-center shadow-[0_4px_24px_rgba(22,35,43,0.2),0_40px_80px_-20px_rgba(22,35,43,0.45)] sm:p-12 md:p-14"
        >
          {/* Subtle gold accent frame line */}
          <div aria-hidden="true" className="pointer-events-none absolute inset-2 border border-[#9E7C55]/25" />

          {/* Concierge Badge */}
          <div data-gate-in className="flex justify-center">
            <span className="eyebrow inline-flex items-center gap-2 border border-[#9E7C55]/35 bg-[#EFE8DC] px-3.5 py-1 !text-[0.62rem] text-[#9E7C55]">
              <span className="size-1.5 rounded-full bg-[#9E7C55]" />
              The Vape Hub · Age Verification
            </span>
          </div>

          {state === "ask" ? (
            <>
              <h2
                id="age-title"
                data-gate-in
                className="serif mt-6 text-[clamp(2.2rem,5.5vw,3.2rem)] italic leading-[1.05] text-[#1E211F]"
              >
                Are you 21 or older<span className="not-italic text-[#9E7C55]">?</span>
              </h2>

              <p data-gate-in className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#59534c]">
                This website presents nicotine and vapor devices. Entry is strictly reserved for adults 21 years of age
                or older.
              </p>

              <div
                data-gate-in
                className="mt-8 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center"
              >
                <button
                  ref={firstBtn}
                  onClick={confirm}
                  className="eyebrow min-h-12 bg-[#1E211F] px-8 py-3.5 !text-[0.68rem] text-[#F7F3EC] shadow-[0_2px_8px_rgba(30,33,31,0.12)] transition-all duration-300 hover:bg-[#9E7C55] hover:text-[#16232B]"
                >
                  Yes, I&rsquo;m 21+
                </button>
                <button
                  onClick={() => setState("denied")}
                  className="eyebrow min-h-12 border border-[#E4D7C7] bg-transparent px-8 py-3.5 !text-[0.68rem] text-[#1E211F] transition-all duration-300 hover:border-[#1E211F] hover:bg-[#EFE8DC]"
                >
                  No, I&rsquo;m not
                </button>
              </div>

              {/* Legally Required Nicotine Warning */}
              <div data-gate-in className="mx-auto mt-8 max-w-sm border-t border-[#E4D7C7] pt-5">
                <p className="eyebrow !text-[0.6rem] !tracking-[0.14em] text-[#8c8275]">
                  {legal.nicotineWarning}
                </p>
              </div>
            </>
          ) : (
            <>
              <h2 id="age-title" className="serif mt-6 text-[clamp(2rem,5vw,2.8rem)] italic text-[#1f1d1a]">
                Thank you for visiting.
              </h2>
              <p className="mx-auto mt-4 max-w-sm text-sm leading-relaxed text-[#6c6359]" role="alert">
                You must be 21 years of age or older to browse or purchase from The Vape Hub.
              </p>
              <div className="mt-8">
                <a
                  href="https://www.google.com"
                  className="eyebrow inline-flex min-h-10 items-center border border-[#d6c8b2] px-6 py-2 !text-[0.65rem] text-[#1f1d1a] transition-colors hover:bg-[#efe7da]"
                >
                  Exit Website
                </a>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
