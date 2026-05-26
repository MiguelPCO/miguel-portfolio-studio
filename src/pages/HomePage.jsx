import HeroSection from '../components/home/HeroSection'
import ProjectsPreview from '../components/home/ProjectsPreview'
import ServicesPreview from '../components/home/ServicesPreview'
import AboutPreview from '../components/home/AboutPreview'
import CTASection from '../components/home/CTASection'

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ProjectsPreview />
      <ServicesPreview />
      <AboutPreview />
      <CTASection />
    </>
  )
}
