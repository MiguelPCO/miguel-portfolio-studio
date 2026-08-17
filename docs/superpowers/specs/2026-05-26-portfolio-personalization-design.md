# Portfolio Personalization — Design Spec
**Date:** 2026-05-26
**Approach:** Option B — Restructura + personalizar

---

## Decisiones tomadas

| Decisión | Valor |
|----------|-------|
| Idioma | Español |
| Nombre | Miguel de la Peña |
| Email contacto | miguelcastilloolivares@gmail.com |
| Foto | Tiene foto (pendiente ruta/subida) |
| Testimoniales | Eliminar sección |
| URLs proyectos | Algunos en Vercel — añadir manualmente |
| Framing | Híbrido: personal + premium, sin narrativa de studio |

---

## 1. Datos — Proyectos

### Proyectos Destacados (`featuredProjects`)
6 proyectos con detail page completa:

| Slug | Título | Categoría | Stack | Tags |
|------|--------|-----------|-------|------|
| `fitgame-pro` | FitGame Pro | App · PWA | React 19, Supabase, Vite | App, PWA, Gamificación |
| `decoriai` | Décoriai | App · IA | Next.js, Replicate, Supabase | IA, App, Next.js |
| `spritz` | Spritz | App · Web | Next.js, Supabase, Claude AI | App, IA, Fragancias |
| `veta-web` | VETA | Web · Branding | Next.js, Tailwind v4 | Web, Branding, E-commerce |
| `altitud-coffee` | Altitud Coffee | Web | Next.js 15, Tailwind | Web, Café, Especialidad |
| `lumie` | Lumié | Landing · Animaciones | React, GSAP, Vite | Landing, GSAP, Skincare |

Cada proyecto tiene: `slug`, `num`, `title`, `category`, `tags`, `brief`, `tools`, `duration`, `deliverables`, `metrics`, `image`, `images[]`, `liveUrl` (opcional), `next` (slug del siguiente proyecto — lista circular entre los 6 destacados).

### Proyectos Pequeños (`smallWorks`)
Grid compacto sin detail page:

| Slug | Título | Categoría |
|------|--------|-----------|
| `magic-tracker` | magic-tracker | App · Dashboard |
| `cupping` | CUPPING | App · Café |
| `hued` | Hued | Mobile · Expo |
| `interior-ai` | Interior AI | IA · Prototipo |

Estructura simplificada: `slug`, `title`, `category`, `tags`, `image`, `description`, `liveUrl`.

---

## 2. Datos — Servicios

```js
// data/services.js
[
  {
    num: '01',
    title: 'Desarrollo Web',
    description: 'Aplicaciones web modernas con React y Next.js...',
    tags: ['React', 'Next.js', 'Supabase', 'TypeScript'],
  },
  {
    num: '02',
    title: 'Diseño UI/UX',
    description: 'Interfaces limpias centradas en el usuario...',
    tags: ['Figma', 'Design Systems', 'Prototipado', 'GSAP'],
  },
  {
    num: '03',
    title: 'Integración IA',
    description: 'Flujos inteligentes con Claude API, Replicate...',
    tags: ['Claude API', 'Replicate', 'OpenAI', 'AI Workflows'],
  },
]
```

---

## 3. Datos — Equipo / Sobre mí

```js
// data/team.js — simplificado a solo Miguel
export const profile = {
  name: 'Miguel de la Peña',
  role: 'Diseñador & Desarrollador Web',
  bio: 'Soy Miguel de la Peña, diseñador y desarrollador web especializado en crear experiencias digitales modernas. Combino diseño visual con desarrollo técnico para construir productos que destacan.',
  avatar: '/miguel.jpg',  // foto pendiente
  email: 'miguelcastilloolivares@gmail.com',
  social: {
    github: '',
    linkedin: '',
    twitter: '',
  },
}

export const stats = [
  { value: 10, suffix: '+', label: 'Proyectos completados' },
  { value: 3, suffix: '+', label: 'Años de experiencia' },
  { value: 5, suffix: '+', label: 'Clientes satisfechos' },
]

export const techStack = [
  'React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'GSAP',
  'Supabase', 'Node.js', 'Figma', 'Claude API', 'Vercel',
]

// testimonials eliminados
export const testimonials = []
```

---

## 4. Cambios por página

### Home (`HomePage.jsx`)
- `HeroSection`: Texto → `"Diseño & Desarrollo Web"`, nombre `"Miguel de la Peña"`, tagline breve
- `ProjectsPreview`: usar `featuredProjects[0..2]`
- `ServicesPreview`: usar 3 servicios reales
- `TeamSection`: eliminar o reemplazar con mini-about card (foto + nombre + CTA al About)
- `TestimonialsSection`: **eliminar**
- `CTASection`: mantener, actualizar links sociales

### About (`AboutPage.jsx`)
- `AboutHero`: foto real de Miguel
- `StatsRow`: usar `profile.stats`
- `StorySection`: bio de `profile.bio` + párrafo expandido
- `ClientsMarquee`: renombrar lógica → tech stack desde `profile.techStack`
- `VisionMission`: filosofía personal de trabajo
- `CareersSection`: renombrar → `AvailabilitySection` — "Disponible para proyectos"
- `TeamGallery`: **eliminar**

### Projects (`ProjectsPage.jsx` + `ProjectsList.jsx`)
- Sección 1: `ProjectsList` con `featuredProjects` (filterable, cards completas)
- Sección 2: nuevo componente `SmallWorksGrid` con `smallWorks` (grid 3-col, cards simples)
- Filter tags adaptados a categorías reales: `Todos`, `App`, `Web`, `IA`, `Landing`

### Services (`ServicesPage.jsx`)
- `ServicesAccordion`: 3 servicios reales (eliminar cuarto placeholder)

### Contact (`ContactPage.jsx`)
- `ContactInfo`: email `miguelcastilloolivares@gmail.com`, actualizar datos
- `WorkProcess`: mantener (adaptar texto a proceso real de Miguel)

### ProjectDetail (`ProjectDetailPage.jsx`)
- Sin cambios estructurales — alimentado por nuevos datos de `featuredProjects`

---

## 5. Componentes nuevos

### `SmallWorksGrid`
- Ubicación: `src/components/projects/SmallWorksGrid.jsx`
- Grid 3 columnas (desktop), 2 (tablet), 1 (mobile)
- Card: imagen placeholder, título, categoría, tags, descripción breve
- Sin link a detail page — puede tener link externo opcional (`liveUrl`)
- Animación: `useScrollReveal` con `selector='.small-work-card'`

### Mini About card (Home)
- Reemplaza `TeamSection` en Home
- Muestra: foto, nombre, rol, frase corta, botón "Sobre mí"
- Componente: `src/components/home/AboutPreview.jsx`

---

## 6. Archivos a modificar

| Archivo | Cambio |
|---------|--------|
| `src/data/projects.js` | Reemplazar por `featuredProjects` + `smallWorks` exports |
| `src/data/services.js` | 3 servicios reales |
| `src/data/team.js` | Solo `profile`, `stats`, `techStack` |
| `src/pages/HomePage.jsx` | Eliminar TestimonialsSection, adaptar imports |
| `src/pages/AboutPage.jsx` | Eliminar TeamGallery, adaptar secciones |
| `src/components/about/ClientsMarquee.jsx` | Cambiar datos a tech stack |
| `src/components/about/CareersSection.jsx` | Renombrar → AvailabilitySection |
| `src/components/home/TeamSection.jsx` | Reemplazar por AboutPreview |
| `src/components/projects/ProjectsList.jsx` | Añadir SmallWorksGrid |
| `src/components/contact/ContactInfo.jsx` | Email real + datos |
| `index.html` | Title, meta description actualizados |

---

## 7. Pendiente (fuera de scope implementación inicial)

- [ ] Foto de Miguel → subir a `public/miguel.jpg`
- [ ] URLs de proyectos en Vercel → añadir `liveUrl` en data
- [ ] Social links reales (GitHub, LinkedIn)
- [ ] Imágenes reales de proyectos → `public/projects/`
- [ ] Bio expandida y textos definitivos

---

## Orden de implementación

1. Datos (`data/`) — base de todo
2. SEO/meta (`index.html`, `ContactInfo`)
3. About page (adaptaciones + foto placeholder)
4. Home page (eliminar Team/Testimonials, añadir AboutPreview)
5. Projects page (SmallWorksGrid + datos reales)
6. Services page (3 servicios)
7. Detail pages (alimentadas por nuevos datos)
8. Smoke test visual completo
