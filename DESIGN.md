# Portfolio Studio — Design System
> Personal/agency portfolio (Miguel). Verified against live code (`src/styles/globals.css`, `src/components/ui/*`, `src/components/home/HeroSection.jsx`, `src/components/projects/ProjectCard.jsx`) — restates `CLAUDE.md`'s own token table for AI-agent consumption, with real component patterns added. Note: `design-md/` at the repo root is the **unrelated** awesome-design-md reference collection (60+ brand READMEs, kept for inspiration) — not this project's design doc.

Concept: bold editorial-studio portfolio. High-contrast ink-on-cream canvas, one electric-yellow accent, oversized display type, soft 24px-radius cards. Bricolage Grotesque display + Inter body is the entire typographic identity.

---

## 1. Canvas & Color (highest impact)

Light-primary, class-based dark mode (`.dark` on `<html>`, managed by `ThemeContext`, persisted to `localStorage`, falls back to system preference only on first visit).

| Token | Light | Dark | Role |
|---|---|---|---|
| `surface` | `#F8F8F5` | `#111110` | App canvas |
| `ink` | `#0D0D0D` | `#F0EFE8` | Primary text, "black-pill" button bg |
| `card` | `#EFEFED` | `#1A1A18` | Card surfaces |
| `muted` | `#8A8A8A` | `#9A9A97` | Secondary text |
| `accent` | `#FFE830` | **`#FFE830` (unchanged)** | The one brand color |

**Critical rule, explicit in code comment:** `--color-accent` is identical in both themes — "el amarillo funciona en ambos modos." Every other token flips; accent never does. This is the single most important invariant in the system.

**DO:** treat ink/surface as a literal swap pair (light = ink-on-cream, dark = cream-on-ink) — never introduce a third "dark surface" value.
**DON'T:** adjust the accent yellow for dark mode "for contrast" — it's verified to work as-is in both.

---

## 2. Typography

Two fonts, role-locked:

| Role | Font | Applied via |
|---|---|---|
| **Display** (`font-display`) | Bricolage Grotesque | All `h1-h4` automatically (global base rule), plus any element explicitly given `font-display` (hero name, card numerals, stat values) |
| **Body** (`font-body`, default) | Inter | Everything else |

Real-world scale (from `HeroSection.jsx`/`ProjectCard.jsx`):
```
Hero name:        clamp(64px,10vw,140px) / leading-[0.9] / font-black — the single largest element on the site
Project title:    text-2xl md:text-3xl / font-display font-bold
Decorative number: text-[96px] md:text-[128px] / font-display font-bold / text-ink/10 (10% opacity watermark)
Section tag:       text-xs uppercase tracking-widest
Stat value:        font-display font-bold (paired with text-sm text-muted label)
```

**DO:** use `font-black` (900) specifically for the hero name — it's the only place that exact weight appears; section/card titles stay at `font-bold` (700).
**DO:** reuse the "giant translucent number watermark" pattern (`text-ink/10`, 96-128px, `font-display font-bold`) for any sequential list (project cards use `project.num`) — it's the project's numbering signature.

---

## 3. Border-Radius Doctrine

Soft, generous, and named as explicit theme tokens (not ad hoc Tailwind classes):

| Token | Value | Use |
|---|---|---|
| `--radius-card-lg` | 24px | Project cards, large content cards (`Card` component default) |
| `--radius-card-sm` | 16px | Smaller cards (`Card radius="sm"`) |
| `--radius-hero-img` | 20px | Hero imagery |
| `--radius-pill` | 999px | Buttons, hero consultation pill, stat pills, section-tag-adjacent chips |

**Component-level rule** (`Card.jsx`): radius is a typed prop (`'lg' | 'sm'`), not freeform — always go through the component, don't hardcode `rounded-[Npx]` on new card-like elements.

---

## 4. Distinctive Visual Elements

1. **Diamond/4-point-star icon** (`DiamondIcon.jsx`) — custom inline SVG: outer diamond at 15% opacity + a 4-point star/sparkle inside, `currentColor` fill. Always rendered in `text-accent` yellow. This is the brand's bullet/glyph — used in `SectionTag` (⬡ LABEL pattern) and nowhere else gets a generic bullet or dot instead.
2. **Pill button with inverted circular arrow badge** (`Button.jsx`) — three variants (`yellow-pill`, `black-pill`, `outline`), each pairs the pill background with a small circular `→` badge whose colors invert relative to the pill (yellow pill → black badge w/ yellow arrow; black/outline pill → yellow badge w/ black arrow). Never render a CTA without this arrow badge.
3. **Translucent number watermark on cards** — see Typography §2; numbers project depth/sequence without adding visual noise (10% opacity).
4. **Custom cursor, hidden native cursor** — `cursor: none` on `html` for `(pointer: fine)` devices only (mobile/touch keeps native cursor), restored to `cursor: auto` on form fields. `CustomCursor` component does GSAP `quickTo` smooth-follow with a "ring" that gets `cursor-active` class (yellow border + 12%-alpha yellow fill) when hovering `data-cursor-hover` targets.
5. **Decorative hero blob** — multi-stop radial-gradient pastel blob (`#ff9a9e`, `#a8edea`, `#fad0c4`), `blur-3xl`, `opacity-30`, continuously rotating 360° over 60s linear — the one place soft pastel color appears outside the ink/surface/accent system, confined to a background decoration, never foreground UI.

---

## 5. Motion — Centralized GSAP Tokens

All timing goes through `src/components/animations/animationConfig.js` — **never hardcode ease/duration strings** in components:

```js
EASE_SMOOTH = 'power3.out'    // default — scroll reveals, project card entrance
EASE_BACK   = 'back.out(1.2)' // pop-in elements (consultation pill uses back.out(1.5) variant)
EASE_SHARP  = 'power4.out'    // hero title char-by-char reveal

DUR_FAST = 0.4
DUR_MID  = 0.7
DUR_SLOW = 1.0

STAGGER  = 0.08  // default stagger between list/char items
```

Patterns observed in real components:
- **Hero title:** `SplitText` chars, `yPercent: 120 → 0`, `power4.out`, stagger `0.025`, `delay: 0.2`
- **Hero stats:** fade + `x: 20 → 0`, stagger `0.1`, `power2.out`
- **Consultation pill:** `scale: 0.8 → 1`, `back.out(1.5)` — the one bouncy pop in the system
- **Project card scroll-reveal:** `y: 60 → 0`, `power3.out`, ScrollTrigger `start: 'top 85%'`, `toggleActions: 'play none none none'`
- **Project card image hover:** `scale: 1 → 1.04` on enter (0.6s `power2.out`), back to `1` on leave (0.5s) — always via `contextSafe()` wrapper

**DO:** always call `prefersReducedMotion()` before any custom GSAP animation (every existing animation hook already does this — copy the guard, don't skip it).
**DO:** register GSAP plugins (`ScrollTrigger`, `SplitText`, `useGSAP`) only once, globally, in `main.jsx` — never re-register per-component.

---

## 6. Component State Coverage

| Component | Default | Hover |
|---|---|---|
| Button `yellow-pill` | `bg-accent text-ink` | `bg-yellow-300` |
| Button `black-pill` | `bg-ink text-surface` | `bg-ink/90` |
| Button `outline` | `border-2 border-ink text-ink` | `bg-ink text-surface` (full invert) |
| ProjectCard | static image | image `scale-1.04` (GSAP, 0.6s) |
| Custom cursor ring | neutral ring | `cursor-active`: yellow border + `rgba(255,232,48,.12)` fill, on `data-cursor-hover` targets |

---

## 7. Do's and Don'ts

- **DO** keep accent yellow `#FFE830` literally identical across light/dark — it's the one fixed point in an otherwise-inverting palette.
- **DO** route every card through the `Card` component's `radius` prop (`lg`=24px / `sm`=16px) rather than freeform rounding.
- **DO** pair every CTA pill with the inverted circular arrow badge.
- **DO** use the diamond/4-point-star glyph (never a generic bullet) wherever `SectionTag` or similar small-label-with-icon patterns appear.
- **DON'T** hardcode GSAP ease/duration strings — import from `animationConfig.js`.
- **DON'T** let the decorative pastel hero-blob gradient leak into foreground UI — it's a background-only motif.
- **FORBIDDEN:** re-registering GSAP plugins inside a component — they're global, set once in `main.jsx`.

---

## 8. Quick Reference

```
surface/ink    #F8F8F5 / #0D0D0D (light)  ↔  #111110 / #F0EFE8 (dark) — literal swap pair
accent         #FFE830 — FIXED across both themes, never adjusted
card           #EFEFED (light) / #1A1A18 (dark)
muted          #8A8A8A (light) / #9A9A97 (dark)
fonts          display: Bricolage Grotesque (h1-h4, hero, numerals) · body: Inter
radius         card-lg(24) card-sm(16) hero-img(20) pill(999) — typed Card prop, not freeform
motion         EASE_SMOOTH power3.out · EASE_BACK back.out(1.2) · EASE_SHARP power4.out · DUR 0.4/0.7/1.0 · STAGGER 0.08
darkMode       class ('.dark'), localStorage-persisted, system-preference fallback on first visit
signature      diamond/star glyph · inverted-arrow-badge pills · 10%-opacity number watermarks · cursor:none + custom ring
```
