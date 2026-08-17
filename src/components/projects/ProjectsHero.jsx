import { useTextReveal } from "../animations/useTextReveal";

/**
 * Hero de la página de proyectos
 * Título display a dos líneas con reveal animado + párrafo descriptivo
 */
export default function ProjectsHero() {
  const headingRef = useTextReveal({ scrollTriggered: false });

  return (
    <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        {/* Columna izquierda — Título */}
        <h1
          ref={headingRef}
          className="font-display font-bold text-[clamp(48px,8vw,96px)] leading-[1.05]"
        >
          <span className="text-ink">MI PORTAFOLIO.</span>
          <br />
          <span className="text-muted">DESCUBRE MI TRABAJO.</span>
        </h1>

        {/* Columna derecha — Descripción */}
        <p className="text-muted text-lg leading-relaxed lg:pb-3">
          Una selección de proyectos en los que la estrategia se une a la
          maestría artesanal. Cada caso refleja mi compromiso con un diseño bien
          pensado, ideas audaces y resultados cuantificables.
        </p>
      </div>
    </section>
  );
}
