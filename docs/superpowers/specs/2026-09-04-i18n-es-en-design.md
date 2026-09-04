# i18n: Español / Inglés — Design Spec

Date: 2026-09-04
Status: Approved for planning

## Purpose

Add a language switch (ES/EN) to the portfolio site. Every user-facing
string — nav, buttons, headings, section copy, and the long case-study
prose in `src/data/*.js` — must have an English translation and switch
instantly without a page reload.

## Constraints / decisions (from brainstorming)

- **Switch UX:** instant toggle (no separate `/en/...` routes, no
  reload). Button lives in the Navbar next to the existing dark-mode
  toggle.
- **Default language:** always Spanish on first load, regardless of
  browser locale.
- **Persistence:** chosen language saved to `localStorage`, restored
  on return visits (mirrors how `ThemeContext` persists
  `portfolio-theme`).
- **Scope:** full translation, including the long per-project fields
  in `src/data/projects.js` (brief, context, solution,
  interactionDesign, reflection, etc.) — not just UI chrome.
- **No new dependency.** The project already has `ThemeContext`
  solving an equivalent problem (persisted global UI state via React
  Context). `LanguageContext` copies that exact pattern. A library
  like `react-i18next` would add config (namespaces, detectors,
  pluralization) the project doesn't need for 2 languages with no
  routing.

## Architecture

### 1. `LanguageContext` (`src/context/LanguageContext.jsx`)

Direct structural copy of `src/context/ThemeContext.jsx`:

```jsx
const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('portfolio-lang')
    return stored === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    localStorage.setItem('portfolio-lang', lang)
  }, [lang])

  const toggleLang = () => setLang(l => l === 'es' ? 'en' : 'es')

  const value = useMemo(() => ({ lang, toggleLang }), [lang])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  return ctx
}
```

Default is always `'es'` unless `localStorage` explicitly has `'en'`
(no `matchMedia` browser-locale detection, per the default-language
decision — this is the one place it deliberately diverges from
`ThemeContext`, which does check `prefers-color-scheme`).

Wrapped in `App.jsx` alongside `ThemeProvider` (order doesn't matter,
they're independent).

### 2. Translation helper: `t()`

A single small helper, colocated with the context, resolves a
bilingual value for the active language:

```js
// src/context/LanguageContext.jsx (exported alongside the hook)
export function translate(lang, value) {
  if (value && typeof value === 'object' && ('es' in value || 'en' in value)) {
    return value[lang] ?? value.es ?? ''
  }
  return value // plain string fallback, e.g. content not yet migrated
}
```

Components call it as `t(field)`, where `t` is a small wrapper bound
to the current `lang` from `useLanguage()`:

```js
const { lang } = useLanguage()
const t = (value) => translate(lang, value)
```

This keeps call sites terse (`t(project.brief)`,
`t(strings.nav.about)`) without needing a key-lookup API.

### 3. Data files (`src/data/projects.js`, `services.js`, `team.js`)

Every translatable field becomes a `{ es, en }` object in place. Non-text
fields (slugs, `num`, `next`, image paths, urls, tags arrays if they
stay untranslated) are untouched. Example shape:

```js
{
  slug: 'matiz',
  title: { es: 'Matiz', en: 'Matiz' }, // proper nouns: es === en
  brief: {
    es: 'Juego de percepción del color...',
    en: 'A color-perception game...',
  },
  context: { es: '...', en: '...' },
  solution: { es: '...', en: '...' },
  interactionDesign: { es: '...', en: '...' },
  reflection: { es: '...', en: '...' },
  tags: ['React', 'GSAP'], // untranslated, stays a plain array
  next: 'zuma',
}
```

Single source of truth per project — no duplicate arrays to drift out
of sync (this was the reason a `projects.es.js`/`projects.en.js` split
was rejected during brainstorming).

Arrays consumed directly for non-text logic (`.map`, `next` chain
lookups, `num` sorting) are unaffected since only leaf string values
change shape, not the array/object structure.

### 4. UI string dictionary (`src/i18n/strings.js`)

New file for chrome text that isn't tied to a data entity: nav links,
buttons, section headings/labels, footer, form labels/placeholders/
validation messages, empty states, aria-labels. Organized by
page/section to stay navigable:

```js
export const strings = {
  nav: {
    home: { es: 'Inicio', en: 'Home' },
    about: { es: 'Sobre mí', en: 'About' },
    // ...
  },
  footer: { ... },
  contactForm: {
    nameLabel: { es: 'Nombre', en: 'Name' },
    messageError: { es: 'El mensaje debe tener al menos 10 caracteres', en: 'Message must be at least 10 characters' },
    // ...
  },
  // one key per page/section, matching existing component boundaries
}
```

Zod validation messages in `ContactForm.jsx` need special handling
since they're generated by the schema, not rendered directly — the
schema's error strings become `{es, en}` pairs resolved through `t()`
when `errors.field.message` is read for display, or the schema itself
is rebuilt with `useMemo` keyed on `lang` (decide at implementation
time; either works, schema-rebuild is cleaner since Zod's own error
message API doesn't take a runtime resolver).

### 5. Component consumption pattern

Every component currently rendering a hardcoded Spanish string or a
data-file field switches to:

```jsx
const { lang } = useLanguage()
const t = (value) => translate(lang, value)
// ...
<h2>{t(strings.about.heading)}</h2>
<p>{t(project.brief)}</p>
```

No new prop-drilling: `useLanguage()` is called directly in each
component that needs it, same as `useTheme()` today.

### 6. Navbar switch button

Mirrors the existing dark-mode toggle button placement/style (there
are two instances in `Navbar.jsx`, desktop + mobile menu, per the
existing `toggleTheme` pattern at lines ~100 and ~165). New button
shows the *other* language's code (`EN` when `lang === 'es'`, `ES`
when `lang === 'en'`) and calls `toggleLang()`.

## Data flow

```
User clicks ES/EN button in Navbar
  → toggleLang() flips lang state in LanguageContext
  → localStorage updated
  → useLanguage() consumers re-render (React context propagation)
  → every t(value) call across the tree re-resolves to the new language
  → no route change, no reload, no data refetch (all translations are
    static, already in memory)
```

## Error handling

- `translate()` falls back to `value.es` if the active language's key
  is missing (e.g. a translation not yet written) rather than
  rendering `undefined` — visible-but-wrong-language beats a blank
  section.
- `translate()` returns the value unchanged if it's a plain string
  (not yet migrated to `{es, en}`) — lets migration happen
  incrementally file-by-file without breaking components mid-way.
- `useLanguage()` throws if called outside `LanguageProvider`, same
  contract as `useTheme()`, catching a missing-provider mistake at
  dev time rather than silently rendering broken text.

## Testing

No test suite currently exists in this project (checked: no
`*.test.*`/`*.spec.*` files, no test runner in `package.json`) —
consistent with the rest of the codebase, verification is manual:

- `npm run build` must pass (catches syntax/import errors across all
  migrated files).
- Manual pass in browser: toggle EN on Home, About, Services,
  Contact, one project detail page, one small-work detail page —
  confirm every visible string switches, nothing renders blank or
  `undefined`, layout doesn't break from English text being
  longer/shorter than Spanish (check nav, buttons, accordion headers
  particularly — English is often more compact than Spanish, but some
  labels may run longer and need to be checked for wrapping).
- Confirm `localStorage['portfolio-lang']` persists across a page
  reload and across navigation between routes.
- Confirm default is Spanish in a fresh/incognito session regardless
  of OS/browser language setting.

## Scope note for the implementation plan

This spec defines the architecture and pattern. The implementation
plan will need to enumerate every file touched — that list is large
(all of `src/data/*.js`, ~30 components across
`about/contact/home/layout/project-detail/projects/services`, plus the
new `LanguageContext.jsx` and `i18n/strings.js`) and is planning work,
not design work. Recommended plan structure: one task to build
`LanguageContext` + `translate()` + Navbar wiring first (so the switch
is functionally testable early), then one task per page/component
group to migrate strings, then a final full manual QA pass per the
Testing section above.
