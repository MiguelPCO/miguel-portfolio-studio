import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useScrollReveal } from '../animations/useScrollReveal'

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
