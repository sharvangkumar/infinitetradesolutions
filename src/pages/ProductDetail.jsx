import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { MapPin, Shield, Globe, Check, ChevronLeft, Phone, Mail, Loader } from 'lucide-react'
import { submitEnquiry } from '../services/enquiry'
import { products } from '../data/products'
import './ProductDetail.css'

export default function ProductDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const product = products.find(p => p.id === +id)
  const [form, setForm] = useState({ firstName: '', lastName: '', email: '', country: 'India', phone: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [activeImg, setActiveImg] = useState(0)

  if (!product) return (
    <div style={{ padding: '8rem 2rem', textAlign: 'center' }}>
      <h2>Product not found</h2>
      <Link to="/products" className="btn-primary" style={{ marginTop: '1rem', display: 'inline-flex' }}>← Back to Inventory</Link>
    </div>
  )

  const related = products.filter(p => p.id !== product.id && p.category === product.category).slice(0, 3)
  const images = [product.image, product.image, product.image, product.image]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await submitEnquiry({ ...form, product: product.name, source: 'Product Detail Page' })
    setLoading(false)
    setSubmitted(true)
  }

  return (
    <>
      <Helmet>
        <title>{product.name} | Infinite Trade Solutions</title>
        <meta name="description" content={`${product.name} - ${product.category} available at $${product.price.toLocaleString()}. ${product.description.slice(0, 120)}...`} />
      </Helmet>

      <div className="detail-page">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link><span>›</span>
            <Link to="/products">Products</Link><span>›</span>
            <span>{product.name}</span>
          </nav>

          <div className="detail-grid">
            {/* LEFT - IMAGES + INFO */}
            <div className="detail-left">
              <div className="main-image">
                <img src={images[activeImg]} alt={product.name} />
                <div className="img-badges">
                  <span className="badge-tag">New Arrival</span>
                  <span className="badge-tag">Verified Specs</span>
                </div>
              </div>
              <div className="thumb-strip">
                {images.map((img, i) => (
                  <button key={i} className={`thumb${activeImg === i ? ' active' : ''}`} onClick={() => setActiveImg(i)} aria-label={`View image ${i+1}`}>
                    <img src={img} alt="" />
                  </button>
                ))}
                <div className="thumb-count">+{images.length} Photos</div>
              </div>

              <h1 className="detail-title">{product.name} {product.category}</h1>
              <div className="detail-meta">
                <span className="detail-price">${product.price.toLocaleString()}</span>
                <span className="detail-loc"><MapPin size={13} /> {product.location}</span>
                <span className="detail-verified"><Shield size={13} /> Verified Exporter</span>
              </div>

              <div className="specs-table" aria-label="Technical specifications">
                <div className="specs-label">Technical Specifications</div>
                <div className="specs-grid">
                  {Object.entries(product.specs).map(([k, v]) => (
                    <div key={k} className="spec-cell">
                      <span>{k}</span>
                      <strong>{v}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className="detail-description">
                <h2>Equipment Overview</h2>
                <p>{product.description}</p>
                <div className="detail-cols">
                  <div>
                    <h3>Key Features</h3>
                    <ul>
                      {product.features.map(f => <li key={f}><Check size={14} /> {f}</li>)}
                    </ul>
                  </div>
                  <div>
                    <h3>Maintenance History</h3>
                    <ul>
                      {product.maintenance.map(m => <li key={m}><Check size={14} /> {m}</li>)}
                    </ul>
                  </div>
                </div>
              </div>

              <div className="trust-badges">
                <div className="trust-badge-item"><Shield size={16} /> <span>IndiaMart Certified<br /><small>Verified listed supplier</small></span></div>
                <div className="trust-badge-item"><Globe size={16} /> <span>Verified Exporter<br /><small>Global Logistics Partner</small></span></div>
              </div>
            </div>

            {/* RIGHT - FORM */}
            <div className="detail-right">
              <div className="quote-form-card">
                <h3>Request a Quote</h3>
                <p>Professional Inquiries only. Guaranteed response within 12 hours.</p>

                {submitted ? (
                  <div className="form-success">
                    <Check size={32} />
                    <strong>Enquiry Submitted!</strong>
                    <p>Our team will contact you within 12 hours. Or call us directly:</p>
                    <a href="tel:+918800784466" className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>
                      <Phone size={14} /> +91 88007 84466
                    </a>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} noValidate>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="firstName">First Name</label>
                        <input id="firstName" type="text" placeholder="John" value={form.firstName} onChange={e => setForm(f => ({...f, firstName: e.target.value}))} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="lastName">Last Name</label>
                        <input id="lastName" type="text" placeholder="Doe" value={form.lastName} onChange={e => setForm(f => ({...f, lastName: e.target.value}))} required />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="email">Email Address</label>
                      <input id="email" type="email" placeholder="john@example.com" value={form.email} onChange={e => setForm(f => ({...f, email: e.target.value}))} required />
                    </div>
                    <div className="form-row">
                      <div className="form-group">
                        <label htmlFor="country">Country</label>
                        <select id="country" value={form.country} onChange={e => setForm(f => ({...f, country: e.target.value}))}>
                          <option>India</option><option>Russia</option><option>UAE</option><option>Kenya</option><option>Other</option>
                        </select>
                      </div>
                      <div className="form-group">
                        <label htmlFor="phone">Phone</label>
                        <input id="phone" type="tel" placeholder="+91" value={form.phone} onChange={e => setForm(f => ({...f, phone: e.target.value}))} />
                      </div>
                    </div>
                    <div className="form-group">
                      <label htmlFor="message">Message</label>
                      <textarea id="message" rows={3} placeholder={`I am interested in the ${product.name}...`} value={form.message} onChange={e => setForm(f => ({...f, message: e.target.value}))} />
                    </div>
                    <button type="submit" className="btn-primary submit-btn" disabled={loading}>{loading ? <><Loader size={14} className="spin" /> Sending...</> : 'Submit Inquiry'}</button>
                  </form>
                )}

                <div className="instant-support">
                  Prefer Instant Support?
                  <a href="tel:+918800784466"><Phone size={14} /> +91 88007 84466</a>
                </div>
              </div>
            </div>
          </div>

          {/* RELATED */}
          {related.length > 0 && (
            <div className="related-section">
              <div className="related-header">
                <div>
                  <h2>Similar Equipment</h2>
                  <p>Recommended based on your current viewing history.</p>
                </div>
                <Link to="/products" className="view-all-link">View All Inventory →</Link>
              </div>
              <div className="related-grid">
                {related.map(p => (
                  <Link to={`/products/${p.id}`} key={p.id} className="related-card">
                    <img src={p.image} alt={p.name} loading="lazy" />
                    <div className="related-info">
                      <h4>{p.name}</h4>
                      <span className="related-price">${p.price.toLocaleString()}</span>
                      <span className="related-meta">{p.year} Model · {p.hours || 'New Unit'}</span>
                      <button className="btn-outline-dark">View Details</button>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
