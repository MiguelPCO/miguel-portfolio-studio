import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router'
import { cn } from '../../lib/utils'
import DiamondIcon from '../ui/DiamondIcon'
import { useTheme } from '../../context/ThemeContext'

function SunIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  )
}

function MoonIcon() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
    </svg>
  )
}

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/services', label: 'Services' },
]

export default function Navbar() {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Cerrar menú al cambiar de ruta
  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname])

  // Bloquear scroll del body cuando el menú está abierto
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className={cn(
        'fixed top-0 w-full z-50 px-6 py-4 transition-all duration-300',
        scrolled ? 'bg-surface/90 backdrop-blur-md shadow-sm' : 'bg-transparent'
      )}
    >
      <nav className="max-w-[1200px] mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2" aria-label="Ir al inicio">
          <DiamondIcon className="w-8 h-8 text-ink" />
        </Link>

        {/* Nav links — desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                aria-current={isActive ? 'page' : undefined}
                className={cn(
                  'px-5 py-2 rounded-full text-sm font-medium transition-all',
                  isActive
                    ? 'bg-ink text-surface'
                    : 'text-ink/70 hover:bg-card'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </div>

        {/* Controles derecha — desktop */}
        <div className="hidden md:flex items-center gap-3">
          {/* Theme toggle */}
          <button
            onClick={toggleTheme}
            className="p-2.5 rounded-full text-ink/70 hover:bg-card transition-colors"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
          </button>

          {/* CTA */}
          <Link
            to="/contact"
            className="flex items-center gap-2 bg-accent text-ink
                       px-5 py-2.5 rounded-full text-sm font-semibold
                       hover:bg-yellow-300 transition-colors"
            aria-label="Ir a contacto"
          >
            Get In Touch
            <span className="w-6 h-6 bg-ink text-surface rounded-full flex items-center
                             justify-center text-xs">
              →
            </span>
          </Link>
        </div>

        {/* Hamburger — mobile */}
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="md:hidden flex flex-col gap-1.5 p-2"
          aria-label={menuOpen ? 'Cerrar menú' : 'Abrir menú'}
          aria-expanded={menuOpen}
        >
          <span className={cn(
            'w-6 h-0.5 bg-ink transition-all duration-300',
            menuOpen && 'rotate-45 translate-y-2'
          )} />
          <span className={cn(
            'w-6 h-0.5 bg-ink transition-all duration-300',
            menuOpen && 'opacity-0'
          )} />
          <span className={cn(
            'w-6 h-0.5 bg-ink transition-all duration-300',
            menuOpen && '-rotate-45 -translate-y-2'
          )} />
        </button>
      </nav>

      {/* Menú mobile — overlay */}
      {menuOpen && (
        <div className="md:hidden fixed inset-0 top-[72px] bg-surface z-40 flex flex-col items-center justify-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.href
            return (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  'text-2xl font-display font-bold transition-colors',
                  isActive ? 'text-accent' : 'text-ink'
                )}
              >
                {link.label}
              </Link>
            )
          })}
          {/* Theme toggle — mobile */}
          <button
            onClick={toggleTheme}
            className="flex items-center gap-2 text-ink/60 text-sm font-medium"
            aria-label={theme === 'dark' ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
          >
            {theme === 'dark' ? <SunIcon /> : <MoonIcon />}
            <span>{theme === 'dark' ? 'Modo claro' : 'Modo oscuro'}</span>
          </button>

          <Link
            to="/contact"
            className="mt-4 flex items-center gap-2 bg-accent text-ink
                       px-8 py-3 rounded-full text-lg font-semibold"
          >
            Get In Touch
            <span className="w-7 h-7 bg-ink text-surface rounded-full flex items-center
                             justify-center text-sm">
              →
            </span>
          </Link>
        </div>
      )}
    </header>
  )
}
