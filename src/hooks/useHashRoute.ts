import { useCallback, useEffect, useState } from 'react';
import type { RouteId } from '../types/app';

const VALID_ROUTES: readonly RouteId[] = ['overview', 'components', 'settings'];

function parseHashRoute(): RouteId {
  const raw = window.location.hash.replace(/^#\/?/, '').trim().toLowerCase();
  if ((VALID_ROUTES as readonly string[]).includes(raw)) {
    return raw as RouteId;
  }
  return 'overview';
}

export function useHashRoute() {
  const [route, setRoute] = useState<RouteId>(() => parseHashRoute());

  useEffect(() => {
    const onHashChange = () => {
      setRoute(parseHashRoute());
    };
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);

  const navigate = useCallback((next: RouteId) => {
    const targetHash = `#/${next}`;
    if (window.location.hash !== targetHash) {
      window.location.hash = targetHash;
    }
    setRoute(next);
  }, []);

  return { route, navigate };
}
