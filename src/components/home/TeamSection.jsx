import { team } from '../../data/team'
import SectionTag from '../ui/SectionTag'
import Button from '../ui/Button'
import { useScrollReveal } from '../animations/useScrollReveal'

export default function TeamSection() {
  const sectionRef = useScrollReveal({ selector: '.team-member', stagger: 0.1 })

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto text-center">
        <SectionTag>Our Team</SectionTag>
        <h2 className="font-display font-bold text-3xl md:text-5xl text-ink mt-4 mb-12">
          Meet the People Behind the Work
        </h2>

        {/* Fotos circulares del equipo */}
        <div className="flex flex-wrap justify-center gap-8 mb-12">
          {team.map((member) => (
            <div key={member.name} className="team-member flex flex-col items-center gap-3">
              {/* Avatar placeholder */}
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-card flex items-center justify-center
                              text-muted text-xl font-display font-bold border-2 border-white shadow-sm">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-sm text-ink">{member.name}</p>
                <p className="text-xs text-muted">{member.role}</p>
              </div>
            </div>
          ))}
        </div>

        <Button href="/about" variant="black-pill" ariaLabel="Conocer más sobre el equipo">
          Learn More About Us
        </Button>
      </div>
    </section>
  )
}
