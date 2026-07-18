import { useState, useMemo } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Helmet } from 'react-helmet-async'
import { Search, MapPin, Phone, ArrowRight, Filter } from 'lucide-react'
import { products } from '../data/products'
import './Products.css'

const BRANDS = ['All Brands', 'JCB', 'CASE', 'Caterpillar', 'Hyundai']
const CATEGORIES = ['All Types', 'Backhoe Loader', 'Tracked Excavator', 'Compactor', 'Telehandler']
const CONDITIONS = ['New & Used', 'New', 'Used']

export default function Products() {
  const [params] = useSearchParams()
  const initCat = params.get('category') || 'All Types'

  const [search, setSearch] = useState('')
  const [category, setCategory] = useState(initCat === 'All Types' ? 'All Types' : initCat.replace(/-/g, ' ').replace(/\b\w/g, c => c.toUpperCase()))
  const [brand, setBrand] = useState('All Brands')
  const [condition, setCondition] = useState('New & Used')

  const filtered = useMemo(() => {
    return products.filter(p => {
      if (search && !p.name.toLowerCase().includes(search.toLowerCase()) && !p.brand.toLowerCase().includes(search.toLowerCase())) return false
      if (category !== 'All Types' && p.category !== category) return false
      if (brand !== 'All Brands' && p.brand !== brand) return false
      if (condition !== 'New & Used' && p.condition !== condition) return false
      return true
    })
  }, [search, category, brand, condition])

  return (
    <>
      <Helmet>
        <title>Industrial Inventory | Infinite Trade Solutions</title>
        <meta name="description" content="Browse our inventory of heavy construction equipment — JCB, CASE, Caterpillar, Hyundai backhoe loaders, excavators, compactors. Available in Delhi NCR, India." />
      </Helmet>

      <div className="products-page">
        <div className="products-hero">
          <div className="container">
            <nav className="breadcrumb" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span>›</span>
              <span>Products</span>
            </nav>
            <h1>Industrial <span className="amber">Inventory</span></h1>
            <p>Precision-engineered heavy machinery curated for global construction and mining operations. Every unit inspected for structural integrity.</p>
          </div>
        </div>

        {/* FILTERS */}
        <div className="filters-bar">
          <div className="container filters-inner">
            <div className="filter-group search-group">
              <label className="filter-label" htmlFor="search-fleet">Search Fleet</label>
              <div className="search-wrap">
                <input
                  id="search-fleet"
                  type="text"
                  placeholder="e.g. Excavator 2024"
                  value={search}
                  onChange={e => setSearch(e.target.value)}
                  aria-label="Search equipment"
                />
                <Search size={16} />
              </div>
            </div>
            <div className="filter-group">
              <label className="filter-label" htmlFor="filter-category">Category</label>
              <select id="filter-category" value={category} onChange={e => setCategory(e.target.value)} aria-label="Filter by category">
                {CATEGORIES.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label" htmlFor="filter-brand">Manufacturer</label>
              <select id="filter-brand" value={brand} onChange={e => setBrand(e.target.value)} aria-label="Filter by manufacturer">
                {BRANDS.map(b => <option key={b}>{b}</option>)}
              </select>
            </div>
            <div className="filter-group">
              <label className="filter-label" htmlFor="filter-condition">Condition</label>
              <select id="filter-condition" value={condition} onChange={e => setCondition(e.target.value)} aria-label="Filter by condition">
                {CONDITIONS.map(c => <option key={c}>{c}</option>)}
              </select>
            </div>
          </div>
        </div>

        {/* LISTING */}
        <div className="container products-content">
          <div className="listing-header">
            <h2>Featured Fleet</h2>
            <span className="listing-count">Showing {filtered.length} High-Performance Units</span>
          </div>

          {filtered.length === 0 ? (
            <div className="no-results">
              <Filter size={40} />
              <p>No equipment matches your filters. <button onClick={() => { setSearch(''); setCategory('All Types'); setBrand('All Brands'); setCondition('New & Used') }}>Reset filters</button></p>
            </div>
          ) : (
            <div className="products-grid">
              {filtered.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          )}
        </div>
      </div>
    </>
  )
}

function ProductCard({ product: p }) {
  return (
    <article className="product-card" aria-label={p.name}>
      <div className="card-image-wrap">
        <span className={`card-badge ${p.badge === 'NEW' ? 'badge-new' : 'badge-used'}`}>{p.badge}</span>
        <img src={p.image} alt={p.name} loading="lazy" />
        <div className="card-location"><MapPin size={11} /> {p.location}</div>
      </div>
      <div className="card-body">
        <div className="card-title-row">
          <h3>{p.name}</h3>
          <span className="card-price">Get Quote</span>
        </div>
        <div className="card-category">{p.category}</div>
        <div className="card-specs">
          <div className="spec-row"><span>Year</span><strong>{p.year}</strong></div>
          {p.hours && <div className="spec-row"><span>Usage</span><strong>{p.hours}</strong></div>}
          {p.condition && <div className="spec-row"><span>Condition</span><strong>{p.condition}</strong></div>}
        </div>
        <Link to={`/products/${p.id}`} className="card-cta">
          Send Enquiry <ArrowRight size={14} />
        </Link>
        <a href="tel:+918800143366" className="card-phone">
          <Phone size={12} /> CALL: 880-014-3366
        </a>
      </div>
    </article>
  )
}
