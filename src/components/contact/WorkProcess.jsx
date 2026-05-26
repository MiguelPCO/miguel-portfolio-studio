import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import SectionTag from '../ui/SectionTag'
import { prefersReducedMotion } from '../animations/animationConfig'

const steps = [
  {
    num: '01',
    title: 'Discover',
    duration: '1–2 weeks',
    description: 'We dive deep into your brand, audience, and goals. Through research and workshops, we uncover insights that shape the creative direction.',
  },
  {
    num: '02',
    title: 'Design',
    duration: '2–4 weeks',
    description: 'We craft visual concepts, wireframes, and high-fidelity designs. Every pixel is intentional, every interaction meaningful.',
  },
  {
    num: '03',
    title: 'Deliver',
    duration: '2–3 weeks',
    description: 'We build, test, and launch. From development to deployment, we ensure everything works flawlessly across all devices.',
  },
]

export default function WorkProcess() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.from('.process-card', {
      opacity: 0,
      x: -30,
      stagger: 0.15,
      duration: 0.7,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: sectionRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="px-6 pb-20 md:pb-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {steps.map((step) => (
            <div
              key={step.num}
              className="process-card bg-card rounded-[24px] p-8 relative overflow-hidden"
            >
              {/* Tag */}
              <div className="mb-6">
                <SectionTag>Step {step.num} · Our Work Process</SectionTag>
              </div>

              {/* Contenido */}
              <h3 className="font-display font-bold text-2xl text-ink mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-accent font-semibold mb-4">{step.duration}</p>
              <p className="text-sm text-muted leading-relaxed">{step.description}</p>

              {/* [PLACEHOLDER 3D: objeto decorativo] */}
              <div className="absolute -bottom-6 -right-6 w-28 h-28
                              bg-gradient-to-br from-gray-200 to-gray-300
                              rounded-full opacity-20 blur-sm" />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
