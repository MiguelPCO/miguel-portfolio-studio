import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion, STAGGER } from '../animations/animationConfig'

/**
 * Galería masonry de imágenes del proyecto
 * CSS columns para layout masonry + hover overlay oscuro + stagger entrance
 */

// Alturas variadas para simular imágenes reales en el placeholder
const placeholderHeights = ['h-[280px]', 'h-[360px]', 'h-[320px]', 'h-[400px]']

// Gradientes variados para los placeholders
const placeholderGradients = [
  'from-gray-200 to-gray-300 dark:from-card dark:to-surface',
  'from-gray-300 to-gray-400 dark:from-surface dark:to-card',
  'from-gray-200 to-gray-300 dark:from-card dark:to-surface',
  'from-gray-200 via-gray-300 to-gray-200 dark:from-card dark:via-surface dark:to-card',
]

export default function ProjectGallery({ project }) {
  const galleryRef = useRef(null)

  // Animación de entrada escalonada
  useGSAP(() => {
    const el = galleryRef.current
    if (!el) return

    const items = el.querySelectorAll('.gallery-item')

    if (prefersReducedMotion()) {
      gsap.set(items, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(items,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out',
        stagger: STAGGER * 2,
        scrollTrigger: {
          trigger: el,
          start: 'top 80%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: galleryRef })

  return (
    <section className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div
          ref={galleryRef}
          className="columns-1 md:columns-2 gap-6"
        >
          {project.images.map((img, i) => (
            <div
              key={img}
              className={`gallery-item break-inside-avoid mb-6 relative group
                         rounded-[16px] overflow-hidden cursor-pointer`}
            >
              {/* Placeholder con gradiente y altura variada */}
              <div
                className={`w-full ${placeholderHeights[i % placeholderHeights.length]}
                           bg-gradient-to-br ${placeholderGradients[i % placeholderGradients.length]}
                           flex items-center justify-center`}
              >
                <span className="text-muted text-sm font-display">
                  {project.title} — {i + 1}
                </span>
              </div>

              {/* Overlay oscuro al hover */}
              <div
                className="absolute inset-0 bg-black/0 group-hover:bg-black/20
                           transition-colors duration-300 rounded-[16px]"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
