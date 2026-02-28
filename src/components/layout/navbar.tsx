import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { GitHubStars } from '@/components/ui';
import { cn } from '@/lib';
import { NavbarDropdown } from './navbar-dropdown';
import { navDropdowns, navDirectLinks } from './navbar-data';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [expandedMobileSection, setExpandedMobileSection] = useState<string | null>(null);
  const location = useLocation();
  const closeTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Close dropdown with delay (for better UX when moving between menu items)
  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const handleMouseEnter = (dropdownId: string) => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    setOpenDropdown(dropdownId);
  };

  // Clear timeout on unmount
  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
    setExpandedMobileSection(null);
  }, [location.pathname]);

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const toggleMobileSection = (sectionId: string) => {
    setExpandedMobileSection(expandedMobileSection === sectionId ? null : sectionId);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-[rgba(12,12,12,0.95)] border-b border-dashed border-white/15">
        <div className="flex h-[60px] w-full items-center justify-between px-4 sm:px-6 md:pl-8 md:pr-16">
          {/* Logo */}
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
          <nav className="hidden lg:flex gap-0 text-sm font-mono items-center flex-1 justify-center">
            {/* Dropdown Menus */}
            {navDropdowns.map((dropdown) => (
              <NavbarDropdown
                key={dropdown.id}
                dropdown={dropdown}
                isOpen={openDropdown === dropdown.id}
                onMouseEnter={() => handleMouseEnter(dropdown.id)}
                onMouseLeave={handleMouseLeave}
              />
            ))}

            {/* Direct Links */}
            {navDirectLinks.map((link) => {
              const isAnchor = link.href.startsWith('/#');
              const active = !isAnchor && isActive(link.href);

              if (isAnchor) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className="px-3 py-2 transition-colors duration-150 text-text-secondary hover:text-primary"
                  >
                    [{link.label.toLowerCase()}]
                  </a>
                );
              }

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

          {/* CTAs */}
          <div className="flex items-center gap-3">
            {/* Desktop GitHub + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <GitHubStars />
              <Link
                to="/docs"
                className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-3 py-1 transition-colors duration-150"
              >
                [&gt; start]
              </Link>
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
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setMobileMenuOpen(false)}
          className="absolute inset-0 bg-black/60"
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-elevated border-l border-dashed border-white/15 transform transition-transform duration-300 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6 border-b border-dashed border-white/15">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm text-text-muted hover:text-primary transition-colors"
              aria-label="Close menu"
            >
              [x]
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-6 gap-2">
            {/* Accordion Sections for Dropdowns */}
            {navDropdowns.map((dropdown) => {
              const expanded = expandedMobileSection === dropdown.id;
              return (
                <div key={dropdown.id} className="border-b border-dashed border-white/15 overflow-hidden">
                  <button
                    onClick={() => toggleMobileSection(dropdown.id)}
                    className={cn(
                      "w-full font-mono text-sm px-4 py-3 transition-colors duration-150 flex items-center justify-between",
                      expanded ? "text-text-primary" : "text-text-secondary hover:text-primary"
                    )}
                  >
                    {dropdown.label.toLowerCase()}
                    <span className="text-text-muted">{expanded ? '[-]' : '[+]'}</span>
                  </button>

                  {/* Expanded Content */}
                  <div
                    className={cn(
                      "transition-all duration-200 overflow-hidden",
                      expanded
                        ? "max-h-[500px] opacity-100"
                        : "max-h-0 opacity-0"
                    )}
                  >
                    <div className="px-4 py-3 border-t border-dashed border-white/10">
                      {dropdown.columns.map((column) => (
                        <div key={column.title} className="mb-4 last:mb-0">
                          <div className="flex flex-col gap-1">
                            {column.items.map((item) => {
                              const isExternal = item.href.startsWith('http');
                              const isAnchor = item.href.startsWith('/#');

                              const content = (
                                <>
                                  <span className="text-text-muted">-- </span>
                                  <span className="text-text-secondary group-hover:text-primary transition-colors">{item.label.toLowerCase()}</span>
                                </>
                              );

                              if (isExternal) {
                                return (
                                  <a
                                    key={item.label}
                                    href={item.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="group text-sm py-1.5 font-mono"
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
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="group text-sm py-1.5 font-mono"
                                  >
                                    {content}
                                  </a>
                                );
                              }

                              return (
                                <Link
                                  key={item.label}
                                  to={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="group text-sm py-1.5 font-mono"
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
              const active = !isAnchor && isActive(link.href);

              if (isAnchor) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-mono text-sm px-4 py-3 border-b border-dashed border-white/15 transition-colors duration-150 text-left text-text-secondary hover:text-primary"
                  >
                    <span className="text-text-muted">&gt; </span>{link.label.toLowerCase()}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-mono text-sm px-4 py-3 border-b border-dashed border-white/15 transition-colors duration-150 text-left",
                    active
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  )}
                >
                  <span className="text-text-muted">&gt; </span>{link.label.toLowerCase()}
                </Link>
              );
            })}

            {/* CTA Button */}
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-4 py-3 transition-colors duration-150 text-center mt-4"
            >
              [&gt; get started]
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
