/**
 * ENQUIRY SERVICE
 * Handles 3 things:
 * 1. Saves every enquiry to localStorage (instant, always works)
 * 2. Sends email via EmailJS (free tier: 200 emails/month)
 * 3. Optionally posts to Google Sheets via a webhook (free, unlimited)
 *
 * Setup instructions are in .env.example
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Copy .env.example → .env.local and fill in your keys
const CONFIG = {
  emailjs: {
    serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID || '',
    templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID || '',
    publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY || '',
  },
  // Google Sheets webhook (Apps Script URL)
  sheetsWebhookUrl: import.meta.env.VITE_SHEETS_WEBHOOK_URL || '',
}

// ─── LOCAL STORAGE ──────────────────────────────────────────────────────────
const STORAGE_KEY = 'its_enquiries'

export function saveEnquiryLocally(data) {
  try {
    const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    const entry = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      ...data
    }
    existing.unshift(entry) // newest first
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
    return entry
  } catch (e) {
    console.error('LocalStorage save failed:', e)
    return null
  }
}

export function getLocalEnquiries() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  } catch {
    return []
  }
}

// ─── EMAILJS ────────────────────────────────────────────────────────────────
async function sendViaEmailJS(formData) {
  const { serviceId, templateId, publicKey } = CONFIG.emailjs
  if (!serviceId || !templateId || !publicKey) {
    console.warn('EmailJS not configured — skipping email send')
    return { success: false, reason: 'not_configured' }
  }

  try {
    const { default: emailjs } = await import('@emailjs/browser')
    await emailjs.send(serviceId, templateId, {
      from_name: `${formData.firstName} ${formData.lastName}`,
      from_email: formData.email,
      phone: formData.phone || 'Not provided',
      country: formData.country,
      message: formData.message,
      product: formData.product || 'General Enquiry',
      to_email: 'info@infinitetrade.com',
    }, publicKey)
    return { success: true }
  } catch (e) {
    console.error('EmailJS error:', e)
    return { success: false, reason: e.message }
  }
}

// ─── GOOGLE SHEETS WEBHOOK ──────────────────────────────────────────────────
async function sendToGoogleSheets(formData) {
  const url = CONFIG.sheetsWebhookUrl
  if (!url) {
    console.warn('Google Sheets webhook not configured — skipping')
    return { success: false, reason: 'not_configured' }
  }

  try {
    await fetch(url, {
      method: 'POST',
      mode: 'no-cors', // Google Apps Script requires this
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        timestamp: new Date().toISOString(),
        ...formData
      })
    })
    return { success: true }
  } catch (e) {
    console.error('Sheets webhook error:', e)
    return { success: false, reason: e.message }
  }
}

// ─── MAIN SUBMIT FUNCTION ───────────────────────────────────────────────────
export async function submitEnquiry(formData) {
  // 1. Always save locally first (instant, no network needed)
  const saved = saveEnquiryLocally(formData)

  // 2. Fire email + sheets in parallel (non-blocking)
  const [emailResult, sheetsResult] = await Promise.allSettled([
    sendViaEmailJS(formData),
    sendToGoogleSheets(formData)
  ])

  return {
    success: true, // always succeeds because of local save
    id: saved?.id,
    email: emailResult.value,
    sheets: sheetsResult.value,
  }
}
