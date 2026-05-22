import { Outlet } from 'react-router-dom'
import { Footer } from './Footer'
import { Header } from './Header'
import { HashScroller } from './HashScroller'

export function SiteLayout() {
  return (
    <div className="app-shell">
      <HashScroller />
      <Header />
      <main>
        <Outlet />
      </main>
      <Footer />
      <a
        className="whatsapp-float"
        href="https://wa.me/34662226546"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Abrir WhatsApp"
      >
        WA
      </a>
    </div>
  )
}
