import { useParams, Link } from 'react-router'

const toAbsUrl = (url) => url && !/^https?:\/\//i.test(url) ? `https://${url}` : url
import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { smallWorks } from '../data/projects'
import { prefersReducedMotion } from '../components/animations/animationConfig'
import SectionTag from '../components/ui/SectionTag'
import { useScrollReveal } from '../components/animations/useScrollReveal'
import CTASection from '../components/home/CTASection'

function WorkHeader({ work }) {
  const sectionRef = useScrollReveal({ selector: '.wh-reveal', stagger: 0.1 })

  return (
    <section ref={sectionRef} className="px-6 pt-20 pb-16 md:pt-28 md:pb-20">
      <div className="max-w-[1200px] mx-auto">
        {/* Tag + category */}
        <div className="wh-reveal flex flex-wrap items-center gap-4 mb-8">
          <SectionTag>Proyecto</SectionTag>
          <span className="text-xs font-semibold uppercase tracking-wider text-muted bg-card px-3 py-1 rounded-full">
            {work.category}
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          {/* Título + botones */}
          <div className="wh-reveal flex flex-col gap-6">
            <h1 className="font-display font-bold text-4xl md:text-6xl leading-[1.1] text-ink">
              {work.title}
            </h1>
            {(work.liveUrl || work.repoUrl) && (
              <div className="flex flex-wrap gap-3">
                {work.liveUrl && (
                  <a
                    href={toAbsUrl(work.liveUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-ink text-surface
                               text-sm font-semibold hover:bg-ink/90 transition-colors duration-200"
                  >
                    Ver proyecto
                    <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6.5M11.5 2.5V7.5" />
                    </svg>
                  </a>
                )}
                {work.repoUrl && (
                  <a
                    href={toAbsUrl(work.repoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-ink/20
                               text-sm font-semibold text-ink hover:bg-ink/5 transition-colors duration-200"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Descripción + stack */}
          <div className="wh-reveal flex flex-col gap-6">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-2">
                Descripción
              </h3>
              <p className="text-ink leading-relaxed">{work.brief}</p>
            </div>
            {work.tools?.length > 0 && (
              <div>
                <h3 className="text-xs font-semibold uppercase tracking-widest text-muted mb-3">
                  Stack
                </h3>
                <div className="flex flex-wrap gap-2">
                  {work.tools.map((tool) => (
                    <span
                      key={tool}
                      className="px-3 py-1 rounded-full bg-card text-sm font-medium text-ink/70 border border-ink/10"
                    >
                      {tool}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkHero({ work }) {
  const containerRef = useRef(null)

  useGSAP(() => {
    const el = containerRef.current
    if (!el) return
    if (prefersReducedMotion()) {
      gsap.set(el, { clipPath: 'inset(0% 0% 0% 0%)' })
      return
    }
    gsap.fromTo(el,
      { clipPath: 'inset(100% 0% 0% 0%)' },
      { clipPath: 'inset(0% 0% 0% 0%)', duration: 1.2, ease: 'power4.out', delay: 0.2 }
    )
  }, { scope: containerRef })

  return (
    <section className="px-6 pb-16">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={containerRef}
          className="relative w-full h-[40vh] md:h-[60vh] rounded-[24px] overflow-hidden
                     bg-gradient-to-br from-gray-200 to-gray-400 dark:from-card dark:to-surface
                     flex items-center justify-center"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        >
          {work.image ? (
            <img
              src={work.image}
              alt={work.title}
              className="absolute inset-0 w-full h-full object-cover"
            />
          ) : (
            <span className="text-muted text-2xl font-display">{work.title}</span>
          )}
        </div>
      </div>
    </section>
  )
}

function WorkContent({ work }) {
  const sectionRef = useScrollReveal({ selector: '.wc-reveal', stagger: 0.12 })

  return (
    <section ref={sectionRef} className="px-6 pb-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Qué es */}
        <div className="wc-reveal bg-card rounded-[20px] p-8 flex flex-col gap-4">
          <SectionTag>Qué es</SectionTag>
          <p className="text-ink leading-relaxed">{work.brief}</p>
        </div>

        {/* Lo interesante */}
        <div className="wc-reveal bg-card rounded-[20px] p-8 flex flex-col gap-4">
          <SectionTag>Lo interesante</SectionTag>
          {work.insight ? (
            <p className="text-ink/70 leading-relaxed">{work.insight}</p>
          ) : (
            <>
              <p className="text-ink/60 leading-relaxed italic">
                Case study en desarrollo — próximamente.
              </p>
              <div className="mt-auto w-full h-24 rounded-[12px] bg-gradient-to-br from-ink/5 to-ink/10 dark:from-surface dark:to-card" />
            </>
          )}
        </div>
      </div>
    </section>
  )
}

function WorkGallery({ work }) {
  const galleryRef = useScrollReveal({ selector: '.wg-item', y: 30, stagger: 0.1 })

  if (!work.images?.length) {
    return (
      <section className="px-6 pb-16">
        <div className="max-w-[1200px] mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {[0, 1].map((i) => (
              <div
                key={i}
                className="h-[280px] rounded-[16px] bg-gradient-to-br from-gray-200 to-gray-300
                           dark:from-card dark:to-surface flex items-center justify-center"
              >
                <span className="text-muted text-sm font-display">{work.title}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  return (
    <section ref={galleryRef} className="px-6 pb-16">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-6">
        {work.images.map((img, i) => (
          <div key={img} className="wg-item rounded-[16px] overflow-hidden">
            <img src={img} alt={`${work.title} — ${i + 1}`} className="w-full h-auto object-cover" loading="lazy" />
          </div>
        ))}
      </div>
    </section>
  )
}

function MoreWorks({ currentSlug }) {
  const others = smallWorks.filter((w) => w.slug !== currentSlug).slice(0, 3)
  const sectionRef = useScrollReveal({ selector: '.mw-card', y: 20, stagger: 0.1 })

  return (
    <section ref={sectionRef} className="px-6 pb-10">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-6">
          <SectionTag>Más proyectos</SectionTag>
          <Link
            to="/projects"
            className="text-sm font-semibold text-muted hover:text-ink transition-colors duration-200"
          >
            Ver todos →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {others.map((work) => (
            <Link key={work.slug} to={`/work/${work.slug}`} className="mw-card block group">
              <div className="bg-card rounded-[20px] overflow-hidden flex flex-col h-full">
                <div className="w-full aspect-video bg-gradient-to-br from-ink/5 to-ink/10 dark:from-surface dark:to-card
                                flex items-center justify-center overflow-hidden">
                  <span className="font-display font-bold text-xl text-ink/20 group-hover:scale-110 transition-transform duration-500">
                    {work.title}
                  </span>
                </div>
                <div className="p-5 flex flex-col gap-2">
                  <h3 className="font-display font-bold text-base text-ink leading-tight">{work.title}</h3>
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted">{work.category}</p>
                  <div className="flex flex-wrap gap-1.5 mt-1">
                    {work.tags.map((tag) => (
                      <span key={tag} className="px-2.5 py-0.5 rounded-full bg-ink/5 text-xs font-medium text-ink/60">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

export default function SmallWorkDetailPage() {
  const { slug } = useParams()
  const work = smallWorks.find((w) => w.slug === slug)

  if (!work) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display font-bold text-5xl text-ink mb-4">404</h1>
        <p className="text-muted text-lg">
          Proyecto no encontrado. El proyecto que buscas no existe o ha sido eliminado.
        </p>
        <Link to="/projects" className="mt-6 text-sm font-semibold text-ink underline">
          Ver todos los proyectos
        </Link>
      </section>
    )
  }

  return (
    <>
      <WorkHeader work={work} />
      <WorkHero work={work} />
      <WorkContent work={work} />
      <WorkGallery work={work} />
      <MoreWorks currentSlug={work.slug} />
      <CTASection />
    </>
  )
}
