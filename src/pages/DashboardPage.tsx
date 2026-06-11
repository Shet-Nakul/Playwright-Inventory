import { useMemo } from 'react'
import { Link } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import { products, orders, suppliers } from '../data/mockData'

export default function DashboardPage() {
  const stats = useMemo(() => {
    const totalProducts = products.length
    const lowStock = products.filter((p) => p.status === 'Low Stock').length
    const outOfStock = products.filter((p) => p.status === 'Out of Stock').length
    const inventoryValue = products.reduce((sum, p) => sum + p.price * p.quantity, 0)
    const pendingOrders = orders.filter((o) => o.status === 'Pending').length
    const activeSuppliers = suppliers.filter((s) => s.active).length
    return { totalProducts, lowStock, outOfStock, inventoryValue, pendingOrders, activeSuppliers }
  }, [])

  const cards = [
    { label: 'Total Products', value: stats.totalProducts, testid: 'stat-total-products', accent: 'blue' },
    { label: 'Low Stock', value: stats.lowStock, testid: 'stat-low-stock', accent: 'amber' },
    { label: 'Out of Stock', value: stats.outOfStock, testid: 'stat-out-of-stock', accent: 'red' },
    {
      label: 'Inventory Value',
      value: `$${stats.inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`,
      testid: 'stat-inventory-value',
      accent: 'green',
    },
    { label: 'Pending Orders', value: stats.pendingOrders, testid: 'stat-pending-orders', accent: 'purple' },
    { label: 'Active Suppliers', value: stats.activeSuppliers, testid: 'stat-active-suppliers', accent: 'teal' },
  ]

  const recentOrders = [...orders].slice(-5).reverse()

  return (
    <div data-testid="dashboard-page">
      <PageHeader title="Dashboard" subtitle="Overview of your inventory at a glance" />

      <div className="stat-grid" data-testid="stat-grid">
        {cards.map((card) => (
          <div key={card.testid} className={`stat-card accent-${card.accent}`} data-testid={card.testid}>
            <span className="stat-label">{card.label}</span>
            <span className="stat-value" data-testid={`${card.testid}-value`}>
              {card.value}
            </span>
          </div>
        ))}
      </div>

      <div className="panel" data-testid="recent-orders-panel">
        <div className="panel-header">
          <h2>Recent Orders</h2>
          <Link to="/orders" className="btn btn-ghost btn-sm" data-testid="view-all-orders">
            View all
          </Link>
        </div>
        <table className="table" data-testid="recent-orders-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {recentOrders.map((order) => (
              <tr key={order.id} data-testid={`recent-order-row-${order.id}`}>
                <td>{order.reference}</td>
                <td>{order.customer}</td>
                <td>{order.items}</td>
                <td>${order.total.toFixed(2)}</td>
                <td>
                  <span className={`badge badge-${order.status.toLowerCase()}`}>{order.status}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
