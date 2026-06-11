import { Link } from 'react-router-dom'

export default function NotFoundPage() {
  return (
    <div className="notfound" data-testid="notfound-page">
      <h1>404</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/dashboard" className="btn btn-primary" data-testid="back-home">
        Back to Dashboard
      </Link>
    </div>
  )
}
