import Card from '../ui/Card'
import SectionTag from '../ui/SectionTag'
import { useScrollReveal } from '../animations/useScrollReveal'

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

            {/* [PLACEHOLDER 3D: objeto decorativo de visión] */}
            <div className="mt-8 w-full h-32 rounded-2xl bg-gradient-to-br from-white/20 to-white/5 opacity-40" />
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

            {/* [PLACEHOLDER 3D: objeto decorativo de misión] */}
            <div className="mt-8 w-full h-32 rounded-2xl bg-gradient-to-br from-gray-200 to-gray-400 dark:from-card dark:to-surface opacity-40" />
          </Card>
        </div>
      </div>
    </section>
  )
}
