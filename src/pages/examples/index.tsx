import { useState, useCallback, useEffect } from 'react';
import { Menu } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { Navbar } from '@/components/layout/navbar';
import { Footer } from '@/components/layout/footer';
import { PageMeta } from '@/components/page-meta';
import { ExecutableSnippet } from '@/components/ui';
import { RqlHighlight } from '@/components/ui/rql-highlight';
import { EXAMPLES, ExampleHost, LivePanel, exampleById, useWatchWhileVisible } from '@/components/examples';
import { ExamplesSidebar, ExamplesSidebarMobile } from './examples-sidebar';
import { SectionHeader } from './section-header';

export function ExamplesPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const active = exampleById(searchParams.get('id')) ?? EXAMPLES[0];
  const activeIndex = EXAMPLES.indexOf(active);
  const next = EXAMPLES[(activeIndex + 1) % EXAMPLES.length];
  const readsRef = useWatchWhileVisible<HTMLElement>(active.id);
  const editorRef = useWatchWhileVisible<HTMLElement>(active.id);

  const handleSelect = useCallback((id: string) => {
    setSearchParams({ id }, { replace: true });
  }, [setSearchParams]);

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
      <PageMeta
        title="Examples | ReifyDB"
        description="Interactive examples running a real ReifyDB in your browser."
      />
      <Navbar framed />
      <div className="flex flex-1">
        <ExamplesSidebar examples={EXAMPLES} activeId={active.id} onSelect={handleSelect} />
        <main className="flex-1 min-w-0 bg-[#faf8f2] overflow-y-auto">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 md:px-8 lg:pl-12 py-6 sm:py-8">
            <button
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden flex items-center gap-2 text-sm text-text-secondary hover:text-primary mb-4 transition-colors"
            >
              <Menu size={16} />
              Browse examples
            </button>

            <SectionHeader
              eyebrow={`Example ${activeIndex + 1} of ${EXAMPLES.length}`}
              title={active.title}
              subtitle={active.subline}
            />

            <ExampleHost key={active.id} example={active} className="mt-8" />

            <section className="mt-10">
              <h2 className="label uppercase text-text-muted mb-3">How it works</h2>
              <p className="text-text-secondary leading-relaxed mb-6">{active.howItWorks.why}</p>
              <ol className="space-y-6">
                {active.howItWorks.steps.map((step, index) => (
                  <li key={step.text}>
                    <p className="text-text-secondary leading-relaxed mb-2">
                      <span className="font-mono text-text-muted mr-2">{index + 1}</span>
                      {step.text}
                    </p>
                    {step.rql && (
                      <RqlHighlight
                        code={step.rql}
                        className="px-4 py-3 border border-border-default bg-white font-mono text-[13px] leading-5 overflow-x-auto"
                      />
                    )}
                  </li>
                ))}
              </ol>
            </section>

            {active.subscription && (
              <section className="mt-10">
                <h2 className="label uppercase text-text-muted mb-3">{active.subscription.heading}</h2>
                <LivePanel key={active.id} id={active.id} subscription={active.subscription} />
              </section>
            )}

            {active.editor && (
              <section ref={editorRef} className="mt-10">
                <h2 className="label uppercase text-text-muted mb-3">{active.editor.heading}</h2>
                <p className="text-text-secondary mb-4">{active.editor.description}</p>
                <ExecutableSnippet initialCode={active.editor.rql} title={active.editor.title} />
              </section>
            )}

            <section ref={readsRef} className="mt-10">
              <h2 className="label uppercase text-text-muted mb-3">Read the live tables</h2>
              <div className="space-y-6">
                {active.reads.map((read) => (
                  <div key={read.title}>
                    <p className="text-text-secondary mb-4">{read.description}</p>
                    <ExecutableSnippet initialCode={read.rql} title={read.title} />
                  </div>
                ))}
              </div>
            </section>

            {EXAMPLES.length > 1 && (
              <button
                onClick={() => handleSelect(next.id)}
                className="mt-10 text-sm font-medium text-[#4b52d6] hover:underline"
              >
                Next example: {next.title} →
              </button>
            )}
          </div>
        </main>
      </div>
      <Footer />

      <ExamplesSidebarMobile
        examples={EXAMPLES}
        activeId={active.id}
        onSelect={handleSelect}
        isOpen={drawerOpen}
        onClose={() => setDrawerOpen(false)}
      />
    </div>
  );
}
