import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function LoginPage() {
  const { login, user } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  // If already authenticated, send them to the dashboard.
  if (user) {
    navigate('/dashboard', { replace: true })
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault()
    setError('')

    if (!username.trim() || !password.trim()) {
      setError('Both username and password are required.')
      return
    }

    setLoading(true)
    // Simulate a small network delay so loading states are testable.
    window.setTimeout(() => {
      const result = login(username, password)
      setLoading(false)
      if (result.ok) {
        navigate('/dashboard', { replace: true })
      } else {
        setError(result.message)
      }
    }, 600)
  }

  return (
    <div className="login-screen" data-testid="login-page">
      <div className="login-card" data-testid="login-card">
        <div className="login-brand">
          <span className="brand-mark">◆</span>
          <h1>StockPilot</h1>
          <p className="login-tagline">Inventory Management System</p>
        </div>

        <form className="login-form" data-testid="login-form" onSubmit={handleSubmit} noValidate>
          <label className="field">
            <span className="field-label">Username</span>
            <input
              type="text"
              name="username"
              data-testid="login-username"
              autoComplete="username"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>

          <label className="field">
            <span className="field-label">Password</span>
            <input
              type="password"
              name="password"
              data-testid="login-password"
              autoComplete="current-password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>

          {error && (
            <div className="alert alert-error" data-testid="login-error" role="alert">
              {error}
            </div>
          )}

          <button type="submit" className="btn btn-primary btn-block" data-testid="login-submit" disabled={loading}>
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="login-hint" data-testid="login-hint">
          <strong>Demo credentials</strong>
          <ul>
            <li>admin / admin123</li>
            <li>manager / manager123</li>
            <li>viewer / viewer123</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
