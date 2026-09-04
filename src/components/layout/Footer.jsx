import { Link } from 'react-router'
import DiamondIcon from '../ui/DiamondIcon'
import { useTranslate } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

const footerLinks = [
  { href: '/', label: strings.nav.home },
  { href: '/about', label: strings.nav.about },
  { href: '/projects', label: strings.nav.projects },
  { href: '/services', label: strings.nav.services },
  { href: '/contact', label: strings.nav.contact },
]

export default function Footer() {
  const t = useTranslate()

  return (
    <footer className="bg-ink dark:bg-[#0D0D0D] text-white py-16 px-6" data-cursor-dark>
      <div className="max-w-[1200px] mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
          {/* Logo y descripción */}
          <div className="max-w-sm">
            <Link to="/" className="flex items-center gap-2 mb-4" aria-label={t(strings.nav.goHome)}>
              <DiamondIcon className="w-8 h-8 text-accent" />
              <span className="font-display font-bold text-xl">STUDIO</span>
            </Link>
            <p className="text-muted text-sm leading-relaxed">
              {t(strings.footer.bio)}
            </p>
          </div>

          {/* Links de navegación */}
          <nav className="flex flex-wrap gap-6" aria-label={t(strings.footer.navLabel)}>
            {footerLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="text-sm text-muted hover:text-white transition-colors"
              >
                {t(link.label)}
              </Link>
            ))}
          </nav>
        </div>

        {/* Separador + copyright */}
        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted">
            © {new Date().getFullYear()} Studio. {t(strings.footer.rights)}
          </p>
          <p className="text-xs text-muted">
            {t(strings.footer.builtWith)}
          </p>
        </div>
      </div>
    </footer>
  )
}
