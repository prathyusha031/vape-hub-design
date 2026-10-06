"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP } from "@/lib/animations/gsap";
import { useSmoothScroll } from "@/components/providers/SmoothScroll";
import { legal, nav, site } from "@/lib/data/site";
import { cn } from "@/lib/utils/cn";
import { setScrollLock } from "@/lib/utils/enter";

export function Navigation() {
  const header = useRef<HTMLElement>(null);
  const menu = useRef<HTMLDivElement>(null);
  const toggleBtn = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [tone, setTone] = useState<"light" | "dark">("light");
  const { scrollTo } = useSmoothScroll();

  // The bar adapts to whatever is underneath it: sections declare data-nav="light|dark".
  const readTone = () => {
    const h = header.current;
    if (!h) return;
    const y = h.getBoundingClientRect().bottom + 2;
    const under = document.elementsFromPoint(window.innerWidth / 2, y).find((n) => !h.contains(n));
    const sec = under?.closest<HTMLElement>("[data-nav]");
    const next = (sec?.dataset.nav as "light" | "dark") ?? "light";
    setTone((prev) => (prev === next ? prev : next));
  };

  // Single ScrollTrigger: solidify after the hero, hide on scroll-down, show on scroll-up
  useGSAP(
    () => {
      const el = header.current!;
      const id = window.setInterval(readTone, 600); // catches changes driven by the film, not scroll
      const st = ScrollTrigger.create({
        start: 0,
        end: "max",
        onUpdate: (self) => {
          const y = self.scroll();
          setScrolled((prev) => (prev !== y > 40 ? y > 40 : prev));
          readTone();
          const hide = self.direction === 1 && y > window.innerHeight * 0.9;
          gsap.to(el, { yPercent: hide ? -100 : 0, duration: 0.6, ease: "expo.out", overwrite: "auto" });
        },
      });
      return () => {
        st.kill();
        window.clearInterval(id);
      };
    },
    { scope: header },
  );

  // Menu open/close animation (skip the initial mount so we don't fight the age gate's lock)
  const prevOpen = useRef(open);
  useEffect(() => {
    const m = menu.current;
    if (!m) return;
    if (prevOpen.current === open) return;
    prevOpen.current = open;
    setScrollLock(open);
    if (open) {
      gsap.set(m, { display: "flex" });
      gsap.fromTo(m, { clipPath: "inset(0 0 100% 0)" }, { clipPath: "inset(0 0 0% 0)", duration: 0.8, ease: "expo.inOut" });
      gsap.fromTo(
        m.querySelectorAll("[data-menu-item]"),
        { yPercent: 110 },
        { yPercent: 0, duration: 0.9, stagger: 0.06, ease: "expo.out", delay: 0.25 },
      );
      (m.querySelector("a") as HTMLElement | null)?.focus({ preventScroll: true });
    } else {
      gsap.to(m, {
        clipPath: "inset(0 0 100% 0)",
        duration: 0.6,
        ease: "expo.inOut",
        onComplete: () => {
          gsap.set(m, { display: "none" });
        },
      });
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) {
        setOpen(false);
        toggleBtn.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const go = (href: string) => (e: React.MouseEvent) => {
    if (!href.startsWith("#")) return;
    e.preventDefault();
    const wasOpen = open;
    setOpen(false);
    window.setTimeout(() => scrollTo(href), wasOpen ? 450 : 0);
  };

  return (
    <>
      <header ref={header} className={cn("fixed inset-x-0 top-0 z-50 transition-colors duration-700", tone === "dark" ? "theme-dark" : "theme-light")}>
        {/* Required nicotine warning — always visible */}
        <div className="flex h-7 items-center justify-center border-b border-bone/[0.08] bg-ink px-gutter">
          <p className="eyebrow truncate !text-[0.58rem] !tracking-[0.16em] text-bone/75">{legal.nicotineWarning}</p>
        </div>
        <div
          className={cn(
            "flex h-16 items-center justify-between px-gutter transition-[background-color,backdrop-filter,border-color] duration-700 md:h-[4.5rem]",
            scrolled ? "border-b border-bone/[0.07] bg-ink/75 backdrop-blur-xl" : "border-b border-transparent",
          )}
        >
          <a href="#top" onClick={go("#top")} className="group flex items-baseline gap-2.5" aria-label="The Vape Hub — home">
            <span className="display text-[0.92rem] !tracking-[0.16em]">The Vape Hub</span>
            <span aria-hidden="true" className="size-[5px] translate-y-[-1px] rounded-full bg-copper transition-transform duration-700 group-hover:scale-150" />
          </a>

          <nav aria-label="Primary" className="absolute left-1/2 hidden -translate-x-1/2 lg:block">
            <ul className="flex items-center gap-11">
              {nav.map((n) => (
                <li key={n.label}>
                  <a
                    href={n.href}
                    onClick={go(n.href)}
                    className="eyebrow relative py-2 !text-[0.66rem] text-bone/65 transition-colors hover:text-bone after:absolute after:-bottom-0.5 after:left-0 after:h-px after:w-full after:origin-right after:scale-x-0 after:bg-bone/60 after:transition-transform after:duration-500 hover:after:origin-left hover:after:scale-x-100"
                  >
                    {n.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="flex items-center gap-3 md:gap-5">
            <a
              href={site.routes.shop}
              onClick={go(site.routes.shop)}
              className="eyebrow hidden min-h-10 items-center border border-bone/20 px-5 !text-[0.66rem] text-bone transition-colors duration-500 hover:border-bone hover:bg-bone hover:text-ink sm:inline-flex"
            >
              Shop
            </a>
            <span
              className="eyebrow grid h-10 min-w-10 place-items-center rounded-full border border-bone/20 px-2 !text-[0.6rem] !tracking-[0.06em] text-bone/80"
              title="Adults 21+ only"
            >
              21+
            </span>
            <button
              ref={toggleBtn}
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? "Close menu" : "Open menu"}
              className="relative grid size-11 place-items-center lg:hidden"
            >
              <span
                className={cn(
                  "absolute h-px w-6 bg-bone transition-transform duration-500",
                  open ? "rotate-45" : "-translate-y-[4px]",
                )}
              />
              <span
                className={cn(
                  "absolute h-px w-6 bg-bone transition-transform duration-500",
                  open ? "-rotate-45" : "translate-y-[4px]",
                )}
              />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet menu */}
      <div
        ref={menu}
        id="mobile-menu"
        className="fixed inset-0 z-40 hidden flex-col justify-between bg-ink px-gutter pb-10 pt-32 lg:!hidden"
        style={{ clipPath: "inset(0 0 100% 0)" }}
        aria-hidden={!open}
      >
        <nav aria-label="Mobile">
          <ul className="space-y-1">
            {nav.map((n, i) => (
              <li key={n.label} className="overflow-hidden">
                <a
                  data-menu-item
                  href={n.href}
                  onClick={go(n.href)}
                  tabIndex={open ? 0 : -1}
                  className="serif flex items-baseline gap-4 py-1.5 text-[clamp(2.6rem,11vw,4.4rem)] italic text-bone"
                >
                  <span className="eyebrow not-italic text-ash">0{i + 1}</span>
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="space-y-2 text-sm text-smoke">
          <p>{site.address.street}</p>
          <p>{site.address.locality}</p>
          <a href={site.phone.href} className="block text-bone" tabIndex={open ? 0 : -1}>
            {site.phone.display}
          </a>
          <p className="eyebrow pt-4 text-ash">Adults 21+ only · ID required</p>
        </div>
      </div>
    </>
  );
}
