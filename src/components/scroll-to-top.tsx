import { useEffect } from 'react';
import { useLocation, useNavigate, useNavigationType } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname, state } = useLocation();
  const navigationType = useNavigationType();
  const preserveScroll =
    (state as { preserveScroll?: boolean } | null)?.preserveScroll === true;
  const isUrlCorrection = navigationType === 'REPLACE';

  useEffect(() => {
    if (preserveScroll || isUrlCorrection) return;
    window.scrollTo(0, 0);
  }, [pathname, preserveScroll, isUrlCorrection]);

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
