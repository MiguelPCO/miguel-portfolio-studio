import { useState, useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { testimonials } from '../../data/team'
import SectionTag from '../ui/SectionTag'
import { prefersReducedMotion } from '../animations/animationConfig'

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)
  const slideRef = useRef(null)
  const sectionRef = useRef(null)

  const { contextSafe } = useGSAP(() => {}, { scope: sectionRef })

  const goToSlide = contextSafe((newIndex) => {
    if (newIndex === active) return

    if (prefersReducedMotion()) {
      setActive(newIndex)
      return
    }

    // Fade out
    gsap.to(slideRef.current, {
      opacity: 0,
      x: -20,
      duration: 0.3,
      ease: 'power2.in',
      onComplete: () => {
        setActive(newIndex)
        // Fade in
        gsap.fromTo(slideRef.current,
          { opacity: 0, x: 20 },
          { opacity: 1, x: 0, duration: 0.4, ease: 'power2.out' }
        )
      },
    })
  })

  const nextSlide = () => {
    goToSlide((active + 1) % testimonials.length)
  }

  const prevSlide = () => {
    goToSlide((active - 1 + testimonials.length) % testimonials.length)
  }

  const current = testimonials[active]

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <SectionTag>Testimonials</SectionTag>
        </div>

        {/* Card oscura central */}
        <div className="bg-ink dark:bg-[#0D0D0D] rounded-[24px] p-8 md:p-14 text-white max-w-3xl mx-auto">
          {/* Badge Clutch */}
          <div className="flex items-center gap-2 mb-6">
            <span className="text-xs font-semibold uppercase tracking-wider text-gray-400">
              {current.source}
            </span>
            <div className="flex gap-0.5">
              {Array.from({ length: current.stars }).map((_, i) => (
                <span key={i} className="text-accent text-sm">★</span>
              ))}
            </div>
          </div>

          {/* Quote */}
          <div ref={slideRef}>
            <blockquote className="text-lg md:text-2xl font-display leading-relaxed mb-8">
              "{current.quote}"
            </blockquote>
            <div>
              <p className="font-semibold">{current.author}</p>
              <p className="text-sm text-gray-400">{current.role}</p>
            </div>
          </div>

          {/* Controles de navegación */}
          <div className="flex items-center justify-between mt-10">
            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => goToSlide(i)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    i === active ? 'bg-accent' : 'bg-gray-600'
                  }`}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>

            {/* Flechas */}
            <div className="flex gap-2">
              <button
                onClick={prevSlide}
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center
                           justify-center text-gray-400 hover:border-accent hover:text-accent transition-colors"
                aria-label="Testimonio anterior"
              >
                ←
              </button>
              <button
                onClick={nextSlide}
                className="w-10 h-10 rounded-full border border-gray-600 flex items-center
                           justify-center text-gray-400 hover:border-accent hover:text-accent transition-colors"
                aria-label="Siguiente testimonio"
              >
                →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
