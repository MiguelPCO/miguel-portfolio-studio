import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from './animationConfig'

/**
 * Hook: contador numérico animado de 0 a N al entrar en viewport
 * @param {number} endValue — Valor final
 * @param {Object} [options]
 * @param {number} [options.duration=1.5]
 * @param {string} [options.suffix='+']
 * @returns {React.RefObject}
 */
export function useCountUp(endValue, options = {}) {
  const ref = useRef(null)
  const counterRef = useRef({ val: 0 })

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    const suffix = options.suffix ?? '+'

    if (prefersReducedMotion()) {
      el.textContent = Math.round(endValue) + suffix
      return
    }

    gsap.to(counterRef.current, {
      val: endValue,
      duration: options.duration ?? 1.5,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: el,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
      onUpdate() {
        el.textContent = Math.round(counterRef.current.val) + suffix
      },
    })
  }, { scope: ref })

  return ref
}
