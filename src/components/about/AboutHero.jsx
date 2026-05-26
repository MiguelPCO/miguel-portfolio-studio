import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import SectionTag from '../ui/SectionTag'
import { prefersReducedMotion } from '../animations/animationConfig'

/**
 * Hero de la página About — imagen de equipo a pantalla completa con texto superpuesto
 * Animación de slide-up al cargar (no scroll-triggered)
 */
export default function AboutHero() {
  const heroRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    // Título: slide-up por líneas al cargar
    const split = new SplitText('.about-hero-title', { type: 'lines' })

    gsap.from(split.lines, {
      opacity: 0,
      yPercent: 120,
      duration: 0.9,
      ease: 'power4.out',
      stagger: 0.12,
      delay: 0.2,
    })

    // Fade-in del tag
    gsap.from('.about-hero-tag', {
      opacity: 0,
      y: 20,
      duration: 0.6,
      ease: 'power2.out',
      delay: 0.1,
    })

    return () => split.revert()
  }, { scope: heroRef })

  return (
    <section ref={heroRef} className="relative px-6 pt-10 pb-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Imagen de equipo — aspect-ratio 21:9 */}
        <div className="relative rounded-[24px] overflow-hidden" style={{ aspectRatio: '21/9' }}>
          {/* [PLACEHOLDER: foto de equipo a pantalla completa] */}
          <div className="absolute inset-0 bg-card" />

          {/* Overlay oscuro para legibilidad */}
          <div className="absolute inset-0 bg-ink/20" />

          {/* Tag circular centrado */}
          <div className="about-hero-tag absolute top-6 left-1/2 -translate-x-1/2 z-10">
            <div className="bg-white/90 dark:bg-card/90 backdrop-blur-sm rounded-full px-5 py-2">
              <SectionTag>Sobre mí</SectionTag>
            </div>
          </div>
        </div>

        {/* Título debajo de la imagen */}
        <div className="mt-12 text-center">
          <h1 className="about-hero-title font-display font-black text-[clamp(36px,6vw,80px)] leading-[1.05]">
            <span className="text-ink">MIGUEL DE LA PEÑA,</span>
            <br />
            <span className="text-muted">DISEÑADOR & DESARROLLADOR.</span>
          </h1>
        </div>
      </div>
    </section>
  )
}
