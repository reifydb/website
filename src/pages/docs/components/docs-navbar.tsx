import { useState, useCallback } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib';
import { Button } from '@/components/ui';
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
      <header className="sticky top-0 z-40 w-full bg-bg-primary border-b border-white/10">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-6 md:px-12">
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="ReifyDB"
              className="h-7 sm:h-8 w-auto"
            />
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-text-primary">
              ReifyDB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-1 lg:flex text-sm items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-medium px-4 py-2 rounded-lg transition-all duration-150 text-text-secondary hover:text-text-primary hover:bg-white/5"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop CTA */}
            <div className="hidden lg:block">
              <Button href="https://cal.com/reifydb/30min" size="sm">
                Book a Call
              </Button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center border border-white/10 rounded-lg bg-bg-tertiary hover:bg-bg-elevated group transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
              ) : (
                <Menu className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
              )}
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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-secondary border-l border-white/10 flex flex-col">
            {/* Close Button */}
            <div className="flex justify-end p-6 border-b border-white/10 shrink-0">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg bg-bg-tertiary hover:bg-bg-elevated group transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
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
                      <ul className="space-y-0.5 border-l border-white/10 ml-3">
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
            <nav className="p-6 border-t border-white/10 flex flex-col gap-2 shrink-0">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-medium text-text-secondary hover:text-text-primary px-4 py-3 border border-white/10 rounded-lg transition-all duration-150 hover:bg-white/5 text-center"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://cal.com/reifydb/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="font-semibold bg-gradient-to-r from-primary to-accent-warm text-white px-4 py-3 rounded-lg transition-all duration-150 text-center mt-4"
              >
                Book a Call
              </a>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}
