import { useLocation } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { useIsDraft } from '@/components/draft-context';
import { PageMeta } from '@/components/page-meta';
import { JsonLd } from '@/components/json-ld';
import { canonicalUrl } from '@/lib/site';
import { DocsSidebar, DocsNavTree, SectionTabs, Breadcrumbs, PageNav } from './components';
import { navSections, getBreadcrumbs, getActiveSectionTitle, getOrderedPages } from './data/navigation';

interface DocsLayoutProps {
  children: React.ReactNode;
  title?: string;
  description?: string;
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

export function Layout({ children, title, description }: DocsLayoutProps) {
  const location = useLocation();
  const isDraft = useIsDraft();
  const trail = getBreadcrumbs(navSections, location.pathname).filter(
    (crumb) => crumb.href !== '/docs',
  );
  const activeSectionTitle = getActiveSectionTitle(navSections, location.pathname);
  const activeSection = navSections.find((s) => s.title === activeSectionTitle);
  const sidebarSections = activeSection ? [activeSection] : navSections;

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
      <Navbar mobileExtra={<DocsNavTree sections={navSections} currentPath={location.pathname} />} />
      <SectionTabs sections={navSections} activeTitle={activeSectionTitle} />
      <div className="flex flex-1">
        <DocsSidebar sections={sidebarSections} currentPath={location.pathname} />
        <main className="flex-1 bg-bg-primary">
          <div className="font-body max-w-4xl mx-auto pl-4 pr-4 sm:px-6 py-6 sm:py-8 md:px-8 lg:pl-12">
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
