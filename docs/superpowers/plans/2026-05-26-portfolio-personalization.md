# Portfolio Personalization Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace all placeholder studio content with Miguel de la Peña's real identity, projects, and services.

**Architecture:** Data-first approach — update all three data files first, then update components that consume them. Two new components added: `AboutPreview` (replaces TeamSection in Home) and `SmallWorksGrid` (added to Projects page). No new routes; no new dependencies.

**Tech Stack:** React 19, Vite 8, Tailwind v4, GSAP 3.14.1, React Router v7

---

## File Map

**Modified data files:**
- `src/data/projects.js` — exports `featuredProjects` + `smallWorks` (replaces `projects`)
- `src/data/services.js` — 3 real services (replaces 4 placeholder)
- `src/data/team.js` — exports `profile`, `stats`, `techStack` (replaces `team`, `testimonials`)

**Modified pages:**
- `src/pages/HomePage.jsx` — remove `TestimonialsSection`, swap `TeamSection` → `AboutPreview`
- `src/pages/AboutPage.jsx` — remove `TeamGallery`
- `src/pages/ProjectDetailPage.jsx` — import `featuredProjects`, make `ProjectTestimonial` conditional

**Modified components:**
- `src/components/home/HeroSection.jsx` — Spanish copy, Miguel's name/stats
- `src/components/home/CTASection.jsx` — Spanish copy, social links
- `src/components/home/ProjectsPreview.jsx` — import `featuredProjects`
- `src/components/about/AboutHero.jsx` — Spanish copy, Miguel's name
- `src/components/about/StatsRow.jsx` — use `stats` from team.js
- `src/components/about/StorySection.jsx` — Miguel's bio
- `src/components/about/ClientsMarquee.jsx` — tech stack marquee (from team.js)
- `src/components/about/VisionMission.jsx` — personal philosophy copy
- `src/components/about/CareersSection.jsx` — rewrite as AvailabilitySection
- `src/components/projects/ProjectsList.jsx` — import `featuredProjects`, add `SmallWorksGrid`
- `src/components/contact/ContactInfo.jsx` — real email + location
- `index.html` — real title + meta description

**New components:**
- `src/components/home/AboutPreview.jsx` — mini about card for home page
- `src/components/projects/SmallWorksGrid.jsx` — compact grid for small works

---

## Task 1: Update data/team.js

**Files:**
- Modify: `src/data/team.js`

- [ ] **Step 1: Replace entire file**

```js
export const profile = {
  name: 'Miguel de la Peña',
  role: 'Diseñador & Desarrollador Web',
  bio: 'Soy Miguel de la Peña, diseñador y desarrollador web especializado en crear experiencias digitales modernas. Combino diseño visual con desarrollo técnico para construir productos que destacan — desde apps complejas hasta landings de alto impacto.',
  avatar: '/miguel.jpg',
  email: 'miguelcastilloolivares@gmail.com',
  social: {
    github: 'https://github.com/MiguelPCO',
    linkedin: '',
    twitter: '',
  },
}

export const stats = [
  { endValue: 10, suffix: '+', label: 'Proyectos completados' },
  { endValue: 3, suffix: '+', label: 'Años de experiencia' },
  { endValue: 5, suffix: '+', label: 'Clientes satisfechos' },
]

export const techStack = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP',
  'Supabase', 'Node.js', 'Figma', 'Claude API', 'Vercel',
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP',
  'Supabase', 'Node.js', 'Figma', 'Claude API', 'Vercel',
]
```

> Note: `techStack` is duplicated so the marquee loop looks seamless.

- [ ] **Step 2: Verify no import errors**

Run: `npm run build 2>&1 | head -30`
Expected: build succeeds or only warns about unused team/testimonials imports (those will be fixed in later tasks).

- [ ] **Step 3: Commit**

```bash
git add src/data/team.js
git commit -m "feat: replace team data with Miguel de la Peña profile"
```

---

## Task 2: Update data/services.js

**Files:**
- Modify: `src/data/services.js`

- [ ] **Step 1: Replace entire file**

```js
export const services = [
  {
    num: '01',
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas, rápidas y accesibles. Desde landings de alto impacto hasta apps full-stack con autenticación, base de datos en tiempo real y optimización de rendimiento.',
    tags: ['React', 'Next.js', 'TypeScript', 'Supabase', 'Vite'],
    image: null,
  },
  {
    num: '02',
    title: 'Diseño UI/UX',
    description: 'Interfaces limpias centradas en el usuario. Combino sistemas de diseño cohesivos con animaciones fluidas para crear experiencias que no solo se ven bien, sino que funcionan de forma intuitiva.',
    tags: ['Figma', 'Design Systems', 'Prototipado', 'GSAP', 'Tailwind CSS'],
    image: null,
  },
  {
    num: '03',
    title: 'Integración IA',
    description: 'Flujos inteligentes integrados en productos reales. Desde generación de imágenes con Replicate hasta asistentes conversacionales con Claude API — IA que aporta valor, no que distrae.',
    tags: ['Claude API', 'Replicate', 'AI Workflows', 'Next.js API Routes'],
    image: null,
  },
]
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | head -30`
Expected: no errors related to services.

- [ ] **Step 3: Commit**

```bash
git add src/data/services.js
git commit -m "feat: replace services data with real offerings (web dev, UI/UX, AI)"
```

---

## Task 3: Update data/projects.js

**Files:**
- Modify: `src/data/projects.js`

- [ ] **Step 1: Replace entire file**

```js
export const featuredProjects = [
  {
    slug: 'fitgame-pro',
    num: '01',
    title: 'FitGame Pro',
    category: 'App · PWA · Gamificación',
    tags: ['App', 'PWA', 'React'],
    brief: 'App de fitness gamificada que convierte tus entrenamientos en misiones. Con sistema de XP, rachas, historial detallado y soporte offline completo.',
    tools: ['React 19', 'TypeScript', 'Supabase', 'Vite', 'Tailwind CSS', 'Vitest'],
    duration: '6 meses',
    deliverables: ['App web PWA', 'Sistema de XP y gamificación', 'Modo offline con sync', 'Suite de 138 tests'],
    metrics: [
      'PWA installable con soporte offline total',
      '138 tests unitarios + 36 E2E con Playwright',
      'Supabase auth + localStorage fallback',
    ],
    image: '/projects/fitgame-hero.jpg',
    images: [
      '/projects/fitgame-1.jpg',
      '/projects/fitgame-2.jpg',
      '/projects/fitgame-3.jpg',
    ],
    liveUrl: '',
    testimonial: null,
    next: 'decoriai',
  },
  {
    slug: 'decoriai',
    num: '02',
    title: 'Décoriai',
    category: 'App · Inteligencia Artificial',
    tags: ['IA', 'App', 'Next.js'],
    brief: 'Plataforma de rediseño de interiores con IA. Sube una foto de tu habitación y recibe una reimaginación completa del espacio en segundos.',
    tools: ['Next.js 16', 'Replicate', 'Supabase', 'Tailwind v4', 'TypeScript'],
    duration: '3 semanas',
    deliverables: ['Landing page', 'Generador IA', 'Historial de generaciones', 'Almacenamiento en Supabase'],
    metrics: [
      'Flujo completo: upload → generación IA → historial',
      'Supabase Storage para imágenes input/output',
      'Dashboard con datos reales de uso',
    ],
    image: '/projects/decoriai-hero.jpg',
    images: [
      '/projects/decoriai-1.jpg',
      '/projects/decoriai-2.jpg',
      '/projects/decoriai-3.jpg',
    ],
    liveUrl: '',
    testimonial: null,
    next: 'spritz',
  },
  {
    slug: 'spritz',
    num: '03',
    title: 'Spritz',
    category: 'App · Web · Fragancias',
    tags: ['App', 'Next.js', 'Supabase'],
    brief: 'Guardarropa digital para coleccionistas de fragancias. Gestiona tu colección, registra reseñas y descubre nuevos perfumes con ayuda de IA.',
    tools: ['Next.js 16', 'Supabase', 'Claude API', 'Tailwind v4', 'TypeScript'],
    duration: '2 meses',
    deliverables: ['App web full-stack', 'CRUD completo de colección', 'Integración Claude AI', 'Auth con Supabase'],
    metrics: [
      'Sistema de colección con estados (stock/vendido/enviado)',
      'Claude AI para recomendaciones personalizadas',
      'Desplegado en Vercel',
    ],
    image: '/projects/spritz-hero.jpg',
    images: [
      '/projects/spritz-1.jpg',
      '/projects/spritz-2.jpg',
      '/projects/spritz-3.jpg',
    ],
    liveUrl: '',
    testimonial: null,
    next: 'veta-web',
  },
  {
    slug: 'veta-web',
    num: '04',
    title: 'VETA',
    category: 'Web · Branding · E-commerce',
    tags: ['Web', 'Branding', 'Next.js'],
    brief: 'Identidad digital completa para marca artesanal de jabones minerales. 24 páginas estáticas con SEO optimizado y diseño que refleja la naturaleza y artesanía del producto.',
    tools: ['Next.js 16', 'Tailwind v4', 'TypeScript', 'Vercel'],
    duration: '1 mes',
    deliverables: ['Web corporativa completa', '24 páginas estáticas', 'SEO optimizado', 'Diseño de identidad visual'],
    metrics: [
      '24 páginas con SEO metadata individual',
      'Build estático optimizado para Vercel',
      'Diseño coherente con identidad de marca',
    ],
    image: '/projects/veta-hero.jpg',
    images: [
      '/projects/veta-1.jpg',
      '/projects/veta-2.jpg',
      '/projects/veta-3.jpg',
    ],
    liveUrl: '',
    testimonial: null,
    next: 'altitud-coffee',
  },
  {
    slug: 'altitud-coffee',
    num: '05',
    title: 'Altitud Coffee',
    category: 'Web · Café de Especialidad',
    tags: ['Web', 'Landing', 'Next.js'],
    brief: 'Web para cafetería de especialidad. Diseño elegante que comunica el origen, proceso y artesanía detrás de cada taza.',
    tools: ['Next.js 15', 'Tailwind CSS', 'TypeScript', 'Vercel'],
    duration: '2 semanas',
    deliverables: ['Landing page', 'Sección de menú', 'About & Historia', 'SEO local'],
    metrics: [
      'Diseño premium orientado a conversión',
      'Optimizado para SEO local',
      'Build pasando en CI',
    ],
    image: '/projects/altitud-hero.jpg',
    images: [
      '/projects/altitud-1.jpg',
      '/projects/altitud-2.jpg',
      '/projects/altitud-3.jpg',
    ],
    liveUrl: '',
    testimonial: null,
    next: 'lumie',
  },
  {
    slug: 'lumie',
    num: '06',
    title: 'Lumié',
    category: 'Landing · Animaciones · Skincare',
    tags: ['Landing', 'GSAP', 'React'],
    brief: 'Landing cinematográfica para marca de skincare de lujo. Animaciones GSAP de alto impacto, diseño premium y storytelling visual que eleva la percepción de marca.',
    tools: ['React 19', 'GSAP 3', 'Vite', 'Tailwind v4', 'TypeScript'],
    duration: '1 semana',
    deliverables: ['Landing page premium', 'Animaciones GSAP', 'Diseño de identidad', 'Experiencia cinematográfica'],
    metrics: [
      'Animaciones ScrollTrigger + SplitText',
      'Diseño mobile-first responsive',
      'Build optimizado con Vite',
    ],
    image: '/projects/lumie-hero.jpg',
    images: [
      '/projects/lumie-1.jpg',
      '/projects/lumie-2.jpg',
      '/projects/lumie-3.jpg',
    ],
    liveUrl: '',
    testimonial: null,
    next: 'fitgame-pro',
  },
]

export const smallWorks = [
  {
    slug: 'magic-tracker',
    title: 'magic-tracker',
    category: 'App · Dashboard',
    tags: ['Next.js', 'Supabase', 'Tailwind v4'],
    description: 'Gestión de colección de cartas Magic: The Gathering. CRUD completo, KPIs de inversión/beneficio, filtros y exportación CSV.',
    image: null,
    liveUrl: '',
  },
  {
    slug: 'cupping',
    title: 'CUPPING',
    category: 'App · Café',
    tags: ['Next.js', 'Supabase', 'shadcn/ui'],
    description: 'App de cata de café de especialidad. Notas de cata, puntuaciones, historial y comparativas.',
    image: null,
    liveUrl: '',
  },
  {
    slug: 'hued',
    title: 'Hued',
    category: 'Mobile · Expo',
    tags: ['Expo', 'React Native', 'Tailwind'],
    description: 'App móvil de paletas de color infográficas. Genera y exporta paletas visuales para diseñadores.',
    image: null,
    liveUrl: '',
  },
  {
    slug: 'interior-ai',
    title: 'Interior AI',
    category: 'IA · Prototipo',
    tags: ['Next.js', 'Replicate', 'Supabase'],
    description: 'Prototipo de rediseño de interiores con IA. Base técnica que evolucionó en Décoriai.',
    image: null,
    liveUrl: '',
  },
]

// Backwards compat for any remaining imports
export const projects = featuredProjects
```

- [ ] **Step 2: Verify build**

Run: `npm run build 2>&1 | head -30`
Expected: build succeeds. `projects` re-export keeps existing consumers working until updated.

- [ ] **Step 3: Commit**

```bash
git add src/data/projects.js
git commit -m "feat: replace projects data with Miguel's real portfolio (6 featured + 4 small works)"
```

---

## Task 4: Update index.html (SEO/meta)

**Files:**
- Modify: `index.html`

- [ ] **Step 1: Update title and add meta tags**

Replace the entire `<head>` content:

```html
<!doctype html>
<html lang="es">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Miguel de la Peña — Diseñador & Desarrollador Web</title>
    <meta name="description" content="Portfolio de Miguel de la Peña, diseñador y desarrollador web especializado en React, Next.js e integración de IA. Proyectos de alto impacto, diseño moderno." />
    <meta name="author" content="Miguel de la Peña" />
    <meta property="og:title" content="Miguel de la Peña — Diseñador & Desarrollador Web" />
    <meta property="og:description" content="Portfolio de Miguel de la Peña. Desarrollo web moderno con React y Next.js, diseño UI/UX e integración de inteligencia artificial." />
    <meta property="og:type" content="website" />

    <!-- Google Fonts: Bricolage Grotesque + Inter -->
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link
      href="https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap"
      rel="stylesheet"
    />
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 2: Commit**

```bash
git add index.html
git commit -m "feat: update SEO meta tags for Miguel de la Peña portfolio"
```

---

## Task 5: Update ContactInfo.jsx

**Files:**
- Modify: `src/components/contact/ContactInfo.jsx`

- [ ] **Step 1: Replace infoCards with real data**

Replace the `infoCards` array (lines 7-27):

```js
const infoCards = [
  {
    icon: '✉️',
    title: 'Email',
    lines: ['miguelcastilloolivares@gmail.com'],
  },
  {
    icon: '📍',
    title: 'Ubicación',
    lines: ['España', 'Disponible para trabajo remoto'],
  },
  {
    icon: '💻',
    title: 'GitHub',
    lines: ['github.com/MiguelPCO'],
  },
  {
    icon: '🕐',
    title: 'Disponibilidad',
    lines: ['Lunes – Viernes', '9:00 – 18:00'],
  },
]
```

- [ ] **Step 2: Start dev server and visually verify contact page**

Run: `npm run dev`
Navigate to `http://localhost:3000/contact`
Expected: 4 cards showing real email, España location, GitHub, and availability.

- [ ] **Step 3: Commit**

```bash
git add src/components/contact/ContactInfo.jsx
git commit -m "feat: update contact info with real email and location"
```

---

## Task 6: Update HeroSection.jsx

**Files:**
- Modify: `src/components/home/HeroSection.jsx`

- [ ] **Step 1: Replace heroStats and copy with Spanish/real content**

Replace the `heroStats` array and JSX in the component. Full new file:

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'

const heroStats = [
  { label: 'Proyectos completados', value: '10+' },
  { label: 'Años de experiencia', value: '3+' },
  { label: 'Clientes satisfechos', value: '5+' },
]

export default function HeroSection() {
  const heroRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.to('.hero-blob', {
      rotation: 360,
      duration: 60,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    })

    const split = new SplitText('.hero-title', { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      yPercent: 120,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.025,
      delay: 0.2,
    })

    gsap.from('.hero-stat', {
      opacity: 0,
      x: 20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.8,
      ease: 'power2.out',
    })

    gsap.from('.hero-consultation', {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      delay: 1.0,
      ease: 'back.out(1.5)',
    })

    return () => split.revert()
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
      <div
        className="hero-blob absolute inset-0 pointer-events-none opacity-30 blur-3xl"
        style={{
          background: `
            radial-gradient(circle at 30% 40%, #ff9a9e 0%, transparent 50%),
            radial-gradient(circle at 70% 60%, #a8edea 0%, transparent 50%),
            radial-gradient(circle at 50% 80%, #fad0c4 0%, transparent 40%)
          `,
        }}
      />

      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="hero-title font-display font-black text-[clamp(64px,10vw,140px)] leading-[0.9] text-ink mb-8">
            MIGUEL
          </h1>

          <div className="hero-consultation flex items-center gap-4 bg-white dark:bg-card rounded-full px-4 py-3 shadow-sm w-fit">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-ink text-sm font-bold shrink-0">
              M
            </div>
            <div className="mr-2">
              <p className="text-sm font-semibold text-ink">¿Tienes un proyecto en mente?</p>
              <p className="text-xs text-muted">Hablemos</p>
            </div>
            <Button href="/contact" variant="yellow-pill" ariaLabel="Contactar a Miguel">
              Contactar
            </Button>
          </div>
        </div>

        <div className="flex flex-col gap-4 lg:items-end">
          {heroStats.map((stat, i) => (
            <div
              key={i}
              className="hero-stat flex items-center gap-3 bg-white/60 dark:bg-card/80 backdrop-blur-sm
                         rounded-full px-5 py-3 w-full lg:max-w-xs"
            >
              <span className="w-2 h-2 rounded-full bg-accent shrink-0" />
              <span className="text-sm text-muted flex-1">{stat.label}</span>
              <span className="font-display font-bold text-ink">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000`
Expected: Hero shows "MIGUEL" title, Spanish consultation pill, 3 real stats.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/HeroSection.jsx
git commit -m "feat: update hero section with Miguel's name and Spanish copy"
```

---

## Task 7: Create AboutPreview.jsx (replaces TeamSection in Home)

**Files:**
- Create: `src/components/home/AboutPreview.jsx`

- [ ] **Step 1: Create new component**

```jsx
import { Link } from 'react-router'
import { profile } from '../../data/team'
import SectionTag from '../ui/SectionTag'
import Button from '../ui/Button'
import { useScrollReveal } from '../animations/useScrollReveal'

export default function AboutPreview() {
  const sectionRef = useScrollReveal({ selector: '.about-preview-content', y: 30 })

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="about-preview-content bg-card rounded-[24px] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
          {/* Avatar */}
          <div className="shrink-0">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-accent flex items-center justify-center
                              text-ink text-4xl md:text-5xl font-display font-bold">
                M
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <SectionTag>Sobre mí</SectionTag>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
              {profile.name}
            </h2>
            <p className="text-muted text-sm font-medium uppercase tracking-widest mb-5">
              {profile.role}
            </p>
            <p className="text-ink/80 leading-relaxed mb-8 max-w-xl">
              {profile.bio}
            </p>
            <Button href="/about" variant="black-pill" ariaLabel="Saber más sobre Miguel">
              Conocerme mejor
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/home/AboutPreview.jsx
git commit -m "feat: create AboutPreview component to replace TeamSection on home"
```

---

## Task 8: Update HomePage.jsx

**Files:**
- Modify: `src/pages/HomePage.jsx`

- [ ] **Step 1: Swap imports and remove TestimonialsSection**

```jsx
import HeroSection from '../components/home/HeroSection'
import ProjectsPreview from '../components/home/ProjectsPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import AboutPreview from '../components/home/AboutPreview'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsPreview />
      <ServicesPreview />
      <AboutPreview />
      <CTASection />
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000`
Expected: Home page shows Hero → Projects preview → Services → About preview card (Miguel's info) → CTA. No team grid, no testimonials.

- [ ] **Step 3: Commit**

```bash
git add src/pages/HomePage.jsx
git commit -m "feat: update home page — remove testimonials, replace team section with AboutPreview"
```

---

## Task 9: Update ProjectsPreview.jsx

**Files:**
- Modify: `src/components/home/ProjectsPreview.jsx`

- [ ] **Step 1: Change import from `projects` to `featuredProjects` and update Spanish copy**

Replace line 6: `import { projects } from '../../data/projects'`
With: `import { featuredProjects } from '../../data/projects'`

Replace line 49: `const previewProjects = projects.slice(0, 3)`
With: `const previewProjects = featuredProjects.slice(0, 3)`

Replace the SectionTag text: `Selected Projects` → `Proyectos Seleccionados`

Replace the Button text: `View All` → `Ver todos`

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000`
Expected: Projects preview shows FitGame Pro, Décoriai, Spritz cards.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/ProjectsPreview.jsx
git commit -m "feat: update projects preview to use featuredProjects with Spanish copy"
```

---

## Task 10: Update CTASection.jsx

**Files:**
- Modify: `src/components/home/CTASection.jsx`

- [ ] **Step 1: Update copy and social links to Spanish/real**

Replace the `socialLinks` array (lines 8-13):

```js
const socialLinks = [
  { name: 'GitHub', icon: 'GH', href: 'https://github.com/MiguelPCO' },
  { name: 'LinkedIn', icon: 'LI', href: '' },
  { name: 'Twitter', icon: 'X', href: '' },
  { name: 'Dribbble', icon: 'DR', href: '' },
]
```

Replace the CTA card heading (lines ~59-61):
```jsx
<h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-8">
  ¿Listo para dar vida<br />a tu proyecto?
</h2>
```

Replace the CTA button text (lines ~62-70):
```jsx
<Link
  to="/contact"
  className="inline-flex items-center gap-3 bg-ink text-surface
             px-6 py-3 rounded-full font-semibold text-sm
             hover:opacity-90 transition-opacity"
  aria-label="Ir a contacto"
>
  Hablemos
  <span className="w-7 h-7 bg-accent rounded-full flex items-center
                   justify-center text-ink text-xs">
    →
  </span>
</Link>
```

Replace the `Work With Us` tag text:
```jsx
<span className="text-xs font-semibold uppercase tracking-widest text-muted">
  Trabajemos juntos
</span>
```

- [ ] **Step 2: Verify in browser**

Scroll to bottom of `http://localhost:3000`
Expected: CTA card shows Spanish copy. Social links grid shows GH, LI, X, DR.

- [ ] **Step 3: Commit**

```bash
git add src/components/home/CTASection.jsx
git commit -m "feat: update CTA section with Spanish copy and real social links"
```

---

## Task 11: Update AboutHero.jsx

**Files:**
- Modify: `src/components/about/AboutHero.jsx`

- [ ] **Step 1: Update Spanish copy**

Replace the `SectionTag` content: `About Studio` → `Sobre mí`

Replace the `<h1>` block (lines ~62-67):

```jsx
<h1 className="about-hero-title font-display font-black text-[clamp(36px,6vw,80px)] leading-[1.05]">
  <span className="text-ink">MIGUEL DE LA PEÑA,</span>
  <br />
  <span className="text-muted">DISEÑADOR & DESARROLLADOR.</span>
</h1>
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/about`
Expected: About hero shows the gray rectangle placeholder image (real photo TBD), title "MIGUEL DE LA PEÑA, DISEÑADOR & DESARROLLADOR."

- [ ] **Step 3: Commit**

```bash
git add src/components/about/AboutHero.jsx
git commit -m "feat: update about hero with Miguel's name in Spanish"
```

---

## Task 12: Update StatsRow.jsx

**Files:**
- Modify: `src/components/about/StatsRow.jsx`

- [ ] **Step 1: Import stats from team.js and use them**

```jsx
import StatsCounter from '../ui/StatsCounter'
import { useScrollReveal } from '../animations/useScrollReveal'
import { stats } from '../../data/team'

export default function StatsRow() {
  const sectionRef = useScrollReveal({ selector: '.stat-card', stagger: 0.12 })

  return (
    <section ref={sectionRef} className="px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <StatsCounter
                endValue={stat.endValue}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/StatsRow.jsx
git commit -m "feat: update stats row with Miguel's real numbers from profile data"
```

---

## Task 13: Update StorySection.jsx

**Files:**
- Modify: `src/components/about/StorySection.jsx`

- [ ] **Step 1: Import profile and update bio copy**

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useScrollReveal } from '../animations/useScrollReveal'
import { profile } from '../../data/team'

export default function StorySection() {
  const sectionRef = useRef(null)
  const contentRef = useScrollReveal({ y: 30 })

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.to('.story-ghost-text', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative px-6 py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative">
        <p
          className="story-ghost-text absolute top-0 left-0 w-full font-display font-black
                     text-[clamp(48px,10vw,140px)] leading-[1.1] text-ink opacity-[0.06]
                     pointer-events-none select-none"
          aria-hidden="true"
        >
          MI HISTORIA, MI CAMINO.
        </p>

        <div ref={contentRef} className="relative z-[1] max-w-2xl pt-16 md:pt-24">
          <p className="text-lg md:text-xl leading-relaxed text-ink">
            Empecé con una <strong>curiosidad simple</strong>: ¿cómo se construye algo que la gente quiere usar?
            Esa pregunta me llevó a combinar diseño y código — dos disciplinas que parecen opuestas
            pero que juntas crean los <strong>productos digitales más potentes</strong>.
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted mt-6">
            Hoy diseño y desarrollo aplicaciones web modernas, desde apps gamificadas hasta
            plataformas con inteligencia artificial integrada. Me interesa el <strong className="text-ink">detalle que marca la diferencia</strong>:
            la animación que hace fluida una transición, la arquitectura que escala sin romperse,
            la interfaz que se entiende sin leer instrucciones.
          </p>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/StorySection.jsx
git commit -m "feat: update story section with Miguel's personal bio"
```

---

## Task 14: Update ClientsMarquee.jsx → Tech Stack Marquee

**Files:**
- Modify: `src/components/about/ClientsMarquee.jsx`

- [ ] **Step 1: Replace clients with tech stack from profile**

```jsx
import SectionTag from '../ui/SectionTag'
import Marquee from '../ui/Marquee'
import { useScrollReveal } from '../animations/useScrollReveal'
import { techStack } from '../../data/team'

function createTextLogoSrc(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 120 32">
    <text x="60" y="22" text-anchor="middle" font-family="sans-serif" font-weight="700"
          font-size="14" fill="%230D0D0D">${name}</text>
  </svg>`
  return `data:image/svg+xml,${svg}`
}

const techItems = techStack.map((tech) => ({
  src: createTextLogoSrc(tech),
  alt: tech,
}))

export default function ClientsMarquee() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="px-6 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <SectionTag>Stack tecnológico</SectionTag>
        </div>
        <Marquee items={techItems} speed={25} />
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/ClientsMarquee.jsx
git commit -m "feat: replace clients marquee with tech stack marquee"
```

---

## Task 15: Update VisionMission.jsx

**Files:**
- Modify: `src/components/about/VisionMission.jsx`

- [ ] **Step 1: Replace Vision/Mission text with personal philosophy**

Replace only the text content inside each card (keep structure identical):

Vision card `<p>` text:
```jsx
<p className="text-gray-300 text-base md:text-lg leading-relaxed">
  Crear productos digitales que combinen diseño de alta calidad con código sólido —
  donde cada píxel tiene un propósito y cada función tiene sentido para quien la usa.
</p>
```

Mission card `<p>` text:
```jsx
<p className="text-muted text-base md:text-lg leading-relaxed">
  Construir con cuidado: entender el problema antes de escribir código,
  diseñar con intención antes de elegir colores, y entregar productos que
  superen las expectativas técnicas y estéticas del cliente.
</p>
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/VisionMission.jsx
git commit -m "feat: update vision/mission with Miguel's personal design philosophy"
```

---

## Task 16: Rewrite CareersSection.jsx → AvailabilitySection

**Files:**
- Modify: `src/components/about/CareersSection.jsx`

- [ ] **Step 1: Replace entire file**

```jsx
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionTag from '../ui/SectionTag'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useScrollReveal } from '../animations/useScrollReveal'

const availabilityTypes = [
  {
    num: '01',
    title: 'Proyecto freelance',
    detail: 'REMOTO',
    type: 'DISPONIBLE',
    description: 'Apps web, landings, dashboards — desde el diseño hasta el deploy. Trabajo con React, Next.js y Supabase. Entrego código limpio, documentado y fácil de mantener.',
  },
  {
    num: '02',
    title: 'Colaboración en equipo',
    detail: 'REMOTO · HÍBRIDO',
    type: 'DISPONIBLE',
    description: 'Puedo unirme como desarrollador frontend o fullstack a equipos que necesiten reforzar su capacidad técnica o de diseño en proyectos concretos.',
  },
  {
    num: '03',
    title: 'Consultoría técnica',
    detail: 'REMOTO',
    type: 'DISPONIBLE',
    description: 'Revisión de arquitectura frontend, auditoría de UX, integración de IA o mejora de rendimiento. Sesiones de trabajo concretas con entregables claros.',
  },
]

export default function CareersSection() {
  const sectionRef = useRef(null)
  const contentRef = useScrollReveal({ y: 30 })

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.to('.careers-ghost-text', {
      yPercent: -30,
      ease: 'none',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="relative px-6 py-20 md:py-32 overflow-hidden">
      <div className="max-w-[1200px] mx-auto relative">
        <p
          className="careers-ghost-text absolute top-0 left-0 w-full font-display font-black
                     text-[clamp(40px,8vw,120px)] leading-[1.1] text-ink opacity-[0.06]
                     pointer-events-none select-none"
          aria-hidden="true"
        >
          DISPONIBLE PARA PROYECTOS
        </p>

        <div ref={contentRef} className="relative z-[1] pt-16 md:pt-24">
          <div className="mb-6">
            <SectionTag>Disponibilidad</SectionTag>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-ink mb-12">
            Abierto a nuevos proyectos
          </h2>

          <div className="bg-card rounded-[24px] p-4 md:p-8 flex flex-col gap-4">
            {availabilityTypes.map((item) => (
              <div key={item.num} className="border-b border-ink/10 last:border-0 pb-6 last:pb-0 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <span className="text-muted text-sm">{item.num}</span>
                  <span className="text-muted hidden sm:inline">·</span>
                  <span className="text-lg md:text-xl font-semibold text-ink flex-1">{item.title}</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-gray-300 border border-gray-600">
                      {item.detail}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-ink border border-accent/30">
                      {item.type}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-gray-400 max-w-2xl">{item.description}</p>
              </div>
            ))}

            <div className="pt-4">
              <Button href="/contact" variant="yellow-pill" ariaLabel="Contactar a Miguel">
                Hablemos de tu proyecto
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/about/CareersSection.jsx
git commit -m "feat: rewrite CareersSection as AvailabilitySection with Miguel's real availability"
```

---

## Task 17: Update AboutPage.jsx (remove TeamGallery)

**Files:**
- Modify: `src/pages/AboutPage.jsx`

- [ ] **Step 1: Remove TeamGallery import and usage**

```jsx
import AboutHero from '../components/about/AboutHero'
import StatsRow from '../components/about/StatsRow'
import StorySection from '../components/about/StorySection'
import ClientsMarquee from '../components/about/ClientsMarquee'
import VisionMission from '../components/about/VisionMission'
import CareersSection from '../components/about/CareersSection'
import CTASection from '../components/home/CTASection'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatsRow />
      <StorySection />
      <ClientsMarquee />
      <VisionMission />
      <CareersSection />
      <CTASection />
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/about`
Expected: About page shows Hero → Stats (10+, 3+, 5+) → Story (Miguel's bio) → Tech stack marquee → Vision/Mission (personal philosophy) → Availability section → CTA. No team gallery.

- [ ] **Step 3: Commit**

```bash
git add src/pages/AboutPage.jsx
git commit -m "feat: remove TeamGallery from about page"
```

---

## Task 18: Create SmallWorksGrid.jsx

**Files:**
- Create: `src/components/projects/SmallWorksGrid.jsx`

- [ ] **Step 1: Create component**

```jsx
import { cn } from '../../lib/utils'
import SectionTag from '../ui/SectionTag'
import { useScrollReveal } from '../animations/useScrollReveal'

export default function SmallWorksGrid({ works }) {
  const sectionRef = useScrollReveal({ selector: '.small-work-card', stagger: 0.08 })

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="mb-10">
          <SectionTag>Pequeños proyectos</SectionTag>
          <h2 className="font-display font-bold text-2xl md:text-3xl text-ink mt-3">
            Otros trabajos & experimentos
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {works.map((work) => (
            <div
              key={work.slug}
              className={cn(
                'small-work-card bg-card rounded-[24px] p-6 flex flex-col gap-4',
                'hover:bg-ink/5 transition-colors duration-200'
              )}
            >
              {/* Image placeholder */}
              <div className="w-full h-[120px] rounded-2xl bg-gradient-to-br from-gray-200 to-gray-300
                              dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
                <span className="text-muted text-xs font-display font-bold uppercase tracking-wider">
                  {work.category.split(' · ')[0]}
                </span>
              </div>

              {/* Info */}
              <div className="flex-1">
                <p className="text-xs text-muted mb-1">{work.category}</p>
                <h3 className="font-display font-bold text-lg text-ink mb-2">{work.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{work.description}</p>
              </div>

              {/* Tags */}
              <div className="flex flex-wrap gap-1.5">
                {work.tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full text-xs font-medium bg-ink/5 text-ink/60"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Live URL if available */}
              {work.liveUrl && (
                <a
                  href={work.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-medium text-ink underline underline-offset-2 hover:text-accent transition-colors"
                  aria-label={`Ver ${work.title} en vivo`}
                >
                  Ver proyecto →
                </a>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
```

- [ ] **Step 2: Commit**

```bash
git add src/components/projects/SmallWorksGrid.jsx
git commit -m "feat: create SmallWorksGrid component for secondary projects"
```

---

## Task 19: Update ProjectsList.jsx

**Files:**
- Modify: `src/components/projects/ProjectsList.jsx`

- [ ] **Step 1: Replace entire file**

```jsx
import { useState } from 'react'
import { featuredProjects } from '../../data/projects'
import ProjectCard from './ProjectCard'
import SmallWorksGrid from './SmallWorksGrid'
import { smallWorks } from '../../data/projects'
import { cn } from '../../lib/utils'

const filterTags = ['Todos', 'App', 'Web', 'IA', 'Landing']

export default function ProjectsList() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? featuredProjects
    : featuredProjects.filter(p => p.tags.includes(activeFilter))

  return (
    <>
      <section className="px-6 pb-20 md:pb-30">
        {/* Filter pills */}
        <div className="max-w-[1200px] mx-auto mb-10">
          <div
            className="flex flex-wrap gap-3"
            role="group"
            aria-label="Filtrar proyectos por categoría"
          >
            {filterTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                aria-pressed={activeFilter === tag}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeFilter === tag
                    ? 'bg-ink text-surface'
                    : 'bg-card text-ink/70 hover:bg-ink/10'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured project cards */}
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted py-20 text-lg">
              No hay proyectos en esta categoría.
            </p>
          )}
        </div>
      </section>

      {/* Small works — always visible regardless of filter */}
      <SmallWorksGrid works={smallWorks} />
    </>
  )
}
```

- [ ] **Step 2: Verify in browser**

Navigate to `http://localhost:3000/projects`
Expected: Filter pills (Todos/App/Web/IA/Landing), 6 featured project cards, then a "Pequeños proyectos" section with 4 small work cards in a grid.

- [ ] **Step 3: Commit**

```bash
git add src/components/projects/ProjectsList.jsx
git commit -m "feat: update projects list with new filter tags and SmallWorksGrid"
```

---

## Task 20: Update ProjectDetailPage.jsx

**Files:**
- Modify: `src/pages/ProjectDetailPage.jsx`

- [ ] **Step 1: Update NextProject.jsx import + Spanish copy**

Modify `src/components/project-detail/NextProject.jsx`:

Change line 2: `import { projects } from '../../data/projects'`
To: `import { featuredProjects } from '../../data/projects'`

Change line 13: `const nextProject = projects.find((p) => p.slug === nextSlug)`
To: `const nextProject = featuredProjects.find((p) => p.slug === nextSlug)`

Change the `"Next Project"` label text (line ~33) to: `"Siguiente proyecto"`
Change the button text (line ~46): `Next Project` → `Siguiente proyecto`

- [ ] **Step 3: Update import and make testimonial conditional**

```jsx
import { useParams } from 'react-router'
import { featuredProjects } from '../data/projects'
import ProjectHeader from '../components/project-detail/ProjectHeader'
import ProjectHero from '../components/project-detail/ProjectHero'
import ProjectOverview from '../components/project-detail/ProjectOverview'
import ProjectGallery from '../components/project-detail/ProjectGallery'
import ProjectTestimonial from '../components/project-detail/ProjectTestimonial'
import NextProject from '../components/project-detail/NextProject'
import CTASection from '../components/home/CTASection'

export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = featuredProjects.find((p) => p.slug === slug)

  if (!project) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display font-bold text-5xl text-ink mb-4">404</h1>
        <p className="text-muted text-lg">
          Proyecto no encontrado. El proyecto que buscas no existe o ha sido eliminado.
        </p>
      </section>
    )
  }

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      {project.testimonial && <ProjectTestimonial testimonial={project.testimonial} />}
      <NextProject nextSlug={project.next} />
      <CTASection />
    </>
  )
}
```

- [ ] **Step 4: Verify in browser**

Navigate to `http://localhost:3000/projects/fitgame-pro`
Expected: Project detail page loads for FitGame Pro. No testimonial section (since `testimonial: null`). "Next project" button links to Décoriai.

Navigate to `http://localhost:3000/projects/lumie`
Expected: "Next project" links back to fitgame-pro (circular).

- [ ] **Step 5: Commit**

```bash
git add src/components/project-detail/NextProject.jsx src/pages/ProjectDetailPage.jsx
git commit -m "feat: update project detail to use featuredProjects with conditional testimonial and Spanish copy"
```

---

## Task 21: Smoke Test — Full Site Review

- [ ] **Step 1: Start dev server**

Run: `npm run dev`

- [ ] **Step 2: Check all pages**

Visit each page and verify no broken imports, no placeholder studio copy remaining:

| URL | Check |
|-----|-------|
| `/` | Hero "MIGUEL", AboutPreview card, no testimonials |
| `/about` | "MIGUEL DE LA PEÑA", real stats (10+/3+/5+), tech stack marquee, availability section, no team gallery |
| `/projects` | 6 featured cards, filter pills (Todos/App/Web/IA/Landing), small works grid below |
| `/projects/fitgame-pro` | Detail loads, no testimonial section |
| `/projects/lumie` | Detail loads, Next → fitgame-pro |
| `/services` | 3 services in accordion |
| `/contact` | Real email, España location |

- [ ] **Step 3: Run production build**

Run: `npm run build`
Expected: Build completes with no errors. Check output sizes are reasonable.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "chore: portfolio personalization complete — Miguel de la Peña"
```

---

## Post-Implementation Checklist (manual, outside scope)

- [ ] Add photo → save as `public/miguel.jpg` (update `profile.avatar` in team.js)
- [ ] Add real project screenshots → `public/projects/` (update `image` and `images[]` in projects.js)
- [ ] Add LinkedIn URL → `profile.social.linkedin` in team.js + CTASection socialLinks
- [ ] Add live URLs → `liveUrl` field in projects.js for deployed projects
- [ ] Expand bio text → `profile.bio` in team.js
