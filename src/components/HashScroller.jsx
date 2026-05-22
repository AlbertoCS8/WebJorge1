import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function HashScroller() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      return
    }

    const targetId = location.hash.replace('#', '')
    const target = document.getElementById(targetId)

    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }, [location])

  return null
}
