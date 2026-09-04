import { Code2, Palette, Sparkles } from 'lucide-react'
import { services } from '../../data/services'
import Accordion from '../ui/Accordion'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'

const serviceIcons = {
  '01': Code2,
  '02': Palette,
  '03': Sparkles,
}

export default function ServicesAccordion() {
  const sectionRef = useScrollReveal()
  const t = useTranslate()

  // Preparar items del acordeón con toda la info
  const accordionItems = services.map((service) => {
    const Icon = serviceIcons[service.num]
    return {
      id: service.num,
      header: (
        <div className="flex items-center gap-4">
          <span className="text-muted text-sm font-medium">{service.num}</span>
          <span className="text-muted">•</span>
          <span className="text-xl font-semibold">{t(service.title)}</span>
        </div>
      ),
      content: (
        <div className="flex flex-col sm:flex-row justify-between gap-6">
          <div className="flex-1">
            <p className="text-sm text-white/60 mb-4 leading-relaxed">
              {t(service.description)}
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

          <div
            className="w-32 h-32 rounded-2xl shrink-0 hidden sm:flex items-center justify-center
                       bg-accent/10 border border-accent/20"
            data-cursor-dark
          >
            <Icon className="w-12 h-12 text-accent" strokeWidth={1.5} aria-hidden="true" />
          </div>
        </div>
      ),
    }
  })

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
