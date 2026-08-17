import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'

const infoCards = [
  {
    icon: '✉️',
    title: 'Email',
    lines: ['miguelcastilloolivares@gmail.com'],
  },
  {
    icon: '📍',
    title: 'Ubicación',
    lines: ['España', 'Disponible para trabajo remoto'],
  },
  {
    icon: '💻',
    title: 'GitHub',
    lines: ['github.com/MiguelPCO'],
  },
  {
    icon: '🕐',
    title: 'Disponibilidad',
    lines: ['Lunes – Viernes', '9:00 – 18:00'],
  },
]

export default function ContactInfo() {
  const gridRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    gsap.from('.info-card', {
      opacity: 0,
      y: 30,
      scale: 0.97,
      stagger: 0.08,
      duration: 0.6,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: gridRef.current,
        start: 'top 80%',
        toggleActions: 'play none none none',
      },
    })
  }, { scope: gridRef })

  return (
    <section className="px-6 pb-16">
      <div ref={gridRef} className="max-w-[1200px] mx-auto grid grid-cols-1 sm:grid-cols-2 gap-4">
        {infoCards.map((card) => (
          <div
            key={card.title}
            className="info-card bg-card rounded-[24px] p-8 relative"
          >
            {/* Icono */}
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-lg mb-6">
              {card.icon}
            </div>

            <h3 className="font-display font-bold text-lg text-ink mb-2">{card.title}</h3>
            {card.lines.map((line) => (
              <p key={line} className="text-sm text-muted">{line}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
