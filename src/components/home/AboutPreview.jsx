import { profile } from '../../data/team'
import SectionTag from '../ui/SectionTag'
import Button from '../ui/Button'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

export default function AboutPreview() {
  const sectionRef = useScrollReveal({ selector: '.about-preview-content', y: 30 })
  const t = useTranslate()

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="about-preview-content bg-card rounded-[24px] p-8 md:p-14 flex flex-col md:flex-row items-center gap-10">
          {/* Avatar */}
          <div className="shrink-0">
            {profile.avatar ? (
              <img
                src={profile.avatar}
                alt={profile.name}
                className="w-32 h-32 md:w-44 md:h-44 rounded-full object-cover"
              />
            ) : (
              <div className="w-32 h-32 md:w-44 md:h-44 rounded-full bg-accent flex items-center justify-center
                              text-accent-ink text-4xl md:text-5xl font-display font-bold">
                M
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex-1 text-center md:text-left">
            <div className="mb-4">
              <SectionTag>{t(strings.about.sectionTag)}</SectionTag>
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-ink mb-3">
              {profile.name}
            </h2>
            <p className="text-muted text-sm font-medium uppercase tracking-widest mb-5">
              {t(profile.role)}
            </p>
            <p className="text-ink/80 leading-relaxed mb-8 max-w-xl">
              {t(profile.bio)}
            </p>
            <Button href="/about" variant="black-pill" ariaLabel={t(strings.about.learnMoreAria)}>
              {t(strings.about.learnMoreCta)}
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
