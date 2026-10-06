"use client";

import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { legal, site } from "@/lib/data/site";
import { SplitChars } from "@/lib/utils/split";

const columns = [
  {
    title: "Navigate",
    links: [
      { l: "Shop", h: site.routes.shop },
      { l: "Experience", h: "#story" },
      { l: "Flavors", h: "#flavors" },
      { l: "Location", h: site.routes.location },
      { l: "Contact", h: site.routes.contact },
    ],
  },
  {
    title: "Legal",
    links: [
      { l: "Privacy Policy", h: site.routes.privacy },
      { l: "Terms of Use", h: site.routes.terms },
      { l: "21+ Age Policy", h: "#legal" },
    ],
  },
];

/** The final scene: monumental wordmark, quiet utility, clear legal footing. */
export function Footer() {
  const root = useRef<HTMLElement>(null);
  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        gsap.from(q("[data-wordmark] .split-char"), {
          yPercent: 100,
          stagger: 0.03,
          duration: 1.4,
          ease: "expo.out",
          scrollTrigger: { trigger: q("[data-wordmark]")[0], start: "top 95%" },
        });
      });
    },
    { scope: root },
  );

  const year = new Date().getFullYear();

  return (
    <footer ref={root} id="legal" data-nav="dark" className="theme-navy relative overflow-hidden bg-ink pt-20 md:pt-28">
      <div className="grid grid-cols-2 gap-10 px-gutter md:grid-cols-12">
        <div className="col-span-2 md:col-span-4">
          <p className="eyebrow mb-4 text-ash">The Vape Hub</p>
          <p className="serif max-w-xs text-[1.6rem] italic leading-snug text-bone">{site.tagline}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-smoke">A local shop on West Pueblo Boulevard, for adults 21+.</p>
        </div>
        {columns.map((c) => (
          <nav key={c.title} aria-label={c.title} className="md:col-span-2">
            <p className="eyebrow mb-4 text-ash">{c.title}</p>
            <ul className="space-y-2">
              {c.links.map((l) => (
                <li key={l.l}>
                  <a href={l.h} className="text-bone/75 transition-colors hover:text-copper">{l.l}</a>
                </li>
              ))}
            </ul>
          </nav>
        ))}
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-ash">Visit</p>
          <address className="not-italic leading-relaxed text-bone/75">
            {site.address.street}
            <br />
            {site.address.locality}
          </address>
        </div>
        <div className="md:col-span-2">
          <p className="eyebrow mb-4 text-ash">Contact</p>
          <ul className="space-y-2">
            <li><a href={site.phone.href} className="text-bone/75 hover:text-copper">{site.phone.display}</a></li>
            {site.social.map((s) => (
              <li key={s.label}>
                <a href={s.href} target="_blank" rel="noopener noreferrer" className="text-bone/75 hover:text-copper">{s.label} ↗</a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div data-wordmark className="mt-20 px-gutter md:mt-28" aria-hidden="true">
        <p className="display line-mask whitespace-nowrap text-[clamp(2rem,9.6vw,12rem)] leading-[0.85] text-bone/90">
          <SplitChars text="The Vape Hub" />
        </p>
        <div className="mt-6 flex items-center justify-between border-t border-bone/10 pt-5">
          <p className="eyebrow text-bone/70">Pueblo, Colorado</p>
          <p className="eyebrow text-copper">Adults 21+ only</p>
        </div>
      </div>

      <div className="mt-10 border-t border-bone/10 px-gutter py-10">
        <div className="grid gap-6 text-xs leading-relaxed text-ash md:grid-cols-3">
          <p className="font-medium text-bone/80">{legal.nicotineWarning}</p>
          <p>{legal.ageNotice}</p>
          <p>{legal.disclaimer}</p>
        </div>
        <p className="eyebrow mt-10 !text-[0.6rem] text-ash">© {year} The Vape Hub · Pueblo, CO · Concept demo</p>
      </div>
    </footer>
  );
}
