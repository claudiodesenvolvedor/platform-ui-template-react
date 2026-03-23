import { createContext, useCallback, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useFeatureFlags } from '../../context/FeatureFlagContext'
import { api } from '../../services/api'
import type { LoginResponse } from '../../types/auth'
import { getEnvBoolean } from '../../utils/env'

type AuthCredentials = {
  email: string
  password: string
}

type AuthContextValue = {
  token: string | null
  isAuthenticated: boolean
  isBackendAvailable: boolean
  user: LoginResponse['user'] | null
  setUser: (user: LoginResponse['user'] | null) => void
  updateUser: (data: Partial<LoginResponse['user']>) => void
  userRole: UserRole
  userRoles: UserRoles
  setUserRoles: (roles: UserRoles) => void
  login: (credentials: AuthCredentials) => Promise<void>
  logout: () => void
}

const STORAGE_KEY = 'platform-ui-template:token'
const ROLE_KEY = 'platform-ui-template:role'
const USER_KEY = 'platform-ui-template:user'

export type UserRole = 'admin' | 'manager' | 'viewer'
type UserRoles = UserRole[]

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

type AuthProviderProps = {
  children: ReactNode
}

const getStoredToken = () => localStorage.getItem(STORAGE_KEY)
const getStoredUser = (): LoginResponse['user'] | null => {
  try {
    const rawUser = localStorage.getItem(USER_KEY)
    if (!rawUser) {
      return null
    }
    return JSON.parse(rawUser) as LoginResponse['user']
  } catch {
    return null
  }
}
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
  const [isBackendAvailable, setIsBackendAvailable] = useState(true)
  const [user, setUser] = useState<LoginResponse['user'] | null>(() => getStoredUser())
  const [userRoles, setUserRoles] = useState<UserRoles>(getInitialRoles)
  const userRole = userRoles[0] ?? 'viewer'

  useEffect(() => {
    if (import.meta.env.DEV) {
      console.info('[Auth] Active roles:', userRoles)
    }
  }, [userRoles])

  const setUserProfile = useCallback((nextUser: LoginResponse['user'] | null) => {
    setUser(nextUser)
    if (nextUser) {
      localStorage.setItem(USER_KEY, JSON.stringify(nextUser))
      localStorage.setItem('user', JSON.stringify(nextUser))
      return
    }

    localStorage.removeItem(USER_KEY)
    localStorage.removeItem('user')
  }, [])

  const updateUser = useCallback((data: Partial<LoginResponse['user']>) => {
    setUser((prev) => {
      const currentUser = prev ?? { name: '', email: '', avatarUrl: '' }
      const updated = { ...currentUser, ...data }

      localStorage.setItem(USER_KEY, JSON.stringify(updated))
      localStorage.setItem('user', JSON.stringify(updated))

      return updated
    })
  }, [])

  const login = useCallback(async ({ email, password }: AuthCredentials) => {
    if (!email || !password) {
      throw new Error('Credenciais inválidas')
    }

    try {
      const response = await api.post<LoginResponse>('/auth/login', {
        username: email,
        password,
      })
      const data = response.data
      const safeRoles = Array.isArray(data.roles)
        ? data.roles.filter((role): role is UserRole => isUserRole(role))
        : []
      const resolvedRoles: UserRole[] = safeRoles.length ? safeRoles : ['viewer']

      setIsBackendAvailable(true)
      setToken(data.token)
      setUserProfile(data.user ?? null)
      setUserRoles(resolvedRoles)
      setFeatureFlags(data.features || {})

      localStorage.setItem(STORAGE_KEY, data.token)
      localStorage.setItem('token', data.token)
      localStorage.setItem(ROLE_KEY, resolvedRoles[0] ?? 'viewer')

      console.info('[Auth] roles:', data.roles)
      console.info('[Auth] features:', data.features)
      console.info('[Auth] Mode:', 'API')
    } catch (error: any) {
      console.error('Login failed', error)
      const isTimeout = error?.code === 'ECONNABORTED'
      const isNetworkError = !error?.response
      const isFallbackEnabled = getEnvBoolean(import.meta.env.VITE_ENABLE_AUTH_FALLBACK)

      if (!isFallbackEnabled) {
        setIsBackendAvailable(false)
        throw new Error(
          isTimeout || isNetworkError
            ? 'Backend indisponível no momento. Tente novamente.'
            : 'Falha na autenticação. Verifique suas credenciais.',
        )
      }

      if (isTimeout || isNetworkError) {
        console.warn('[Auth] Backend indisponivel - usando fallback local')
      } else {
        console.warn('[Auth] Erro de autenticacao - usando fallback local')
      }
      console.info('[Auth] Mode:', isNetworkError ? 'OFFLINE (fallback)' : 'API')

      const fallbackRoles: UserRole[] = email?.includes('admin')
        ? ['admin']
        : email?.includes('manager') || email?.includes('gestao')
          ? ['manager']
          : ['viewer']

      setIsBackendAvailable(false)
      setUserRoles(fallbackRoles)
      setFeatureFlags({})
      setToken('mock-token-local')
      setUserProfile({
        name: email,
        email,
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      })

      localStorage.setItem(STORAGE_KEY, 'mock-token-local')
      localStorage.setItem('token', 'mock-token-local')
      localStorage.setItem(ROLE_KEY, fallbackRoles[0] ?? 'viewer')
    }
  }, [setFeatureFlags, setUserProfile])

  const logout = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    localStorage.removeItem('token')
    localStorage.removeItem(ROLE_KEY)
    localStorage.removeItem(USER_KEY)
    localStorage.removeItem('user')
    setToken(null)
    setUserProfile(null)
    setUserRoles(['viewer'])
    setFeatureFlags({})
  }, [setFeatureFlags, setUserProfile])

  const value = useMemo(
    () => ({
      token,
      isAuthenticated: Boolean(token),
      isBackendAvailable,
      user,
      setUser: setUserProfile,
      updateUser,
      userRole,
      userRoles,
      setUserRoles,
      login,
      logout,
    }),
    [
      token,
      isBackendAvailable,
      user,
      setUserProfile,
      updateUser,
      userRole,
      userRoles,
      login,
      logout,
    ],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const AuthContextConsumer = AuthContext
