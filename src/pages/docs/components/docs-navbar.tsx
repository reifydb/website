import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib';
import { navSections } from '../data/navigation';
import { AccordionItem, findAllAncestors } from './docs-sidebar';

export function DocsNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const currentPath = location.pathname;

  const [openItems, setOpenItems] = useState<Set<string>>(() => {
    return findAllAncestors(navSections, currentPath);
  });

  const toggleItem = useCallback((id: string) => {
    setOpenItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[rgba(12,12,12,0.95)] border-b border-dashed border-white/15">
        <div className="flex h-[60px] w-full items-center justify-between px-4 sm:px-6 md:px-12">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="ReifyDB"
              className="h-7 w-auto"
            />
            <span className="text-primary font-mono">$</span>
            <span className="font-bold text-lg tracking-tight text-text-primary">
              reifydb
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-0 lg:flex text-sm font-mono items-center">
            {navLinks.map((link) => {
              const active = currentPath === link.href;
              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "px-3 py-2 transition-colors duration-150",
                    active
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  )}
                >
                  [{active && '*'}{link.label.toLowerCase()}]
                </Link>
              );
            })}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <a
                href="https://cal.com/reifydb/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-3 py-1 transition-colors duration-150"
              >
                [&gt; book a call]
              </a>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden font-mono text-sm text-text-muted hover:text-primary transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? '[x]' : '[=]'}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            onClick={() => setMobileMenuOpen(false)}
            className="absolute inset-0 bg-black/60"
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-secondary border-l border-dashed border-white/15 flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end p-6 border-b border-dashed border-white/15 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm text-text-muted hover:text-primary transition-colors"
                aria-label="Close menu"
              >
                [x]
              </button>
            </div>

            {/* Docs Navigation */}
            <nav className="flex-1 overflow-y-auto p-4 sidebar-no-scrollbar">
              {navSections.map((section) => {
                const sectionId = `section-${section.title}`;
                const isSectionOpen = openItems.has(sectionId);

                return (
                  <div key={section.title} className="mb-4">
                    <button
                      onClick={() => toggleItem(sectionId)}
                      className="w-full flex items-center text-xs font-semibold text-text-muted uppercase tracking-wider mb-2 px-3 py-1 hover:text-primary transition-colors"
                    >
                      {section.title}
                    </button>
                    <div
                      className={cn(
                        'overflow-hidden transition-all duration-200',
                        isSectionOpen ? 'max-h-[2000px]' : 'max-h-0'
                      )}
                    >
                      <ul className="space-y-0.5 border-l border-dashed border-white/15 ml-3">
                        {section.items.map((item) => (
                          <AccordionItem
                            key={item.id}
                            item={item}
                            currentPath={currentPath}
                            depth={0}
                            openItems={openItems}
                            onToggle={toggleItem}
                            onNavigate={() => setMobileMenuOpen(false)}
                          />
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </nav>

            {/* Site-wide Links */}
            <nav className="p-6 border-t border-dashed border-white/15 flex flex-col gap-2 shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-mono text-sm text-text-secondary hover:text-primary px-4 py-3 border-b border-dashed border-white/15 transition-colors duration-150 text-left"
                >
                  <span className="text-text-muted">&gt; </span>{link.label.toLowerCase()}
                </Link>
              ))}
              <a
                href="https://cal.com/reifydb/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-4 py-3 transition-colors duration-150 text-center mt-4"
              >
                [&gt; book a call]
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
