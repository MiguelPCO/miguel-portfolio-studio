import { services } from '../../data/services'
import Accordion from '../ui/Accordion'
import { useScrollReveal } from '../animations/useScrollReveal'

export default function ServicesAccordion() {
  const sectionRef = useScrollReveal()

  // Preparar items del acordeón con toda la info
  const accordionItems = services.map((service) => ({
    id: service.num,
    header: (
      <div className="flex items-center gap-4">
        <span className="text-muted text-sm font-medium">{service.num}</span>
        <span className="text-muted">•</span>
        <span className="text-xl font-semibold">{service.title}</span>
      </div>
    ),
    content: (
      <div className="flex flex-col sm:flex-row justify-between gap-6">
        <div className="flex-1">
          <p className="text-sm text-white/60 mb-4 leading-relaxed">
            {service.description}
          </p>
          <div className="flex flex-wrap gap-2">
            {service.tags.map((tag) => (
              <span
                key={tag}
                className="px-4 py-1.5 rounded-full text-xs font-medium
                           bg-white/10 text-white/70 border border-white/15"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* [PLACEHOLDER 3D: objeto decorativo del servicio] */}
        <div className="w-32 h-32 bg-gradient-to-br from-gray-500 to-gray-700
                        rounded-2xl shrink-0 opacity-40 hidden sm:block" />
      </div>
    ),
  }))

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-card rounded-[24px] p-4 md:p-8">
          <Accordion items={accordionItems} defaultOpen={0} />
        </div>
      </div>
    </section>
  )
}
