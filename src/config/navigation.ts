import type { UserRole } from '../hooks/auth/AuthContext'

export type NavigationItem = {
  label: string
  path: string
  roles: UserRole[]
}

export const navigationItems: NavigationItem[] = [
  {
    label: 'Dashboard',
    path: '/',
    roles: ['admin', 'manager', 'viewer'],
  },
  {
    label: 'Usuários',
    path: '/users',
    roles: ['admin', 'manager'],
  },
]
