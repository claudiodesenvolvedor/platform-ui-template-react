import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'

type AuthCredentials = {
  email: string
  password: string
}

type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  userRole: UserRole
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'platform-ui-template:token'
const ROLE_KEY = 'platform-ui-template:role'

export type UserRole = 'admin' | 'manager' | 'viewer'

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const getStoredToken = () => localStorage.getItem(STORAGE_KEY)
const isUserRole = (value: string): value is UserRole =>
  value === 'admin' || value === 'manager' || value === 'viewer'

const getDevRole = () => {
  if (!import.meta.env.DEV) {
    return null
  }

  const devRole = import.meta.env.VITE_DEV_ROLE
  return typeof devRole === 'string' && isUserRole(devRole) ? devRole : null
}

const getStoredRole = (): UserRole =>
  (localStorage.getItem(ROLE_KEY) as UserRole | null) ?? 'viewer'

const getInitialRole = (): UserRole => getDevRole() ?? getStoredRole()

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [userRole, setUserRole] = useState<UserRole>(() => getInitialRole())

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info('[Auth] Active role:', userRole)
    }
  }, [userRole])

  const login = useCallback(async ({ email, password }: AuthCredentials) => {
    if (!email || !password) {
      throw new Error('Credenciais inválidas')
    }

    const issuedToken = `token-${Date.now()}`
    localStorage.setItem(STORAGE_KEY, issuedToken)
    setToken(issuedToken)

    const role: UserRole = email.includes('admin')
      ? 'admin'
      : email.includes('gestao')
        ? 'manager'
        : 'viewer'
    localStorage.setItem(ROLE_KEY, role)
    setUserRole(role)
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(ROLE_KEY)
    setToken(null)
    setUserRole('viewer')
  }, [])

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      userRole,
      login,
      logout,
    }),
    [token, userRole, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const AuthContextConsumer = AuthContext
