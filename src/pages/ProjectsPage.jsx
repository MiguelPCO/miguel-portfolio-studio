import ProjectsHero from '../components/projects/ProjectsHero'
import ProjectsList from '../components/projects/ProjectsList'
import CTASection from '../components/home/CTASection'

/**
 * Página de proyectos — lista completa del portfolio
 */
export default function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <ProjectsList />
      <CTASection />
    </>
  )
}
