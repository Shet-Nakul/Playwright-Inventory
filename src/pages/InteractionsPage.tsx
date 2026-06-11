import { useRef, useState, type DragEvent } from 'react'
import PageHeader from '../components/PageHeader'
import { useToast } from '../context/ToastContext'

interface Item {
  id: string
  label: string
}

export default function InteractionsPage() {
  const { showToast } = useToast()

  // --- Drag & drop ---
  const [backlog, setBacklog] = useState<Item[]>([
    { id: 'sku-1', label: 'Wireless Mouse' },
    { id: 'sku-2', label: 'Office Chair' },
    { id: 'sku-3', label: 'Coffee Beans' },
  ])
  const [restock, setRestock] = useState<Item[]>([])
  const dragItem = useRef<{ item: Item; from: 'backlog' | 'restock' } | null>(null)

  function onDragStart(item: Item, from: 'backlog' | 'restock') {
    dragItem.current = { item, from }
  }

  function onDrop(target: 'backlog' | 'restock') {
    const payload = dragItem.current
    if (!payload || payload.from === target) return
    const { item, from } = payload
    if (from === 'backlog') {
      setBacklog((prev) => prev.filter((i) => i.id !== item.id))
      setRestock((prev) => [...prev, item])
    } else {
      setRestock((prev) => prev.filter((i) => i.id !== item.id))
      setBacklog((prev) => [...prev, item])
    }
    dragItem.current = null
  }

  function allowDrop(e: DragEvent) {
    e.preventDefault()
  }

  // --- Slider ---
  const [threshold, setThreshold] = useState(20)

  // --- File upload ---
  const [fileName, setFileName] = useState('')
  const [fileSize, setFileSize] = useState(0)

  function onFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (file) {
      setFileName(file.name)
      setFileSize(file.size)
      showToast(`Uploaded ${file.name}`, 'success')
    }
  }

  // --- Quantity stepper ---
  const [count, setCount] = useState(0)

  return (
    <div data-testid="interactions-page">
      <PageHeader title="Interactions" subtitle="Drag & drop, sliders, file upload and more" />

      <div className="panel" data-testid="dnd-section">
        <h2>Restock Planner (Drag &amp; Drop)</h2>
        <div className="dnd-board">
          <div
            className="dnd-column"
            data-testid="dnd-backlog"
            onDragOver={allowDrop}
            onDrop={() => onDrop('backlog')}
          >
            <h3>Backlog</h3>
            {backlog.map((item) => (
              <div
                key={item.id}
                className="dnd-item"
                data-testid="dnd-item"
                data-item-id={item.id}
                draggable
                onDragStart={() => onDragStart(item, 'backlog')}
              >
                {item.label}
              </div>
            ))}
          </div>

          <div
            className="dnd-column dnd-target"
            data-testid="dnd-restock"
            onDragOver={allowDrop}
            onDrop={() => onDrop('restock')}
          >
            <h3>To Restock</h3>
            {restock.length === 0 && <p className="muted" data-testid="dnd-restock-empty">Drop items here</p>}
            {restock.map((item) => (
              <div
                key={item.id}
                className="dnd-item"
                data-testid="dnd-item"
                data-item-id={item.id}
                draggable
                onDragStart={() => onDragStart(item, 'restock')}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>
        <p className="muted" data-testid="restock-count">
          Items to restock: {restock.length}
        </p>
      </div>

      <div className="panel" data-testid="slider-section">
        <h2>Low-stock Threshold (Slider)</h2>
        <input
          type="range"
          min={0}
          max={100}
          value={threshold}
          data-testid="threshold-slider"
          onChange={(e) => setThreshold(Number(e.target.value))}
        />
        <p>
          Alert when stock falls below{' '}
          <strong data-testid="threshold-value">{threshold}</strong> units.
        </p>
      </div>

      <div className="panel" data-testid="stepper-section">
        <h2>Quantity Stepper</h2>
        <div className="stepper">
          <button
            type="button"
            className="btn btn-ghost"
            data-testid="stepper-decrement"
            onClick={() => setCount((c) => Math.max(0, c - 1))}
          >
            −
          </button>
          <span className="stepper-value" data-testid="stepper-value">
            {count}
          </span>
          <button
            type="button"
            className="btn btn-ghost"
            data-testid="stepper-increment"
            onClick={() => setCount((c) => c + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="panel" data-testid="upload-section">
        <h2>File Upload</h2>
        <input type="file" data-testid="file-input" onChange={onFileChange} />
        {fileName && (
          <p data-testid="file-info">
            Selected: <strong>{fileName}</strong> ({fileSize} bytes)
          </p>
        )}
      </div>
    </div>
  )
}
