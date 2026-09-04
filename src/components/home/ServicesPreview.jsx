import { Code2, Palette, Sparkles } from 'lucide-react'
import { services } from '../../data/services'
import SectionTag from '../ui/SectionTag'
import Button from '../ui/Button'
import Accordion from '../ui/Accordion'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'

const serviceIcons = {
  '01': Code2,
  '02': Palette,
  '03': Sparkles,
}

export default function ServicesPreview() {
  const sectionRef = useScrollReveal()
  const t = useTranslate()

  // Preparar items para el Accordion
  const accordionItems = services.map((service) => {
    const Icon = serviceIcons[service.num]
    return {
      id: service.num,
      header: (
        <div className="flex items-center gap-4">
          <span className="text-muted text-sm">{service.num}</span>
          <span className="text-muted">•</span>
          <span className="text-xl font-semibold">{t(service.title)}</span>
        </div>
      ),
      content: (
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm text-white/60 mb-4">{t(service.description)}</p>
            <div className="flex flex-wrap gap-2">
              {service.tags.map((tag) => (
                <span
                  key={tag}
                  className="px-3 py-1 rounded-full text-xs font-medium bg-white/10 text-white/70"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          <div
            className="w-24 h-24 rounded-2xl shrink-0 hidden sm:flex items-center justify-center
                       bg-accent/10 border border-accent/20"
            data-cursor-dark
          >
            <Icon className="w-10 h-10 text-accent" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
      ),
    }
  })

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <SectionTag>Servicios</SectionTag>
          <Button href="/services" variant="outline" ariaLabel="Ver todos los servicios">
            Ver todos
          </Button>
        </div>

        <div className="bg-card rounded-[24px] p-4 md:p-8">
          <Accordion items={accordionItems} defaultOpen={0} />
        </div>
      </div>
    </section>
  )
}
