import { useEffect, useRef, useCallback } from 'react'
import { createPortal } from 'react-dom'

/**
 * Lightbox de pantalla completa para ampliar imágenes de proyecto
 * ESC cierra, flechas navegan (si hay más de una imagen), click en backdrop cierra
 */
export default function Lightbox({ images, index, onClose, onNavigate }) {
  const closeBtnRef = useRef(null)
  const hasMultiple = images.length > 1
  const current = images[index]

  const goNext = useCallback(
    () => onNavigate((index + 1) % images.length),
    [index, images.length, onNavigate]
  )
  const goPrev = useCallback(
    () => onNavigate((index - 1 + images.length) % images.length),
    [index, images.length, onNavigate]
  )

  const latestRef = useRef({ onClose, hasMultiple, goNext, goPrev })
  useEffect(() => {
    latestRef.current = { onClose, hasMultiple, goNext, goPrev }
  })

  useEffect(() => {
    function handleKeyDown(e) {
      const { onClose, hasMultiple, goNext, goPrev } = latestRef.current
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowRight' && hasMultiple) goNext()
      if (e.key === 'ArrowLeft' && hasMultiple) goPrev()
    }

    document.addEventListener('keydown', handleKeyDown)
    document.body.style.overflow = 'hidden'
    closeBtnRef.current?.focus()

    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      document.body.style.overflow = ''
    }
  }, [])

  if (!current) return null

  return createPortal(
    <div
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center px-6 py-10"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={current.alt}
    >
      <button
        ref={closeBtnRef}
        onClick={(e) => { e.stopPropagation(); onClose() }}
        className="absolute top-6 right-6 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20
                   text-white flex items-center justify-center text-xl transition-colors"
        aria-label="Cerrar"
      >
        &#10005;
      </button>

      {hasMultiple && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); goPrev() }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-white/10 hover:bg-white/20 text-white flex items-center justify-center
                       text-2xl transition-colors"
            aria-label="Imagen anterior"
          >
            &#8249;
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); goNext() }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full
                       bg-white/10 hover:bg-white/20 text-white flex items-center justify-center
                       text-2xl transition-colors"
            aria-label="Siguiente imagen"
          >
            &#8250;
          </button>
        </>
      )}

      <img
        src={current.src}
        alt={current.alt}
        onClick={(e) => e.stopPropagation()}
        className="max-w-full max-h-full object-contain rounded-[12px]"
      />

      {hasMultiple && (
        <span className="absolute bottom-6 left-1/2 -translate-x-1/2 text-white/70 text-sm font-display">
          {index + 1} / {images.length}
        </span>
      )}
    </div>,
    document.body
  )
}
