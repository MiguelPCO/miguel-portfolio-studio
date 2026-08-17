import { useState, useRef } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useGSAP } from '@gsap/react'
import { gsap } from 'gsap'
import Button from '../ui/Button'
import { prefersReducedMotion } from '../animations/animationConfig'

// Esquema de validación
const contactSchema = z.object({
  name: z.string().min(2, 'El nombre es requerido'),
  email: z.email('Email inválido'),
  location: z.string().optional(),
  message: z.string().min(10, 'El mensaje debe tener al menos 10 caracteres'),
})

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false)
  const successRef = useRef(null)
  const formRef = useRef(null)

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
  })

  const { contextSafe } = useGSAP(() => {}, { scope: formRef })

  const onSubmit = contextSafe(async (data) => {
    // [PLACEHOLDER: integrar con Resend o EmailJS]
    console.log('Formulario enviado:', data)

    // Simular envío
    await new Promise((r) => setTimeout(r, 800))

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
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl">
                ✓
              </div>
              <h3 className="font-display font-bold text-2xl text-ink mb-2">
                ¡Mensaje enviado!
              </h3>
              <p className="text-muted">Te respondo en menos de 24 horas.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-ink mb-2">
                  Nombre
                </label>
                <input
                  id="name"
                  type="text"
                  placeholder="Tu nombre"
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
                  Email
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
                  Ubicación
                </label>
                <select
                  id="location"
                  className={inputBase}
                  {...register('location')}
                >
                  <option value="">Selecciona tu ubicación</option>
                  <option value="spain">España</option>
                  <option value="europe">Europa</option>
                  <option value="latam">Latinoamérica</option>
                  <option value="north-america">Norteamérica</option>
                  <option value="other">Otro</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-ink mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  rows={5}
                  placeholder="Cuéntame sobre tu proyecto..."
                  className={`${inputBase} resize-none`}
                  aria-describedby={errors.message ? 'message-error' : undefined}
                  {...register('message')}
                />
                {errors.message && (
                  <p id="message-error" className="text-red-500 text-xs mt-1">{errors.message.message}</p>
                )}
              </div>

              {/* Submit */}
              <Button
                variant="yellow-pill"
                onClick={handleSubmit(onSubmit)}
                ariaLabel="Enviar formulario"
                className={isSubmitting ? 'opacity-70 pointer-events-none' : ''}
              >
                {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
              </Button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
