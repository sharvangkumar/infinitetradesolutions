import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Phone } from 'lucide-react'
import './Navbar.css'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const links = [
    { to: '/', label: 'Home' },
    { to: '/products', label: 'Products' },
    { to: '/about', label: 'About' },
    { to: '/contact', label: 'Contact' }
  ]

  return (
    <nav className={`navbar${scrolled ? ' scrolled' : ''}`} role="navigation" aria-label="Main navigation">
      <div className="container navbar-inner">
        <Link to="/" className="navbar-logo" aria-label="Infinite Trade Solutions Home">
          INFINITE TRADE SOLUTIONS
        </Link>

        <ul className="navbar-links" role="list">
          {links.map(l => (
            <li key={l.to}>
              <Link to={l.to} className={`nav-link${pathname === l.to ? ' active' : ''}`}>{l.label}</Link>
            </li>
          ))}
        </ul>

        <div className="navbar-actions">
          <a href="tel:+918800143366" className="nav-phone" aria-label="Call us">
            <Phone size={14} /> +91 880-014-3366
          </a>
          <Link to="/contact" className="btn-primary">Get Quote</Link>
          <button className="hamburger" onClick={() => setOpen(o => !o)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>

      {open && (
        <div className="mobile-menu" role="dialog" aria-label="Mobile navigation">
          {links.map(l => (
            <Link key={l.to} to={l.to} className={`mobile-link${pathname === l.to ? ' active' : ''}`}>{l.label}</Link>
          ))}
          <a href="tel:+918800143366" className="mobile-phone">
            <Phone size={15} /> +91 880-014-3366
          </a>
          <Link to="/contact" className="btn-primary" style={{ marginTop: '0.5rem', justifyContent: 'center' }}>Get Quote</Link>
        </div>
      )}
    </nav>
  )
}
