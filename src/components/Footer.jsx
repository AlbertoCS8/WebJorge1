import { useLanguage } from '../context/LanguageContext'

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-shell">
          <div className="footer-inline">
            <p className="footer-meta">
              &copy; 2026 Jorge Marin Marlasca{' '}
              <span>{t('Todos los derechos reservados.', 'All rights reserved.')}</span>
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
