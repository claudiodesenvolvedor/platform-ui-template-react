import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useFeatureFlags } from '../../context/FeatureFlagContext'

type AuthCredentials = {
  email: string
  password: string
}

type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  userRole: UserRole
  userRoles: UserRoles
  setUserRoles: (roles: UserRoles) => void
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'platform-ui-template:token'
const ROLE_KEY = 'platform-ui-template:role'

export type UserRole = 'admin' | 'manager' | 'viewer'
type UserRoles = UserRole[]

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const getStoredToken = () => localStorage.getItem(STORAGE_KEY)
const isUserRole = (value: unknown): value is UserRole =>
  value === 'admin' || value === 'manager' || value === 'viewer'

const getDevRoles = (): UserRoles => {
  if (!import.meta.env.DEV) {
    return []
  }

  const devRole = import.meta.env.VITE_DEV_ROLE
  if (isUserRole(devRole)) {
    return [devRole]
  }

  return []
}

const getStoredRole = (): UserRole =>
  (localStorage.getItem(ROLE_KEY) as UserRole | null) ?? 'viewer'

const getInitialRoles = (): UserRoles => {
  // Future: backendUser.roles
  const devRoles = getDevRoles()
  if (devRoles.length) {
    return devRoles
  }

  const storedRole = getStoredRole()
  return isUserRole(storedRole) ? [storedRole] : ['viewer']
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const { setFeatureFlags } = useFeatureFlags()
  const [token, setToken] = useState<string | null>(() => getStoredToken())
  const [userRoles, setUserRoles] = useState<UserRoles>(getInitialRoles)
  const userRole = userRoles[0] ?? 'viewer'

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info('[Auth] Active roles:', userRoles)
    }
  }, [userRoles])

  const login = useCallback(async ({ email, password }: AuthCredentials) => {
    if (!email || !password) {
      throw new Error('Credenciais inválidas')
    }

    const issuedToken = `token-${Date.now()}`
    localStorage.setItem(STORAGE_KEY, issuedToken)
    setToken(issuedToken)

    const response = {
      roles: (email.includes('admin')
        ? ['admin']
        : email.includes('gestao')
          ? ['manager']
          : ['viewer']) as UserRole[],
      features: {
        users_enabled: true,
        reports_enabled: true,
        audit_enabled: false,
      },
    }

    localStorage.setItem(ROLE_KEY, response.roles[0] ?? 'viewer')
    setUserRoles(response.roles)
    setFeatureFlags(response.features || {})
  }, [setFeatureFlags])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem(ROLE_KEY)
    setToken(null)
    setUserRoles(['viewer'])
  }, [])

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      userRole,
      userRoles,
      setUserRoles,
      login,
      logout,
    }),
    [token, userRole, userRoles, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const AuthContextConsumer = AuthContext
