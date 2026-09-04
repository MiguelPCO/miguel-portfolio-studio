import { useState } from 'react'
import { featuredProjects, smallWorks } from '../../data/projects'
import ProjectCard from './ProjectCard'
import SmallWorksGrid from './SmallWorksGrid'
import { cn } from '../../lib/utils'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

export default function ProjectsList() {
  const [activeFilter, setActiveFilter] = useState('Todos')
  const t = useTranslate()

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
            aria-label={t(strings.projects.filterAria)}
          >
            {strings.projects.filters.map((tag) => (
              <button
                key={tag.value}
                onClick={() => setActiveFilter(tag.value)}
                aria-pressed={activeFilter === tag.value}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all duration-200',
                  activeFilter === tag.value
                    ? 'bg-ink text-surface'
                    : 'bg-card text-ink/70 hover:bg-ink/10'
                )}
              >
                {t(tag.label)}
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
              {t(strings.projects.emptyFiltered)}
            </p>
          )}
        </div>
      </section>

      <SmallWorksGrid works={smallWorks} />
    </>
  )
}
