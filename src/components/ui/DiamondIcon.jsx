import { cn } from '../../lib/utils'

/** Icono rombo/diamante con estrella de 4 puntas — SVG inline */
export default function DiamondIcon({ className }) {
  return (
    <svg
      viewBox="0 0 32 32"
      fill="currentColor"
      className={cn('w-6 h-6', className)}
      aria-hidden="true"
    >
      {/* Rombo exterior */}
      <path d="M16 0 L32 16 L16 32 L0 16 Z" opacity="0.15" />
      {/* Estrella de 4 puntas interior */}
      <path d="M16 6 L19 13 L26 16 L19 19 L16 26 L13 19 L6 16 L13 13 Z" />
    </svg>
  )
}
