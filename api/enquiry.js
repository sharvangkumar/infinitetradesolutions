const nodemailer = require('nodemailer')

// Reused across warm invocations so we don't reconnect to SMTP on every request
let transporter = null

function getTransporter() {
  if (transporter) return transporter
  transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: Number(process.env.SMTP_PORT || 465),
    secure: Number(process.env.SMTP_PORT || 465) === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
  return transporter
}

function escapeHtml(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { firstName, lastName, email, phone, country, message, product, source } = req.body || {}

  if (!firstName || !email || !message) {
    return res.status(400).json({ error: 'firstName, email, and message are required' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({ error: 'Invalid email address' })
  }

  const mailTo = process.env.MAIL_TO || 'sales@infinitetradesolutions.com'
  const name = `${firstName} ${lastName || ''}`.trim()

  try {
    await getTransporter().sendMail({
      from: `"Infinite Trade Solutions Website" <${process.env.SMTP_USER}>`,
      to: mailTo,
      replyTo: email,
      subject: `New Enquiry: ${product || 'General Enquiry'} — ${name}`,
      text: [
        `Name: ${name}`,
        `Email: ${email}`,
        `Phone: ${phone || 'Not provided'}`,
        `Country: ${country || 'Not provided'}`,
        `Product: ${product || 'General Enquiry'}`,
        `Source: ${source || 'Website'}`,
        '',
        'Message:',
        message,
      ].join('\n'),
      html: `
        <h2>New Enquiry — ${escapeHtml(product || 'General Enquiry')}</h2>
        <p><strong>Name:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Phone:</strong> ${escapeHtml(phone || 'Not provided')}</p>
        <p><strong>Country:</strong> ${escapeHtml(country || 'Not provided')}</p>
        <p><strong>Source:</strong> ${escapeHtml(source || 'Website')}</p>
        <p><strong>Message:</strong><br>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
      `,
    })
    return res.status(200).json({ success: true })
  } catch (err) {
    console.error('SMTP send failed:', err)
    return res.status(502).json({ error: 'Failed to send email' })
  }
}
