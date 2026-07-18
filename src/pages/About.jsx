import { Helmet } from 'react-helmet-async'
import { Shield, Globe, CheckCircle, Briefcase, Users, Calendar, Clock } from 'lucide-react'
import './About.css'

const milestones = [
  { year: '2023', title: 'The Foundation', desc: 'Infinite Trade Solutions was established in Faridabad, Haryana, as a supplier and trading company for heavy construction equipment.', img: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop' },
  { year: '2024', title: 'Global Reach', desc: 'Shipped our first international orders — backhoe loaders and excavators exported to Russia and Andhra Pradesh — while building out our JCB, CASE, and Caterpillar catalog.', img: 'https://images.pexels.com/photos/2101137/pexels-photo-2101137.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop' },
  { year: 'Present', title: 'Growing the Fleet', desc: 'A verified exporter and top-ranked supplier on IndiaMART and TradeIndia, now serving construction and mining operations across India and abroad.', img: '/images/products/case-570sv-backhoe.jpg' }
]

const factsheet = [
  { icon: <Briefcase size={22} />, label: 'Business Type', value: 'Supplier, Trading Company' },
  { icon: <Users size={22} />, label: 'Employee Count', value: '10' },
  { icon: <Calendar size={22} />, label: 'Establishment', value: '2023' },
  { icon: <Clock size={22} />, label: 'Working Days', value: 'Monday – Sunday' }
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Infinite Trade Solutions</title>
        <meta name="description" content="Infinite Trade Solutions — India's trusted heavy equipment dealer since 2023. Learn about our story, founder Pritesh Sharma, and our verified exporter credentials." />
      </Helmet>

      <div className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="about-hero-bg" />
          <div className="container about-hero-content">
            <p className="section-label">Established 2023</p>
            <h1>Our Story:<br /><span className="amber">Heavy Equipment<br />Excellence</span></h1>
            <p>Building global infrastructure through trust, transparency, and the world's most reliable machinery — engineering trade solutions from Faridabad, Haryana, to the world.</p>
          </div>
        </section>

        {/* LEGACY */}
        <section className="legacy-section">
          <div className="container legacy-grid">
            <div className="legacy-image">
              <img src="https://images.pexels.com/photos/1216589/pexels-photo-1216589.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Engineers reviewing plans on a construction site" loading="lazy" />
              <div className="legacy-stat-badge">
                <span className="stat-big">100%</span>
                <span>Export Focused</span>
              </div>
            </div>
            <div className="legacy-text">
              <h2>A Fast-Growing<br />Trade Partner</h2>
              <p>Infinite Trade Solutions began with a singular vision: to bridge the gap between heavy industry and global accessibility. Established in 2023 in Faridabad, Haryana, the company has quickly grown into a verified exporter of construction and mining equipment, shipping JCB, CASE, Caterpillar, and Hyundai machinery across India and to international markets.</p>
              <div className="mission-vision">
                <div>
                  <h4>Our Mission</h4>
                  <p>To provide seamless procurement of high-performance machinery while maintaining the highest standards of transparency in every transaction.</p>
                </div>
                <div>
                  <h4>Our Vision</h4>
                  <p>To be the world's most trusted partner in industrial growth, setting the benchmark for technical expertise and delivery speed.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FACTSHEET */}
        <section className="factsheet-section">
          <div className="container factsheet-grid">
            {factsheet.map(f => (
              <div key={f.label} className="factsheet-item">
                <div className="factsheet-icon">{f.icon}</div>
                <div>
                  <span className="factsheet-label">{f.label}</span>
                  <span className="factsheet-value">{f.value}</span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CEO */}
        <section className="ceo-section">
          <div className="container ceo-grid">
            <div className="ceo-image">
              <img src="/images/pritesh-sharma-portrait.png" alt="Pritesh Sharma, Founder of Infinite Trade Solutions" loading="lazy" />
              <div className="ceo-image-label">
                <span>Pritesh Sharma</span>
                <span>Founder</span>
              </div>
            </div>
            <div className="ceo-content">
              <p className="section-label">The Visionary</p>
              <h2>Pritesh Sharma</h2>
              <blockquote>
                "Infrastructure is the skeleton of civilization. Our goal is to provide the strongest bones possible, ensuring every project stands as a testament to engineering excellence."
              </blockquote>
              <p>Since founding Infinite Trade Solutions in 2023, Pritesh Sharma has grown the company into a verified exporter of heavy construction machinery, always prioritizing client success and ethical transparency above all else.</p>
              <div className="ceo-tags">
                <span>Leadership</span><span>Strategy</span><span>Integrity</span>
              </div>
            </div>
          </div>
        </section>

        {/* CREDENTIALS */}
        <section className="credentials-section">
          <div className="container">
            <p className="section-label" style={{ textAlign: 'center' }}>Authenticated Excellence</p>
            <div className="credentials-grid">
              {[
                { icon: <Globe size={24} />, title: "Verified Exporter", desc: "Global trade compliance and export certification for 50+ countries." },
                { icon: <Shield size={24} />, title: "IndiaMart Certified", desc: "Top ranking for reliability and excellence on India's largest B2B platform." },
                { icon: <CheckCircle size={24} />, title: "GST Verified", desc: "Fully transparent tax and legal compliance in all domestic operations.", sub: "GSTIN: 06AAKFI1554M1Z4" }
              ].map(c => (
                <div key={c.title} className="credential-card">
                  <div className="cred-icon">{c.icon}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
                  {c.sub && <small>{c.sub}</small>}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* TIMELINE */}
        <section className="timeline-section">
          <div className="container">
            <h2>Our Journey</h2>
            <div className="timeline">
              {milestones.map((m, i) => (
                <div key={m.year} className={`timeline-item ${i % 2 === 0 ? 'left' : 'right'}`}>
                  <div className="timeline-content">
                    <div className="timeline-year">{m.year}</div>
                    <h3>{m.title}</h3>
                    <p>{m.desc}</p>
                  </div>
                  <div className="timeline-dot" />
                  <div className="timeline-image">
                    <img src={m.img} alt={m.title} loading="lazy" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
