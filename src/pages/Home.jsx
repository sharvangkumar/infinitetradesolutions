import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { ArrowRight, Shield, Truck, Headphones, Award, Star, ChevronRight } from 'lucide-react'
import { categories, testimonials, shipments } from '../data/products'
import './Home.css'

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0)
  useEffect(() => {
    if (!start) return
    let startTime = null
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      setCount(Math.floor(progress * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [target, duration, start])
  return count
}

function StatCard({ value, suffix, label, start }) {
  const num = useCountUp(parseInt(value), 1800, start)
  return (
    <div className="stat-card">
      <div className="stat-value">{num}{suffix}</div>
      <div className="stat-label">{label}</div>
    </div>
  )
}

export default function Home() {
  const statsRef = useRef(null)
  const [statsVisible, setStatsVisible] = useState(false)

  useEffect(() => {
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStatsVisible(true) },
      { threshold: 0.4 }
    )
    if (statsRef.current) obs.observe(statsRef.current)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      <Helmet>
        <title>Infinite Trade Solutions | Heavy Equipment Dealer & Exporter India</title>
        <meta name="description" content="India's trusted heavy equipment dealer & exporter. JCB, CASE, Caterpillar backhoe loaders, excavators & more from Faridabad, Haryana. Pan-India & global delivery." />
        <meta name="keywords" content="heavy equipment dealer India, JCB 3DX, CASE 770EX, excavator exporter, backhoe loader Faridabad, construction machinery Haryana" />
        <link rel="canonical" href="https://infinitetradesolutions.com/" />
      </Helmet>

      {/* HERO */}
      <section className="hero" aria-label="Hero banner">
        <div className="hero-bg" />
        <div className="container hero-content">
          <div className="hero-badge">
            <span>Faridabad HQ</span>
            <span className="divider">·</span>
            <span>Global Delivery</span>
          </div>
          <h1 className="hero-title">
            India's Trusted<br />
            <span className="amber">Heavy Equipment</span><br />
            Dealer &amp; Exporter
          </h1>
          <p className="hero-sub">
            Engineering excellence delivered from the heart of Haryana.<br />
            Providing premium construction machinery with a 100% response rate and seamless Pan-India and global logistics.
          </p>
          <div className="hero-ctas">
            <Link to="/products" className="btn-primary">
              View Inventory <ArrowRight size={15} />
            </Link>
            <Link to="/contact" className="btn-outline">
              Get Quote
            </Link>
          </div>
        </div>
        <div className="hero-scroll-hint" aria-hidden="true">↓</div>
      </section>

      {/* STATS */}
      <section className="stats-bar" ref={statsRef} aria-label="Company statistics">
        <div className="container stats-grid">
          <StatCard value={10} suffix="+" label="Equipment Brands" start={statsVisible} />
          <StatCard value={3} suffix="+" label="Years Experience" start={statsVisible} />
          <StatCard value={100} suffix="%" label="Response Rate" start={statsVisible} />
          <div className="stat-card">
            <div className="stat-value amber">Global</div>
            <div className="stat-label">Pan-India &amp; Export</div>
          </div>
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="categories-section" aria-labelledby="categories-heading">
        <div className="container">
          <div className="section-header">
            <div>
              <p className="section-label">Precision Fleet</p>
              <h2 id="categories-heading">Explore Categories</h2>
            </div>
            <p className="section-desc">
              Curated heavy machinery for mining, earthmoving, and infrastructure development. Built for performance in extreme conditions.
            </p>
          </div>
          <div className="categories-grid">
            {categories.map((cat, i) => (
              <Link
                to={`/products?category=${cat.slug}`}
                key={cat.name}
                className="category-card"
                style={{ animationDelay: `${i * 0.08}s` }}
                aria-label={`Browse ${cat.name}`}
              >
                <img src={cat.image} alt={cat.name} loading="lazy" />
                <div className="category-overlay">
                  <h3>{cat.name}</h3>
                  <span className="cat-count">{cat.count} units</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="trust-section" aria-labelledby="trust-heading">
        <div className="container">
          <div className="trust-header">
            <h2 id="trust-heading">Engineered for Trust</h2>
            <p>Providing more than just machinery — we provide the foundation for your next major project.</p>
          </div>
          <div className="trust-grid">
            {[
              { icon: <Award size={28} />, title: "Verified Exporter", desc: "Certified export processes ensuring hassle-free international delivery." },
              { icon: <Shield size={28} />, title: "Quality Assurance", desc: "Multi-point inspection on every unit before shipment." },
              { icon: <Truck size={28} />, title: "Timely Delivery", desc: "Strict adherence to delivery timelines globally." },
              { icon: <Headphones size={28} />, title: "Expert Support", desc: "24/7 technical assistance for all equipment inquiries." }
            ].map(t => (
              <div key={t.title} className="trust-card">
                <div className="trust-icon">{t.icon}</div>
                <h4>{t.title}</h4>
                <p>{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="testimonials-section" aria-labelledby="testimonials-heading">
        <div className="container">
          <h2 id="testimonials-heading" className="sr-only">Customer Testimonials</h2>
          <div className="testimonials-grid">
            {testimonials.map(t => (
              <div key={t.name} className="testimonial-card">
                <div className="stars" aria-label={`${t.rating} out of 5 stars`}>
                  {Array.from({ length: t.rating }).map((_, i) => <Star key={i} size={15} fill="var(--amber)" color="var(--amber)" />)}
                </div>
                <p className="testimonial-text">"{t.text}"</p>
                <div className="testimonial-author">
                  <div className="author-avatar">{t.name[0]}</div>
                  <div>
                    <div className="author-name">{t.name}</div>
                    <div className="author-loc">{t.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* RECENT SHIPMENTS */}
      <section className="shipments-section" aria-labelledby="shipments-heading">
        <div className="container">
          <p className="section-label">Global Operations</p>
          <h2 id="shipments-heading">Recent Shipments</h2>
          <div className="shipments-grid">
            {shipments.map(s => (
              <div key={s.model} className="shipment-card">
                <span className="shipment-flag">{s.flag}</span>
                <div>
                  <div className="shipment-model">{s.model}</div>
                  <div className="shipment-dest">to {s.destination}</div>
                </div>
                <ChevronRight size={16} className="shipment-arrow" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA BANNER */}
      <section className="cta-banner" aria-labelledby="cta-heading">
        <div className="container cta-content">
          <h2 id="cta-heading">Looking for Specific Equipment?</h2>
          <p>Get a custom quote tailored to your project requirements and location. We deliver worldwide.</p>
          <Link to="/contact" className="btn-primary cta-btn">
            Get Custom Quote Today <ArrowRight size={16} />
          </Link>
        </div>
      </section>
    </>
  )
}
