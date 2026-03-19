import { Suspense, lazy, useEffect, useState } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { FeatureFlagProvider, useFeatureFlags } from './context/FeatureFlagContext'
import { useAuth } from './hooks/auth'
import type { UserRole } from './hooks/auth/AuthContext'
import { AppLayout } from './layouts/AppLayout'
import { getPages } from './utils/pageRegistry'
import { resolveComponent } from './utils/routes'

const LoginPage = lazy(() =>
  import('./pages/auth/LoginPage').then((module) => ({ default: module.LoginPage })),
)

type AppRoute = {
  path: string
  roles?: string[]
  featureFlag?: string
  PageComponent: LazyExoticComponent<ComponentType<any>>
}

function AppRoutes() {
  const { isAuthenticated, userRoles } = useAuth()
  const { featureFlags } = useFeatureFlags()
  const [routes, setRoutes] = useState<AppRoute[]>([])
  const [isReady, setIsReady] = useState(false)

  useEffect(() => {
    const load = async () => {
      const pages = await getPages()

      const mapped = pages.map((route) => ({
        ...route,
        PageComponent: lazy(resolveComponent(route.component)),
      }))

      setRoutes(mapped)
      setIsReady(true)
    }

    void load()
  }, [])

  if (!isReady) {
    return null
  }

  return (
    <Suspense fallback={null}>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route
          element={isAuthenticated ? <AppLayout /> : <Navigate to="/login" replace />}
        >
          {routes.map((route) => {
            const { path, PageComponent, roles } = route
            const isFeatureEnabled =
              !route.featureFlag || featureFlags?.[route.featureFlag] !== false
            const allowed =
              (!roles?.length || roles.some((r) => userRoles.includes(r as UserRole))) &&
              isFeatureEnabled
            const routePath = path === '/' ? '/' : `${path}/*`

            return (
              <Route
                key={path}
                path={routePath}
                element={allowed ? <PageComponent /> : <Navigate to="/" replace />}
              />
            )
          })}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Suspense>
  )
}

function App() {
  return (
    <FeatureFlagProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </FeatureFlagProvider>
  )
}

export default App
