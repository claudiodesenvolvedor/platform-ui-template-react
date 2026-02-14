import { useEffect, useMemo, useState } from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import { useAuth } from '../hooks/auth'
import { useTheme } from '../theme'
import '../styles/layout.css'

export const AppLayout = () => {
  const { userRole, logout } = useAuth()
  const theme = useTheme()
  const isSupervia = theme.brandName === 'supervia'
  const isSupervia1 = theme.brandName === 'supervia1'
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(isSupervia)

  useEffect(() => {
    setIsSidebarCollapsed(isSupervia)
  }, [isSupervia])

  const availableItems = useMemo(
    () => navigationItems.filter((item) => item.roles.includes(userRole)),
    [userRole],
  )
  const dashboardItem = useMemo(
    () => availableItems.find((item) => item.path === '/'),
    [availableItems],
  )
  const usersItem = useMemo(
    () => availableItems.find((item) => item.path === '/users'),
    [availableItems],
  )

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
          <div className="app-header__brand">
            <div className="app-header__logo-wrapper">
              <img
                className="app-header__logo"
                src="/assets/supervia-logo.svg"
                alt="Supervia"
              />
            </div>
            <span className="app-header__brand-text">{theme.content.systemName}</span>
          </div>
          <div className="app-header__actions">
            <button className="app-header__logout" type="button" onClick={logout}>
              Sair
            </button>
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

      <div className="app-alert-bar">
        <div className="app-alert-bar__content">
          {isSupervia1 ? (
            <nav className="app-top-nav" aria-label="Menu principal">
              {availableItems.map((item) => (
                <NavLink key={item.path} className="app-top-nav__link" to={item.path}>
                  {item.label}
                </NavLink>
              ))}
            </nav>
          ) : (
            <span className="app-alert-bar__spacer" />
          )}
          {isSupervia && !isSupervia1 && (
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
                {dashboardItem?.label ?? 'Dashboard'}
              </div>
              <div className="app-nav__group">
                <div className="app-nav__item app-nav__item--parent">
                  Cadastros
                </div>
                <div className="app-nav__item app-nav__item--child">
                  {usersItem?.label ?? 'Usuários'}
                </div>
              </div>
            </nav>
          )
        ) : (
          <nav className="app-nav">
            {availableItems.map((item) => (
              <NavLink key={item.path} className="app-nav__link" to={item.path}>
                {item.label}
              </NavLink>
            ))}
          </nav>
        )}
      </aside>}

      <main className="app-content">
        <div className="app-content__panel">
          <Outlet />
        </div>
      </main>
    </div>
  )
}
