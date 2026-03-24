import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet-async'
import { Inbox, Trash2, Download, RefreshCw, Phone, Mail, Globe, Calendar, Package } from 'lucide-react'
import { getLocalEnquiries } from '../services/enquiry'
import './Admin.css'

const ADMIN_PIN = '1234' // Change this to your PIN

export default function Admin() {
  const [authed, setAuthed] = useState(false)
  const [pin, setPin] = useState('')
  const [pinError, setPinError] = useState(false)
  const [enquiries, setEnquiries] = useState([])
  const [selected, setSelected] = useState(null)
  const [filter, setFilter] = useState('all')

  const load = () => setEnquiries(getLocalEnquiries())

  useEffect(() => { if (authed) load() }, [authed])

  const handlePin = (e) => {
    e.preventDefault()
    if (pin === ADMIN_PIN) { setAuthed(true); setPinError(false) }
    else { setPinError(true); setPin('') }
  }

  const deleteEnquiry = (id) => {
    const updated = enquiries.filter(e => e.id !== id)
    localStorage.setItem('its_enquiries', JSON.stringify(updated))
    setEnquiries(updated)
    if (selected?.id === id) setSelected(null)
  }

  const clearAll = () => {
    if (!window.confirm('Delete ALL enquiries? This cannot be undone.')) return
    localStorage.removeItem('its_enquiries')
    setEnquiries([])
    setSelected(null)
  }

  const exportCSV = () => {
    const headers = ['Date', 'Name', 'Email', 'Phone', 'Country', 'Product', 'Message', 'Source']
    const rows = enquiries.map(e => [
      new Date(e.timestamp).toLocaleString(),
      `${e.firstName} ${e.lastName}`,
      e.email, e.phone, e.country, e.product, e.message, e.source
    ])
    const csv = [headers, ...rows].map(r => r.map(v => `"${(v||'').replace(/"/g,'""')}"`).join(',')).join('\n')
    const blob = new Blob([csv], { type: 'text/csv' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = `enquiries-${Date.now()}.csv`; a.click()
    URL.revokeObjectURL(url)
  }

  const filtered = enquiries.filter(e => {
    if (filter === 'all') return true
    return (e.country || '').toLowerCase().includes(filter)
  })

  if (!authed) return (
    <>
      <Helmet><title>Admin | Infinite Trade Solutions</title></Helmet>
      <div className="admin-login">
        <div className="login-card">
          <div className="login-logo">ITS</div>
          <h2>Admin Access</h2>
          <p>Enter your PIN to view enquiries</p>
          <form onSubmit={handlePin}>
            <input
              type="password"
              placeholder="Enter PIN"
              value={pin}
              onChange={e => { setPin(e.target.value); setPinError(false) }}
              maxLength={8}
              autoFocus
              aria-label="Admin PIN"
            />
            {pinError && <span className="pin-error">Incorrect PIN. Try again.</span>}
            <button type="submit" className="btn-primary">Access Dashboard</button>
          </form>
          <p className="login-hint">Default PIN: 1234 — change in <code>src/pages/Admin.jsx</code></p>
        </div>
      </div>
    </>
  )

  return (
    <>
      <Helmet><title>Enquiries Dashboard | Infinite Trade Solutions</title></Helmet>
      <div className="admin-page">
        {/* HEADER */}
        <div className="admin-header">
          <div className="admin-title">
            <Inbox size={22} />
            <div>
              <h1>Enquiries Dashboard</h1>
              <p>{enquiries.length} total · {enquiries.filter(e => {
                const d = new Date(e.timestamp)
                const now = new Date()
                return now - d < 86400000 * 7
              }).length} this week</p>
            </div>
          </div>
          <div className="admin-actions">
            <button className="admin-btn" onClick={load} title="Refresh"><RefreshCw size={15} /></button>
            <button className="admin-btn" onClick={exportCSV} disabled={!enquiries.length}><Download size={15} /> Export CSV</button>
            <button className="admin-btn danger" onClick={clearAll} disabled={!enquiries.length}><Trash2 size={15} /> Clear All</button>
          </div>
        </div>

        {/* STATS */}
        <div className="admin-stats">
          {[
            { label: 'Total Enquiries', value: enquiries.length, color: 'navy' },
            { label: 'From India', value: enquiries.filter(e => e.country === 'India').length, color: 'amber' },
            { label: 'International', value: enquiries.filter(e => e.country !== 'India' && e.country).length, color: 'green' },
            { label: 'Today', value: enquiries.filter(e => new Date(e.timestamp).toDateString() === new Date().toDateString()).length, color: 'blue' }
          ].map(s => (
            <div key={s.label} className={`stat-box color-${s.color}`}>
              <div className="stat-num">{s.value}</div>
              <div className="stat-lbl">{s.label}</div>
            </div>
          ))}
        </div>

        {/* FILTER */}
        <div className="admin-filter">
          {['all', 'india', 'russia', 'uae'].map(f => (
            <button key={f} className={`filter-tab${filter === f ? ' active' : ''}`} onClick={() => setFilter(f)}>
              {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        {/* SPLIT VIEW */}
        <div className="admin-split">
          {/* LIST */}
          <div className="enquiry-list">
            {filtered.length === 0 ? (
              <div className="empty-state">
                <Inbox size={36} />
                <p>{enquiries.length === 0 ? 'No enquiries yet. Forms on the website will appear here.' : 'No enquiries match this filter.'}</p>
              </div>
            ) : filtered.map(e => (
              <div
                key={e.id}
                className={`enquiry-item${selected?.id === e.id ? ' active' : ''}`}
                onClick={() => setSelected(e)}
              >
                <div className="eq-avatar">{(e.firstName || '?')[0]}</div>
                <div className="eq-info">
                  <div className="eq-name">{e.firstName} {e.lastName}</div>
                  <div className="eq-meta">{e.country} · {e.product || 'General'}</div>
                  <div className="eq-preview">{e.message?.slice(0, 60)}...</div>
                </div>
                <div className="eq-time">{formatTime(e.timestamp)}</div>
              </div>
            ))}
          </div>

          {/* DETAIL */}
          <div className="enquiry-detail">
            {!selected ? (
              <div className="detail-empty">
                <Inbox size={40} />
                <p>Select an enquiry to view details</p>
              </div>
            ) : (
              <div className="detail-content">
                <div className="detail-top">
                  <div className="detail-avatar">{(selected.firstName || '?')[0]}</div>
                  <div>
                    <h3>{selected.firstName} {selected.lastName}</h3>
                    <div className="detail-source">{selected.source || 'Website Form'}</div>
                  </div>
                  <button className="delete-btn" onClick={() => deleteEnquiry(selected.id)} title="Delete enquiry">
                    <Trash2 size={16} />
                  </button>
                </div>

                <div className="detail-fields">
                  <div className="dfield"><Mail size={14} /><div><label>Email</label><a href={`mailto:${selected.email}`}>{selected.email}</a></div></div>
                  <div className="dfield"><Phone size={14} /><div><label>Phone</label><a href={`tel:${selected.phone}`}>{selected.phone || '—'}</a></div></div>
                  <div className="dfield"><Globe size={14} /><div><label>Country</label><span>{selected.country}</span></div></div>
                  <div className="dfield"><Package size={14} /><div><label>Product Enquired</label><span>{selected.product || 'General Enquiry'}</span></div></div>
                  <div className="dfield"><Calendar size={14} /><div><label>Received</label><span>{new Date(selected.timestamp).toLocaleString()}</span></div></div>
                </div>

                <div className="detail-message">
                  <label>Message</label>
                  <p>{selected.message}</p>
                </div>

                <div className="detail-ctas">
                  <a href={`mailto:${selected.email}?subject=Re: Your Equipment Enquiry&body=Dear ${selected.firstName},%0D%0A%0D%0AThank you for your enquiry about ${selected.product}.%0D%0A%0D%0A`} className="btn-primary">
                    <Mail size={14} /> Reply via Email
                  </a>
                  {selected.phone && (
                    <a href={`https://wa.me/${selected.phone.replace(/\D/g,'')}?text=Hello ${selected.firstName}, thank you for your enquiry about ${selected.product}.`} target="_blank" rel="noreferrer" className="wa-reply">
                      WhatsApp Reply
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  )
}

function formatTime(ts) {
  if (!ts) return ''
  const d = new Date(ts)
  const now = new Date()
  const diff = now - d
  if (diff < 3600000) return `${Math.floor(diff / 60000)}m ago`
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h ago`
  return d.toLocaleDateString()
}
