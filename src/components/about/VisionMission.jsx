import Card from '../ui/Card'
import SectionTag from '../ui/SectionTag'
import DiamondIcon from '../ui/DiamondIcon'
import { useScrollReveal } from '../animations/useScrollReveal'

const DOT_PATTERN = {
  backgroundImage: 'radial-gradient(circle, #FFE830 1.5px, transparent 1.5px)',
  backgroundSize: '20px 20px',
}

/**
 * Sección de Visión y Misión — dos cards lado a lado
 * Izquierda: dark (visión), Derecha: light (misión)
 */
export default function VisionMission() {
  const sectionRef = useScrollReveal({ selector: '.vm-card', stagger: 0.15 })

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Visión — card oscura */}
          <Card variant="dark" className="vm-card p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="mb-6">
                <SectionTag>Vision</SectionTag>
              </div>
              <p className="text-white/80 text-base md:text-lg leading-relaxed">
                Crear productos digitales que combinen diseño de alta calidad con código sólido —
                donde cada píxel tiene un propósito y cada función tiene sentido para quien la usa.
              </p>
            </div>

            {/* Marca decorativa: grano de diamantes + glow acento */}
            <div className="relative mt-8 w-full h-32 rounded-2xl overflow-hidden bg-white/5">
              <div className="absolute inset-0 opacity-[0.15]" style={DOT_PATTERN} />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,232,48,0.18), transparent 65%)' }}
              />
              <DiamondIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-accent opacity-60" />
            </div>
          </Card>

          {/* Misión — card clara */}
          <Card variant="light" className="vm-card p-8 md:p-12 flex flex-col justify-between min-h-[400px]">
            <div>
              <div className="mb-6">
                <SectionTag>Mission</SectionTag>
              </div>
              <p className="text-muted text-base md:text-lg leading-relaxed">
                Construir con cuidado: entender el problema antes de escribir código,
                diseñar con intención antes de elegir colores, y entregar productos que
                superen las expectativas técnicas y estéticas del cliente.
              </p>
            </div>

            {/* Marca decorativa: grano de diamantes + glow acento */}
            <div className="relative mt-8 w-full h-32 rounded-2xl overflow-hidden bg-ink/[0.06] border border-ink/10">
              <div className="absolute inset-0 opacity-[0.2]" style={DOT_PATTERN} />
              <div
                className="absolute inset-0"
                style={{ background: 'radial-gradient(circle at 50% 50%, rgba(255,232,48,0.22), transparent 65%)' }}
              />
              <DiamondIcon className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 text-accent opacity-80" />
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}
