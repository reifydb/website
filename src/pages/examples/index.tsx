import { useState, useCallback, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { exampleSections, getSectionById } from './sections';
import { ExamplesSidebar, ExamplesSidebarMobile } from './examples-sidebar';
import { ExampleRenderer } from './example-renderer';

export function ExamplesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const activeId = searchParams.get('id') || exampleSections[0]?.id || '';
  const activeSection = getSectionById(activeId) || exampleSections[0];

  const handleSelect = useCallback((id: string) => {
    setSearchParams({ id }, { replace: true });
  }, [setSearchParams]);

  // Close drawer on escape
  useEffect(() => {
    if (!drawerOpen) return;
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [drawerOpen]);

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <div className="flex flex-1">
        <ExamplesSidebar
          sections={exampleSections}
          activeId={activeId}
          onSelect={handleSelect}
        />
        <main className="flex-1 bg-bg-primary overflow-y-auto">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 md:px-8 lg:pl-12 py-6 sm:py-8">
            {/* Mobile sidebar toggle */}
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-4 transition-colors"
            >
              <span className="font-mono">[=]</span>
              Browse examples
            </button>

            {activeSection && (
              <>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-1">
                  {activeSection.title}
                </h1>
                <p className="text-text-muted text-sm mb-6">{activeSection.subtitle}</p>
                <ExampleRenderer key={activeSection.id} section={activeSection} />
              </>
            )}
          </div>
        </main>
      </div>
      <Footer />

      {/* Mobile drawer */}
      <ExamplesSidebarMobile
        sections={exampleSections}
        activeId={activeId}
        onSelect={handleSelect}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
