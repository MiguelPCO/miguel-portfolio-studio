import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionTag from '../ui/SectionTag'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

export default function CareersSection() {
  const sectionRef = useRef(null)
  const contentRef = useScrollReveal({ y: 30 })
  const t = useTranslate()
  const availabilityTypes = strings.about.availability

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
                     text-[clamp(40px,8vw,120px)] leading-[1.1] text-ink opacity-10 dark:opacity-[0.06]
                     pointer-events-none select-none"
          aria-hidden="true"
        >
          {t(strings.about.availabilityGhostText)}
        </p>

        <div ref={contentRef} className="relative z-[1] pt-16 md:pt-24">
          <div className="mb-6">
            <SectionTag>{t(strings.about.availabilityTag)}</SectionTag>
          </div>
          <h2 className="font-display font-bold text-3xl md:text-5xl text-ink mb-12">
            {t(strings.about.availabilityHeading)}
          </h2>

          <div className="bg-card rounded-[24px] p-4 md:p-8 flex flex-col gap-4">
            {availabilityTypes.map((item, i) => (
              <div key={i} className="border-b border-ink/10 last:border-0 pb-6 last:pb-0 pt-2">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-3">
                  <span className="text-muted text-sm">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-muted hidden sm:inline">·</span>
                  <span className="text-lg md:text-xl font-semibold text-ink flex-1">{t(item.title)}</span>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-ink/10 text-ink/60 border border-ink/20">
                      {t(item.detail)}
                    </span>
                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-ink border border-accent/30">
                      {t(item.type)}
                    </span>
                  </div>
                </div>
                <p className="text-sm text-muted max-w-2xl">{t(item.description)}</p>
              </div>
            ))}

            <div className="pt-4">
              <Button href="/contact" variant="yellow-pill" ariaLabel={t(strings.about.availabilityButton)}>
                {t(strings.about.availabilityButton)}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
