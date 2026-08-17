import SectionTag from "../ui/SectionTag";
import { useScrollReveal } from "../animations/useScrollReveal";

const toAbsUrl = (url) =>
  url && !/^https?:\/\//i.test(url) ? `https://${url}` : url;

export default function ProjectHeader({ project }) {
  const sectionRef = useScrollReveal({
    selector: ".header-reveal",
    stagger: 0.08,
  });

  return (
    <section ref={sectionRef} className="px-6 pt-20 pb-12 md:pt-28 md:pb-16">
      <div className="max-w-[1200px] mx-auto flex flex-col gap-8">
        {/* Fila 1: tags */}
        <div className="header-reveal flex flex-wrap items-center gap-3">
          <SectionTag>Proyecto {project.num}</SectionTag>
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-semibold uppercase tracking-wider text-muted bg-card px-3 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Fila 2: título */}
        <h1 className="header-reveal font-display font-bold text-5xl md:text-7xl leading-none text-ink">
          {project.title}
        </h1>

        {/* Fila 3: metadata horizontal */}
        <div
          className="header-reveal w-full border-t border-ink/10 pt-8
                        grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {/* Descripción — 2 cols en lg */}
          <div className="lg:col-span-2 flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              Descripción
            </span>
            <p className="text-ink leading-relaxed text-sm">{project.brief}</p>
            {(project.liveUrl || project.repoUrl) && (
              <div className="flex flex-wrap gap-2 mt-3">
                {project.liveUrl && (
                  <a
                    href={toAbsUrl(project.liveUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-ink text-surface
                               text-xs font-semibold hover:bg-ink/90 transition-colors duration-200"
                  >
                    Ver proyecto
                    <svg
                      width="11"
                      height="11"
                      viewBox="0 0 14 14"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M2.5 11.5L11.5 2.5M11.5 2.5H6.5M11.5 2.5V7.5" />
                    </svg>
                  </a>
                )}
                {project.repoUrl && (
                  <a
                    href={toAbsUrl(project.repoUrl)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-ink/20
                               text-xs font-semibold text-ink hover:bg-ink/5 transition-colors duration-200"
                  >
                    GitHub →
                  </a>
                )}
              </div>
            )}
          </div>

          {/* Stack */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              Stack
            </span>
            <div className="flex flex-wrap gap-1.5">
              {project.tools.map((tool) => (
                <span
                  key={tool}
                  className="px-2.5 py-1 rounded-full bg-card text-xs font-medium text-ink/70 border border-ink/10"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Entregables */}
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              Entregables
            </span>
            <ul className="flex flex-col gap-1">
              {project.deliverables.map((d) => (
                <li key={d} className="text-sm text-ink leading-snug">
                  {d}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
