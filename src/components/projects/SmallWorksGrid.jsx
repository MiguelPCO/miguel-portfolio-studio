import { useRef } from 'react'
import { useScrollReveal } from '../animations/useScrollReveal'
import SectionTag from '../ui/SectionTag'

function SmallWorkCard({ work }) {
  const content = (
    <div className="small-work-card bg-card rounded-[20px] overflow-hidden flex flex-col group">
      {/* Image placeholder */}
      <div
        className="w-full aspect-video bg-gradient-to-br from-ink/5 to-ink/15
                    flex items-center justify-center overflow-hidden"
      >
        <span className="font-display font-bold text-2xl text-ink/20 group-hover:scale-110 transition-transform duration-500">
          {work.title}
        </span>
      </div>

      {/* Content */}
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-display font-bold text-lg text-ink leading-tight">
            {work.title}
          </h3>
          {work.liveUrl && (
            <a
              href={work.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="shrink-0 w-8 h-8 rounded-full bg-ink/10 hover:bg-accent
                         flex items-center justify-center transition-colors duration-200"
              aria-label={`Ver ${work.title} en vivo`}
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-ink">
                <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6.5M11.5 2.5V7.5" />
              </svg>
            </a>
          )}
        </div>

        <p className="text-xs font-semibold uppercase tracking-widest text-muted">
          {work.category}
        </p>

        {work.description && (
          <p className="text-sm text-ink/60 leading-relaxed line-clamp-2">
            {work.description}
          </p>
        )}

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-auto pt-2">
          {work.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-ink/5 text-xs font-medium text-ink/60"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  )

  return content
}

export default function SmallWorksGrid({ works }) {
  const sectionRef = useScrollReveal({ selector: '.small-work-card', y: 30, stagger: 0.1 })

  if (!works || works.length === 0) return null

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        {/* Section header */}
        <div className="mb-10 flex flex-col gap-3">
          <SectionTag>Otros trabajos</SectionTag>
          <h2 className="font-display font-bold text-3xl md:text-4xl text-ink">
            Proyectos rápidos
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {works.map((work) => (
            <SmallWorkCard key={work.slug} work={work} />
          ))}
        </div>
      </div>
    </section>
  )
}
