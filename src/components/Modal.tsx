import type { ReactNode } from 'react'
import { useEffect } from 'react'

interface ModalProps {
  open: boolean
  title: string
  children: ReactNode
  confirmLabel?: string
  cancelLabel?: string
  onConfirm?: () => void
  onClose: () => void
  testid?: string
}

export default function Modal({
  open,
  title,
  children,
  confirmLabel = 'Confirm',
  cancelLabel = 'Cancel',
  onConfirm,
  onClose,
  testid = 'modal',
}: ModalProps) {
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="modal-overlay" data-testid={`${testid}-overlay`} onClick={onClose}>
      <div
        className="modal"
        data-testid={testid}
        role="dialog"
        aria-modal="true"
        aria-label={title}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-header">
          <h3 data-testid={`${testid}-title`}>{title}</h3>
          <button
            type="button"
            className="modal-x"
            data-testid={`${testid}-close`}
            aria-label="Close dialog"
            onClick={onClose}
          >
            ×
          </button>
        </div>
        <div className="modal-body" data-testid={`${testid}-body`}>
          {children}
        </div>
        <div className="modal-footer">
          <button type="button" className="btn btn-ghost" data-testid={`${testid}-cancel`} onClick={onClose}>
            {cancelLabel}
          </button>
          {onConfirm && (
            <button type="button" className="btn btn-danger" data-testid={`${testid}-confirm`} onClick={onConfirm}>
              {confirmLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  )
}
