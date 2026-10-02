import { useEffect, useState } from 'react'

export type Route = '/' | '/about' | '/projects' | '/contact'

const VALID_ROUTES: readonly Route[] = ['/', '/about', '/projects', '/contact']

function parseHash(): Route {
  const h = window.location.hash.replace(/^#/, '') || '/'
  return (VALID_ROUTES as readonly string[]).includes(h) ? (h as Route) : '/'
}

export function useHashRoute(): Route {
  const [route, setRoute] = useState<Route>(parseHash)

  useEffect(() => {
    const onChange = () => {
      setRoute(parseHash())
      window.scrollTo(0, 0)
    }
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
}
