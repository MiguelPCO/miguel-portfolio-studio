import { Link } from 'react-router'
import DiamondIcon from '../ui/DiamondIcon'

const footerLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
  { href: '/contact', label: 'Contact' },
]

export default function Footer() {
  return (
    <footer className="bg-ink dark:bg-[#0D0D0D] text-white py-16 px-6">
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label="Ir al inicio">
              <DiamondIcon className="w-8 h-8 text-accent" />
              <span className="font-display font-bold text-xl">STUDIO</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              Design studio focused on building brands that stand out.
              We craft visual identities, websites, and digital experiences.
            </p>
          </div>

          {/* Links de navegación */}
          <nav className="flex flex-wrap gap-6" aria-label="Footer navigation">
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted hover:text-white transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Separador + copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Studio. All rights reserved.
          </p>
          <p className="text-xs text-muted">
            Designed & developed with passion.
          </p>
        </div>
      </div>
    </footer>
  )
}
