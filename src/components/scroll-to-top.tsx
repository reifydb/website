import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

export function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
