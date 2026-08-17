import { useRef } from 'react'
import { Link } from 'react-router'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import DiamondIcon from '../ui/DiamondIcon'
import { prefersReducedMotion, EASE_BACK } from '../animations/animationConfig'

const socialLinks = [
  { name: 'GitHub', icon: 'GH', href: 'https://github.com/MiguelPCO' },
  { name: 'LinkedIn', icon: 'LI', href: 'https://www.linkedin.com/in/miguelcastillo-dev' },
  { name: 'Email', icon: '@', href: 'mailto:miguelcastilloolivares@gmail.com', full: true },
]

// Hover animación para iconos sociales — no depende de props/estado del componente
function handleMouseEnter(e) {
  if (prefersReducedMotion()) return
  const icon = e.currentTarget.querySelector('.social-icon')
  gsap.to(icon, { scale: 1.2, duration: 0.3, ease: EASE_BACK })
}

function handleMouseLeave(e) {
  if (prefersReducedMotion()) return
  const icon = e.currentTarget.querySelector('.social-icon')
  gsap.to(icon, { scale: 1, duration: 0.2, ease: 'power2.out' })
}

export default function CTASection() {
  const sectionRef = useRef(null)

  useGSAP(() => {
    if (prefersReducedMotion()) return

    // Rotación continua del objeto 3D decorativo
    gsap.to('.cta-3d-object', {
      rotation: 360,
      duration: 40,
      ease: 'none',
      repeat: -1,
      transformOrigin: 'center center',
    })
  }, { scope: sectionRef })

  return (
    <section ref={sectionRef} className="px-6 py-20 md:py-30">
      <div className="max-w-[1200px] mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Card principal — CTA */}
          <div className="relative bg-card rounded-[24px] p-10 md:p-14 overflow-hidden flex flex-col justify-between min-h-[400px]">
            {/* Tag */}
            <div className="inline-flex items-center gap-2 mb-6">
              <DiamondIcon className="w-4 h-4 text-accent" />
              <span className="text-xs font-semibold uppercase tracking-widest text-muted">
                Trabajemos juntos
              </span>
            </div>

            <div>
              <h2 className="font-display font-bold text-3xl md:text-5xl leading-tight mb-8">
                ¿Listo para dar vida<br />a tu proyecto?
              </h2>
              <Link
                to="/contact"
                className="inline-flex items-center gap-3 bg-ink text-surface
                           px-6 py-3 rounded-full font-semibold text-sm
                           hover:opacity-90 transition-opacity"
                aria-label="Ir a contacto"
              >
                Hablemos
                <span className="w-7 h-7 bg-accent rounded-full flex items-center
                                 justify-center text-ink text-xs">
                  →
                </span>
              </Link>
            </div>

            {/* [PLACEHOLDER 3D: flor/espiral cromada decorativa] */}
            <div className="cta-3d-object absolute -bottom-8 -right-8 w-40 h-40
                            bg-gradient-to-br from-gray-300 to-gray-500 rounded-full
                            opacity-20 blur-sm" />
          </div>

          {/* Grid 2x2 — Redes sociales */}
          <div className="grid grid-cols-2 gap-4">
            {socialLinks.map((social) => {
              const isExternal = social.href.startsWith('http')
              return (
                <a
                  key={social.name}
                  href={social.href}
                  {...(isExternal && { target: '_blank', rel: 'noopener noreferrer' })}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  className={`bg-card rounded-[24px] flex items-center justify-center
                             min-h-[190px] hover:bg-ink/10 transition-colors
                             ${social.full ? 'col-span-2' : ''}`}
                  aria-label={`Visitar ${social.name}`}
                >
                  <span className="social-icon text-3xl font-display font-bold text-ink">
                    {social.icon}
                  </span>
                </a>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
