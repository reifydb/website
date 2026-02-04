import { Outlet } from 'react-router-dom';
import { ScrollToTop } from '@/components/scroll-to-top';
import { BackgroundPattern } from '@/components/ui';

export function RootLayout() {
  return (
    <>
      <BackgroundPattern />
      <ScrollToTop />
      <Outlet />
    </>
  );
}
