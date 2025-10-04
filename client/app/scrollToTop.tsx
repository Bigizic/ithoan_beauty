import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'

interface ScrollToTopProps {
  height?: number
  behavior?: 'smooth' | 'auto'
}

export default function ScrollToTop({
  height = 0,
  behavior = 'auto',
}: ScrollToTopProps) {
  const location = useLocation()

  useEffect(() => {
    requestAnimationFrame(() => {
      const el = document.querySelector('application') as HTMLElement | null
      if (el) {
        el.scrollTo({ top: height, behavior })
      } else {
        window.scrollTo({ top: height, behavior })
      }
    })
  }, [location.pathname, height, behavior])

  return null
}
