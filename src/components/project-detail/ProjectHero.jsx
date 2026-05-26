import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'

/**
 * Imagen hero a pantalla completa con animación de clip-path reveal
 * Revela la imagen desde abajo con inset()
 */
export default function ProjectHero({ project }) {
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
      {
        clipPath: 'inset(0% 0% 0% 0%)',
        duration: 1.2,
        ease: 'power4.out',
        delay: 0.3,
      }
    )
  }, { scope: containerRef })

  return (
    <section className="px-6 pb-16 md:pb-24">
      <div className="max-w-[1400px] mx-auto">
        <div
          ref={containerRef}
          className="w-full h-[50vh] md:h-[80vh] rounded-[24px] overflow-hidden
                     bg-gradient-to-br from-gray-200 to-gray-400 dark:from-card dark:to-surface
                     flex items-center justify-center"
          style={{ clipPath: 'inset(100% 0% 0% 0%)' }}
        >
          {/* [PLACEHOLDER: imagen hero del proyecto] */}
          <span className="text-muted text-2xl font-display">{project.title}</span>
        </div>
      </div>
    </section>
  )
}
