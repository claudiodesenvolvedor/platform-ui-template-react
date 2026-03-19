import { Outlet } from 'react-router-dom'
import { useAuth } from '../hooks/auth'
import { LoginPage } from '../pages/auth/LoginPage'

export const AppContent = () => {
  const { isAuthenticated } = useAuth()

  if (!isAuthenticated) {
    return <LoginPage />
  }

  return <Outlet />
}
