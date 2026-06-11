import { useMemo, useState } from 'react'
import PageHeader from '../components/PageHeader'
import { orders as seedOrders } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import type { Order, OrderStatus } from '../types'

const statusFlow: Record<OrderStatus, OrderStatus | null> = {
  Pending: 'Shipped',
  Shipped: 'Delivered',
  Delivered: null,
  Cancelled: null,
}

export default function OrdersPage() {
  const { showToast } = useToast()
  const [items, setItems] = useState<Order[]>(seedOrders)
  const [filter, setFilter] = useState<'All' | OrderStatus>('All')

  const visible = useMemo(
    () => items.filter((o) => filter === 'All' || o.status === filter),
    [items, filter],
  )

  function advance(order: Order) {
    const next = statusFlow[order.status]
    if (!next) return
    setItems((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: next } : o)))
    showToast(`${order.reference} moved to ${next}.`, 'success')
  }

  function cancel(order: Order) {
    setItems((prev) => prev.map((o) => (o.id === order.id ? { ...o, status: 'Cancelled' } : o)))
    showToast(`${order.reference} cancelled.`, 'error')
  }

  return (
    <div data-testid="orders-page">
      <PageHeader title="Orders" subtitle="Track and update customer orders" />

      <div className="tabs" data-testid="order-tabs" role="tablist">
        {(['All', 'Pending', 'Shipped', 'Delivered', 'Cancelled'] as const).map((tab) => (
          <button
            key={tab}
            type="button"
            role="tab"
            aria-selected={filter === tab}
            className={`tab${filter === tab ? ' active' : ''}`}
            data-testid={`order-tab-${tab.toLowerCase()}`}
            onClick={() => setFilter(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="panel">
        <table className="table" data-testid="orders-table">
          <thead>
            <tr>
              <th>Reference</th>
              <th>Customer</th>
              <th>Items</th>
              <th>Total</th>
              <th>Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {visible.length === 0 ? (
              <tr>
                <td colSpan={7} className="empty-cell" data-testid="orders-empty">
                  No orders in this category.
                </td>
              </tr>
            ) : (
              visible.map((o) => (
                <tr key={o.id} data-testid="order-row" data-reference={o.reference}>
                  <td data-testid="order-reference">{o.reference}</td>
                  <td>{o.customer}</td>
                  <td>{o.items}</td>
                  <td>${o.total.toFixed(2)}</td>
                  <td>{o.date}</td>
                  <td>
                    <span className={`badge badge-${o.status.toLowerCase()}`} data-testid="order-status">
                      {o.status}
                    </span>
                  </td>
                  <td className="row-actions">
                    {statusFlow[o.status] && (
                      <button
                        type="button"
                        className="btn btn-primary btn-sm"
                        data-testid="advance-order"
                        onClick={() => advance(o)}
                      >
                        → {statusFlow[o.status]}
                      </button>
                    )}
                    {o.status !== 'Delivered' && o.status !== 'Cancelled' && (
                      <button
                        type="button"
                        className="btn btn-danger btn-sm"
                        data-testid="cancel-order"
                        onClick={() => cancel(o)}
                      >
                        Cancel
                      </button>
                    )}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}
