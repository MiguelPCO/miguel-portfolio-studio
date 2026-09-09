import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'
import { featuredProjects } from '../../data/projects'

const HERO_NAME = 'MIGUEL'

export default function HeroSection() {
  const heroRef = useRef(null)
  const t = useTranslate()
  const [imgError, setImgError] = useState(false)

  const [heroProject] = useState(
    () => featuredProjects[Math.floor(Math.random() * featuredProjects.length)]
  )
  const showImage = heroProject.image && !imgError

  useGSAP(() => {
    if (prefersReducedMotion()) return

    // Blob: rotación continua
    gsap.to('.hero-blob', {
      rotation: 360,
      duration: 60,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    })

    // Saludo: fade-in sutil, primero en aparecer
    gsap.from('.hero-greeting', {
      opacity: 0,
      y: 10,
      duration: 0.5,
      ease: 'power2.out',
    })

    // Título: slide-up por letra (spans ya en el JSX, sin SplitText)
    gsap.from('.hero-letter', {
      opacity: 0,
      yPercent: 120,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.025,
      delay: 0.15,
    })

    // Intro: fade-in tras el nombre
    gsap.from('.hero-intro', {
      opacity: 0,
      y: 16,
      duration: 0.6,
      delay: 0.6,
      ease: 'power3.out',
    })

    // Proyecto destacado + stats: fade-in escalonado
    gsap.from('.hero-right-item', {
      opacity: 0,
      x: 20,
      duration: 0.5,
      stagger: 0.1,
      delay: 0.8,
      ease: 'power2.out',
    })

    // Pill de consulta: pop
    gsap.from('.hero-consultation', {
      opacity: 0,
      scale: 0.8,
      duration: 0.5,
      delay: 1.05,
      ease: 'back.out(1.5)',
    })
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative min-h-[90vh] flex items-center px-6 overflow-hidden">
      {/* Blob decorativo de fondo */}
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

      {/* Contenido grid 2 columnas */}
      <div className="relative z-10 max-w-[1200px] mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Columna izquierda */}
        <div>
          <p className="hero-greeting text-lg md:text-xl text-muted mb-1">
            {t(strings.home.greeting)}
          </p>

          <h1
            className="hero-title font-display font-black text-[clamp(64px,10vw,140px)] leading-[0.9] text-ink mb-6"
            aria-label={HERO_NAME}
          >
            {HERO_NAME.split('').map((ch, i) => (
              <span key={i} className="hero-letter inline-block" aria-hidden="true">
                {ch}
              </span>
            ))}
          </h1>

          <p className="hero-intro text-xl md:text-2xl font-medium text-ink/80 leading-snug max-w-md mb-8">
            {t(strings.home.intro)}
          </p>

          {/* Pill de consulta */}
          <div className="hero-consultation flex items-center gap-4 bg-white dark:bg-card rounded-full px-4 py-3 shadow-sm w-fit">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-accent-ink text-sm font-bold shrink-0">
              M
            </div>
            <div className="mr-2">
              <p className="text-sm font-semibold text-ink">{t(strings.home.consultationQuestion)}</p>
              <p className="text-xs text-muted">{t(strings.home.consultationCaption)}</p>
            </div>
            <Button href="/contact" variant="yellow-pill" ariaLabel={t(strings.home.consultationAria)}>
              {t(strings.home.consultationCta)}
            </Button>
          </div>
        </div>

        {/* Columna derecha — Proyecto destacado */}
        <div className="flex flex-col gap-3 lg:items-end">
          <Link
            to={`/projects/${heroProject.slug}`}
            className="hero-right-item group block w-full lg:max-w-xs rounded-[24px] overflow-hidden bg-card
                       transition-[transform,box-shadow] duration-300 hover:-translate-y-1 hover:shadow-xl"
          >
            <div
              className="relative w-full h-44 md:h-52 overflow-hidden
                         bg-gradient-to-br from-gray-200 to-gray-300
                         dark:from-gray-800 dark:to-gray-700
                         flex items-center justify-center"
            >
              {showImage && heroProject.imageFit === 'contain' && (
                <img
                  src={heroProject.image}
                  alt=""
                  aria-hidden="true"
                  loading="lazy"
                  className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
                />
              )}
              {showImage && (
                <img
                  src={heroProject.image}
                  alt={heroProject.title}
                  loading="lazy"
                  className={`absolute inset-0 w-full h-full transition-transform duration-500 group-hover:scale-105 ${heroProject.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                  onError={() => setImgError(true)}
                />
              )}
              {!showImage && (
                <span className="relative text-muted text-sm font-display z-10">{heroProject.title}</span>
              )}
            </div>

            <div className="p-5">
              <p className="text-xs text-muted mb-1">{t(heroProject.category)}</p>
              <h3 className="font-display font-bold text-lg text-ink mb-2">{heroProject.title}</h3>
              <p className="text-sm text-muted mb-3">{t(heroProject.heroSummary)}</p>
              <span className="text-sm font-semibold text-ink inline-flex items-center gap-1">
                {t(strings.projectDetail.viewProject)}
                <span className="transition-transform group-hover:translate-x-1" aria-hidden="true">→</span>
              </span>
            </div>
          </Link>
        </div>
      </div>
    </section>
  )
}
