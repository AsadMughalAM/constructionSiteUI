# MERIDIAN — Design Direction

Award-level landing page for a construction / general contracting firm.
This file is the source of truth across all sections. Every section built must obey it.

## Design Read

Landing page for a premium general contractor, aimed at commercial / institutional
clients who judge competence visually. Language: **dark industrial editorial** with
structural typography and cinematic site photography.

**Dials:** `DESIGN_VARIANCE: 8` · `MOTION_INTENSITY: 7` · `VISUAL_DENSITY: 3`

## Brand

- **Name:** MERIDIAN (Meridian Construction Group)
- **Voice:** confident, concrete, zero fluff. Short declarative sentences.
  No filler verbs (elevate / seamless / unleash). No em-dashes anywhere. Ever.

## Theme Lock

**Dual theme with dark as default** (user-requested toggle in the navbar).
:root is the light "poured concrete" variant, .dark the charcoal original;
a pre-paint script in index.html applies the stored choice before first render.
Within either theme, no section flips to the opposite mode. Components must
use tokens only, never hardcoded light/dark colors (exception: elements that
sit on photography may use white scrims).

## Palette (one accent, locked)

| Token | Value | Use |
|---|---|---|
| background | `oklch(0.14 0.004 80)` warm charcoal | page |
| card / raised | `oklch(0.17 0.005 80)` | tiles, nav scrim |
| foreground | `oklch(0.95 0.005 85)` warm off-white | headings |
| muted-foreground | `oklch(0.66 0.008 80)` | body copy |
| **accent = primary** | `oklch(0.66 0.2 41)` safety orange | CTAs, highlights, live markers |
| primary-foreground | near-black | text on orange |
| border | `oklch(1 0 0 / 12%)` hairlines | structural grid lines |

Safety orange is the ONLY accent. No purple, no gradients-as-decoration.

## Shape Lock

**All-sharp. `--radius: 0`.** Square buttons, square tiles, hairline borders.
Industrial signage aesthetic. No rounded corners anywhere.

## Typography

- **Display:** Archivo Variable, expanded width (`font-stretch: 125%`), 700-800,
  uppercase, tight tracking, `leading-[0.95]`. Structural, signage-like.
- **Body / UI:** Geist Variable (already installed by shadcn init).
- **Data / measurements:** Geist Mono sparingly (stats only). Max 1 mono
  micro-label per 3 sections (eyebrow budget).

## Motion Rules

- Load: line-mask reveals on display type (y 100% → 0 inside overflow-hidden),
  stagger 0.08s, ease `[0.16, 1, 0.3, 1]`.
- Scroll: framer-motion `useScroll`/`useTransform` for parallax; GSAP ScrollTrigger
  only for pin/scrub sections (projects pan, process stack). Never both in one tree.
- Every animation must be justified (hierarchy / storytelling / feedback).
- `useReducedMotion` honored everywhere. Transform + opacity only.

## Section Plan (build order, one layout family each)

1. **Hero** — full-bleed photo, asymmetric copy block, giant bottom wordmark. ✅ in progress
2. **Capabilities index** — numbered index list with hover-driven image swap (no cards).
3. **Featured projects** — GSAP horizontal pan (pin + scrub), 4 projects.
4. **Stats band** — full-width strip, mono figures (sample data, labeled in code).
5. **Process** — sticky-stack steps (GSAP canonical skeleton).
6. **Manifesto / About** — editorial big-type statement, one supporting image.
7. **Testimonial** — single quote, max 3 lines, clean attribution.
8. **CTA + Footer** — full-width close, one contact intent ("Start a project").

CTA intent lock: **"Start a project"** is the ONLY contact-intent label on the page
(nav, hero, footer all use it). Secondary intent: "View projects" (portfolio).

## Imagery

Real construction photography, self-hosted in `/public/images` (originally
sourced from Unsplash; every image visually inspected before shipping).
Never hotlink remote images: they rate-limit and load unreliably.
No div-based fake screenshots, no hand-rolled decorative SVGs.

## Icons

`@phosphor-icons/react`, `weight="regular"`, one family, no lucide.

## Hard Bans Checklist (from taste skill, apply every section)

- Zero em-dashes / en-dashes in visible text
- No scroll cues, no locale strips, no section-number eyebrows, no decorative dots
- No pills/labels overlaid on photos, no photo-credit captions
- Max 1 eyebrow per 3 sections, max 1 marquee per page
- Hero: max 4 text elements, headline ≤ 2 lines, subtext ≤ 20 words
- Buttons: text fits one line, WCAG AA contrast, `:active` scale-[0.98]
