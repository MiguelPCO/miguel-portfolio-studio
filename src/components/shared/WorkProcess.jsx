import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionTag from '../ui/SectionTag'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

export default function WorkProcess() {
  const sectionRef = useRef(null)
  const t = useTranslate()
  const steps = strings.shared.processSteps

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.from('.process-card', {
      opacity: 0,
      x: -30,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-card bg-card rounded-[24px] p-8 relative overflow-hidden"
            >
              <div className="mb-6">
                <SectionTag>{t(strings.shared.stepLabel)} {String(i + 1).padStart(2, '0')} · {t(strings.shared.processLabel)}</SectionTag>
              </div>

              <h3 className="font-display font-bold text-2xl text-ink mb-2">
                {t(step.title)}
              </h3>
              <p className="text-sm text-accent font-semibold mb-4">{t(step.duration)}</p>
              <p className="text-sm text-muted leading-relaxed">{t(step.description)}</p>

              <div className="absolute -bottom-6 -right-6 w-28 h-28
                              bg-gradient-to-br from-gray-200 to-gray-300
                              rounded-full opacity-20 blur-sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
