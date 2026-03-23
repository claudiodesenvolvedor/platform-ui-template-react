import { Suspense, lazy, useEffect, useState } from 'react'
import type { ComponentType, LazyExoticComponent } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppContent } from './components/AppContent'
import { FeatureFlagProvider, useFeatureFlags } from './context/FeatureFlagContext'
import { useAuth } from './hooks/auth'
import type { UserRole } from './hooks/auth/AuthContext'
import { AppLayout } from './layouts/AppLayout'
import { LoginPage } from './pages/auth/LoginPage'
import { getFeatureFlag } from './utils/featureFlags'
import { getPages } from './utils/pageRegistry'
import { resolveComponent } from './utils/routes'

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
        <Route element={<AppLayout />}>
          <Route element={<AppContent />}>
            {routes.map((route) => {
              const { path, PageComponent, roles } = route
              const isFeatureEnabled = route.featureFlag
                ? getFeatureFlag(route.featureFlag, featureFlags)
                : true
              const allowed =
                (!roles?.length || roles.some((r) => userRoles.includes(r as UserRole))) &&
                isFeatureEnabled
              const routePath = path === '/' ? '/' : `${path}/*`

              return (
                <Route
                  key={path}
                  path={routePath}
                  element={
                    isAuthenticated
                      ? allowed
                        ? <PageComponent />
                        : <Navigate to="/" replace />
                      : <LoginPage />
                  }
                />
              )
            })}
            <Route path="*" element={isAuthenticated ? <Navigate to="/" replace /> : <LoginPage />} />
          </Route>
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
