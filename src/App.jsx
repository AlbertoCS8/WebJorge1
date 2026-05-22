import { Navigate, Route, Routes } from 'react-router-dom'
import { LegacyPage } from './pages/LegacyPage'

function App() {
  return (
    <Routes>
      <Route path="/" element={<LegacyPage src="/legacy/index.html" title="Inicio" />} />
      <Route
        path="/media-service"
        element={<LegacyPage src="/legacy/media-service.html" title="Media Service" />}
      />
      <Route
        path="/private-tour"
        element={<LegacyPage src="/legacy/private-tour.html" title="Private Tour" />}
      />
      <Route path="/nosotros" element={<LegacyPage src="/legacy/nosotros.html" title="Nosotros" />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  )
}

export default App
