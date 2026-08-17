import { useState, useRef, useCallback } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { cn } from '../../lib/utils'
import { prefersReducedMotion } from '../animations/animationConfig'

/**
 * Acordeón con animación GSAP para height
 * @param {Array<{id, header: ReactNode, content: ReactNode}>} items
 * @param {number} [defaultOpen=0] — Índice del item abierto por defecto (-1 = ninguno)
 */
export default function Accordion({ items, defaultOpen = 0 }) {
  const [openIndex, setOpenIndex] = useState(defaultOpen)
  const contentRefs = useRef([])
  const containerRef = useRef(null)

  const { contextSafe } = useGSAP(() => {}, { scope: containerRef })

  const handleToggle = useCallback(contextSafe((index) => {
    const isOpening = openIndex !== index

    // Cerrar el actual si hay uno abierto
    if (openIndex >= 0 && contentRefs.current[openIndex]) {
      const closingEl = contentRefs.current[openIndex]
      if (prefersReducedMotion()) {
        gsap.set(closingEl, { height: 0, opacity: 0 })
      } else {
        gsap.to(closingEl, { height: 0, opacity: 0, duration: 0.4, ease: 'power3.in' })
      }
    }

    // Abrir el nuevo
    if (isOpening && contentRefs.current[index]) {
      const openingEl = contentRefs.current[index]
      if (prefersReducedMotion()) {
        gsap.set(openingEl, { height: 'auto', opacity: 1 })
      } else {
        gsap.fromTo(openingEl,
          { height: 0, opacity: 0 },
          { height: 'auto', opacity: 1, duration: 0.5, ease: 'power3.out' }
        )
      }
    }

    setOpenIndex(isOpening ? index : -1)
  }), [openIndex, contextSafe])

  return (
    <div ref={containerRef} className="w-full">
      {items.map((item, index) => {
        const isOpen = openIndex === index
        return (
          <div
            key={item.id}
            className={cn(
              'rounded-2xl transition-colors duration-300 mb-2',
              isOpen ? 'bg-ink dark:bg-surface text-white dark:text-ink' : 'bg-transparent'
            )}
          >
            {/* Header — siempre visible */}
            <button
              onClick={() => handleToggle(index)}
              className="w-full flex items-center gap-4 p-6 text-left"
              aria-expanded={isOpen}
              aria-controls={`accordion-content-${item.id}`}
            >
              <div className="flex-1">{item.header}</div>
              <span
                className={cn(
                  'w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-sm font-bold',
                  isOpen ? 'bg-accent text-ink' : 'bg-accent text-ink'
                )}
              >
                {isOpen ? '−' : '+'}
              </span>
            </button>

            {/* Contenido colapsable */}
            <div
              ref={(el) => { contentRefs.current[index] = el }}
              id={`accordion-content-${item.id}`}
              role="region"
              style={{ height: index === defaultOpen ? 'auto' : 0, overflow: 'hidden' }}
            >
              <div className="px-6 pb-6">
                {item.content}
              </div>
            </div>

            {/* Separador entre items cerrados */}
            {!isOpen && index < items.length - 1 && (
              <div className="border-t border-ink/10 mx-6" />
            )}
          </div>
        )
      })}
    </div>
  )
}
