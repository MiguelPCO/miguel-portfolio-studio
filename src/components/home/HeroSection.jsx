import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

const HERO_NAME = 'MIGUEL'

export default function HeroSection() {
  const heroRef = useRef(null)
  const t = useTranslate()

  const heroStats = [
    { label: t(strings.home.statProjects), value: '10+' },
    { label: t(strings.home.statYears), value: '3+' },
  ]

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

    // Stats: fade-in escalonado
    gsap.from('.hero-stat', {
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

        {/* Columna derecha — Stats */}
        <div className="flex flex-col gap-4 lg:items-end">
          {heroStats.map((stat) => (
            <div
              key={stat.label}
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
