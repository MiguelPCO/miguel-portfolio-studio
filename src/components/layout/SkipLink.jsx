/** Skip link de accesibilidad — primer elemento focusable, visible solo con focus */
export default function SkipLink() {
  return (
    <a
      href="#main-content"
      className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100]
                 focus:bg-accent focus:text-ink focus:px-4 focus:py-2 focus:rounded-full
                 focus:text-sm focus:font-semibold focus:shadow-lg"
    >
      Saltar al contenido
    </a>
  )
}
