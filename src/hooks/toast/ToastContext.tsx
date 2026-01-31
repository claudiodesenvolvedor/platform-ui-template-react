import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import '../../styles/toast.css'

export type ToastVariant = 'success' | 'error' | 'warning'

type Toast = {
  id: string
  title: string
  description?: string
  variant: ToastVariant
}

type ToastContextValue = {
  showToast: (toast: Omit<Toast, 'id'>) => void
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined)

type ToastProviderProps = {
  children: ReactNode
}

export const ToastProvider = ({ children }: ToastProviderProps) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((toast: Omit<Toast, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random().toString(16).slice(2)}`
    setToasts((prev) => [...prev, { ...toast, id }])

    window.setTimeout(() => {
      setToasts((prev) => prev.filter((item) => item.id !== id))
    }, 4000)
  }, [])

  const value = useMemo(() => ({ showToast }), [showToast])

  return (
    <ToastContext.Provider value={value}>
      {children}
      <div className="toast-container" role="status" aria-live="polite">
        {toasts.map((toast) => (
          <div key={toast.id} className={`toast toast--${toast.variant}`}>
            <div className="toast__content">
              <strong className="toast__title">{toast.title}</strong>
              {toast.description ? (
                <span className="toast__description">{toast.description}</span>
              ) : null}
            </div>
            <button
              className="toast__close"
              type="button"
              onClick={() =>
                setToasts((prev) => prev.filter((item) => item.id !== toast.id))
              }
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}

export const ToastContextConsumer = ToastContext
