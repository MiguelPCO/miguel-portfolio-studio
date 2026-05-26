import AboutHero from '../components/about/AboutHero'
import StatsRow from '../components/about/StatsRow'
import StorySection from '../components/about/StorySection'
import ClientsMarquee from '../components/about/ClientsMarquee'
import VisionMission from '../components/about/VisionMission'
import CareersSection from '../components/about/CareersSection'
import CTASection from '../components/home/CTASection'

export default function AboutPage() {
  return (
    <>
      <AboutHero />
      <StatsRow />
      <StorySection />
      <ClientsMarquee />
      <VisionMission />
      <CareersSection />
      <CTASection />
    </>
  )
}
