import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Resend en modo sandbox (sin dominio verificado) solo permite enviar
// al email de la propia cuenta. Verifica un dominio en resend.com/domains
// para poder enviar a miguelcastilloolivares@gmail.com u otra dirección.
const TO_EMAIL = 'xtremzmiguel@gmail.com'

// Templates creados en resend.com/templates
const NOTIFICATION_TEMPLATE_ID = '80abbd35-f9f5-4002-90ed-a0935a5c13da'
const CONFIRMATION_TEMPLATE_ID = '09a7e36e-c86c-4133-b8e6-8f682ebe713b'

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { name, email, location, message } = req.body ?? {}

  if (!name || !email || !message || String(message).length < 10) {
    return res.status(400).json({ error: 'Datos del formulario inválidos' })
  }

  try {
    const { error } = await resend.emails.send({
      from: 'Portfolio <onboarding@resend.dev>',
      to: TO_EMAIL,
      replyTo: email,
      template: {
        id: NOTIFICATION_TEMPLATE_ID,
        variables: {
          NAME: name,
          EMAIL: email,
          LOCATION: location || 'No especificada',
          MESSAGE: message,
        },
      },
    })

    // El SDK de Resend no lanza excepción en fallo: devuelve { data, error }
    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ error: 'No se pudo enviar el mensaje' })
    }

    // Best-effort: auto-respuesta al remitente. En sandbox (sin dominio
    // verificado) Resend rechaza envíos a cualquier email que no sea el de
    // la propia cuenta, así que esto fallará hasta verificar un dominio en
    // resend.com/domains — no debe romper la respuesta principal.
    resend.emails
      .send({
        from: 'Miguel <onboarding@resend.dev>',
        to: email,
        template: {
          id: CONFIRMATION_TEMPLATE_ID,
          variables: { NAME: name, MESSAGE: message },
        },
      })
      .then(({ error: confirmError }) => {
        if (confirmError) console.error('Resend confirmation error:', confirmError)
      })
      .catch((confirmError) => console.error('Resend confirmation error:', confirmError))

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(502).json({ error: 'No se pudo enviar el mensaje' })
  }
}
