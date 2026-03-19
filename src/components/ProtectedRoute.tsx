import { Navigate } from 'react-router-dom'
import type { ReactElement } from 'react'
import { useAuth } from '../hooks/auth'
import type { NavigationItem } from '../config/navigation'
import { getAllowedNavigation } from '../utils/navigation'

type Props = {
  path: string
  children: ReactElement
}

export const ProtectedRoute = ({ path, children }: Props) => {
  const { userRole } = useAuth()

  const navigationTree = getAllowedNavigation(userRole)

  const isRouteAllowed = (items: NavigationItem[]): boolean => {
    for (const item of items) {
      if (item.path) {
        const isRootPath = item.path === '/'
        const matchesPath = isRootPath ? path === '/' : path.startsWith(item.path)

        if (matchesPath) {
          return true
        }
      }

      if (item.children && isRouteAllowed(item.children)) {
        return true
      }
    }

    return false
  }

  if (!isRouteAllowed(navigationTree)) {
    console.warn('Unauthorized route access:', path, 'role:', userRole)
    return <Navigate to="/" replace />
  }

  return children
}
