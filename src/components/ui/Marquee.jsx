import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'

/**
 * Marquee infinito con 2 tracks en direcciones opuestas
 * @param {Array<{src: string, alt: string}>} items — Logos o elementos
 * @param {number} [speed=20] — Duración de un ciclo en segundos
 */
export default function Marquee({ items, speed = 20 }) {
  const containerRef = useRef(null)
  const tweensRef = useRef([])

  useGSAP(() => {
    if (prefersReducedMotion()) return

    const t1 = gsap.to('.marquee-track-1', {
      xPercent: -50,
      ease: 'none',
      duration: speed,
      repeat: -1,
    })

    const t2 = gsap.to('.marquee-track-2', {
      xPercent: 50,
      ease: 'none',
      duration: speed * 1.25,
      repeat: -1,
    })

    tweensRef.current = [t1, t2]
  }, { scope: containerRef })

  const handleMouseEnter = () => {
    tweensRef.current.forEach(t => t.pause())
  }

  const handleMouseLeave = () => {
    tweensRef.current.forEach(t => t.resume())
  }

  // Duplicar items para loop continuo
  const doubled = [...items, ...items]

  return (
    <div
      ref={containerRef}
      className="overflow-hidden py-8"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {/* Track 1 — hacia la izquierda */}
      <div className="marquee-track-1 flex gap-12 w-[200%] mb-8">
        {doubled.map((item, i) => (
          <img
            key={`t1-${i}`}
            src={item.src}
            alt={item.alt}
            className="h-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-[opacity,filter]"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>

      {/* Track 2 — hacia la derecha */}
      <div className="marquee-track-2 flex gap-12 w-[200%] -translate-x-1/2">
        {doubled.map((item, i) => (
          <img
            key={`t2-${i}`}
            src={item.src}
            alt={item.alt}
            className="h-8 opacity-50 grayscale hover:opacity-100 hover:grayscale-0 transition-[opacity,filter]"
            loading="lazy"
            decoding="async"
          />
        ))}
      </div>
    </div>
  )
}
