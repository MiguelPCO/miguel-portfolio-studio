import { useState } from 'react'
import { Link } from 'react-router'
import { featuredProjects } from '../../data/projects'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

/**
 * Navegación al siguiente proyecto
 * Muestra preview de imagen, título y enlace CTA
 */
export default function NextProject({ nextSlug }) {
  const sectionRef = useScrollReveal({ y: 30 })
  const t = useTranslate()
  const [imgError, setImgError] = useState(false)

  // Buscar el proyecto siguiente en el array
  const nextProject = featuredProjects.find((p) => p.slug === nextSlug)
  if (!nextProject) return null

  const showImage = nextProject.image && !imgError

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-card rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          {/* Preview de imagen */}
          <div className="relative w-full md:w-64 h-44 rounded-[16px] overflow-hidden shrink-0
                          bg-gradient-to-br from-gray-200 to-gray-300
                          dark:from-gray-800 dark:to-gray-700
                          flex items-center justify-center">
            {showImage && nextProject.imageFit === 'contain' && (
              <img
                src={nextProject.image}
                alt=""
                aria-hidden="true"
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover blur-2xl scale-110 opacity-40"
              />
            )}
            {showImage && (
              <img
                src={nextProject.image}
                alt={nextProject.title}
                loading="lazy"
                className={`absolute inset-0 w-full h-full ${nextProject.imageFit === 'contain' ? 'object-contain' : 'object-cover'}`}
                onError={() => setImgError(true)}
              />
            )}
            {!showImage && (
              <span className="relative text-muted text-sm font-display z-10">{nextProject.title}</span>
            )}
          </div>

          {/* Info y CTA */}
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                {t(strings.projectDetail.nextProjectLabel)}
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-ink">
                {nextProject.title}
              </h3>
            </div>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-3 bg-ink text-surface
                         px-6 py-3 rounded-full font-semibold text-sm
                         hover:bg-ink/90 transition-colors shrink-0"
              aria-label={`${t(strings.projectDetail.viewProjectAria)} ${nextProject.title}`}
            >
              {t(strings.projectDetail.nextProjectLabel)}
              <span className="w-7 h-7 bg-accent rounded-full flex items-center
                               justify-center text-accent-ink text-xs">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
