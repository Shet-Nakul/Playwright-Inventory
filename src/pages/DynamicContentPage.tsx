import { useState, useRef, useEffect } from 'react'
import PageHeader from '../components/PageHeader'

interface Row {
  id: number
  name: string
  stock: number
}

const REMOTE_ROWS: Row[] = [
  { id: 1, name: 'Wireless Mouse', stock: 120 },
  { id: 2, name: 'Office Chair', stock: 0 },
  { id: 3, name: 'Coffee Beans', stock: 240 },
  { id: 4, name: 'Denim Jacket', stock: 7 },
]

export default function DynamicContentPage() {
  // --- Delayed load ---
  const [loading, setLoading] = useState(false)
  const [rows, setRows] = useState<Row[] | null>(null)

  function loadData() {
    setLoading(true)
    setRows(null)
    window.setTimeout(() => {
      setRows(REMOTE_ROWS)
      setLoading(false)
    }, 1500)
  }

  // --- Delayed button enable ---
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 2000)
    return () => window.clearTimeout(t)
  }, [])

  // --- Auto-incrementing live counter ---
  const [tick, setTick] = useState(0)
  const timerRef = useRef<number | null>(null)
  const [running, setRunning] = useState(false)

  function toggleCounter() {
    if (running) {
      if (timerRef.current) window.clearInterval(timerRef.current)
      setRunning(false)
    } else {
      timerRef.current = window.setInterval(() => setTick((t) => t + 1), 1000)
      setRunning(true)
    }
  }

  useEffect(() => () => {
    if (timerRef.current) window.clearInterval(timerRef.current)
  }, [])

  // --- Progressive reveal ---
  const [revealed, setRevealed] = useState(false)

  return (
    <div data-testid="dynamic-page">
      <PageHeader title="Dynamic Content" subtitle="Loading states, delays and async updates" />

      <div className="panel" data-testid="delayed-load-section">
        <h2>Delayed Data Load</h2>
        <button type="button" className="btn btn-primary" data-testid="load-data" onClick={loadData}>
          Load Inventory
        </button>

        {loading && (
          <div className="loading" data-testid="loading-spinner" role="status">
            <span className="spinner" /> Loading…
          </div>
        )}

        {rows && (
          <table className="table" data-testid="dynamic-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Stock</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((r) => (
                <tr key={r.id} data-testid="dynamic-row">
                  <td>{r.name}</td>
                  <td>{r.stock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="panel" data-testid="delayed-enable-section">
        <h2>Delayed Enable</h2>
        <p className="muted">This button becomes enabled 2 seconds after page load.</p>
        <button type="button" className="btn btn-primary" data-testid="delayed-button" disabled={!ready}>
          {ready ? 'Now Enabled' : 'Please wait…'}
        </button>
      </div>

      <div className="panel" data-testid="counter-section">
        <h2>Live Counter</h2>
        <p>
          Seconds elapsed: <strong data-testid="counter-value">{tick}</strong>
        </p>
        <button type="button" className="btn btn-ghost" data-testid="toggle-counter" onClick={toggleCounter}>
          {running ? 'Stop' : 'Start'}
        </button>
      </div>

      <div className="panel" data-testid="reveal-section">
        <h2>Progressive Reveal</h2>
        <button type="button" className="btn btn-ghost" data-testid="reveal-button" onClick={() => setRevealed(true)}>
          Reveal hidden message
        </button>
        {revealed && (
          <p className="reveal-text" data-testid="revealed-text">
            🎉 You found the hidden inventory note: reorder SKU ELE-1002 soon.
          </p>
        )}
      </div>
    </div>
  )
}
