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
  const [isSupervia1MenuOpen, setIsSupervia1MenuOpen] = useState(false)
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
                Sistema XPTO
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
                  >
                    <ul className="app-supervia1-flyout-menu__list">
                      <li className="app-supervia1-flyout-menu__item app-supervia1-flyout-menu__item--has-children">
                        <button className="app-supervia1-flyout-menu__action" type="button">
                          Administração
                        </button>
                        <ul className="app-supervia1-flyout-menu__submenu">
                          <li className="app-supervia1-flyout-menu__item app-supervia1-flyout-menu__item--has-children">
                            <button
                              className="app-supervia1-flyout-menu__action"
                              type="button"
                            >
                              Cadastro
                            </button>
                            <ul className="app-supervia1-flyout-menu__submenu">
                              <li className="app-supervia1-flyout-menu__item app-supervia1-flyout-menu__item--has-children">
                                <button
                                  className="app-supervia1-flyout-menu__action"
                                  type="button"
                                >
                                  Relacionamentos
                                </button>
                                <ul className="app-supervia1-flyout-menu__submenu">
                                  <li className="app-supervia1-flyout-menu__item">
                                    <button
                                      className="app-supervia1-flyout-menu__action"
                                      type="button"
                                    >
                                      Itens
                                    </button>
                                  </li>
                                </ul>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      </li>
                      <li className="app-supervia1-flyout-menu__item">
                        <button className="app-supervia1-flyout-menu__action" type="button">
                          Previsão
                        </button>
                      </li>
                      <li className="app-supervia1-flyout-menu__item">
                        <button className="app-supervia1-flyout-menu__action" type="button">
                          Importação
                        </button>
                      </li>
                      <li className="app-supervia1-flyout-menu__item">
                        <button className="app-supervia1-flyout-menu__action" type="button">
                          Relatórios
                        </button>
                      </li>
                      <li className="app-supervia1-flyout-menu__item">
                        <button className="app-supervia1-flyout-menu__action" type="button">
                          Alterações Materiais
                        </button>
                      </li>
                      <li className="app-supervia1-flyout-menu__item">
                        <button className="app-supervia1-flyout-menu__action" type="button">
                          Ajuda
                        </button>
                      </li>
                    </ul>
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
