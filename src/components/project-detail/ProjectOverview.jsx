import SectionTag from '../ui/SectionTag'
import Card from '../ui/Card'
import { useScrollReveal } from '../animations/useScrollReveal'

/**
 * Sección de resumen del proyecto
 * 2 columnas: Project Overview + Our Approach, cada una con Card light
 */
export default function ProjectOverview({ project }) {
  const sectionRef = useScrollReveal({ selector: '.overview-card', stagger: 0.15 })

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Card: Project Overview */}
        <Card variant="light" radius="lg" className="overview-card p-8 md:p-10 flex flex-col gap-6">
          <SectionTag>Descripción del proyecto</SectionTag>
          <p className="text-ink leading-relaxed">
            {project.brief}
          </p>
          {/* Placeholder 3D decorativo */}
          <div className="w-full h-40 rounded-[16px] bg-gradient-to-br from-gray-200 via-gray-300 to-gray-200
                          dark:from-card dark:via-surface dark:to-card
                          flex items-center justify-center">
            <span className="text-muted text-sm">3D Object</span>
          </div>
        </Card>

        {/* Card: Our Approach */}
        <Card variant="light" radius="lg" className="overview-card p-8 md:p-10 flex flex-col gap-6">
          <SectionTag>Mi enfoque</SectionTag>
          <p className="text-ink leading-relaxed">
            Combiné diseño visual y desarrollo técnico para crear una solución
            que cumple los objetivos del proyecto y ofrece una experiencia de
            usuario sobresaliente. Cada decisión fue guiada por las necesidades
            reales, validada en el navegador, y refinada hasta el último detalle.
          </p>
          {/* Placeholder 3D decorativo */}
          <div className="w-full h-40 rounded-[16px] bg-gradient-to-tr from-gray-300 via-gray-200 to-gray-300
                          dark:from-surface dark:via-card dark:to-surface
                          flex items-center justify-center">
            <span className="text-muted text-sm">3D Object</span>
          </div>
        </Card>
      </div>
    </section>
  )
}
