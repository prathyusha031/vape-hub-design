/**
 * Product, format and flavor data.
 *
 * EVERYTHING HERE IS PLACEHOLDER CONTENT. Imagery is original and rendered for
 * this demo (devices are generic, unbranded forms). Names are descriptive
 * placeholders. Deliberately absent: prices, nicotine strengths, battery or
 * coil specifications, certifications and any performance or health claims.
 * Replace with verified inventory data from the client / POS.
 */

export type DeviceType = "disposable" | "pod" | "mod";

export type Category = {
  id: DeviceType;
  index: string;
  title: string;
  /** three-word editorial line — character, not specification */
  tagline: string;
  atmosphere: string;
  description: string;
  image: string;
  /** soft, out-of-focus photograph from the resort world, used behind the product */
  room: string;
  /** ivory/sand/charcoal tone of the surface the product stands on */
  surface: string;
  isDark?: boolean;
};

export const categories: Category[] = [
  {
    id: "disposable",
    index: "01",
    title: "Disposables",
    tagline: "Minimal. Portable. Effortless.",
    atmosphere: "Room 01 — Soft Cream · Daylight Architecture",
    description: "Ready the moment you open it — nothing to fill, nothing to set. Ask us what’s on the shelf this week.",
    image: "/images/day/hero.webp",
    room: "/images/rooms/disposable.jpg",
    surface: "#EFE7DA",
  },
  {
    id: "pod",
    index: "02",
    title: "Pod Systems",
    tagline: "Compact. Refillable. Refined.",
    atmosphere: "Room 02 — Sand Travertine · Ocean Light",
    description: "Small enough for any pocket, with pods you replace or refill. We’ll walk you through pods and charging in store.",
    image: "/images/day/pod-gunmetal.webp",
    room: "/images/rooms/pod.jpg",
    surface: "#E4D5C2",
  },
  {
    id: "mod",
    index: "03",
    title: "Mods",
    tagline: "Performance. Control. Character.",
    atmosphere: "Room 03 — Deep Charcoal · Evening Ambiance",
    description: "For experienced adults who like to tune their setup. Bring it in — we help with tanks, coils and upkeep.",
    image: "/images/day/mod-obsidian.webp",
    room: "/images/rooms/mod.jpg",
    surface: "#25231F",
    isDark: true,
  },
];

export type Mood = {
  id: string;
  label: string;
  /** where this flavor family "lives" in the resort world */
  place: string;
  line: string;
  notes: string[];
  /** destination photograph (rendered) — the device colourway changes with it */
  photo: string;
  /** focal point of the device in the photo, used for the mobile crop */
  focus: string;
  /** soft tint for the card underline */
  tone: string;
};

export const moods: Mood[] = [
  {
    id: "ice",
    label: "Ice",
    place: "Morning swim",
    line: "Crisp, cold and clean on the finish.",
    notes: ["Cooling blends", "Iced fruit", "Chilled mint"],
    photo: "/images/flavors/ice.jpg",
    focus: "64% 60%",
    tone: "#9fb8c8",
  },
  {
    id: "fruit",
    label: "Fruit",
    place: "Garden terrace",
    line: "Bright, layered, unmistakable.",
    notes: ["Berry", "Tropical", "Orchard"],
    photo: "/images/flavors/fruit.jpg",
    focus: "64% 60%",
    tone: "#d9a08f",
  },
  {
    id: "dessert",
    label: "Dessert",
    place: "The lounge, golden hour",
    line: "Rich, warm and unhurried.",
    notes: ["Custard", "Bakery", "Caramel"],
    photo: "/images/flavors/dessert.jpg",
    focus: "64% 60%",
    tone: "#d8bf98",
  },
  {
    id: "menthol",
    label: "Menthol",
    place: "The pool deck",
    line: "Sharp, minty, direct.",
    notes: ["Classic menthol", "Spearmint", "Peppermint"],
    photo: "/images/flavors/menthol.jpg",
    focus: "64% 60%",
    tone: "#a9c2b2",
  },
  {
    id: "tobacco",
    label: "Tobacco",
    place: "The reading room",
    line: "Deep, dry and familiar.",
    notes: ["Classic", "Smooth blends", "Dark roast"],
    photo: "/images/flavors/tobacco.jpg",
    focus: "64% 60%",
    tone: "#b8936c",
  },
  {
    id: "signature",
    label: "Signature",
    place: "Sunset, the terrace",
    line: "Our team’s current favourites — ask what’s new.",
    notes: ["Staff picks", "Seasonal arrivals", "Zero-nicotine options"],
    photo: "/images/flavors/signature.jpg",
    focus: "64% 60%",
    tone: "#c9a16b",
  },
];

export type CollectionItem = {
  id: string;
  name: string;
  category: string;
  image: string;
  placeholder: true;
  tone: string;
};

export const collection: CollectionItem[] = [
  { id: "c1", name: "Apex 50K · White Peach", category: "Smart Disposable", image: "/images/hero/flavor-peach.jpg", placeholder: true, tone: "#F5ECE6" },
  { id: "c2", name: "Apex 50K · Glacier Blue", category: "Smart Disposable", image: "/images/hero/flavor-ice.jpg", placeholder: true, tone: "#E6EFF2" },
  { id: "c3", name: "Apex 50K · Vanilla Reserve", category: "Smart Disposable", image: "/images/hero/flavor-vanilla.jpg", placeholder: true, tone: "#F2ECE1" },
  { id: "c4", name: "Apex 50K · Smoked Bronze", category: "Smart Disposable", image: "/images/hero/flavor-bronze.jpg", placeholder: true, tone: "#EBE3D7" },
  { id: "c5", name: "Gunmetal Pod Kit", category: "Pod System", image: "/images/day/pod-gunmetal.webp", placeholder: true, tone: "#e6e9ea" },
  { id: "c6", name: "Obsidian High-Watt Mod", category: "Box Mod", image: "/images/day/mod-obsidian.webp", placeholder: true, tone: "#e9e1d4" },
];

export const shelf = [
  "Disposables",
  "Pod systems",
  "E-liquid",
  "Mods & kits",
  "Coils & atomizers",
  "Batteries & chargers",
  "Accessories",
  "Zero nicotine",
];
