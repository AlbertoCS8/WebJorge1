import { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import AOS from 'aos'
import 'aos/dist/aos.css'
import { SiteLayout } from './components/SiteLayout'
import { AboutUsPage } from './pages/AboutUsPage'
import { HomePage } from './pages/HomePage'
import { MediaServicePage } from './pages/MediaServicePage'
import { PrivateTourPage } from './pages/PrivateTourPage'

function App() {
  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: 'ease-out-cubic',
      once: false,
      mirror: true,
      offset: 20,
    })

    AOS.refreshHard()
  }, [])

  return (
    <Routes>
      <Route element={<SiteLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/media-service" element={<MediaServicePage />} />
        <Route path="/private-tour" element={<PrivateTourPage />} />
        <Route path="/nosotros" element={<AboutUsPage />} />
      </Route>
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
