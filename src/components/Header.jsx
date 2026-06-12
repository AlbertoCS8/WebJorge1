import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { useLanguage } from '../context/LanguageContext'

export function Header() {
  const [open, setOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const { language, setLanguage, t } = useLanguage()

  const closeMenus = () => {
    setOpen(false)
    setServicesOpen(false)
  }

  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" onClick={closeMenus} className="nav-brand-link-react">
          <img className="nav-brand" src="/legacy/images/NUEVO-MUNDO_LOGO5.svg" alt="Amsterdam tours logo" />
        </Link>

        <div className="lang-switcher-mv">
          <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
            EN
          </button>
          <span className="lang-divider">|</span>
          <button className={`lang-btn ${language === 'es' ? 'active' : ''}`} onClick={() => setLanguage('es')}>
            ES
          </button>
        </div>

        <button
          className="nav-toggle"
          aria-label="Toggle navigation"
          type="button"
          onClick={() => setOpen((prev) => !prev)}
        >
          <span />
          <span />
          <span />
        </button>

        <ul className={`nav-menu ${open ? 'active' : ''}`}>
          <li>
            <Link to="/#tours" className="nav-link nav-link-strong" onClick={closeMenus}>
              {t('Tours', 'Tours')}
            </Link>
          </li>
          <li>
            <Link to="/#about" className="nav-link" onClick={closeMenus}>
              {t('Sobre mi', 'About me')}
            </Link>
          </li>
          <li className={`nav-dropdown ${servicesOpen ? 'open' : ''}`}>
            <button
              type="button"
              className="nav-link nav-link-button nav-dropdown-toggle"
              aria-expanded={servicesOpen}
              onClick={() => setServicesOpen((prev) => !prev)}
            >
              {t('Servicios', 'Services')}
            </button>
            <ul className="nav-submenu">
              <li>
                <NavLink to="/media-service" className="nav-link nav-sublink" onClick={closeMenus}>
                  Media
                </NavLink>
              </li>
              <li>
                <NavLink to="/private-tour" className="nav-link nav-sublink" onClick={closeMenus}>
                  {t('Tour a medida', 'Custom Tour')}
                </NavLink>
              </li>
            </ul>
          </li>
          <li>
            <NavLink to="/nosotros" className="nav-link" onClick={closeMenus}>
              {t('Nosotros', 'About us')}
            </NavLink>
          </li>
          <li>
            <a href="https://wa.me/34662226546" className="nav-link" target="_blank" rel="noopener noreferrer">
              {t('Contacto', 'Contact')}
            </a>
          </li>
          <li>
            <Link to="/#faq" className="nav-link" onClick={closeMenus}>
              FAQ
            </Link>
          </li>
        </ul>

        <div className="lang-switcher">
          <button className={`lang-btn ${language === 'en' ? 'active' : ''}`} onClick={() => setLanguage('en')}>
            EN
          </button>
          <span className="lang-divider">|</span>
          <button className={`lang-btn ${language === 'es' ? 'active' : ''}`} onClick={() => setLanguage('es')}>
            ES
          </button>
        </div>

        <a
          className="instagram-btn"
          href="https://www.instagram.com/jorgemarinmarlasca/"
          target="_blank"
          rel="noopener noreferrer"
        >
          {t('Mis redes sociales', 'My social media')}
        </a>
      </div>
    </nav>
  )
}
