import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import PageHeader from '../components/PageHeader'
import Modal from '../components/Modal'
import { products as seedProducts, productCategories } from '../data/mockData'
import { useToast } from '../context/ToastContext'
import type { Product } from '../types'

type SortKey = 'name' | 'category' | 'quantity' | 'price' | 'status'
type SortDir = 'asc' | 'desc'

const PAGE_SIZE = 5

export default function ProductsPage() {
  const navigate = useNavigate()
  const { showToast } = useToast()
  const [items, setItems] = useState<Product[]>(seedProducts)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState<'All' | Product['category']>('All')
  const [status, setStatus] = useState<'All' | Product['status']>('All')
  const [sortKey, setSortKey] = useState<SortKey>('name')
  const [sortDir, setSortDir] = useState<SortDir>('asc')
  const [page, setPage] = useState(1)
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null)

  const filtered = useMemo(() => {
    let result = items.filter((p) => {
      const matchesSearch =
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.sku.toLowerCase().includes(search.toLowerCase())
      const matchesCategory = category === 'All' || p.category === category
      const matchesStatus = status === 'All' || p.status === status
      return matchesSearch && matchesCategory && matchesStatus
    })

    result = [...result].sort((a, b) => {
      const av = a[sortKey]
      const bv = b[sortKey]
      let cmp = 0
      if (typeof av === 'number' && typeof bv === 'number') cmp = av - bv
      else cmp = String(av).localeCompare(String(bv))
      return sortDir === 'asc' ? cmp : -cmp
    })

    return result
  }, [items, search, category, status, sortKey, sortDir])

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE))
  const currentPage = Math.min(page, totalPages)
  const pageItems = filtered.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE)

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((d) => (d === 'asc' ? 'desc' : 'asc'))
    } else {
      setSortKey(key)
      setSortDir('asc')
    }
    setPage(1)
  }

  function confirmDelete() {
    if (!pendingDelete) return
    setItems((prev) => prev.filter((p) => p.id !== pendingDelete.id))
    showToast(`Deleted "${pendingDelete.name}"`, 'success')
    setPendingDelete(null)
  }

  function resetFilters() {
    setSearch('')
    setCategory('All')
    setStatus('All')
    setPage(1)
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return ''
    return sortDir === 'asc' ? ' ▲' : ' ▼'
  }

  return (
    <div data-testid="products-page">
      <PageHeader title="Products" subtitle="Manage your inventory items" />

      <div className="toolbar" data-testid="products-toolbar">
        <input
          type="search"
          className="input"
          data-testid="product-search"
          placeholder="Search by name or SKU…"
          value={search}
          onChange={(e) => {
            setSearch(e.target.value)
            setPage(1)
          }}
        />

        <select
          className="input"
          data-testid="filter-category"
          value={category}
          onChange={(e) => {
            setCategory(e.target.value as typeof category)
            setPage(1)
          }}
        >
          <option value="All">All Categories</option>
          {productCategories.map((c) => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>

        <select
          className="input"
          data-testid="filter-status"
          value={status}
          onChange={(e) => {
            setStatus(e.target.value as typeof status)
            setPage(1)
          }}
        >
          <option value="All">All Statuses</option>
          <option value="In Stock">In Stock</option>
          <option value="Low Stock">Low Stock</option>
          <option value="Out of Stock">Out of Stock</option>
        </select>

        <button type="button" className="btn btn-ghost" data-testid="reset-filters" onClick={resetFilters}>
          Reset
        </button>

        <button
          type="button"
          className="btn btn-primary"
          data-testid="add-product-button"
          onClick={() => navigate('/products/new')}
        >
          + Add Product
        </button>
      </div>

      <div className="panel">
        <table className="table" data-testid="products-table">
          <thead>
            <tr>
              <th className="sortable" data-testid="th-name" onClick={() => toggleSort('name')}>
                Name{sortIndicator('name')}
              </th>
              <th>SKU</th>
              <th className="sortable" data-testid="th-category" onClick={() => toggleSort('category')}>
                Category{sortIndicator('category')}
              </th>
              <th className="sortable" data-testid="th-quantity" onClick={() => toggleSort('quantity')}>
                Quantity{sortIndicator('quantity')}
              </th>
              <th className="sortable" data-testid="th-price" onClick={() => toggleSort('price')}>
                Price{sortIndicator('price')}
              </th>
              <th className="sortable" data-testid="th-status" onClick={() => toggleSort('status')}>
                Status{sortIndicator('status')}
              </th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody data-testid="products-tbody">
            {pageItems.length === 0 ? (
              <tr data-testid="no-results-row">
                <td colSpan={7} className="empty-cell">
                  No products match your filters.
                </td>
              </tr>
            ) : (
              pageItems.map((p) => (
                <tr key={p.id} data-testid="product-row" data-sku={p.sku} data-id={p.id}>
                  <td data-testid="product-name">{p.name}</td>
                  <td data-testid="product-sku">{p.sku}</td>
                  <td data-testid="product-category">{p.category}</td>
                  <td data-testid="product-quantity">{p.quantity}</td>
                  <td data-testid="product-price">${p.price.toFixed(2)}</td>
                  <td>
                    <span
                      className={`badge badge-${p.status.replace(/\s+/g, '-').toLowerCase()}`}
                      data-testid="product-status"
                    >
                      {p.status}
                    </span>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="btn btn-danger btn-sm"
                      data-testid="delete-product"
                      aria-label={`Delete ${p.name}`}
                      onClick={() => setPendingDelete(p)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <div className="pagination" data-testid="pagination">
        <span className="pagination-info" data-testid="results-count">
          {filtered.length} result{filtered.length === 1 ? '' : 's'}
        </span>
        <div className="pagination-controls">
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-testid="prev-page"
            disabled={currentPage <= 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
          >
            Prev
          </button>
          <span className="page-indicator" data-testid="page-indicator">
            Page {currentPage} of {totalPages}
          </span>
          <button
            type="button"
            className="btn btn-ghost btn-sm"
            data-testid="next-page"
            disabled={currentPage >= totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
          >
            Next
          </button>
        </div>
      </div>

      <Modal
        open={pendingDelete !== null}
        title="Delete product"
        testid="delete-modal"
        confirmLabel="Delete"
        cancelLabel="Cancel"
        onConfirm={confirmDelete}
        onClose={() => setPendingDelete(null)}
      >
        Are you sure you want to delete{' '}
        <strong data-testid="delete-modal-target">{pendingDelete?.name}</strong>? This action cannot be undone.
      </Modal>
    </div>
  )
}
