import { createPortal } from 'react-dom';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib';
import { navDropdowns, navDirectLinks } from './navbar-data';
import { useState, useEffect } from 'react';

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const shortDescriptions: Record<string, string> = {
  Docs: 'reference',
  Tour: 'walkthrough',
  Playground: 'sandbox',
  Blog: 'updates',
  FAQ: 'answers',
  Support: 'help',
  Mission: 'purpose',
  Values: 'principles',
  Contact: 'connect',
};

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const location = useLocation();

  useEffect(() => {
    onClose();
    setExpandedSection(null);
  }, [location.pathname]);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
      document.documentElement.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      document.documentElement.style.overflow = '';
    };
  }, [open]);

  if (!open) return null;

  const toggleSection = (id: string) => {
    setExpandedSection(expandedSection === id ? null : id);
  };

  return createPortal(
    <div
      style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 9999 }}
      className="lg:hidden"
    >
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{ position: 'absolute', inset: 0 }}
        className="bg-black/30"
      />

      {/* Panel */}
      <div
        style={{ position: 'absolute', top: 0, right: 0, bottom: 0, width: '100%', maxWidth: '100vw' }}
        className="bg-bg-primary overflow-y-auto overflow-x-hidden"
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-dashed border-black/25">
          <span className="font-mono text-sm text-text-muted">$ nav</span>
          <button
            onClick={onClose}
            className="font-mono text-base text-text-muted hover:text-text-primary transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Close menu"
          >
            [x]
          </button>
        </div>

        {/* Navigation Links */}
        <nav className="flex flex-col px-6 py-4 gap-1 border-l-2 border-primary">
          {navDropdowns.map((dropdown) => {
            const expanded = expandedSection === dropdown.id;
            return (
              <div key={dropdown.id} className="border-b border-dashed border-black/25 overflow-hidden">
                <button
                  onClick={() => toggleSection(dropdown.id)}
                  className={cn(
                    "w-full font-mono text-base px-4 py-4 transition-colors duration-150 flex items-center justify-between min-h-[48px]",
                    expanded ? "text-text-primary" : "text-text-muted hover:text-text-primary"
                  )}
                >
                  {dropdown.label.toLowerCase()}/
                  <span className="text-text-muted">{expanded ? '[~]' : '[+]'}</span>
                </button>

                <div
                  className={cn(
                    "transition-all duration-200 overflow-hidden",
                    expanded ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-4 pb-3 border-t border-dashed border-black/25">
                    {dropdown.columns.map((column) => (
                      <div key={column.title} className="mt-2">
                        <div className="flex flex-col">
                          {column.items.map((item) => {
                            const isExternal = item.href.startsWith('http');
                            const isAnchor = item.href.startsWith('/#');
                            const keyword = shortDescriptions[item.label];

                            const content = (
                              <>
                                <span className="text-primary">&gt; </span>
                                <span className="text-text-primary group-hover:text-primary transition-colors">{item.label}</span>
                                {keyword && (
                                  <span className="text-text-muted"> — {keyword}</span>
                                )}
                              </>
                            );

                            const className = "group text-base py-3 font-mono min-h-[44px] flex items-center";

                            if (isExternal) {
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={onClose}
                                  className={className}
                                >
                                  {content}
                                </a>
                              );
                            }

                            if (isAnchor) {
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={onClose}
                                  className={className}
                                >
                                  {content}
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={item.label}
                                to={item.href}
                                onClick={onClose}
                                className={className}
                              >
                                {content}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          {/* Direct Links */}
          {navDirectLinks.map((link) => {
            const isAnchor = link.href.startsWith('/#');

            const className = "font-mono text-base px-4 py-4 min-h-[48px] flex items-center border-b border-dashed border-black/25 transition-colors duration-150 text-left text-text-muted hover:text-text-primary";

            if (isAnchor) {
              return (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={onClose}
                  className={className}
                >
                  <span className="text-primary">&gt; </span>{link.label}
                </a>
              );
            }

            return (
              <Link
                key={link.href}
                to={link.href}
                onClick={onClose}
                className={className}
              >
                <span className="text-primary">&gt; </span>{link.label}
              </Link>
            );
          })}

          {/* Divider */}
          <div className="border-t border-dashed border-black/25 my-2" />

          {/* CTA Button */}
          <Link
            to="/docs"
            onClick={onClose}
            className="font-mono text-base border border-primary text-primary hover:bg-primary hover:text-bg-primary px-4 py-4 min-h-[48px] flex items-center justify-center transition-colors duration-150"
          >
            [&gt; get-started]
          </Link>
        </nav>
      </div>
    </div>,
    document.body
  );
}
