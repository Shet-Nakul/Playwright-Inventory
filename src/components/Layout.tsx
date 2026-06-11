import { NavLink, Outlet, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', testid: 'nav-dashboard', icon: '▦' },
  { to: '/products', label: 'Products', testid: 'nav-products', icon: '▤' },
  { to: '/products/new', label: 'Add Product', testid: 'nav-add-product', icon: '＋' },
  { to: '/suppliers', label: 'Suppliers', testid: 'nav-suppliers', icon: '☷' },
  { to: '/orders', label: 'Orders', testid: 'nav-orders', icon: '▣' },
  { to: '/interactions', label: 'Interactions', testid: 'nav-interactions', icon: '✦' },
  { to: '/dynamic', label: 'Dynamic Content', testid: 'nav-dynamic', icon: '◐' },
  { to: '/frames', label: 'Frames & Tabs', testid: 'nav-frames', icon: '▢' },
]

export default function Layout() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    navigate('/login', { replace: true })
  }

  return (
    <div className="layout">
      <aside className="sidebar" data-testid="sidebar">
        <div className="brand" data-testid="brand">
          <span className="brand-mark">◆</span>
          <span>StockPilot</span>
        </div>
        <nav className="nav">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === '/products'}
              data-testid={item.testid}
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
            >
              <span className="nav-icon" aria-hidden>
                {item.icon}
              </span>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <div className="main">
        <header className="topbar" data-testid="topbar">
          <div className="topbar-title" data-testid="page-title-slot" />
          <div className="topbar-user">
            <span data-testid="current-user" className="user-name">
              {user?.name} <span className="user-role">({user?.role})</span>
            </span>
            <button type="button" className="btn btn-ghost" data-testid="logout-button" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </header>

        <main className="content" data-testid="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
