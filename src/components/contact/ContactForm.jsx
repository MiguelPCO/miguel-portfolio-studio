import { useState, useRef, useMemo, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'
import { useTranslate, useLanguage } from '../../context/LanguageContext'
import { strings } from '../../i18n/strings'

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const [hasSendError, setHasSendError] = useState(false)
  const successRef = useRef(null)
  const formRef = useRef(null)
  const t = useTranslate()
  const { lang } = useLanguage()

  // Esquema de validación — reconstruido por idioma, ya que Zod fija los mensajes
  // de error en el esquema al crearlo (no se resuelven dinámicamente como el JSX)
  const contactSchema = useMemo(() => z.object({
    name: z.string().min(2, t(strings.contact.formNameError)),
    email: z.email(t(strings.contact.formEmailError)),
    location: z.string().optional(),
    message: z.string().min(10, t(strings.contact.formMessageError)),
  }), [lang])

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
    trigger,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  // Si el usuario cambia de idioma mientras hay errores de validación visibles,
  // se revalidan para que el mensaje de error se muestre en el idioma activo
  // (el resolver de Zod ya se reconstruyó arriba con el nuevo idioma).
  useEffect(() => {
    if (Object.keys(errors).length > 0) {
      trigger()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang])

  const { contextSafe } = useGSAP(() => {}, { scope: formRef })

  const onSubmit = contextSafe(async (data) => {
    setHasSendError(false)

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) throw new Error('send failed')

      setSubmitted(true)
      reset()

      // Animación de éxito
      if (!prefersReducedMotion() && successRef.current) {
        gsap.fromTo(successRef.current,
          { scale: 0, opacity: 0 },
          { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.5)' }
        )
      }

      // Resetear estado después de 3 segundos
      setTimeout(() => setSubmitted(false), 3000)
    } catch {
      setHasSendError(true)
    }
  })

  const inputBase = `w-full bg-white dark:bg-card border border-gray-200 dark:border-ink/20 rounded-[16px] px-5 py-4 text-sm text-ink
                     placeholder:text-muted outline-none transition-all
                     focus:border-accent focus:shadow-[0_0_0_3px_rgba(255,232,48,0.2)]`

  return (
    <section ref={formRef} className="px-6 pb-20">
      <div className="max-w-[1200px] mx-auto">
        <div className="bg-card rounded-[24px] p-8 md:p-12 max-w-2xl mx-auto">
          {submitted ? (
            <div ref={successRef} className="text-center py-12">
              <div className="w-16 h-16 bg-accent text-accent-ink rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-2">
                {t(strings.contact.formSuccessTitle)}
              </h3>
              <p className="text-muted">{t(strings.contact.formSuccessBody)}</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                  {t(strings.contact.formNameLabel)}
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder={t(strings.contact.formNamePlaceholder)}
                  className={inputBase}
                  aria-describedby={errors.name ? 'name-error' : undefined}
                  {...register('name')}
                />
                {errors.name && (
                  <p id="name-error" className="text-red-500 text-xs mt-1">{errors.name.message}</p>
                )}
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-ink mb-2">
                  {t(strings.contact.formEmailLabel)}
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  className={inputBase}
                  aria-describedby={errors.email ? 'email-error' : undefined}
                  {...register('email')}
                />
                {errors.email && (
                  <p id="email-error" className="text-red-500 text-xs mt-1">{errors.email.message}</p>
                )}
              </div>

              {/* Location */}
              <div>
                <label htmlFor="location" className="block text-sm font-medium text-ink mb-2">
                  {t(strings.contact.formLocationLabel)}
                </label>
                <select
                  id="location"
                  className={inputBase}
                  {...register('location')}
                >
                  <option value="">{t(strings.contact.formLocationPlaceholder)}</option>
                  <option value="spain">{t(strings.contact.formLocationSpain)}</option>
                  <option value="europe">{t(strings.contact.formLocationEurope)}</option>
                  <option value="latam">{t(strings.contact.formLocationLatam)}</option>
                  <option value="north-america">{t(strings.contact.formLocationNorthAmerica)}</option>
                  <option value="other">{t(strings.contact.formLocationOther)}</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                  {t(strings.contact.formMessageLabel)}
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder={t(strings.contact.formMessagePlaceholder)}
                  className={`${inputBase} resize-none`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message')}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {hasSendError && (
                <p className="text-red-500 text-sm">{t(strings.contact.formSendError)}</p>
              )}

              {/* Submit */}
              <Button
                variant="yellow-pill"
                onClick={handleSubmit(onSubmit)}
                ariaLabel={t(strings.contact.formSubmitAria)}
                className={isSubmitting ? 'opacity-70 pointer-events-none' : ''}
              >
                {isSubmitting ? t(strings.contact.formSubmitBusy) : t(strings.contact.formSubmitIdle)}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
