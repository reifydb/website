import { useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';
import { DocsSidebar, DocsNavbar } from './components';
import { navSections } from './data/navigation';

interface DocsLayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: DocsLayoutProps) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <DocsNavbar />
      <div className="flex flex-1">
        <DocsSidebar sections={navSections} currentPath={location.pathname} />
        <main className="flex-1 bg-bg-primary">
          <div className="max-w-4xl mx-auto pl-4 pr-4 sm:px-6 py-6 sm:py-8 md:px-8 lg:pl-12">
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
