import { useContext } from 'react'
import { AuthContextConsumer } from './AuthContext'

export const useAuth = () => {
  const context = useContext(AuthContextConsumer)

  if (!context) {
    throw new Error('useAuth deve ser usado dentro de AuthProvider')
  }

  return context
}
