import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useIsDraft } from '@/components/draft-context';
import { PageMeta } from '@/components/page-meta';
import { JsonLd } from '@/components/json-ld';
import { canonicalUrl } from '@/lib/site';
import { DocsSidebar, DocsNavTree, Breadcrumbs, PageNav } from './components';
import { navSections, getBreadcrumbs, getOrderedPages } from './data/navigation';

interface DocsLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
}

function DraftBanner() {
  return (
    <div className="sticky top-[60px] z-30 -mx-4 sm:-mx-6 md:-mx-8 lg:-ml-12 -mt-6 sm:-mt-8 mb-6 bg-[#f7eddd] border-b-2 border-[#e0a040] px-4 py-2">
      <div className="flex items-center gap-3 text-text-primary text-sm">
        <span className="pixel-label uppercase">Draft</span>
        <span>This page is not published. Only visible in development mode.</span>
      </div>
    </div>
  );
}

export function Layout({ children, title, description }: DocsLayoutProps) {
  const location = useLocation();
  const isDraft = useIsDraft();
  const trail = getBreadcrumbs(navSections, location.pathname).filter(
    (crumb) => crumb.href !== '/docs',
  );

  const orderedPages = getOrderedPages(navSections);
  const currentIndex = orderedPages.findIndex((p) => p.href === location.pathname);
  const prevPage = currentIndex > 0 ? orderedPages[currentIndex - 1] : null;
  const nextPage =
    currentIndex >= 0 && currentIndex < orderedPages.length - 1 ? orderedPages[currentIndex + 1] : null;

  return (
    <div className="min-h-screen flex flex-col relative z-10">
      {title && description && (
        <PageMeta title={`${title} | ReifyDB Docs`} description={description} />
      )}
      {trail.length > 0 && (
        <JsonLd
          data={{
            '@context': 'https://schema.org',
            '@type': 'BreadcrumbList',
            itemListElement: [
              {
                '@type': 'ListItem',
                position: 1,
                name: 'Home',
                item: canonicalUrl('/'),
              },
              {
                '@type': 'ListItem',
                position: 2,
                name: 'Docs',
                item: canonicalUrl('/docs'),
              },
              ...trail.map((crumb, index) => ({
                '@type': 'ListItem',
                position: index + 3,
                name: crumb.label,
                ...(crumb.href ? { item: canonicalUrl(crumb.href) } : {}),
              })),
            ],
          }}
        />
      )}
      <Navbar framed mobileExtra={<DocsNavTree sections={navSections} currentPath={location.pathname} />} />
      <div className="flex flex-1">
        <DocsSidebar sections={navSections} currentPath={location.pathname} />
        <main className="flex-1 bg-[#faf8f2]">
          <div className="docs-boards font-body text-[16px] leading-[1.7] [--text-sm:14px] max-w-4xl mx-auto pl-4 pr-4 sm:px-6 py-6 sm:py-8 md:px-8 lg:pl-12">
            {isDraft && <DraftBanner />}
            <Breadcrumbs trail={trail} />
            {children}
            <PageNav prev={prevPage} next={nextPage} />
          </div>
        </main>
      </div>
      <Footer />
    </div>
  );
}
