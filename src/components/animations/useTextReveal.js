import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { prefersReducedMotion } from './animationConfig'

/**
 * Hook: SplitText por líneas con slide-up limpio
 * SplitText v3.13+ añade aria-label automáticamente para accesibilidad
 * @param {Object} [options]
 * @param {number} [options.duration=0.9]
 * @param {number} [options.stagger=0.12]
 * @param {boolean} [options.scrollTriggered=true] — Si es false, anima al montar
 * @returns {React.RefObject}
 */
export function useTextReveal(options = {}) {
  const ref = useRef(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 })
      return
    }

    // Wrapper de líneas para overflow:hidden
    const split = new SplitText(el, {
      type: 'lines',
      linesClass: 'line-wrapper',
    })

    gsap.set('.line-wrapper', { overflow: 'hidden' })

    // Split interior para animar
    const innerSplit = new SplitText(el, { type: 'lines' })

    const animConfig = {
      yPercent: 0,
      duration: options.duration ?? 0.9,
      ease: 'power4.out',
      stagger: options.stagger ?? 0.12,
    }

    // ScrollTrigger o animación inmediata
    if (options.scrollTriggered !== false) {
      animConfig.scrollTrigger = {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      }
    }

    gsap.fromTo(innerSplit.lines,
      { yPercent: 110 },
      animConfig
    )

    // Cleanup: revertir SplitText
    return () => {
      split.revert()
      innerSplit.revert()
    }
  }, { scope: ref })

  return ref
}
