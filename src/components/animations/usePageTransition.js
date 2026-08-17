import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion, DUR_FAST } from './animationConfig'

/**
 * Hook: fade in suave al montar la página (opacity 0 → 1)
 * @returns {React.RefObject}
 */
export function usePageTransition() {
  const ref = useRef(null)

  useGSAP(() => {
    const el = ref.current
    if (!el) return

    if (prefersReducedMotion()) {
      gsap.set(el, { opacity: 1 })
      return
    }

    gsap.fromTo(el,
      { opacity: 0 },
      { opacity: 1, duration: DUR_FAST, ease: 'power2.out' }
    )
  }, { scope: ref })

  return ref
}
