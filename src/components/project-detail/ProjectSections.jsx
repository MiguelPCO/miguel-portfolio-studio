import { useState } from 'react'
import SectionTag from '../ui/SectionTag'
import Lightbox from '../ui/Lightbox'
import { useScrollReveal } from '../animations/useScrollReveal'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

function SectionCard({ field, value, t, className = '' }) {
  const label = t(strings.projectDetail.sectionLabels[field]) || field
  const isArray = Array.isArray(value)

  return (
    <div className={`ps-card bg-card rounded-[20px] p-8 md:p-10 flex flex-col gap-5 ${className}`}>
      <SectionTag>{label}</SectionTag>
      {isArray ? (
        <ul className="flex flex-col gap-2">
          {value.map((item, i) => (
            <li key={i} className="flex items-start gap-3 text-ink leading-relaxed">
              <span className="text-accent mt-1 shrink-0">&#10003;</span>
              <span>{t(item)}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-ink leading-relaxed">{t(value)}</p>
      )}
    </div>
  )
}

// Mandatory: context + problem side by side
// Optional fields rendered in pairs, then solo if odd
const OPTIONAL_FIELDS = [
  'research',
  'constraints',
  'designGoal',
  'designExploration',
  'features',
  'interactionDesign',
  'onboarding',
]

const PLACEHOLDER_GRADIENTS = [
  'from-gray-200 via-gray-300 to-gray-200 dark:from-card dark:via-surface dark:to-card',
  'from-gray-300 to-gray-400 dark:from-surface dark:to-card',
  'from-gray-200 to-gray-300 dark:from-card dark:to-surface',
]

function SectionImage({ src, alt, index = 0, onOpen, fit = 'cover', t }) {
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]
  const resolvedAlt = t(alt)

  if (src) {
    return (
      <div
        className={`w-full h-[320px] md:h-[440px] rounded-[20px] overflow-hidden relative group cursor-pointer ${fit === 'contain' ? 'bg-card' : ''}`}
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`${t(strings.projectDetail.enlargeImage)}: ${resolvedAlt}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      >
        <img src={src} alt={resolvedAlt} className={`w-full h-full ${fit === 'contain' ? 'object-contain' : 'object-cover'}`} loading="lazy" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20
                        transition-colors duration-300 flex items-center justify-center">
          <span
            className="w-11 h-11 rounded-full bg-white/90 opacity-0 group-hover:opacity-100
                       scale-90 group-hover:scale-100 transition-[opacity,transform] duration-300
                       flex items-center justify-center text-lg"
            style={{ color: '#0D0D0D' }}
          >
            &#128269;
          </span>
        </div>
      </div>
    )
  }

  return (
    <div className={`w-full h-[320px] md:h-[440px] rounded-[20px] bg-gradient-to-br ${gradient}
                     flex items-center justify-center`}>
      <span className="text-muted text-sm font-display">{resolvedAlt}</span>
    </div>
  )
}

export default function ProjectSections({ project }) {
  const sectionRef = useScrollReveal({ selector: '.ps-card', y: 30, stagger: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const t = useTranslate()

  const presentOptional = OPTIONAL_FIELDS.filter((f) => project[f])
  const hasSolution   = !!project.solution
  const hasTakeaways  = !!project.takeaways
  const hasReflection = !!project.reflection

  // sectionImages[]: optional array de { src, alt } — uno por visual break
  const imgs = project.sectionImages || []
  const lightboxImages = imgs.reduce((acc, img) => {
    if (img?.src) acc.push({ src: img.src, alt: t(img.alt) || project.title })
    return acc
  }, [])

  // Mapea el índice dentro de imgs (0/1/2) al índice dentro de lightboxImages (solo los que tienen src)
  const lightboxIndexFor = (i) =>
    imgs.slice(0, i).filter((img) => img?.src).length

  return (
    <section ref={sectionRef} className="px-6 pb-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-6">

        {/* Context + Problem */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {project.context && <SectionCard field="context" value={project.context} t={t} />}
          {project.problem && <SectionCard field="problem" value={project.problem} t={t} />}
        </div>

        {/* Visual break 1 */}
        <SectionImage
          src={imgs[0]?.src}
          alt={imgs[0]?.alt || project.title}
          index={0}
          fit={imgs[0]?.fit}
          onOpen={() => setLightboxIndex(lightboxIndexFor(0))}
          t={t}
        />

        {/* Solution — full width */}
        {hasSolution && <SectionCard field="solution" value={project.solution} t={t} />}

        {/* Optional fields */}
        {presentOptional.length > 0 && (
          <>
            {/* Visual break 2 — before optional details */}
            <SectionImage
              src={imgs[1]?.src}
              alt={imgs[1]?.alt || project.title}
              index={1}
              fit={imgs[1]?.fit}
              onOpen={() => setLightboxIndex(lightboxIndexFor(1))}
              t={t}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {presentOptional.map((field) => (
                <SectionCard key={field} field={field} value={project[field]} t={t} />
              ))}
            </div>
          </>
        )}

        {/* Visual break 3 — before closing */}
        {(hasTakeaways || hasReflection) && (
          <SectionImage
            src={imgs[2]?.src}
            alt={imgs[2]?.alt || project.title}
            index={2}
            fit={imgs[2]?.fit}
            onOpen={() => setLightboxIndex(lightboxIndexFor(2))}
            t={t}
          />
        )}

        {/* Takeaways + Reflection */}
        {(hasTakeaways || hasReflection) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hasTakeaways  && <SectionCard field="takeaways"  value={project.takeaways} t={t} />}
            {hasReflection && <SectionCard field="reflection" value={project.reflection} t={t} />}
          </div>
        )}

      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={lightboxImages}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
          onNavigate={setLightboxIndex}
        />
      )}
    </section>
  )
}
