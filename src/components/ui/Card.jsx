import { cn } from '../../lib/utils'

/**
 * Card base reutilizable
 * @param {'light'|'dark'} [variant='light']
 * @param {'lg'|'sm'} [radius='lg']
 */
export default function Card({ children, variant = 'light', radius = 'lg', className, ...props }) {
  return (
    <div
      className={cn(
        'overflow-hidden',
        variant === 'dark' ? 'bg-ink dark:bg-card text-white' : 'bg-card text-ink',
        radius === 'lg' ? 'rounded-[24px]' : 'rounded-[16px]',
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}
