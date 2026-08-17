import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion, EASE_SMOOTH, DUR_MID, STAGGER } from './animationConfig'

/**
 * Hook: fade + rise al entrar en viewport (ScrollTrigger)
 * @param {Object} [options]
 * @param {string} [options.selector] — Selector CSS para targets dentro del ref
 * @param {number} [options.y=40] — Desplazamiento Y inicial
 * @param {number} [options.duration]
 * @param {string} [options.ease]
 * @param {number} [options.stagger]
 * @param {string} [options.start='top 85%']
 * @returns {React.RefObject}
 */
export function useScrollReveal(options = {}) {
  const ref = useRef(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const targets = options.selector
      ? el.querySelectorAll(options.selector)
      : [el]

    if (prefersReducedMotion()) {
      gsap.set(targets, { opacity: 1, y: 0 })
      return
    }

    gsap.fromTo(targets,
      { opacity: 0, y: options.y ?? 40 },
      {
        opacity: 1,
        y: 0,
        duration: options.duration ?? DUR_MID,
        ease: options.ease ?? EASE_SMOOTH,
        stagger: options.stagger ?? STAGGER,
        scrollTrigger: {
          trigger: el,
          start: options.start ?? 'top 85%',
          toggleActions: 'play none none none',
        },
      }
    )
  }, { scope: ref })

  return ref
}
