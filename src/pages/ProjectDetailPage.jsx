import { useParams } from 'react-router'
import { featuredProjects } from '../data/projects'
import ProjectHeader from '../components/project-detail/ProjectHeader'
import ProjectHero from '../components/project-detail/ProjectHero'
import ProjectOverview from '../components/project-detail/ProjectOverview'
import ProjectGallery from '../components/project-detail/ProjectGallery'
import ProjectTestimonial from '../components/project-detail/ProjectTestimonial'
import NextProject from '../components/project-detail/NextProject'
import CTASection from '../components/home/CTASection'

/**
 * Página de detalle de un proyecto individual
 * Busca el proyecto por slug en la URL
 */
export default function ProjectDetailPage() {
  const { slug } = useParams()
  const project = featuredProjects.find((p) => p.slug === slug)

  // Proyecto no encontrado
  if (!project) {
    return (
      <section className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="font-display font-bold text-5xl text-ink mb-4">404</h1>
        <p className="text-muted text-lg">
          Proyecto no encontrado. El proyecto que buscas no existe o ha sido eliminado.
        </p>
      </section>
    )
  }

  return (
    <>
      <ProjectHeader project={project} />
      <ProjectHero project={project} />
      <ProjectOverview project={project} />
      <ProjectGallery project={project} />
      <ProjectTestimonial testimonial={project.testimonial} />
      <NextProject nextSlug={project.next} />
      <CTASection />
    </>
  )
}
