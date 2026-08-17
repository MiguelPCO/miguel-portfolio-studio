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

    // Blob: rotación continua
    gsap.to('.hero-blob', {
      rotation: 360,
      duration: 60,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    })

    // Título: slide-up por caracteres
    const split = new SplitText('.hero-title', { type: 'chars' })
    gsap.from(split.chars, {
      opacity: 0,
      yPercent: 120,
      duration: 0.8,
      ease: 'power4.out',
      stagger: 0.025,
      delay: 0.2,
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
      delay: 1.0,
      ease: 'back.out(1.5)',
    })

    return () => split.revert()
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
          <h1 className="hero-title font-display font-black text-[clamp(64px,10vw,140px)] leading-[0.9] text-ink mb-8">
            MIGUEL
          </h1>

          {/* Pill de consulta */}
          <div className="hero-consultation flex items-center gap-4 bg-white dark:bg-card rounded-full px-4 py-3 shadow-sm w-fit">
            {/* Avatar placeholder */}
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center text-ink text-sm font-bold shrink-0">
              M
            </div>
            <div className="mr-2">
              <p className="text-sm font-semibold text-ink">¿Tienes un proyecto en mente?</p>
              <p className="text-xs text-muted">Hablemos</p>
            </div>
            <Button href="/contact" variant="yellow-pill" ariaLabel="Contactar para consulta">
              Contactar
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
