import ServicesHero from '../components/services/ServicesHero'
import ServicesAccordion from '../components/services/ServicesAccordion'
import WorkProcess from '../components/shared/WorkProcess'
import CTASection from '../components/home/CTASection'

export default function ServicesPage() {
  return (
    <>
      <ServicesHero />
      <ServicesAccordion />
      <WorkProcess />
      <CTASection />
    </>
  )
}
