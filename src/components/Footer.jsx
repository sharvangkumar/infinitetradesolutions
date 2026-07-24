import { Link } from 'react-router-dom'
import { MapPin, Phone, Mail, Globe, Facebook, Linkedin, Twitter } from 'lucide-react'
import './Footer.css'

export default function Footer() {
  return (
    <footer className="footer" role="contentinfo">
      <div className="container footer-grid">
        <div className="footer-brand">
          <div className="footer-logo">INFINITE TRADE SOLUTIONS</div>
          <p>Engineering excellence delivered from the heart of Haryana. Premium construction machinery, global delivery.</p>
          <div className="footer-social">
            <a href="#" aria-label="Facebook"><Facebook size={16} /></a>
            <a href="#" aria-label="LinkedIn"><Linkedin size={16} /></a>
            <a href="#" aria-label="Twitter"><Twitter size={16} /></a>
            <a href="#" aria-label="Website"><Globe size={16} /></a>
          </div>
        </div>

        <div className="footer-col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Support</h4>
          <ul>
            <li><Link to="#">Privacy Policy</Link></li>
            <li><Link to="#">Terms of Service</Link></li>
            <li><Link to="#">Shipping Policy</Link></li>
          </ul>
        </div>

        <div className="footer-col">
          <h4>Contact Us</h4>
          <ul className="footer-contact">
            <li><MapPin size={14} /> House No 2 B Block, Vijay Nagar, Faridabad - 121004, Haryana, India</li>
            <li><Phone size={14} /><a href="tel:+919958853509">+91 995-885-3509</a></li>
            <li><Mail size={14} /><a href="mailto:sales@infinitetradesolutions.com">sales@infinitetradesolutions.com</a></li>
          </ul>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="container">
          <span>© 2024 Infinite Trade Solutions. Engineering Heavy Excellence.</span>
          <span>GST Verified (06AAKFI1554M1Z4) · IndiaMart Certified · Verified Exporter</span>
        </div>
      </div>
    </footer>
  )
}
