import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/components/scroll-to-top';

export function RootLayout() {
  return (
    <>
      <ScrollToTop />
      <Outlet />
    </>
  );
}
