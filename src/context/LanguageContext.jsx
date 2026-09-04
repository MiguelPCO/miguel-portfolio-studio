import { createContext, useContext, useEffect, useMemo, useState } from 'react'

const LanguageContext = createContext(null)

export function LanguageProvider({ children }) {
  const [lang, setLang] = useState(() => {
    const stored = localStorage.getItem('portfolio-lang')
    return stored === 'en' ? 'en' : 'es'
  })

  useEffect(() => {
    document.documentElement.lang = lang
    localStorage.setItem('portfolio-lang', lang)
  }, [lang])

  const toggleLang = () => setLang((l) => (l === 'es' ? 'en' : 'es'))

  const value = useMemo(() => ({ lang, toggleLang }), [lang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => {
  const ctx = useContext(LanguageContext)
  if (!ctx) throw new Error('useLanguage debe usarse dentro de LanguageProvider')
  return ctx
}

export function translate(lang, value) {
  if (value && typeof value === 'object' && ('es' in value || 'en' in value)) {
    return value[lang] ?? value.es ?? ''
  }
  return value
}

export function useTranslate() {
  const { lang } = useLanguage()
  return (value) => translate(lang, value)
}
