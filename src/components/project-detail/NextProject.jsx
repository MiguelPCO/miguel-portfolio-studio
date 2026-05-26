import { Link } from 'react-router'
import { featuredProjects } from '../../data/projects'
import { useScrollReveal } from '../animations/useScrollReveal'

/**
 * Navegación al siguiente proyecto
 * Muestra preview de imagen, título y enlace CTA
 */
export default function NextProject({ nextSlug }) {
  const sectionRef = useScrollReveal({ y: 30 })

  // Buscar el proyecto siguiente en el array
  const nextProject = featuredProjects.find((p) => p.slug === nextSlug)
  if (!nextProject) return null

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-card rounded-[24px] p-8 md:p-12 flex flex-col md:flex-row items-center gap-8">
          {/* Preview de imagen placeholder */}
          <div className="w-full md:w-64 h-44 rounded-[16px] overflow-hidden shrink-0
                          bg-gradient-to-br from-gray-200 to-gray-300
                          flex items-center justify-center">
            <span className="text-muted text-sm font-display">{nextProject.title}</span>
          </div>

          {/* Info y CTA */}
          <div className="flex-1 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 w-full">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                Siguiente Proyecto
              </p>
              <h3 className="font-display font-bold text-2xl md:text-3xl text-ink">
                {nextProject.title}
              </h3>
            </div>

            <Link
              to={`/projects/${nextProject.slug}`}
              className="inline-flex items-center gap-3 bg-ink dark:bg-gray-900 text-white
                         px-6 py-3 rounded-full font-semibold text-sm
                         hover:bg-gray-800 transition-colors shrink-0"
              aria-label={`Ver proyecto ${nextProject.title}`}
            >
              Siguiente Proyecto
              <span className="w-7 h-7 bg-accent rounded-full flex items-center
                               justify-center text-ink text-xs">
                &rarr;
              </span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
