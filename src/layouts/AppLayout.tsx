import { useEffect, useMemo, useRef, useState } from 'react'
import type { ReactElement } from 'react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import type { UserRole } from '../hooks/auth/AuthContext'
import { useFeatureFlags } from '../context/FeatureFlagContext'
import { useAuth } from '../hooks/auth'
import { useTheme } from '../theme'
import {
  buildNavigationFromPages,
  getPages,
  type NavigationNode,
  type PageRegistryItem,
} from '../utils/pageRegistry'
import '../styles/layout.css'

export const AppLayout = () => {
  const { userRole, userRoles, logout } = useAuth()
  const { featureFlags } = useFeatureFlags()
  const location = useLocation()
  const theme = useTheme()
  const isSupervia = theme.brandName === 'supervia'
  const isSupervia1 = theme.brandName === 'supervia1'
  const supervia1FlyoutMenuRef = useRef<HTMLElement | null>(null)
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isSupervia)
  const [isSupervia1MenuOpen, setIsSupervia1MenuOpen] = useState(false)
  const [hoverTimeout, setHoverTimeout] = useState<number | null>(null)
  const [pages, setPages] = useState<PageRegistryItem[]>([])
  const [appVersion, setAppVersion] = useState(
    import.meta.env.VITE_APP_VERSION ?? '0.0.0',
  )

  useEffect(() => {
    setIsSidebarCollapsed(isSupervia)
  }, [isSupervia])

  useEffect(() => {
    if (!isSupervia1) {
      setIsSupervia1MenuOpen(false)
      return
    }

    let isMounted = true

    const loadVersionFromPackageJson = async () => {
      try {
        const response = await fetch('/package.json')
        if (!response.ok) {
          return
        }

        const payload = (await response.json()) as { version?: unknown }
        if (isMounted && typeof payload.version === 'string') {
          setAppVersion(payload.version)
        }
      } catch {
        // Keep environment fallback when package.json is not available.
      }
    }

    void loadVersionFromPackageJson()

    return () => {
      isMounted = false
    }
  }, [isSupervia1])

  useEffect(() => {
    void getPages().then(setPages)
  }, [])

  const allowedPages = useMemo(
    () =>
      pages.filter((page) => {
        const hasPermission =
          !page.roles || page.roles.some((role) => userRoles.includes(role as UserRole))

        const isEnabled =
          !page.featureFlag || featureFlags?.[page.featureFlag] !== false

        return hasPermission && isEnabled
      }),
    [pages, userRoles, featureFlags],
  )

  const navigationTree = useMemo(
    () => buildNavigationFromPages(allowedPages),
    [allowedPages],
  )
  const environmentName = import.meta.env.MODE
  const footerVersionText = import.meta.env.PROD
    ? `v${appVersion}`
    : `v${appVersion} • ${environmentName}`
  const companyName =
    'companyName' in theme.content && typeof theme.content.companyName === 'string'
      ? theme.content.companyName
      : 'Supervia'
  const userAvatarPlaceholder =
    "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 64 64'%3E%3Ccircle cx='32' cy='32' r='32' fill='%23E6EDF7'/%3E%3Ccircle cx='32' cy='25' r='12' fill='%2390A4C2'/%3E%3Cpath d='M12 56c2-11 10-18 20-18s18 7 20 18' fill='%2390A4C2'/%3E%3C/svg%3E"

  const clearHoverTimeout = () => {
    if (hoverTimeout !== null) {
      window.clearTimeout(hoverTimeout)
      setHoverTimeout(null)
    }
  }

  const handleMouseEnter = () => {
    clearHoverTimeout()
  }

  const handleMouseLeave = () => {
    clearHoverTimeout()
    const timeoutId = window.setTimeout(() => {
      const menuElement = supervia1FlyoutMenuRef.current
      const isHoveringMenu =
        Boolean(menuElement?.matches(':hover')) ||
        Boolean(menuElement && menuElement.contains(document.activeElement))

      if (!isHoveringMenu) {
        setIsSupervia1MenuOpen(false)
      }
      setHoverTimeout(null)
    }, 200)
    setHoverTimeout(timeoutId)
  }

  const handleNavigateFromMenu = () => {
    clearHoverTimeout()
    setIsSupervia1MenuOpen(false)
  }

  const findLabelByPath = (items: NavigationNode[], path: string): string | undefined => {
    for (const item of items) {
      if (item.path === path) {
        return item.label
      }
      if (item.children && item.children.length > 0) {
        const nestedResult = findLabelByPath(item.children, path)
        if (nestedResult) {
          return nestedResult
        }
      }
    }
    return undefined
  }

  const dashboardLabel = findLabelByPath(navigationTree, '/') ?? 'Dashboard'
  const usersLabel = findLabelByPath(navigationTree, '/users') ?? 'Usuários'

  const renderNavigationItems = (
    items: NavigationNode[],
    isSubmenu = false,
  ): ReactElement => (
    <ul
      className={
        isSubmenu
          ? 'app-supervia1-flyout-menu__submenu'
          : 'app-supervia1-flyout-menu__list'
      }
    >
      {items.map((item) => {
        const hasChildren = Boolean(item.children && item.children.length > 0)
        return (
          <li
            key={item.id}
            className={`app-supervia1-flyout-menu__item${hasChildren ? ' app-supervia1-flyout-menu__item--has-children' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            {item.path ? (
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? 'app-supervia1-flyout-menu__action active'
                    : 'app-supervia1-flyout-menu__action'
                }
                to={item.path}
                onClick={handleNavigateFromMenu}
              >
                {item.label}
              </NavLink>
            ) : (
              <button className="app-supervia1-flyout-menu__action" type="button">
                {item.label}
              </button>
            )}

            {item.children?.length
              ? renderNavigationItems(item.children, true)
              : null}
          </li>
        )
      })}
    </ul>
  )

  useEffect(() => {
    if (!isSupervia1) {
      return
    }

    clearHoverTimeout()
    setIsSupervia1MenuOpen(false)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, isSupervia1])

  useEffect(() => () => clearHoverTimeout(), [hoverTimeout])

  return (
    <div
      className={`app-layout${isSidebarCollapsed ? ' app-layout--sidebar-collapsed' : ''}`}
    >
      {isSupervia ? (
        <header className="app-header app-header--supervia">
          <div className="app-header__section app-header__section--left">
            <button
              className="app-header__menu-button"
              type="button"
              aria-label={
                isSidebarCollapsed ? 'Expandir menu' : 'Recolher menu'
              }
              onClick={() => setIsSidebarCollapsed((current) => !current)}
            >
              ☰
            </button>
            <div className="app-header__logo-wrapper">
              <img
                className="app-header__logo"
                src="/assets/supervia-logo.svg"
                alt="Supervia"
              />
            </div>
          </div>
          <div className="app-header__section app-header__section--center">
            <span className="app-header__system-name">
              {theme.content.systemName}
            </span>
          </div>
          <div className="app-header__section app-header__section--right">
            <span className="app-header__user">Usuário: desconhecido</span>
          </div>
        </header>
      ) : isSupervia1 ? (
        <header className="app-header app-header--supervia1">
          <div className="app-header__supervia1-row app-header__supervia1-row--top">
            <div className="app-header__section app-header__section--left app-header__section--supervia1-left">
              <div className="app-header__logo-wrapper">
                <img
                  className="app-header__logo"
                  src="/assets/supervia-logo.svg"
                  alt="Supervia"
                />
              </div>
            </div>
            <div className="app-header__section app-header__section--center app-header__section--supervia1-center">
              <span className="app-header__system-name app-header__system-name--supervia1">
                [Nome do Sistema]
              </span>
            </div>
            <div className="app-header__section app-header__section--right app-header__section--supervia1-right">
              <div className="app-header__avatar-wrap">
                <img
                  className="app-header__avatar"
                  src={userAvatarPlaceholder}
                  alt="Usuário"
                />
              </div>
            </div>
          </div>
          <div className="app-header__supervia1-row app-header__supervia1-row--bottom">
            <div className="app-header__section app-header__section--left app-header__section--supervia1-bottom-left">
              <button
                className="app-header__menu-button app-header__menu-button--supervia1"
                type="button"
                aria-label={isSupervia1MenuOpen ? 'Fechar menu' : 'Abrir menu'}
                aria-expanded={isSupervia1MenuOpen}
                onClick={() => setIsSupervia1MenuOpen((current) => !current)}
              >
                ☰
              </button>
              {isSupervia1MenuOpen && (
                <>
                  <nav
                    className="app-supervia1-flyout-menu"
                    aria-label="Menu desktop supervia1"
                    ref={supervia1FlyoutMenuRef}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                  >
                    {renderNavigationItems(navigationTree)}
                  </nav>

                  <nav className="app-supervia1-menu" aria-label="Menu mobile supervia1">
                    <button className="app-supervia1-menu__item" type="button">
                      Dashboard
                    </button>
                    <div className="app-supervia1-menu__group-title">Cadastros</div>
                    <button
                      className="app-supervia1-menu__item app-supervia1-menu__item--child"
                      type="button"
                    >
                      Usuários
                    </button>
                    <button className="app-supervia1-menu__item" type="button">
                      Relatórios
                    </button>
                  </nav>
                </>
              )}
            </div>
            <div className="app-header__section app-header__section--right app-header__section--supervia1-bottom-right">
              <button
                className="app-header__logout app-header__logout--supervia1"
                type="button"
                onClick={logout}
              >
                Sair
              </button>
            </div>
          </div>
        </header>
      ) : (
        <header className="app-header">
          <div className="app-header__brand">
            <div className="app-header__logo" aria-hidden="true" />
            <span className="app-header__brand-text">Template Corporativo</span>
          </div>
          <div className="app-header__actions">
            <span className="app-header__role">{userRole}</span>
            <button className="app-header__logout" type="button" onClick={logout}>
              Sair
            </button>
          </div>
        </header>
      )}

      {!isSupervia1 && (
        <div className="app-alert-bar">
          <div className="app-alert-bar__content">
            <span className="app-alert-bar__spacer" />
            {isSupervia && (
              <button
                className="app-alert-bar__logout"
                type="button"
                onClick={logout}
              >
                Sair
              </button>
            )}
          </div>
        </div>
      )}

      {!isSupervia1 && <aside className="app-sidebar">
        {isSupervia && (
          <button
            className="app-sidebar__menu-button"
            type="button"
            aria-label={
              isSidebarCollapsed ? 'Expandir menu' : 'Recolher menu'
            }
            onClick={() => setIsSidebarCollapsed((current) => !current)}
          >
            ☰
          </button>
        )}
        {isSupervia ? (
          !isSidebarCollapsed && (
            <nav className="app-nav app-nav--supervia" aria-label="Menu">
              <div className="app-nav__item">
                {dashboardLabel}
              </div>
              <div className="app-nav__group">
                <div className="app-nav__item app-nav__item--parent">
                  Cadastros
                </div>
                <div className="app-nav__item app-nav__item--child">
                  {usersLabel}
                </div>
              </div>
            </nav>
          )
        ) : (
          <nav className="app-nav">
            {navigationTree.map((item) => {
              if (item.children?.length) {
                return (
                  <div key={item.id} className="app-nav__group">
                    <div className="app-nav__item app-nav__item--parent">
                      {item.label}
                    </div>

                    {item.children.map((child) =>
                      child.path ? (
                        <NavLink
                          key={child.path}
                          className="app-nav__link app-nav__link--child"
                          to={child.path}
                        >
                          {child.label}
                        </NavLink>
                      ) : null,
                    )}
                  </div>
                )
              }

              if (item.path) {
                return (
                  <NavLink key={item.path} className="app-nav__link" to={item.path}>
                    {item.label}
                  </NavLink>
                )
              }

              return null
            })}
          </nav>
          
        )}
      </aside>}

      <main className="app-content">
        <div className="app-content__panel">
          <Outlet />
        </div>
      </main>
      {isSupervia1 && (
        <footer className="app-footer app-footer--supervia1">
          <span className="app-footer__copyright">
            {`© Copyright - Direitos reservados à ${companyName}`}
          </span>
          <span className="app-footer__version">{footerVersionText}</span>
        </footer>
      )}
    </div>
  )
}
