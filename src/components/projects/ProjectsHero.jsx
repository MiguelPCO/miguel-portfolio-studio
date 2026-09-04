import { useTextReveal } from "../animations/useTextReveal";
import { useTranslate } from "../../context/LanguageContext";
import { strings } from "../../i18n/strings";

/**
 * Hero de la página de proyectos
 * Título display a dos líneas con reveal animado + párrafo descriptivo
 */
export default function ProjectsHero() {
  const headingRef = useTextReveal({ scrollTriggered: false });
  const t = useTranslate();

  return (
    <section className="px-6 pt-20 pb-16 md:pt-28 md:pb-24">
      <div className="max-w-300 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-end">
        {/* Columna izquierda — Título */}
        <h1
          ref={headingRef}
          className="font-display font-bold text-[clamp(48px,8vw,96px)] leading-[1.05]"
        >
          <span className="text-ink">{t(strings.projects.heroTitleLine1)}</span>
          <br />
          <span className="text-muted">{t(strings.projects.heroTitleLine2)}</span>
        </h1>

        {/* Columna derecha — Descripción */}
        <p className="text-muted text-lg leading-relaxed lg:pb-3">
          {t(strings.projects.heroDescription)}
        </p>
      </div>
    </section>
  );
}
