import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/components/scroll-to-top';

export function RootLayout() {
  return (
    <div className="min-h-screen">
      <ScrollToTop />
      <Outlet />
    </div>
  );
}
