import { useRef, useState } from "react";
import { Link } from "react-router";
import { useGSAP } from "@gsap/react";
import { gsap } from "gsap";
import { featuredProjects } from "../../data/projects";
import SectionTag from "../ui/SectionTag";
import Button from "../ui/Button";
import { prefersReducedMotion } from "../animations/animationConfig";

export default function ProjectsPreview() {
  const containerRef = useRef(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;

      // Cada card aparece al hacer scroll
      gsap.utils.toArray(".project-preview-card").forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 60 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power3.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          },
        );
      });

      // Hover: zoom en imagen
      gsap.utils.toArray(".project-preview-card").forEach((card) => {
        const img = card.querySelector("img");
        if (!img) return;

        card.addEventListener("mouseenter", () => {
          gsap.to(img, { scale: 1.04, duration: 0.6, ease: "power2.out" });
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(img, { scale: 1, duration: 0.5, ease: "power2.out" });
        });
      });
    },
    { scope: containerRef },
  );

  // Mostrar solo los 3 primeros proyectos en home
  const previewProjects = featuredProjects.slice(0, 3);

  return (
    <section ref={containerRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex items-center justify-between mb-12">
          <SectionTag>Proyectos Seleccionados</SectionTag>
          <Button
            href="/projects"
            variant="outline"
            ariaLabel="Ver todos los proyectos"
          >
            Ver todos
          </Button>
        </div>

        <div className="flex flex-col gap-8">
          {previewProjects.map((project) => (
            <Link key={project.slug} to={`/projects/${project.slug}`}>
              <article className="project-preview-card rounded-[24px] overflow-hidden bg-card group">
                {/* Imagen del proyecto */}
                <div className="overflow-hidden">
                  <PreviewImage project={project} />
                </div>

                {/* Info */}
                <div className="p-6 flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                    <p className="text-xs text-muted mb-1">
                      {project.category}
                    </p>
                    <h3 className="text-xl md:text-2xl font-display font-bold text-ink">
                      {project.title}
                    </h3>
                  </div>
                  <div className="text-sm text-muted text-right">
                    <p>{project.metrics[0]}</p>
                    <p>{project.metrics[1]}</p>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

// Imagen de card con fallback a placeholder degradado si no existe/falla
function PreviewImage({ project }) {
  const [imgError, setImgError] = useState(false);
  const showImage = project.image && !imgError;

  return (
    <div className="relative w-full h-[300px] md:h-[500px] bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-800 dark:to-gray-700 flex items-center justify-center">
      {showImage && (
        <img
          src={project.image}
          alt={project.title}
          loading="lazy"
          className="absolute inset-0 w-full h-full object-cover"
          onError={() => setImgError(true)}
        />
      )}
      {/* Número decorativo */}
      <span
        className="absolute top-4 right-6 font-display font-bold text-[80px] md:text-[112px]
        leading-none text-ink/10 select-none pointer-events-none z-10"
        aria-hidden="true"
      >
        {project.num}
      </span>
      {!showImage && (
        <span className="relative text-muted text-lg font-display z-10">
          {project.title}
        </span>
      )}
    </div>
  );
}
