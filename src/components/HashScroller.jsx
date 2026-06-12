import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

export function HashScroller() {
  const location = useLocation()

  useEffect(() => {
    if (!location.hash) {
      window.scrollTo({ top: 0, behavior: 'auto' })
      return
    }

    const targetId = location.hash.replace('#', '')
    const scrollToHash = () => {
      const target = document.getElementById(targetId)

      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
    }

    scrollToHash()
    const timerId = window.setTimeout(scrollToHash, 120)

    return () => window.clearTimeout(timerId)
  }, [location])

  return null
}
