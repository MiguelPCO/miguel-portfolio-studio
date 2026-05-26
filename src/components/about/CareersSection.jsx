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
