import StatsCounter from '../ui/StatsCounter'
import { useScrollReveal } from '../animations/useScrollReveal'
import { stats } from '../../data/team'

export default function StatsRow() {
  const sectionRef = useScrollReveal({ selector: '.stat-card', stagger: 0.12 })

  return (
    <section ref={sectionRef} className="px-6 py-16">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label} className="stat-card">
              <StatsCounter
                endValue={stat.endValue}
                suffix={stat.suffix}
                label={stat.label}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
