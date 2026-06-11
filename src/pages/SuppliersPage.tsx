import { useState } from 'react'
import PageHeader from '../components/PageHeader'
import { suppliers as seedSuppliers } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import type { Supplier } from '../types'

export default function SuppliersPage() {
  const { showToast } = useToast()
  const [items, setItems] = useState<Supplier[]>(seedSuppliers)

  function toggleActive(id: number) {
    setItems((prev) =>
      prev.map((s) => {
        if (s.id !== id) return s
        const next = { ...s, active: !s.active }
        showToast(`${s.name} is now ${next.active ? 'active' : 'inactive'}.`, 'info')
        return next
      }),
    )
  }

  return (
    <div data-testid="suppliers-page">
      <PageHeader title="Suppliers" subtitle="Manage supplier relationships" />

      <div className="card-grid" data-testid="suppliers-grid">
        {items.map((s) => (
          <div key={s.id} className="supplier-card" data-testid="supplier-card" data-supplier-id={s.id}>
            <div className="supplier-card-head">
              <h3 data-testid="supplier-name">{s.name}</h3>
              <span
                className={`badge ${s.active ? 'badge-in-stock' : 'badge-out-of-stock'}`}
                data-testid="supplier-status"
              >
                {s.active ? 'Active' : 'Inactive'}
              </span>
            </div>
            <p className="supplier-meta" data-testid="supplier-contact">
              {s.contact}
            </p>
            <p className="supplier-meta" data-testid="supplier-email">
              {s.email}
            </p>
            <p className="supplier-rating" data-testid="supplier-rating" aria-label={`Rating ${s.rating} of 5`}>
              {'★'.repeat(s.rating)}
              {'☆'.repeat(5 - s.rating)}
            </p>
            <button
              type="button"
              className="btn btn-ghost btn-sm"
              data-testid="toggle-supplier"
              onClick={() => toggleActive(s.id)}
            >
              {s.active ? 'Deactivate' : 'Activate'}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}
