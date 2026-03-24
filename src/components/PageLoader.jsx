import './PageLoader.css'

export default function PageLoader() {
  return (
    <div className="page-loader" aria-label="Loading page...">
      <div className="loader-logo">ITS</div>
      <div className="loader-bar">
        <div className="loader-fill" />
      </div>
    </div>
  )
}
