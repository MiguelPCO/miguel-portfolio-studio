import { useCountUp } from '../animations/useCountUp'
import SectionTag from './SectionTag'

/**
 * Contador de estadística con animación al entrar en viewport
 * @param {number} endValue — Valor final del contador
 * @param {string} [suffix='+'] — Sufijo después del número
 * @param {string} label — Texto descriptivo (SectionTag)
 */
export default function StatsCounter({ endValue, suffix = '+', label }) {
  const counterRef = useCountUp(endValue, { suffix })

  return (
    <div className="bg-white dark:bg-card rounded-[24px] p-8 text-center">
      {label && (
        <div className="mb-4">
          <SectionTag>{label}</SectionTag>
        </div>
      )}
      <span
        ref={counterRef}
        className="font-display font-black text-6xl md:text-7xl text-ink"
      >
        0{suffix}
      </span>
    </div>
  )
}
