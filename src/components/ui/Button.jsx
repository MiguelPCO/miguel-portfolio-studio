import { Link } from 'react-router'
import { cn } from '../../lib/utils'

const variants = {
  'yellow-pill': 'bg-accent text-ink hover:bg-yellow-300',
  'black-pill': 'bg-ink text-surface hover:bg-ink/90',
  'outline': 'border-2 border-ink text-ink hover:bg-ink hover:text-surface',
}

/**
 * Botón CTA con flecha circular
 * @param {Object} props
 * @param {string} [props.href] — Si se pasa, renderiza como Link
 * @param {'yellow-pill'|'black-pill'|'outline'} [props.variant]
 * @param {string} [props.className]
 */
export default function Button({ href, variant = 'black-pill', children, onClick, className, ariaLabel }) {
  const content = (
    <span
      className={cn(
        'inline-flex items-center gap-3 px-6 py-3 rounded-full font-semibold text-sm transition-all',
        variants[variant],
        className
      )}
    >
      {children}
      <span
        className={cn(
          'w-7 h-7 rounded-full flex items-center justify-center text-xs shrink-0',
          variant === 'yellow-pill'
            ? 'bg-ink text-accent'
            : 'bg-accent text-ink'
        )}
      >
        →
      </span>
    </span>
  )

  if (href) {
    return (
      <Link to={href} aria-label={ariaLabel}>
        {content}
      </Link>
    )
  }

  return (
    <button onClick={onClick} aria-label={ariaLabel}>
      {content}
    </button>
  )
}
