import { useToast } from '../context/ToastContext'

export default function ToastContainer() {
  const { toasts, dismissToast } = useToast()

  return (
    <div className="toast-container" data-testid="toast-container" aria-live="polite">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`toast toast-${toast.variant}`}
          data-testid="toast"
          data-variant={toast.variant}
          role="alert"
        >
          <span className="toast-message" data-testid="toast-message">
            {toast.message}
          </span>
          <button
            type="button"
            className="toast-close"
            data-testid="toast-close"
            aria-label="Dismiss notification"
            onClick={() => dismissToast(toast.id)}
          >
            ×
          </button>
        </div>
      ))}
    </div>
  )
}
