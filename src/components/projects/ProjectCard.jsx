import { useRef, useState } from 'react'
import { Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'

/**
 * Card de proyecto a ancho completo con imagen, hover zoom y scroll reveal
 * Se usa en la lista de proyectos (/projects)
 */
export default function ProjectCard({ project }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const [imgError, setImgError] = useState(false)
  const showImage = project.image && !imgError

  // Animación de entrada al scroll
  useGSAP(() => {
    const el = cardRef.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(el,
      { opacity: 0, y: 60 },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: cardRef })

  // Hover: zoom en imagen con contextSafe
  const { contextSafe } = useGSAP(() => {}, { scope: cardRef })

  const handleMouseEnter = contextSafe(() => {
    if (prefersReducedMotion() || !imgRef.current) return
    imgRef.current.style.willChange = 'transform'
    gsap.to(imgRef.current, { scale: 1.04, duration: 0.6, ease: 'power2.out' })
  })

  const handleMouseLeave = contextSafe(() => {
    if (prefersReducedMotion() || !imgRef.current) return
    gsap.to(imgRef.current, {
      scale: 1,
      duration: 0.5,
      ease: 'power2.out',
      onComplete: () => {
        if (imgRef.current) imgRef.current.style.willChange = 'auto'
      },
    })
  })

  return (
    <Link to={`/projects/${project.slug}`}>
      <article
        ref={cardRef}
        className="rounded-[24px] overflow-hidden bg-card group"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Área de imagen */}
        <div className="overflow-hidden">
          <div
            ref={imgRef}
            className="relative w-full h-[320px] md:h-[480px] bg-gradient-to-br from-gray-200 to-gray-300
                       dark:from-gray-800 dark:to-gray-700
                       flex items-center justify-center"
          >
            {showImage && (
              <img
                src={project.image}
                alt={project.title}
                loading="lazy"
                className="absolute inset-0 w-full h-full object-cover"
                onError={() => setImgError(true)}
              />
            )}
            {/* Número decorativo */}
            <span
              className="absolute top-4 right-6 font-display font-bold text-[96px] md:text-[128px]
                         leading-none text-ink/10 select-none pointer-events-none z-10"
              aria-hidden="true"
            >
              {project.num}
            </span>
            {/* [PLACEHOLDER: imagen del proyecto] */}
            {!showImage && (
              <span className="relative text-muted text-lg font-display z-10">{project.title}</span>
            )}
          </div>
        </div>

        {/* Fila de información */}
        <div className="p-6 flex flex-col sm:flex-row justify-between items-start gap-4">
          <div>
            <p className="text-xs text-muted mb-1">
              {project.tags.join(' · ')}
            </p>
            <h2 className="text-2xl md:text-3xl font-display font-bold text-ink">
              {project.title}
            </h2>
          </div>

          {/* Métricas destacadas */}
          <div className="text-sm text-muted text-right shrink-0">
            <p>{project.metrics[0]}</p>
            <p>{project.metrics[1]}</p>
          </div>
        </div>
      </article>
    </Link>
  )
}
