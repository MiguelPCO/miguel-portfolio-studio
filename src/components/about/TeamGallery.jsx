import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { team } from '../../data/team'
import SectionTag from '../ui/SectionTag'
import { prefersReducedMotion, EASE_BACK } from '../animations/animationConfig'
import { useScrollReveal } from '../animations/useScrollReveal'

/**
 * Galería horizontal del equipo — 6 tarjetas con foto, nombre y rol
 * Hover: escala 1.03 + sombra creciente (con prefersReducedMotion)
 * Mobile: scroll horizontal con overflow-x
 */
export default function TeamGallery() {
  const sectionRef = useScrollReveal({ selector: '.team-gallery-card', stagger: 0.08 })
  const cardsRef = useRef([])

  const { contextSafe } = useGSAP(() => {}, { scope: sectionRef })

  // Animaciones de hover — escala + sombra
  const handleMouseEnter = contextSafe((index) => {
    if (prefersReducedMotion()) return
    const card = cardsRef.current[index]
    if (!card) return
    gsap.to(card, {
      scale: 1.03,
      boxShadow: '0 20px 40px rgba(0,0,0,0.12)',
      duration: 0.3,
      ease: EASE_BACK,
    })
  })

  const handleMouseLeave = contextSafe((index) => {
    if (prefersReducedMotion()) return
    const card = cardsRef.current[index]
    if (!card) return
    gsap.to(card, {
      scale: 1,
      boxShadow: '0 2px 8px rgba(0,0,0,0.04)',
      duration: 0.25,
      ease: 'power2.out',
    })
  })

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-12">
          <SectionTag>Our Team</SectionTag>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-ink mt-4">
            The People Behind the Magic
          </h2>
        </div>

        {/* Fila horizontal — scroll en mobile */}
        <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 snap-x snap-mandatory
                        md:overflow-x-visible md:mx-0 md:px-0 md:grid md:grid-cols-6">
          {team.map((member, index) => (
            <div
              key={member.name}
              ref={(el) => { cardsRef.current[index] = el }}
              onMouseEnter={() => handleMouseEnter(index)}
              onMouseLeave={() => handleMouseLeave(index)}
              className="team-gallery-card flex-shrink-0 w-[200px] md:w-auto snap-start
                         rounded-[16px] overflow-hidden bg-card cursor-pointer"
              style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
            >
              {/* Avatar placeholder */}
              <div className="aspect-[3/4] bg-gradient-to-br from-gray-200 to-gray-300
                              flex items-center justify-center">
                <span className="font-display font-bold text-4xl text-muted/40">
                  {member.name.split(' ').map(n => n[0]).join('')}
                </span>
              </div>

              {/* Info */}
              <div className="p-4">
                <p className="font-semibold text-sm text-ink">{member.name}</p>
                <p className="text-xs text-muted mt-1">{member.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
