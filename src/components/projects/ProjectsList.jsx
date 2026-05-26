import { useState } from 'react'
import { featuredProjects, smallWorks } from '../../data/projects'
import ProjectCard from './ProjectCard'
import SmallWorksGrid from './SmallWorksGrid'
import { cn } from '../../lib/utils'

const FILTER_TAGS = ['Todos', 'App', 'Web', 'IA', 'Landing']

export default function ProjectsList() {
  const [activeFilter, setActiveFilter] = useState('Todos')

  const filtered = activeFilter === 'Todos'
    ? featuredProjects
    : featuredProjects.filter(p => p.tags.includes(activeFilter))

  return (
    <>
      <section className="px-6 pb-20 md:pb-30">
        {/* Filter pills */}
        <div className="max-w-[1200px] mx-auto mb-10">
          <div
            className="flex flex-wrap gap-3"
            role="group"
            aria-label="Filtrar proyectos por categoría"
          >
            {FILTER_TAGS.map((tag) => (
              <button
                key={tag}
                onClick={() => setActiveFilter(tag)}
                aria-pressed={activeFilter === tag}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeFilter === tag
                    ? 'bg-ink text-surface'
                    : 'bg-card text-ink/70 hover:bg-ink/10'
                )}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Featured project cards */}
        <div className="max-w-[1200px] mx-auto flex flex-col gap-10">
          {filtered.map((project) => (
            <ProjectCard key={project.slug} project={project} />
          ))}

          {filtered.length === 0 && (
            <p className="text-center text-muted py-20 text-lg">
              No hay proyectos en esta categoría.
            </p>
          )}
        </div>
      </section>

      <SmallWorksGrid works={smallWorks} />
    </>
  )
}
