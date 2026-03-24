import { Helmet } from 'react-helmet-async'
import { Shield, Globe, CheckCircle } from 'lucide-react'
import './About.css'

const milestones = [
  { year: '1998', title: 'The Foundation', desc: 'Inception of Infinite Trade Solutions in New Delhi, focusing on local civil engineering equipment.', img: 'https://images.pexels.com/photos/1078884/pexels-photo-1078884.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop' },
  { year: '2010', title: 'Global Expansion', desc: 'Launched our first international trade wing, exporting heavy excavators and cranes to the MENA region.', img: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop' },
  { year: 'Present', title: 'Engineering Modernity', desc: 'Leading the B2B machinery sector with AI-driven logistics and 24/7 technical support infrastructure.', img: 'https://images.pexels.com/photos/2252060/pexels-photo-2252060.jpeg?auto=compress&cs=tinysrgb&w=500&h=300&fit=crop' }
]

export default function About() {
  return (
    <>
      <Helmet>
        <title>About Us | Infinite Trade Solutions</title>
        <meta name="description" content="Infinite Trade Solutions — India's trusted heavy equipment dealer since 1998. Learn about our story, CEO Srikant Bhardwaj, and our verified exporter credentials." />
      </Helmet>

      <div className="about-page">
        {/* HERO */}
        <section className="about-hero">
          <div className="about-hero-bg" />
          <div className="container about-hero-content">
            <p className="section-label">Established 1998</p>
            <h1>Our Story:<br /><span className="amber">Heavy Equipment<br />Excellence</span></h1>
            <p>Building global infrastructure through trust, transparency, and the world's most reliable machinery. Engineering trade solutions for over two decades.</p>
          </div>
        </section>

        {/* LEGACY */}
        <section className="legacy-section">
          <div className="container legacy-grid">
            <div className="legacy-image">
              <img src="https://images.pexels.com/photos/2219024/pexels-photo-2219024.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop" alt="Heavy excavator operations on construction site" loading="lazy" />
              <div className="legacy-stat-badge">
                <span className="stat-big">25+</span>
                <span>Years of Mastery</span>
              </div>
            </div>
            <div className="legacy-text">
              <h2>A Legacy Built on<br />Concrete &amp; Steel</h2>
              <p>Infinite Trade Solutions began with a singular vision: to bridge the gap between heavy industry and global accessibility. What started in 1998 as a local equipment brokerage has evolved into an international powerhouse of machinery trade and engineering consultation.</p>
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

        {/* CEO */}
        <section className="ceo-section">
          <div className="ceo-bg" aria-hidden="true" />
          <div className="container ceo-grid">
            <div className="ceo-image">
              <img src="/images/srikant-portrait.png" alt="Srikant Bhardwaj, CEO of Infinite Trade Solutions" loading="lazy" />
              <div className="ceo-image-label">
                <span>Srikant Bhardwaj</span>
                <span>Chief Executive Officer</span>
              </div>
            </div>
            <div className="ceo-content">
              <p className="section-label">The Visionary</p>
              <h2>Srikant Bhardwaj</h2>
              <blockquote>
                "Infrastructure is the skeleton of civilization. Our goal is to provide the strongest bones possible, ensuring every project stands as a testament to engineering excellence."
              </blockquote>
              <p>With over two decades of experience in global trade and heavy machinery logistics, Srikant Bhardwaj has steered Infinite Trade Solutions through market shifts and technological revolutions, always prioritizing client success and ethical transparency above all else.</p>
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
                { icon: <CheckCircle size={24} />, title: "GST Verified", desc: "Fully transparent tax and legal compliance in all domestic operations." }
              ].map(c => (
                <div key={c.title} className="credential-card">
                  <div className="cred-icon">{c.icon}</div>
                  <h4>{c.title}</h4>
                  <p>{c.desc}</p>
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
