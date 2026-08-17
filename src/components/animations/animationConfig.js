// Tokens de timing centralizados para animaciones GSAP
export const EASE_SMOOTH = 'power3.out'
export const EASE_BACK = 'back.out(1.2)'
export const EASE_SHARP = 'power4.out'

export const DUR_FAST = 0.4
export const DUR_MID = 0.7
export const DUR_SLOW = 1.0

export const STAGGER = 0.08

/** Comprueba si el usuario prefiere movimiento reducido */
export function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
