import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// Resend en modo sandbox (sin dominio verificado) solo permite enviar
// al email de la propia cuenta. Verifica un dominio en resend.com/domains
// para poder enviar a miguelcastilloolivares@gmail.com u otra dirección.
const TO_EMAIL = 'xtremzmiguel@gmail.com'

const escapeHtml = (str) =>
  String(str).replace(/[&<>"']/g, (c) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;',
  }[c]))

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
      subject: `Nuevo mensaje de ${name} — Portfolio`,
      html: `
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        ${location ? `<p><strong>Ubicación:</strong> ${escapeHtml(location)}</p>` : ''}
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })

    // El SDK de Resend no lanza excepción en fallo: devuelve { data, error }
    if (error) {
      console.error('Resend error:', error)
      return res.status(502).json({ error: 'No se pudo enviar el mensaje' })
    }

    return res.status(200).json({ ok: true })
  } catch (error) {
    console.error('Resend error:', error)
    return res.status(502).json({ error: 'No se pudo enviar el mensaje' })
  }
}
