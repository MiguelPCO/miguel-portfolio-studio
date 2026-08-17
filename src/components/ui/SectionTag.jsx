import DiamondIcon from './DiamondIcon'

/** Tag de sección: ⬡ LABEL (amarillo, uppercase, small) */
export default function SectionTag({ children }) {
  return (
    <div className="inline-flex items-center gap-2">
      <DiamondIcon className="w-4 h-4 text-accent" />
      <span className="text-xs font-semibold uppercase tracking-widest text-muted">
        {children}
      </span>
    </div>
  )
}
