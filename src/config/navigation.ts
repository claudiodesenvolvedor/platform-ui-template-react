import type { UserRole } from '../hooks/auth/AuthContext'

export interface NavigationItem {
  id: string
  label: string
  path?: string
  icon?: string
  order?: number
  roles?: UserRole[]
  children?: NavigationItem[]
}

export const navigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    path: '/',
    roles: ['admin', 'manager', 'viewer'],
  },
  {
    id: 'administracao',
    label: 'Administração',
    roles: ['admin', 'manager'],
    children: [
      {
        id: 'usuarios',
        label: 'Usuários',
        path: '/users',
        roles: ['admin', 'manager'],
      },
    ],
  },
]
