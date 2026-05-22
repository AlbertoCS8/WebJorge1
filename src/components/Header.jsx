import { useEffect, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'

const navItems = [
  { to: '/', label: 'Inicio' },
  { to: '/media-service', label: 'Media' },
  { to: '/private-tour', label: 'Tour Privado' },
  { to: '/nosotros', label: 'Nosotros' },
  { to: '/#faq', label: 'FAQ' },
]

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    setOpen(false)
  }, [location.pathname, location.hash])

  return (
    <header className="site-header">
      <div className="container nav-shell">
        <Link to="/" className="brand">
          <img src="/images/NUEVO-MUNDO_LOGO5.svg" alt="Nuevo Mundo Tours" />
        </Link>

        <button
          className="menu-toggle"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          aria-expanded={open}
          aria-label="Abrir menu"
        >
          <span />
          <span />
          <span />
        </button>

        <nav className={`main-nav ${open ? 'is-open' : ''}`}>
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `nav-link ${isActive && item.to !== '/#faq' ? 'active' : ''}`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        <a
          className="social-cta"
          href="https://www.instagram.com/jorgemarinmarlasca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </div>
    </header>
  )
}
