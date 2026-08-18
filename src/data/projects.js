export const featuredProjects = [
  {
    slug: "fitgame-pro",
    num: "01",
    title: "FitGame Pro",
    category: "App · PWA · Gamificación",
    tags: ["App", "PWA", "React"],
    brief:
      "App de fitness gamificada que convierte tus entrenamientos en misiones. Con sistema de XP, rachas, historial detallado y soporte offline completo.",
    tools: [
      "React 19",
      "TypeScript",
      "Supabase",
      "Vite",
      "Tailwind CSS",
      "Vitest",
    ],
    duration: "6 meses",
    deliverables: [
      "App web PWA",
      "Sistema de XP y gamificación",
      "Modo offline con sync",
      "Suite de 138 tests",
    ],
    metrics: [
      "PWA installable con soporte offline total",
      "138 tests unitarios + 36 E2E con Playwright",
      "Supabase auth + localStorage fallback",
    ],
    // — Case study sections —
    context:
      "Proyecto personal nacido de la frustración con las apps de fitness existentes: demasiado complejas, sin feedback motivacional real y sin soporte offline fiable. Quería construir algo que yo mismo quisiera usar cada semana.",
    problem:
      "Las apps de fitness fallan en retención porque el registro de entrenamientos es aburrido y no hay recompensa emocional. El usuario abandona cuando no siente progreso tangible, especialmente si entrena sin conexión a internet.",
    solution:
      "Una PWA gamificada donde cada entrenamiento genera XP, rachas y niveles. El sistema de progresión convierte el hábito en un loop de recompensa. El modo offline con sync automático elimina la fricción de depender del móvil con datos.",
    features: [
      "Sistema de XP con multiplicadores por racha y RPE",
      "Modo offline completo con cola de sync automática",
      "Historial detallado con filtros por músculo y ejercicio",
      "Peso recomendado basado en progresión doble",
      "PWA instalable con notificaciones de recordatorio",
    ],
    onboarding:
      "El onboarding de 7 pasos recoge objetivo, nivel y equipamiento disponible para personalizar los templates de entrenamiento desde el primer día. Diseñado para completarse en menos de 2 minutos.",
    reflection:
      "El mayor aprendizaje fue la arquitectura localStorage-first: persistir inmediatamente y sincronizar con Supabase de forma asíncrona eliminó toda fricción de UX relacionada con la latencia de red. Lo replicaría en cualquier app móvil con datos críticos.",
    image: "/projects/fitgame-hero.jpg",
    images: [
      "/projects/fitgame-1.jpg",
      "/projects/fitgame-2.jpg",
      "/projects/fitgame-3.jpg",
    ],
    sectionImages: [
      { src: "/projects/fitgame-section-1.jpg", alt: "Plantillas de entrenamiento" },
      { src: "/projects/fitgame-section-2.jpg", alt: "Configuración y onboarding" },
      { src: "/projects/fitgame-section-3.jpg", alt: "Historial de sesiones" },
    ],
    liveUrl: "https://fitgame-pro.vercel.app",
    repoUrl: "https://github.com/MiguelPCO/Fitgame-pro",
    testimonial: null,
    next: "decoriai",
  },
  {
    slug: "decoriai",
    num: "02",
    title: "Décoriai",
    category: "App · Inteligencia Artificial",
    tags: ["IA", "App", "Next.js"],
    brief:
      "Plataforma de rediseño de interiores con IA. Sube una foto de tu habitación y recibe una reimaginación completa del espacio en segundos.",
    tools: ["Next.js 16", "Replicate", "Supabase", "Tailwind v4", "TypeScript"],
    duration: "3 semanas",
    deliverables: [
      "Landing page",
      "Generador IA",
      "Historial de generaciones",
      "Almacenamiento en Supabase",
    ],
    metrics: [
      "Flujo completo: upload → generación IA → historial",
      "Supabase Storage para imágenes input/output",
      "Dashboard con datos reales de uso",
    ],
    // — Case study sections —
    context:
      "El mercado de herramientas de diseño de interiores con IA estaba dominado por productos con prompts complejos o flujos de pago inmediato. Vi la oportunidad de construir algo que cualquier persona pudiera usar sin conocimientos técnicos ni de diseño.",
    problem:
      "Visualizar cómo quedaría tu habitación con un estilo diferente requiere contratar un diseñador o aprender software complejo. El 90% de las personas decoran a ciegas, comprando sin saber el resultado final.",
    solution:
      "Una plataforma donde subir una foto de tu habitación y elegir un estilo genera una reimaginación fotorrealista en segundos. Sin prompts técnicos, sin barreras de entrada. El historial permite comparar variaciones y retomar sesiones anteriores.",
    research:
      "Analicé los flujos de Midjourney, Adobe Firefly y herramientas específicas de interiorismo. El patrón común era la sobre-complejidad del input. La decisión clave fue eliminar la pantalla de configuración y centrar todo en dos acciones: subir foto y elegir estilo.",
    constraints: [
      "Latencia de Replicate (8-15s por generación) — requirió estados de carga expresivos",
      "Coste por generación — sin tier gratuito ilimitado",
      "Calidad variable del modelo según calidad de la foto de entrada",
    ],
    interactionDesign:
      'El mayor reto fue gestionar la espera de 8-15 segundos sin que el usuario abandonara. Diseñé un estado de carga con animación de "transformación" que comunica progreso y mantiene la expectativa activa. La comparativa before/after al recibir el resultado es el momento de mayor impacto emocional del flujo.',
    reflection:
      "Replicate es ideal para prototipar pero costoso para escalar. Con más tiempo, evaluaría self-hosting del modelo en Fly.io para reducir coste por generación y mejorar la latencia. El flujo de onboarding también se beneficiaría de un paso de calibración con la foto antes de lanzar la primera generación.",
    image: "/projects/herodecoriai.png",
    imageFit: "contain",
    images: [
      "/projects/decoriai-1.jpg",
      "/projects/decoriai-2.jpg",
      "/projects/decoriai-3.jpg",
    ],
    sectionImages: [
      { src: "/projects/decoriai-section-1.jpg", alt: "Pantalla de inicio de sesión" },
      { src: "/projects/decoriai-section-2.jpg", alt: "Selector de estilo en el generador" },
      { src: "/projects/decoriai-section-3.jpg", alt: "Registro de cuenta" },
    ],
    liveUrl: "https://interior-ai-xi.vercel.app",
    repoUrl: "https://github.com/MiguelPCO/Decoriai",
    testimonial: null,
    next: "spritz",
  },
  {
    slug: "spritz",
    num: "03",
    title: "Spritz",
    category: "App · Web · Fragancias",
    tags: ["App", "Next.js", "Supabase"],
    brief:
      "Guardarropa digital para coleccionistas de fragancias. Gestiona tu colección, registra reseñas y descubre nuevos perfumes con ayuda de IA.",
    tools: [
      "Next.js 16",
      "Supabase",
      "Claude API",
      "Tailwind v4",
      "TypeScript",
    ],
    duration: "2 meses",
    deliverables: [
      "App web full-stack",
      "CRUD completo de colección",
      "Integración Claude AI",
      "Auth con Supabase",
    ],
    metrics: [
      "Sistema de colección con estados (stock/vendido/enviado)",
      "Claude AI para recomendaciones personalizadas",
      "Desplegado en Vercel",
    ],
    // — Case study sections —
    context:
      "Los aficionados a la perfumería de nicho no tienen una herramienta seria para gestionar colecciones grandes. Las alternativas son hojas de cálculo, Notion o apps genéricas de coleccionismo que no entienden el dominio.",
    problem:
      "Sin un registro estructurado, los coleccionistas pierden el rastro de qué tienen, qué les gustó, cuánto pagaron y qué fragancias se complementan entre sí. La recomendación de nuevos perfumes es completamente manual y basada en memoria.",
    solution:
      "Un guardarropa digital con CRUD completo de colección, notas de cata por fragancia y un asistente IA integrado con Claude que genera recomendaciones personalizadas basadas en el perfil olfativo del usuario.",
    features: [
      "Colección con estados: en stock, vendido, enviado",
      "Notas y puntuaciones por fragancia",
      "Recomendaciones personalizadas con Claude API",
      "Estadísticas de colección e inversión",
      "Auth completo con Supabase",
    ],
    reflection:
      'La integración de Claude API para recomendaciones fue más sencilla de lo esperado. El reto real fue diseñar el prompt correcto para que las recomendaciones se sintieran genuinas y no genéricas. Un sistema de feedback explícito ("esta recomendación fue útil") mejoraría mucho la calidad en iteraciones futuras.',
    image: "/projects/spritz-hero.jpg",
    images: [
      "/projects/spritz-1.jpg",
      "/projects/spritz-2.jpg",
      "/projects/spritz-3.jpg",
    ],
    sectionImages: [
      { src: "/projects/spritz-section-1.jpg", alt: "Perfil olfativo y recomendaciones de Descubrir" },
      { src: "/projects/spritz-section-2.jpg", alt: "Búsqueda de fragancias con autocompletado" },
      { src: "/projects/spritz-section-3.jpg", alt: "Registro de uso en calendario" },
    ],
    liveUrl: "https://spritz-jet.vercel.app",
    repoUrl: "https://github.com/MiguelPCO/Spritz",
    testimonial: null,
    next: "altitud-coffee",
  },
  {
    slug: "altitud-coffee",
    num: "04",
    title: "Altitud Coffee",
    category: "Web · Café de Especialidad",
    tags: ["Web", "Landing", "Next.js"],
    brief:
      "Web para cafetería de especialidad. Diseño elegante que comunica el origen, proceso y artesanía detrás de cada taza.",
    tools: ["Next.js 15", "Tailwind CSS", "TypeScript", "Vercel"],
    duration: "2 semanas",
    deliverables: [
      "Landing page",
      "Sección de menú",
      "About & Historia",
      "SEO local",
    ],
    metrics: [
      "Diseño premium orientado a conversión",
      "Optimizado para SEO local",
      "Build pasando en CI",
    ],
    // — Case study sections —
    context:
      "Altitud Coffee es una cafetería especializada en café de origen único y métodos de preparación alternativos. Necesitaban una web que transmitiera la misma cuidada experiencia que viven los clientes al visitarles.",
    problem:
      "La web anterior era genérica y no diferenciaba a Altitud del resto de cafeterías. Los visitantes no entendían qué hace especial al café de especialidad ni por qué vale más que un café convencional.",
    solution:
      "Landing page editorial que educa al visitante sobre el proceso, el origen y los métodos de preparación mientras comunica el ambiente y la propuesta de valor. El diseño usa fotografía oscura y tipografía grande para crear una experiencia premium antes de que el cliente pise el local.",
    designGoal:
      "Que el usuario entienda en los primeros 5 segundos que esto no es una cafetería ordinaria. La jerarquía visual y el copy trabajan juntos para transmitir conocimiento, pasión y calidad.",
    reflection:
      "El proyecto demostró que el copywriting importa tanto como el diseño. Las primeras versiones del hero eran visualmente fuertes pero el copy era genérico. Reescribir los textos con el cliente duplicó el impacto percibido de la página.",
    image: "/projects/altitud-hero.jpg",
    images: [
      "/projects/altitud-1.jpg",
      "/projects/altitud-2.jpg",
      "/projects/altitud-3.jpg",
    ],
    liveUrl: "",
    repoUrl: "",
    testimonial: null,
    next: "lumie",
  },
  {
    slug: "lumie",
    num: "05",
    title: "Lumié",
    category: "Landing · Animaciones · Skincare",
    tags: ["Landing", "GSAP", "React"],
    brief:
      "Landing cinematográfica para marca de skincare de lujo. Animaciones GSAP de alto impacto, diseño premium y storytelling visual que eleva la percepción de marca.",
    tools: ["React 19", "GSAP 3", "Vite", "Tailwind v4", "TypeScript"],
    duration: "1 semana",
    deliverables: [
      "Landing page premium",
      "Animaciones GSAP",
      "Diseño de identidad",
      "Experiencia cinematográfica",
    ],
    metrics: [
      "Animaciones ScrollTrigger + SplitText",
      "Diseño mobile-first responsive",
      "Build optimizado con Vite",
    ],
    // — Case study sections —
    context:
      "Ejercicio de concepto para explorar hasta dónde se puede llevar la experiencia visual de una landing con GSAP y React. El briefing: marca de skincare de lujo, posicionamiento premium, experiencia cinematográfica.",
    problem:
      "Las landings de skincare de lujo suelen ser visualmente potentes pero técnicamente mediocres: imágenes pesadas, animaciones CSS básicas, sin continuidad entre secciones. El reto era crear una experiencia que se sintiera como una producción cinematográfica.",
    solution:
      "Landing de una página con scroll-storytelling completo: cada sección tiene una animación de entrada específica diseñada para el contenido. SplitText para los títulos, clip-path reveals para las imágenes y parallax suave para crear profundidad.",
    interactionDesign:
      'El sistema de animaciones se construyó como una coreografía: cada elemento tiene un rol en la narrativa visual del scroll. Los títulos se revelan letra a letra para dar tiempo al usuario a procesar el mensaje antes de que aparezca la imagen. El clip-path en las imágenes crea una sensación de "descubrimiento" que encaja con el posicionamiento de lujo.',
    constraints: [
      "Performance en mobile — las animaciones complejas degradan en dispositivos de gama media",
      "Semana de desarrollo — las animaciones más elaboradas requieren tiempo de refinamiento",
      "prefers-reduced-motion — todas las animaciones tienen fallback instantáneo",
    ],
    reflection:
      "GSAP con React y @gsap/react es una combinación muy potente pero requiere disciplina: el scope de useGSAP evita fugas de memoria y el registro de plugins en main.jsx garantiza que solo se inicializan una vez. Sin ese patrón, las animaciones se comportan de forma impredecible.",
    image: "/projects/lumie-hero.jpg",
    images: [
      "/projects/lumie-1.jpg",
      "/projects/lumie-2.jpg",
      "/projects/lumie-3.jpg",
    ],
    liveUrl: "",
    repoUrl: "",
    testimonial: null,
    next: "fitgame-pro",
  },
];

export const smallWorks = [
  {
    slug: "nodo",
    title: "NODO",
    category: "E-commerce · Producto",
    tags: ["Next.js", "Supabase", "Motion"],
    description:
      "Cápsulas de memoria familiar: caja física + archivo digital privado para guardar fotos, cartas y voces que merecen volver.",
    brief:
      "NODO es un producto físico-digital: cajas de archivo premium con tarjetas guiadas y QR privados que enlazan cada objeto a su versión digital en un archivo propio, sin feeds ni redes sociales de por medio. Construí el sitio de marca completo — Memory Box, tres kits temáticos (Primeros Años, Promesa, Legado), guía de regalos, journal editorial con contenido MDX y una app autenticada donde las familias crean y gestionan sus cápsulas. Magic link con Supabase, sin contraseñas.",
    insight:
      "El reto fue diseñar para un producto que vive a la vez en papel y en pantalla: cada página tenía que transmitir la calidez de una caja física sin renunciar a que la parte digital (login, cápsulas, archivo) se sintiera igual de cuidada. La tipografía editorial y la fotografía de producto hacen ese puente.",
    tools: ["Next.js 16", "TypeScript", "Supabase", "Motion", "Tailwind v4"],
    image: "/projects/nodo-hero.jpg",
    images: [
      "/projects/nodo-1-ritual.jpg",
      "/projects/nodo-2-memory-box.jpg",
      "/projects/nodo-3-como-funciona.jpg",
      "/projects/nodo-4-regalos.jpg",
      "/projects/nodo-5-archivo.jpg",
      "/projects/nodo-6-journal.jpg",
      "/projects/nodo-7-faq.jpg",
      "/projects/nodo-8-kit-promesa.jpg",
      "/projects/nodo-9-kit-primeros-anos.jpg",
    ],
    liveUrl: "",
    repoUrl: "https://github.com/MiguelPCO/Nodo",
  },
  {
    slug: "veta",
    title: "VETA",
    category: "E-commerce · Branding",
    tags: ["Next.js", "Tailwind v4", "Framer Motion"],
    description:
      "Tienda online de cuidado personal inspirada en mármol. Catálogo, guía de aromas, sets de regalo y carrito completo.",
    brief:
      "VETA es una marca de jabones sólidos minerales que necesitaba presencia digital coherente con sus valores: naturaleza, artesanía y autenticidad. Sin tienda propia, dependía de redes sociales para vender, lo que limitaba el SEO y la capacidad de contar el proceso detrás de cada pieza. Construí un sitio de marca completo con diez páginas — catálogo filtrable por familia olfativa, ficha de producto, guía de aromas, ingredientes, sets de regalo, historia de marca, journal editorial y una sección de hospitality para hoteles y spas — con carrito propio y persistencia local, usando fotografía de producto y tipografía editorial como protagonistas.",
    insight:
      "El reto de diseño fue comunicar artesanía sin caer en el tópico rústico del sector: cada textura y veta de mármol tenía que sentirse deliberada, no decorativa. Con diez páginas y un catálogo de diez productos, definir tokens de color, tipografía y espaciado antes de maquetar fue lo que mantuvo todo coherente de principio a fin.",
    tools: ["Next.js 16", "TypeScript", "Tailwind v4", "Framer Motion", "Radix UI"],
    image: "/projects/veta-hero.jpg",
    images: [
      "/projects/veta-1-collection.jpg",
      "/projects/veta-2-shop.jpg",
      "/projects/veta-3-product.jpg",
      "/projects/veta-4-gift-sets.jpg",
      "/projects/veta-5-scent-guide.jpg",
      "/projects/veta-6-ingredients.jpg",
      "/projects/veta-7-our-story.jpg",
      "/projects/veta-8-journal.jpg",
      "/projects/veta-9-hospitality.jpg",
    ],
    liveUrl: "https://veta-orpin.vercel.app",
    repoUrl: "https://github.com/MiguelPCO/VETA",
  },
  {
    slug: "vybe",
    title: "VYBE",
    category: "App · Música",
    tags: ["React", "Supabase", "TanStack Query"],
    description:
      "Playlists colaborativas con votación en tiempo real. Crea una sala, invita colaboradores y decide juntos qué suena.",
    brief:
      "App para crear playlists colaborativas: invitas a otros usuarios, cada uno propone canciones y el grupo vota qué entra en la lista. Login con Spotify, Google o magic link. Proyecto en desarrollo activo, todavía sin desplegar.",
    tools: ["React 19", "TypeScript", "Vite", "Supabase", "TanStack Query", "Tailwind CSS"],
    image: "/projects/vybe-hero.jpg",
    images: [
      "/projects/vybe-1-dashboard.jpg",
      "/projects/vybe-2-playlists.jpg",
      "/projects/vybe-3-session.jpg",
    ],
    liveUrl: "",
    repoUrl: "https://github.com/MiguelPCO/VYBE",
  },
  {
    slug: "magic-tracker",
    title: "Magic Tracker",
    category: "App · Dashboard",
    tags: ["Next.js", "Supabase", "Tailwind v4"],
    description:
      "Gestión de colecciones e inventario personal. CRUD completo, KPIs de inversión/beneficio, filtros y exportación CSV.",
    brief:
      "Herramienta personal para gestionar una colección de objetos coleccionables. Registra compras, ventas y envíos, calcula ROI y beneficio acumulado, y exporta el historial a CSV. Construida como proyecto real para uso diario, adaptable a cualquier tipo de colección o inventario de producto.",
    tools: [
      "Next.js 16",
      "TypeScript",
      "Supabase",
      "Tailwind v4",
      "shadcn/ui",
      "Zod",
    ],
    image: "/projects/magictracker-hero.jpg",
    images: [
      "/projects/magictracker-1-dashboard.jpg",
      "/projects/magictracker-2-collection.jpg",
      "/projects/magictracker-3-addcard.jpg",
    ],
    liveUrl: "https://magic-tracker-one.vercel.app",
    repoUrl: "https://github.com/MiguelPCO/magic-tracker",
  },
  {
    slug: "cupping",
    title: "CUPPING",
    category: "App · Café",
    tags: ["Next.js", "Supabase", "shadcn/ui"],
    description:
      "App de cata de café de especialidad. Notas de cata, puntuaciones, historial y comparativas.",
    brief:
      "App para aficionados y profesionales del café de especialidad que quieren llevar un registro serio de sus catas. Permite puntuar atributos sensoriales, añadir notas y comparar lotes a lo largo del tiempo.",
    tools: ["Next.js", "TypeScript", "Supabase", "shadcn/ui", "Tailwind CSS"],
    images: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    slug: "hued",
    title: "Hued",
    category: "Mobile · Expo",
    tags: ["Expo", "React Native", "Tailwind"],
    description:
      "App móvil de paletas de color infográficas. Genera y exporta paletas visuales para diseñadores.",
    brief:
      "App móvil para diseñadores que necesitan generar y exportar paletas de color de forma rápida. Combina teoría del color con una interfaz táctil pensada para el móvil, exportando en formatos listos para usar en Figma o CSS.",
    tools: ["Expo", "React Native", "NativeWind", "TypeScript"],
    images: [],
    liveUrl: "",
    repoUrl: "",
  },
  {
    slug: "interior-ai",
    title: "Interior AI",
    category: "IA · Prototipo",
    tags: ["Next.js", "Replicate", "Supabase"],
    description:
      "Prototipo de rediseño de interiores con IA. Base técnica que evolucionó en Décoriai.",
    brief:
      "Prototipo inicial para explorar la integración de modelos de IA generativa en un contexto de interiorismo. Fue la base técnica y de producto sobre la que se construyó Décoriai, validando el flujo upload → generación → historial.",
    tools: ["Next.js", "TypeScript", "Replicate", "Supabase", "Tailwind CSS"],
    images: [],
    liveUrl: "",
    repoUrl: "",
  },
];
