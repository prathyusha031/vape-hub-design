"use client";

import Image from "next/image";
import { useRef } from "react";
import { gsap, MQ, useGSAP } from "@/lib/animations/gsap";
import { collection, shelf, type CollectionItem } from "@/lib/data/products";
import { cn } from "@/lib/utils/cn";

function Piece({ item, feature }: { item: CollectionItem; feature?: boolean }) {
  return (
    <a
      href="#visit"
      data-piece
      className={cn("group relative block", feature && "md:col-span-2 md:row-span-2")}
      aria-label={`${item.name} — ${item.category} (placeholder product, view in store)`}
    >
      <div
        className={cn(
          "relative overflow-hidden border border-[#1E211F]/10 transition-all duration-700 ease-[var(--ease-expo)] group-hover:border-[#9E7C55] group-hover:shadow-[0_16px_36px_-12px_rgba(30,33,31,0.12)]",
          feature ? "aspect-[4/5] md:aspect-auto md:h-full md:min-h-[44rem]" : "aspect-[4/5]",
        )}
        style={{ backgroundColor: item.tone }}
      >
        {/* Solid stone plinth baseline inside each card */}
        <div aria-hidden="true" className="absolute inset-x-0 bottom-0 h-[20%] bg-[#1E211F]/[0.03]" />

        {/* Product image with subtle lift and hover scale */}
        <div
          data-piece-img
          className={cn(
            "absolute left-1/2 -translate-x-1/2 transition-transform duration-700 ease-[var(--ease-expo)] group-hover:-translate-y-2 group-hover:scale-105",
            feature ? "bottom-[9%] h-[68%] w-[58%]" : "bottom-[10%] h-[64%] w-[62%]",
          )}
        >
          <div
            aria-hidden="true"
            className="contact-shadow absolute bottom-[12.5%] left-1/2 h-[5%] w-[36%] -translate-x-1/2"
          />
          <Image
            src={item.image}
            alt=""
            fill
            sizes={feature ? "(max-width: 900px) 90vw, 50vw" : "(max-width: 900px) 90vw, 25vw"}
            className="object-contain object-bottom"
          />
        </div>

        <span className="eyebrow absolute right-4 top-4 text-[#1E211F]/60 md:right-5 md:top-5">In Stock · 21+</span>
      </div>

      {/* Product metadata + VIEW PRODUCT → with label sliding upward on hover */}
      <div className="flex items-baseline justify-between gap-4 pt-4">
        <div className="transition-transform duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1">
          <h3
            className={cn(
              "text-[#1E211F] transition-colors group-hover:text-[#9E7C55]",
              feature
                ? "serif text-[clamp(1.8rem,2.6vw,2.6rem)] italic leading-none"
                : "text-[1.05rem] font-medium tracking-tight",
            )}
          >
            {item.name}
          </h3>
          <p className="mt-1 text-xs text-[#59534c]">{item.category}</p>
        </div>

        {/* VIEW PRODUCT label with subtle slide upward and arrow travel on hover */}
        <span className="eyebrow shrink-0 text-[#8c8275] transition-all duration-500 ease-[var(--ease-expo)] group-hover:-translate-y-1 group-hover:text-[#1E211F]">
          VIEW PRODUCT{" "}
          <span aria-hidden="true" className="inline-block transition-transform duration-500 group-hover:translate-x-1">
            →
          </span>
        </span>
      </div>
    </a>
  );
}

/**
 * SECTION 08 — COLLECTION
 * Premium editorial product gallery.
 * Asymmetrical layout, different product sizes, hover interactions,
 * image movement, VIEW PRODUCT →, and generous whitespace.
 * Solid warm palette without gradients.
 */
export function ProductCollection() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      gsap.matchMedia().add(`${MQ.desktop}, ${MQ.mobile}`, () => {
        gsap.from(q("[data-col-head] > *"), {
          y: 26,
          autoAlpha: 0,
          stagger: 0.08,
          duration: 1.2,
          ease: "expo.out",
          scrollTrigger: { trigger: root.current, start: "top 75%" },
        });

        q("[data-piece]").forEach((el, i) => {
          gsap.from(el, {
            y: 50,
            autoAlpha: 0,
            duration: 1.4,
            delay: (i % 3) * 0.08,
            ease: "expo.out",
            scrollTrigger: { trigger: el, start: "top 92%" },
          });
        });
      });
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      id="collection"
      data-nav="light"
      aria-labelledby="col-title"
      className="relative bg-[#F7F3EC] pb-24 pt-28 md:pb-36 md:pt-40"
    >
      <div data-col-head className="grid grid-cols-1 gap-8 px-gutter md:grid-cols-12 md:items-end">
        <div className="md:col-span-7">
          <p className="eyebrow mb-6 flex items-center gap-3 text-[#59534c]">
            <span className="size-1.5 rounded-full bg-[#9E7C55]" />
            Chapter 08 — The Collection
          </p>
          <h2 id="col-title" className="text-[#1E211F]">
            <span className="display block text-[clamp(2.2rem,4vw,4.4rem)]">THE HUB</span>
            <span className="serif block text-[clamp(2.8rem,5.6vw,6rem)] italic leading-[0.9]">
              collection.
            </span>
          </h2>
        </div>
        <p className="max-w-sm text-sm leading-relaxed text-[#59534c] md:col-span-4 md:col-start-9">
          A rotating curation of hardware, e-liquids, and accessories. Stock rotates weekly — explore our featured
          silhouettes below or stop by the store on West Pueblo Blvd.
        </p>
      </div>

      {/* Asymmetrical Editorial Grid with Generous Whitespace */}
      <div className="mt-14 grid grid-cols-1 gap-x-6 gap-y-12 px-gutter sm:grid-cols-2 md:mt-20 md:grid-cols-4 md:gap-x-8 md:gap-y-16">
        <Piece item={collection[0]} feature />
        {collection.slice(1).map((c) => (
          <Piece key={c.id} item={c} />
        ))}

        {/* Categories index on the shelf */}
        <nav
          aria-label="Shop by category"
          className="flex flex-col border-t border-[#1E211F]/15 pt-8 sm:col-span-2 md:col-span-3 md:self-end"
        >
          <p className="eyebrow text-[#59534c]">On the shelf</p>
          <ul className="mt-6 grid grid-cols-1 gap-x-10 gap-y-3 sm:grid-cols-2 md:grid-cols-3">
            {shelf.map((s) => (
              <li key={s}>
                <a
                  href="#visit"
                  className="group flex items-baseline justify-between gap-3 text-sm text-[#1E211F] transition-colors hover:text-[#9E7C55]"
                >
                  <span>{s}</span>
                  <span
                    aria-hidden="true"
                    className="text-[#8c8275] opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                  >
                    →
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
