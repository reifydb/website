import { Outlet } from 'react-router-dom';
import { ScrollToTop, TrailingSlashRedirect } from '@/components/scroll-to-top';

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <TrailingSlashRedirect />
      <Outlet />
    </div>
  );
}
