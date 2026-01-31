import { useContext } from 'react'
import { ToastContextConsumer } from './ToastContext'

export const useToast = () => {
  const context = useContext(ToastContextConsumer)

  if (!context) {
    throw new Error('useToast deve ser usado dentro de ToastProvider')
  }

  return context
}
