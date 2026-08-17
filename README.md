# Portfolio Studio

Personal/agency portfolio site — bold editorial design, high-contrast ink-on-cream canvas, GSAP-driven motion. Built with React 19, Vite 8 and Tailwind CSS v4.

## Tech stack

| Layer | Choice |
|---|---|
| Framework | React 19 (function components, hooks only) |
| Build tool | Vite 8 |
| Routing | React Router 7 |
| Styling | Tailwind CSS v4 (`@theme` tokens, CSS-first config, no `tailwind.config.js`) |
| Animation | GSAP 3 + `@gsap/react` (`useGSAP`, scoped contexts, `ScrollTrigger`) |
| Forms | React Hook Form + Zod (schema validation via `@hookform/resolvers`) |
| Linting | ESLint 9 flat config, `eslint-plugin-react-hooks`, `eslint-plugin-react-refresh` |
| Deployment | Vercel (SPA rewrites in `vercel.json`) |

No CSS-in-JS, no component library, no state manager — Tailwind utilities + Context API only.

## Getting started

Requires Node 18+.

```bash
npm install
npm run dev       # http://localhost:3000
```

### Scripts

| Command | Purpose |
|---|---|
| `npm run dev` | Start Vite dev server on port 3000 |
| `npm run build` | Production build to `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run lint` | Run ESLint over the project |

## Project structure

```
src/
├── App.jsx              # Route table, lazy-loaded pages, layout shell
├── main.jsx              # React root, BrowserRouter mount
├── pages/                 # One file per route, all React.lazy()
├── components/
│   ├── layout/             # Navbar, Footer, SkipLink, ScrollToTop
│   ├── home/                # Hero, projects/services previews, CTA
│   ├── about/                # Story, vision, stats, availability
│   ├── projects/               # Project list, cards, small-works grid
│   ├── project-detail/          # Case-study page sections
│   ├── services/                 # Services accordion + hero
│   ├── contact/                    # Contact form (RHF + Zod) and info
│   ├── ui/                          # Reusable primitives: Button, Card,
│   │                                 Accordion, Marquee, CustomCursor…
│   └── animations/                   # GSAP hooks (scroll reveal, text
│                                       reveal, count-up, reduced-motion)
├── context/ThemeContext.jsx    # Light/dark mode, persisted to localStorage
├── data/                        # Static content: projects.js, team.js,
│                                  services.js
├── lib/utils.js                  # `cn()` helper (clsx + tailwind-merge)
└── styles/globals.css              # Tailwind import + design tokens (@theme)
```

## Routes

| Path | Page |
|---|---|
| `/` | Home |
| `/about` | About |
| `/projects` | Projects list |
| `/projects/:slug` | Project case study |
| `/work/:slug` | Small-work detail |
| `/services` | Services |
| `/contact` | Contact |

All pages are code-split with `React.lazy` + `Suspense`; vendor chunks for `react`/`react-router` and `gsap` are split out explicitly in `vite.config.js`.

## Design system

Full token reference and component conventions live in [`DESIGN.md`](./DESIGN.md). Summary:

- **Palette:** `surface` (canvas), `ink` (text/high-contrast fills), `card`, `muted`, and a single `accent` yellow (`#FFE830`) that stays identical in both themes — every other token flips for dark mode via the `.dark` class on `<html>`.
- **Type:** Bricolage Grotesque (display) + Inter (body), no third typeface.
- **Radii:** 24px large cards, 16px small cards, pill buttons, 20px hero images.
- **Motion:** GSAP scoped with `useGSAP`; every animation checks `prefersReducedMotion()` first and no-ops or jump-cuts instead of animating.

Theme state is managed by `ThemeContext` — class-based dark mode, persisted to `localStorage`, falling back to `prefers-color-scheme` only on first visit.

## Conventions

- Components are function components with hooks; no class components.
- Animation-triggering handlers wrap GSAP calls in `contextSafe` from `useGSAP({ scope })` to avoid leaks across unmounts.
- List keys use stable identifiers (`item.id`/`item.slug`/content), not array index, except where duplicated arrays (e.g. the `Marquee` loop) make index the only disambiguator.
- All user-facing copy is in Spanish.

## Deployment

Configured for Vercel: `vercel.json` rewrites all paths to `/index.html` for client-side routing. Any static host that supports SPA fallback works — run `npm run build` and serve `dist/`.

## License

Private/personal project — no license granted for reuse.
