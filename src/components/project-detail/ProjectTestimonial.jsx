import SectionTag from '../ui/SectionTag'
import { useScrollReveal } from '../animations/useScrollReveal'

/**
 * Testimonio del cliente en tarjeta centrada
 * Incluye cita, avatar placeholder, nombre, rol, empresa y estrellas
 */
export default function ProjectTestimonial({ testimonial }) {
  const sectionRef = useScrollReveal({ y: 30 })

  if (!testimonial) return null

  return (
    <section className="px-6 pb-20 md:pb-30">
      <div ref={sectionRef} className="max-w-3xl mx-auto bg-card rounded-[24px] p-8 md:p-14 text-center">
        {/* Tag */}
        <div className="flex justify-center mb-8">
          <SectionTag>What The Client Says</SectionTag>
        </div>

        {/* Cita */}
        <blockquote className="font-display text-xl md:text-2xl leading-relaxed text-ink italic mb-8">
          &ldquo;{testimonial.quote}&rdquo;
        </blockquote>

        {/* Estrellas */}
        <div className="flex justify-center gap-1 mb-6">
          {Array.from({ length: testimonial.stars }).map((_, i) => (
            <span key={i} className="text-accent text-lg">&#9733;</span>
          ))}
        </div>

        {/* Autor */}
        <div className="flex flex-col items-center gap-3">
          {/* Avatar placeholder */}
          <div className="w-12 h-12 rounded-full bg-gray-300 flex items-center justify-center
                          text-muted text-sm font-bold shrink-0">
            {testimonial.author.charAt(0)}
          </div>
          <div>
            <p className="font-semibold text-ink">{testimonial.author}</p>
            <p className="text-sm text-muted">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
