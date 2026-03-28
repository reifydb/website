import { useLocation } from 'react-router-dom';
import { Footer } from '@/components/layout/footer';
import { useIsDraft } from '@/components/docs-gate';
import { DocsSidebar, DocsNavbar } from './components';
import { navSections } from './data/navigation';

interface DocsLayoutProps {
  children: React.ReactNode;
}

function DraftBanner() {
  return (
    <div className="sticky top-[60px] z-30 -mx-4 sm:-mx-6 md:-mx-8 lg:-ml-12 -mt-6 sm:-mt-8 mb-6 bg-amber-900/30 border-b border-amber-500/30 px-4 py-2">
      <div className="flex items-center gap-2 text-amber-300 text-sm">
        <span className="font-bold">DRAFT</span>
        <span>This page is not published. Only visible in development mode.</span>
      </div>
    </div>
  );
}

export function Layout({ children }: DocsLayoutProps) {
  const location = useLocation();
  const isDraft = useIsDraft();

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      <DocsNavbar />
      <div className="flex flex-1">
        <DocsSidebar sections={navSections} currentPath={location.pathname} />
        <main className="flex-1 bg-bg-primary">
          <div className="max-w-4xl mx-auto pl-4 pr-4 sm:px-6 py-6 sm:py-8 md:px-8 lg:pl-12">
            {isDraft && <DraftBanner />}
            {children}
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
