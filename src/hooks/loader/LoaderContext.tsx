import { createContext, useCallback, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import '../../styles/loader.css'

type LoaderContextValue = {
  isLoading: boolean
  showLoader: () => void
  hideLoader: () => void
}

const LoaderContext = createContext<LoaderContextValue | undefined>(undefined)

type LoaderProviderProps = {
  children: ReactNode
}

export const LoaderProvider = ({ children }: LoaderProviderProps) => {
  const [pendingCount, setPendingCount] = useState(0)

  const showLoader = useCallback(() => {
    setPendingCount((prev) => prev + 1)
  }, [])

  const hideLoader = useCallback(() => {
    setPendingCount((prev) => Math.max(prev - 1, 0))
  }, [])

  const value = useMemo(
    () => ({
      isLoading: pendingCount > 0,
      showLoader,
      hideLoader,
    }),
    [pendingCount, showLoader, hideLoader],
  )

  return (
    <LoaderContext.Provider value={value}>
      {children}
      {pendingCount > 0 ? (
        <div className="loader-overlay" role="alert" aria-busy="true">
          <div className="loader-card">
            <div className="loader-spinner" />
            <div className="loader-text">Carregando...</div>
          </div>
        </div>
      ) : null}
    </LoaderContext.Provider>
  )
}

export const LoaderContextConsumer = LoaderContext
