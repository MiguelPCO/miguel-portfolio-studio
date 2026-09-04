import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

export default function StorySection() {
  const sectionRef = useRef(null)
  const contentRef = useScrollReveal({ y: 30 })
  const t = useTranslate()

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
                     text-[clamp(48px,10vw,140px)] leading-[1.1] text-ink opacity-10 dark:opacity-[0.06]
                     pointer-events-none select-none"
          aria-hidden="true"
        >
          {t(strings.about.storyGhostText)}
        </p>

        <div ref={contentRef} className="relative z-[1] max-w-2xl pt-16 md:pt-24">
          <p className="text-lg md:text-xl leading-relaxed text-ink">
            {t(strings.about.storyP1Start)}<strong>{t(strings.about.storyP1Bold1)}</strong>{t(strings.about.storyP1Mid)}<strong>{t(strings.about.storyP1Bold2)}</strong>{t(strings.about.storyP1End)}
          </p>
          <p className="text-lg md:text-xl leading-relaxed text-muted mt-6">
            {t(strings.about.storyP2Start)}<strong className="text-ink">{t(strings.about.storyP2Bold)}</strong>{t(strings.about.storyP2End)}
          </p>
        </div>
      </div>
    </section>
  )
}
