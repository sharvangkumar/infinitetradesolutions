/**
 * ENQUIRY SERVICE
 * Handles 3 things:
 * 1. Saves every enquiry to localStorage (instant, always works)
 * 2. Sends email via /api/enquiry (Vercel serverless function -> GoDaddy SMTP mailbox)
 * 3. Optionally posts to Google Sheets via a webhook (free, unlimited)
 *
 * Setup instructions are in .env.example
 */

// ─── CONFIG ────────────────────────────────────────────────────────────────
// Copy .env.example → .env.local and fill in your keys
const CONFIG = {
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

// ─── EMAIL (via serverless function) ────────────────────────────────────────
async function sendViaApi(formData) {
  try {
    const res = await fetch('/api/enquiry', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    })
    if (!res.ok) {
      const body = await res.json().catch(() => ({}))
      return { success: false, reason: body.error || `HTTP ${res.status}` }
    }
    return { success: true }
  } catch (e) {
    console.error('Enquiry email send failed:', e)
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
    sendViaApi(formData),
    sendToGoogleSheets(formData)
  ])

  return {
    success: true, // always succeeds because of local save
    id: saved?.id,
    email: emailResult.value,
    sheets: sheetsResult.value,
  }
}
