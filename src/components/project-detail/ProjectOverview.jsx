import SectionTag from '../ui/SectionTag'
import Card from '../ui/Card'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

/**
 * Sección de resumen del proyecto
 * 2 columnas: Project Overview + Our Approach, cada una con Card light
 */
export default function ProjectOverview({ project }) {
  const sectionRef = useScrollReveal({ selector: '.overview-card', stagger: 0.15 })
  const t = useTranslate()

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card: Project Overview */}
        <Card variant="light" radius="lg" className="overview-card p-8 md:p-10 flex flex-col gap-6">
          <SectionTag>{t(strings.projectDetail.overviewTag)}</SectionTag>
          <p className="text-ink leading-relaxed">
            {t(project.brief)}
          </p>
          {/* Placeholder 3D decorativo */}
          <div className="w-full h-40 rounded-[16px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200
                          dark:from-card dark:via-surface dark:to-card
                          flex items-center justify-center">
            <span className="text-muted text-sm">{t(strings.projectDetail.threeDObjectPlaceholder)}</span>
          </div>
        </Card>

        {/* Card: Our Approach */}
        <Card variant="light" radius="lg" className="overview-card p-8 md:p-10 flex flex-col gap-6">
          <SectionTag>{t(strings.projectDetail.approachTag)}</SectionTag>
          <p className="text-ink leading-relaxed">
            {t(strings.projectDetail.approachBody)}
          </p>
          {/* Placeholder 3D decorativo */}
          <div className="w-full h-40 rounded-[16px] bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-300
                          dark:from-surface dark:via-card dark:to-surface
                          flex items-center justify-center">
            <span className="text-muted text-sm">{t(strings.projectDetail.threeDObjectPlaceholder)}</span>
          </div>
        </Card>
      </div>
    </section>
  )
}
