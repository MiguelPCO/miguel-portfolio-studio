import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'

/**
 * Cursor personalizado: dot + ring con GSAP quickTo
 * Solo activo en dispositivos con pointer:fine (desktop)
 * Respeta prefers-reduced-motion
 */
export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const ring = ringRef.current
    if (!dot || !ring) return

    // Centrar ambos elementos (GSAP maneja todos los transforms)
    gsap.set([dot, ring], { xPercent: -50, yPercent: -50, opacity: 0 })

    // quickTo para movimiento suave sin crear tweens en cada frame
    const moveDotX = gsap.quickTo(dot, 'x', { duration: 0.08, ease: 'power3.out' })
    const moveDotY = gsap.quickTo(dot, 'y', { duration: 0.08, ease: 'power3.out' })
    const moveRingX = gsap.quickTo(ring, 'x', { duration: 0.4, ease: 'power3.out' })
    const moveRingY = gsap.quickTo(ring, 'y', { duration: 0.4, ease: 'power3.out' })

    let isHovering = false
    let isVisible = false

    const onMouseMove = (e) => {
      if (!isVisible) {
        gsap.to([dot, ring], { opacity: 1, duration: 0.4 })
        isVisible = true
      }
      moveDotX(e.clientX)
      moveDotY(e.clientY)
      moveRingX(e.clientX)
      moveRingY(e.clientY)
    }

    const onMouseOver = (e) => {
      if (isHovering) return
      if (e.target.closest('a, button, [role="button"]')) {
        isHovering = true
        ring.classList.add('cursor-active')
        gsap.to(ring, { scale: 1.7, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 0, opacity: 0, duration: 0.2 })
      }
    }

    const onMouseOut = (e) => {
      if (!isHovering) return
      if (e.target.closest('a, button, [role="button"]')) {
        const rel = e.relatedTarget
        if (rel?.closest('a, button, [role="button"]')) return
        isHovering = false
        ring.classList.remove('cursor-active')
        gsap.to(ring, { scale: 1, duration: 0.3, ease: 'power2.out' })
        gsap.to(dot, { scale: 1, opacity: 1, duration: 0.2 })
      }
    }

    const onMouseDown = () =>
      gsap.to(ring, { scale: isHovering ? 1.3 : 0.8, duration: 0.1 })
    const onMouseUp = () =>
      gsap.to(ring, { scale: isHovering ? 1.7 : 1, duration: 0.15 })

    window.addEventListener('mousemove', onMouseMove)
    document.addEventListener('mouseover', onMouseOver)
    document.addEventListener('mouseout', onMouseOut)
    window.addEventListener('mousedown', onMouseDown)
    window.addEventListener('mouseup', onMouseUp)

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      document.removeEventListener('mouseover', onMouseOver)
      document.removeEventListener('mouseout', onMouseOut)
      window.removeEventListener('mousedown', onMouseDown)
      window.removeEventListener('mouseup', onMouseUp)
    }
  }, [])

  return (
    <>
      {/* Dot central — sigue inmediatamente */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-ink rounded-full pointer-events-none z-[9999]"
        aria-hidden="true"
      />
      {/* Ring exterior — sigue con lag suave */}
      <div
        ref={ringRef}
        className="cursor-ring fixed top-0 left-0 w-10 h-10 border border-ink/40 rounded-full pointer-events-none z-[9999]"
        aria-hidden="true"
      />
    </>
  )
}
