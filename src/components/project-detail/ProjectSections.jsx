import { useState } from 'react'
import SectionTag from '../ui/SectionTag'
import Lightbox from '../ui/Lightbox'
import { useScrollReveal } from '../animations/useScrollReveal'

const SECTION_LABELS = {
  context:           'Contexto',
  problem:           'El problema',
  solution:          'La solución',
  research:          'Research',
  constraints:       'Restricciones',
  designGoal:        'Objetivo de diseño',
  designExploration: 'Exploración de diseño',
  features:          'Funcionalidades',
  interactionDesign: 'Interaction design',
  onboarding:        'Onboarding',
  takeaways:         'Impacto y aprendizajes',
  reflection:        'Reflexión',
}

function SectionCard({ field, value, className = '' }) {
  const label = SECTION_LABELS[field] || field
  const isArray = Array.isArray(value)

  return (
    <div className={`ps-card bg-card rounded-[20px] p-8 md:p-10 flex flex-col gap-5 ${className}`}>
      <SectionTag>{label}</SectionTag>
      {isArray ? (
        <ul className="flex flex-col gap-2">
          {value.map((item) => (
            <li key={item} className="flex items-start gap-3 text-ink leading-relaxed">
              <span className="text-accent mt-1 shrink-0">&#10003;</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-ink leading-relaxed">{value}</p>
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

function SectionImage({ src, alt, index = 0, onOpen }) {
  const gradient = PLACEHOLDER_GRADIENTS[index % PLACEHOLDER_GRADIENTS.length]

  if (src) {
    return (
      <div
        className="w-full h-[320px] md:h-[440px] rounded-[20px] overflow-hidden relative group cursor-pointer"
        onClick={onOpen}
        role="button"
        tabIndex={0}
        aria-label={`Ampliar imagen: ${alt}`}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onOpen() } }}
      >
        <img src={src} alt={alt} className="w-full h-full object-cover" loading="lazy" />
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
      <span className="text-muted text-sm font-display">{alt}</span>
    </div>
  )
}

export default function ProjectSections({ project }) {
  const sectionRef = useScrollReveal({ selector: '.ps-card', y: 30, stagger: 0.1 })
  const [lightboxIndex, setLightboxIndex] = useState(null)

  const presentOptional = OPTIONAL_FIELDS.filter((f) => project[f])
  const hasSolution   = !!project.solution
  const hasTakeaways  = !!project.takeaways
  const hasReflection = !!project.reflection

  // sectionImages[]: optional array de { src, alt } — uno por visual break
  const imgs = project.sectionImages || []
  const lightboxImages = imgs.reduce((acc, img) => {
    if (img?.src) acc.push({ src: img.src, alt: img.alt || project.title })
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
          {project.context && <SectionCard field="context" value={project.context} />}
          {project.problem && <SectionCard field="problem" value={project.problem} />}
        </div>

        {/* Visual break 1 */}
        <SectionImage
          src={imgs[0]?.src}
          alt={imgs[0]?.alt || project.title}
          index={0}
          onOpen={() => setLightboxIndex(lightboxIndexFor(0))}
        />

        {/* Solution — full width */}
        {hasSolution && <SectionCard field="solution" value={project.solution} />}

        {/* Optional fields */}
        {presentOptional.length > 0 && (
          <>
            {/* Visual break 2 — before optional details */}
            <SectionImage
              src={imgs[1]?.src}
              alt={imgs[1]?.alt || project.title}
              index={1}
              onOpen={() => setLightboxIndex(lightboxIndexFor(1))}
            />
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {presentOptional.map((field) => (
                <SectionCard key={field} field={field} value={project[field]} />
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
            onOpen={() => setLightboxIndex(lightboxIndexFor(2))}
          />
        )}

        {/* Takeaways + Reflection */}
        {(hasTakeaways || hasReflection) && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {hasTakeaways  && <SectionCard field="takeaways"  value={project.takeaways} />}
            {hasReflection && <SectionCard field="reflection" value={project.reflection} />}
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
