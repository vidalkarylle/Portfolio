import { useEffect, useState } from 'react'

export type Route = '/' | '/about' | '/projects' | '/journey' | '/contact'

const VALID_ROUTES: readonly Route[] = [
  '/',
  '/about',
  '/projects',
  '/journey',
  '/contact',
]

function normalizePath(pathname: string): string {
  if (pathname.length > 1 && pathname.endsWith('/')) {
    return pathname.slice(0, -1)
  }
  return pathname || '/'
}

function migrateHash(): void {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return
  const path = hash.slice(1) || '/'
  const next = (VALID_ROUTES as readonly string[]).includes(path)
    ? path
    : '/'
  window.history.replaceState(null, '', next)
}

function parsePath(): Route {
  migrateHash()
  const path = normalizePath(window.location.pathname)
  return (VALID_ROUTES as readonly string[]).includes(path) ? (path as Route) : '/'
}

export function navigateTo(
  to: Route,
  event?: React.MouseEvent<HTMLAnchorElement>,
) {
  if (
    event &&
    (event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      event.altKey ||
      event.button !== 0)
  ) {
    return
  }
  event?.preventDefault()

  const current = normalizePath(window.location.pathname)
  if (current === to && !window.location.hash) {
    window.scrollTo(0, 0)
    return
  }

  window.history.pushState(null, '', to)
  window.dispatchEvent(new PopStateEvent('popstate'))
}

export function useRoute(): Route {
  const [route, setRoute] = useState<Route>(parsePath)

  useEffect(() => {
    const onChange = () => {
      setRoute(parsePath())
      window.scrollTo(0, 0)
    }
    window.addEventListener('popstate', onChange)
    return () => window.removeEventListener('popstate', onChange)
  }, [])

  return route
}
