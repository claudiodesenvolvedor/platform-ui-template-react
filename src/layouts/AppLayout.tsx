import { NavLink, Outlet } from 'react-router-dom'
import { navigationItems } from '../config/navigation'
import { useAuth } from '../hooks/auth'
import '../styles/layout.css'

export const AppLayout = () => {
  const { userRole, logout } = useAuth()

  const availableItems = navigationItems.filter((item) =>
    item.roles.includes(userRole),
  )

  return (
    <div className="app-layout">
      <header className="app-header">
        <div className="app-header__brand">Template Corporativo</div>
        <div className="app-header__actions">
          <span className="app-header__role">{userRole}</span>
          <button className="app-header__logout" type="button" onClick={logout}>
            Sair
          </button>
        </div>
      </header>

      <aside className="app-sidebar">
        <nav className="app-nav">
          {availableItems.map((item) => (
            <NavLink key={item.path} className="app-nav__link" to={item.path}>
              {item.label}
            </NavLink>
          ))}
        </nav>
      </aside>

      <main className="app-content">
        <Outlet />
      </main>
    </div>
  )
}
