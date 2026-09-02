import { useRef } from 'react'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../animations/animationConfig'

// Iconos de línea inline (stroke, currentColor) — mismo tratamiento minimal que el resto de la UI
const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
  className: 'w-5 h-5',
  'aria-hidden': true,
}

const MailIcon = () => (
  <svg {...iconProps}>
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const MapPinIcon = () => (
  <svg {...iconProps}>
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
)

const GithubIcon = () => (
  <svg {...iconProps} strokeWidth={1.5}>
    <path d="M9 19c-4.3 1.4-4.3-2.5-6-3m12 5v-3.5c0-1 .1-1.4-.5-2 2.8-.3 5.5-1.4 5.5-6a4.6 4.6 0 0 0-1.3-3.2 4.2 4.2 0 0 0-.1-3.2s-1.1-.3-3.5 1.3a12.3 12.3 0 0 0-6.2 0C6.5 2.8 5.4 3.1 5.4 3.1a4.2 4.2 0 0 0-.1 3.2A4.6 4.6 0 0 0 4 9.5c0 4.6 2.7 5.7 5.5 6-.6.6-.6 1.2-.5 2V21" />
  </svg>
)

const ClockIcon = () => (
  <svg {...iconProps}>
    <circle cx="12" cy="12" r="9" />
    <path d="M12 7v5l3 3" />
  </svg>
)

const infoCards = [
  {
    Icon: MailIcon,
    title: 'Email',
    lines: ['miguelcastilloolivares@gmail.com'],
  },
  {
    Icon: MapPinIcon,
    title: 'Ubicación',
    lines: ['España', 'Disponible para trabajo remoto'],
  },
  {
    Icon: GithubIcon,
    title: 'GitHub',
    lines: ['github.com/MiguelPCO'],
  },
  {
    Icon: ClockIcon,
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
        {infoCards.map(({ Icon, title, lines }) => (
          <div
            key={title}
            className="info-card bg-card rounded-[24px] p-8 relative"
          >
            {/* Icono */}
            <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center text-accent-ink mb-6">
              <Icon />
            </div>

            <h3 className="font-display font-bold text-lg text-ink mb-2">{title}</h3>
            {lines.map((line) => (
              <p key={line} className="text-sm text-muted">{line}</p>
            ))}
          </div>
        ))}
      </div>
    </section>
  )
}
