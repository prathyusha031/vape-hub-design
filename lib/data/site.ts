/**
 * Business + site configuration.
 * Store details sourced from the current site (thevapehubcolorado.com).
 * Verify hours/phone with the client before launch.
 */
export const site = {
  name: "The Vape Hub",
  city: "Pueblo",
  state: "Colorado",
  stateShort: "CO",
  tagline: "Real products. Real guidance.",
  address: {
    street: "1281 West Pueblo Boulevard",
    locality: "Pueblo, CO 81004",
    mapsUrl:
      "https://www.google.com/maps/search/?api=1&query=1281+West+Pueblo+Boulevard+Pueblo+CO+81004",
  },
  coordinates: "38.2544° N — 104.6091° W",
  phone: { display: "(719) 924-9524", href: "tel:+17199249524" },
  hours: [
    { days: "Mon — Wed", time: "8 AM — 7 PM" },
    { days: "Thu — Fri", time: "8 AM — 10 PM" },
    { days: "Saturday", time: "8 AM — 7 PM" },
    { days: "Sunday", time: "12 PM — 7 PM" },
  ],
  social: [
    {
      label: "Facebook",
      href: "https://www.facebook.com/people/The-Vape-Hub/61585592634409/",
    },
  ],
  /** Placeholder routes — wire up when the shop / pages exist. */
  routes: {
    shop: "#collection",
    explore: "#story",
    about: "#experience",
    location: "#visit",
    contact: "#visit",
    faq: "#visit",
    privacy: "#legal",
    terms: "#legal",
  },
} as const;

/**
 * Hero film slot — real footage replaces the built-in fallback film.
 *
 *   /public/videos/hero-vape.mp4          desktop cut · 16:9 · H.264 · muted · ~12–16 s
 *   /public/videos/hero-vape.webm         optional VP9 alternative
 *   /public/videos/hero-vape-mobile.mp4   vertical cut · 9:16 · its own composition
 *
 * Suggested shot list (same story as the built-in fallback film):
 *   resort suite at golden hour → adult at the glass → the device on the table
 *   → macro → a tasteful use moment → soft vapor in the sunlight → brand.
 * Desktop and mobile have separate timing: `typeAt` = second in that cut where
 * FIND YOUR cloud. should enter (after the brand card).
 * Files are detected on the server; missing or undecodable files fall back to
 * the real-time film automatically.
 */
export const heroMedia = {
  desktop: {
    sources: [
      { src: "/videos/hero-vape.mp4", type: "video/mp4" },
      { src: "/videos/hero-vape.webm", type: "video/webm" },
    ],
    typeAt: 11.9,
  },
  mobile: {
    sources: [{ src: "/videos/hero-vape-mobile.mp4", type: "video/mp4" }],
    typeAt: 11.9,
  },
  /** first frame shown while real footage buffers */
  poster: { desktop: "/images/resort2/d-poster.jpg", mobile: "/images/resort2/m-poster.jpg" },
};

export const nav = [
  { label: "Shop", href: "#collection" },
  { label: "Experience", href: "#experience" },
  { label: "Flavors", href: "#flavors" },
  { label: "Collection", href: "#collection" },
  { label: "Location", href: "#visit" },
];

export const legal = {
  nicotineWarning:
    "WARNING: This product contains nicotine. Nicotine is an addictive chemical.",
  ageNotice:
    "You must be 21 or older to purchase from The Vape Hub. Valid government-issued ID is required for every purchase. No exceptions.",
  disclaimer:
    "Products sold by The Vape Hub are intended for adults 21+ only. Vaping products are not smoking-cessation products and are not intended to diagnose, treat, cure or prevent any disease. Keep out of reach of children and pets.",
};
