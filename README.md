# The Vape Hub — Premium Homepage Demo ("Enter the Cloud")

Concept homepage for The Vape Hub, Pueblo, Colorado. Adults 21+ only.

## Run

```bash
npm install
npm run dev
# open http://localhost:3000  (if 3000 is busy, Next prints the next free port)
```

Production check: `npm run build && npm start`.

## Stack

Next.js (App Router) · React · TypeScript · Tailwind CSS v4 · GSAP + ScrollTrigger (`@gsap/react`) · Lenis.
Real-time vapor is a tiny raw-WebGL shader (`components/ui/VaporCanvas.tsx`) — no Three.js runtime needed.
Product imagery was rendered offline with a ray-marched WebGL studio scene (original, not stock).

## Scenes

| # | Component | What it does |
|---|-----------|--------------|
| 01 | `hero/HeroScene` | Brand film after the 21+ gate: black → backlit adult profile → exhale → macro cuts → device emerges → FIND / YOUR / CLOUD. Uses `/videos/hero-vape.mp4` when present, otherwise a real-time fallback film. Scroll: type separates, frame sinks to black, vapor crosses, scene 02 rises from the darkness. |
| 02–04 | `product/ProductScene` | MORE THAN A DEVICE. Pinned 48-frame turntable scrubbed by scroll on a canvas, headline parts, callouts appear. |
| 05–06 | `categories/CloudSelector` | WHAT'S YOUR CLOUD? Disposable / Pods / Mods "rooms" that expand on hover/focus/tap; vapor + background shift per room. |
| 07 | `flavors/FlavorExperience` | CHOOSE YOUR MOOD. Pinned on desktop — scroll (or click) through six moods; atmosphere, device, ghost word and copy transition. Data-driven. |
| 08 | `location/LocalHub` | YOUR LOCAL HUB. Topographic plate, monumental PUEBLO / COLORADO, address, hours, service pillars. |
| 09 | `collection/ProductCollection` | THE HUB COLLECTION editorial wall (placeholder products, no prices). |
| 10 | `scenes/FinalCTA` + `footer/Footer` | Closing statement, CTAs, wordmark footer, legal. |

## Replacing placeholder content

- **Products / moods / categories:** `lib/data/products.ts` (all entries are marked placeholder — no prices, nicotine strengths or claims invented).
- **Store info, routes, legal copy:** `lib/data/site.ts` — verify hours/phone with the client.
- **Hero film:** drop the cut at `public/videos/hero-vape.mp4` (see `public/videos/README.md`). Without it, the hero plays the built-in real-time film (`components/hero/filmDirector.ts`).
- **Images:** `public/images/products/*.webp` (800×1100, transparent), `public/images/sequence/device-00..47.webp` (turntable).

## Accessibility / motion

Semantic landmarks, skip link, visible focus, keyboard-operable rooms and mood tabs, Esc closes menu.
`prefers-reduced-motion` disables Lenis, pinning, scrubbing, rotations and the vapor animation (static frame).

## Legal notes

Nicotine warning is shown site-wide; 21+ gate on entry (a courtesy layer — ID is checked at purchase).
Have the client's counsel review all warnings/age-gating copy before launch.
