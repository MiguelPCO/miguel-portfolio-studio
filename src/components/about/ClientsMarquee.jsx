import SectionTag from '../ui/SectionTag'
import Marquee from '../ui/Marquee'
import { useScrollReveal } from '../animations/useScrollReveal'
import { techStack } from '../../data/team'

function createTextLogoSrc(name) {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="120" height="32" viewBox="0 0 120 32">
    <text x="60" y="22" text-anchor="middle" font-family="sans-serif" font-weight="700"
          font-size="14" fill="%230D0D0D">${name}</text>
  </svg>`
  return `data:image/svg+xml,${svg}`
}

const techItems = techStack.map((tech) => ({
  src: createTextLogoSrc(tech),
  alt: tech,
}))

export default function ClientsMarquee() {
  const sectionRef = useScrollReveal()

  return (
    <section ref={sectionRef} className="px-6 py-16 md:py-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="text-center mb-8">
          <SectionTag>Stack tecnológico</SectionTag>
        </div>
        <Marquee items={techItems} speed={25} />
      </div>
    </section>
  )
}
