import { useState } from 'react'
import { Helmet } from 'react-helmet-async'
import { Phone, Mail, MapPin, Shield, Globe, CheckCircle, Send, Loader } from 'lucide-react'
import { submitEnquiry } from '../services/enquiry'
import './Contact.css'

const WHATSAPP_URL = 'https://wa.me/919958853509?text=Hello%2C%20I%20am%20interested%20in%20your%20heavy%20equipment.%20Please%20share%20details.'

export default function Contact() {
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', country: 'India', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})

  const validate = () => {
    const e = {}
    if (!form.firstName.trim()) e.firstName = 'Required'
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required'
    if (!form.message.trim()) e.message = 'Please describe your requirement'
    return e
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }
    setLoading(true)
    await submitEnquiry({ ...form, product: 'General Enquiry', source: 'Contact Page' })
    setLoading(false)
    setSubmitted(true)
  }

  const set = (field) => (e) => {
    setForm(f => ({ ...f, [field]: e.target.value }))
    if (errors[field]) setErrors(er => ({ ...er, [field]: null }))
  }

  return (
    <>
      <Helmet>
        <title>Contact Us | Infinite Trade Solutions</title>
        <meta name="description" content="Get in touch with Infinite Trade Solutions, Faridabad, Haryana. Call +91 995-885-3509 or email us for heavy equipment enquiries, export quotes, and technical support." />
      </Helmet>

      <div className="contact-page">
        {/* HERO */}
        <section className="contact-hero">
          <div className="contact-hero-bg" />
          <div className="container contact-hero-content">
            <h1>Get in Touch<br /><span className="amber">With Our Experts</span></h1>
            <p>Whether you need a custom quote or technical specifications, our engineering team is ready to assist your heavy equipment requirements globally.</p>
          </div>
        </section>

        {/* FORM + SIDEBAR */}
        <section className="contact-main">
          <div className="container contact-grid">
            {/* FORM */}
            <div className="contact-form-wrap">
              <h2>Send an Enquiry</h2>
              {submitted ? (
                <div className="success-box">
                  <CheckCircle size={40} />
                  <h3>Enquiry Received!</h3>
                  <p>Thank you, <strong>{form.firstName}</strong>. Our team will respond within 12 hours.</p>
                  <p>For urgent needs, call us directly:</p>
                  <a href="tel:+919958853509" className="btn-primary" style={{ justifyContent: 'center', marginTop: '0.5rem' }}>
                    <Phone size={14} /> +91 995-885-3509
                  </a>
                  <button className="reset-btn" onClick={() => { setForm({ firstName:'',lastName:'',email:'',country:'India',phone:'',message:'' }); setSubmitted(false) }}>
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="contact-form">
                  <div className="form-row">
                    <div className={`form-group${errors.firstName ? ' error' : ''}`}>
                      <label htmlFor="c-first">First Name *</label>
                      <input id="c-first" type="text" placeholder="John" value={form.firstName} onChange={set('firstName')} />
                      {errors.firstName && <span className="err-msg">{errors.firstName}</span>}
                    </div>
                    <div className="form-group">
                      <label htmlFor="c-last">Last Name</label>
                      <input id="c-last" type="text" placeholder="Doe" value={form.lastName} onChange={set('lastName')} />
                    </div>
                  </div>
                  <div className={`form-group${errors.email ? ' error' : ''}`}>
                    <label htmlFor="c-email">Email Address *</label>
                    <input id="c-email" type="email" placeholder="john.doe@company.com" value={form.email} onChange={set('email')} />
                    {errors.email && <span className="err-msg">{errors.email}</span>}
                  </div>
                  <div className="form-row">
                    <div className="form-group">
                      <label htmlFor="c-country">Country</label>
                      <select id="c-country" value={form.country} onChange={set('country')}>
                        {['India','Russia','UAE','Saudi Arabia','Kenya','Nigeria','UK','USA','Other'].map(c => <option key={c}>{c}</option>)}
                      </select>
                    </div>
                    <div className="form-group">
                      <label htmlFor="c-phone">Phone Number</label>
                      <div className="phone-wrap">
                        <span className="phone-code">+91</span>
                        <input id="c-phone" type="tel" placeholder="995-885-3509" value={form.phone} onChange={set('phone')} />
                      </div>
                    </div>
                  </div>
                  <div className={`form-group${errors.message ? ' error' : ''}`}>
                    <label htmlFor="c-msg">Message *</label>
                    <textarea id="c-msg" rows={5} placeholder="Describe your technical requirements or machinery specifications..." value={form.message} onChange={set('message')} />
                    {errors.message && <span className="err-msg">{errors.message}</span>}
                  </div>
                  <button type="submit" className="btn-primary submit-full" disabled={loading}>
                    {loading ? <><Loader size={15} className="spin" /> Sending...</> : <><Send size={15} /> Send Enquiry</>}
                  </button>
                </form>
              )}
            </div>

            {/* SIDEBAR */}
            <div className="contact-sidebar">
              <div className="direct-channels">
                <h3>Direct Channels</h3>
                <div className="channel">
                  <Phone size={18} />
                  <div>
                    <span className="ch-label">Call Us</span>
                    <a href="tel:+919958853509" className="ch-value">+91 995-885-3509</a>
                    <a href="tel:+911294000000" className="ch-value secondary">+91 129 400 0000</a>
                  </div>
                </div>
                <div className="channel">
                  <Mail size={18} />
                  <div>
                    <span className="ch-label">Email Us</span>
                    <a href="mailto:sales@infinitetrade.com" className="ch-value">sales@infinitetrade.com</a>
                    <a href="mailto:info@infinitetrade.com" className="ch-value secondary">info@infinitetrade.com</a>
                  </div>
                </div>
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="whatsapp-btn">
                  <WhatsAppIcon />
                  Chat on WhatsApp
                </a>
              </div>

              <div className="industry-creds">
                <h4>Industry Credentials</h4>
                <div className="cred-row"><Shield size={16} /> <span><strong>IndiaMart Certified</strong><small>Premium Supplier Status</small></span></div>
                <div className="cred-row"><Globe size={16} /> <span><strong>Verified Exporter</strong><small>Global Trade Compliant</small></span></div>
                <div className="cred-row"><CheckCircle size={16} /> <span><strong>GST Verified</strong><small>GSTIN 06AAKFI1554M1Z4 · Registered 2024</small></span></div>
              </div>
            </div>
          </div>
        </section>

        {/* MAP SECTION */}
        <section className="map-section">
          <div className="container map-grid">
            <div className="map-info">
              <h2>Global Headquarters</h2>
              <address>
                <MapPin size={18} />
                <div>
                  House No 2 B Block, Vijay Nagar,<br />
                  Faridabad – 121004,<br />
                  Haryana, India
                </div>
              </address>
              <p>Our strategic location in the industrial hub of Haryana allows us to streamline logistics and expedite equipment delivery across the subcontinent and beyond.</p>
              <div className="map-details">
                <div><strong>Business Hours</strong><span>Mon–Sat: 9:00 AM – 6:30 PM IST</span></div>
                <div><strong>Response Time</strong><span>Enquiries answered within 12 hours</span></div>
                <div><strong>Export Support</strong><span>24/7 for international clients</span></div>
              </div>
            </div>

            <div className="map-embed">
              <iframe
                title="Infinite Trade Solutions Location - Vijay Nagar, Faridabad, Haryana"
                src="https://www.google.com/maps?q=Vijay+Nagar%2C+Faridabad%2C+Haryana+121004%2C+India&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </section>
      </div>
    </>
  )
}

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
    </svg>
  )
}
