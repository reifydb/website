import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, state } = useLocation();
  const preserveScroll =
    (state as { preserveScroll?: boolean } | null)?.preserveScroll === true;

  useEffect(() => {
    if (preserveScroll) return;
    window.scrollTo(0, 0);
  }, [pathname, preserveScroll]);

  return null;
}

export function TrailingSlashRedirect() {
  const { pathname, search, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (pathname !== '/' && pathname.endsWith('/')) {
      navigate(pathname.slice(0, -1) + search + hash, { replace: true });
    }
  }, [pathname, search, hash, navigate]);

  return null;
}
