import { useState, useRef, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, GitHubStars } from '@/components/ui';
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
      <header className="sticky top-0 z-40 w-full bg-[rgba(28,30,40,0.95)] shadow-[0_1px_0_0_rgba(255,255,255,0.1)]">
        <div className="flex h-[60px] w-full items-center justify-between px-4 sm:px-6 md:pl-8 md:pr-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <img
              src="/img/logo.png"
              alt="ReifyDB"
              className="h-7 w-auto"
            />
            <span className="font-display font-bold text-lg tracking-tight text-text-primary">
              ReifyDB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex gap-0 text-sm items-center flex-1 justify-center">
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

              if (isAnchor) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "font-medium px-4 py-2 transition-colors duration-150",
                      "text-text-secondary hover:text-text-primary"
                    )}
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  className={cn(
                    "font-medium px-4 py-2 transition-colors duration-150",
                    isActive(link.href)
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            {/* Desktop GitHub + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <GitHubStars />
              <Button href="/docs" size="sm" className="rounded-sm uppercase tracking-wider text-xs">
                Get Started
              </Button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center group transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary transition-all duration-300 ${
                  mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
                }`}
              />
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
          className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-elevated border-l border-white/10 transform transition-transform duration-300 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6 border-b border-white/10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col gap-1.5 w-10 h-10 items-center justify-center group transition-colors"
              aria-label="Close menu"
            >
              <span className="w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary rotate-45 translate-y-1"/>
              <span className="w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary -rotate-45 -translate-y-1"/>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-6 gap-2">
            {/* Accordion Sections for Dropdowns */}
            {navDropdowns.map((dropdown) => (
              <div key={dropdown.id} className="border-b border-white/10 overflow-hidden">
                <button
                  onClick={() => toggleMobileSection(dropdown.id)}
                  className={cn(
                    "w-full font-medium text-text-secondary hover:text-text-primary px-4 py-3 transition-colors duration-150 flex items-center justify-between",
                    expandedMobileSection === dropdown.id && "text-text-primary"
                  )}
                >
                  {dropdown.label}
                  <svg
                    className={cn(
                      "w-4 h-4 transition-transform duration-200",
                      expandedMobileSection === dropdown.id && "rotate-180"
                    )}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {/* Expanded Content */}
                <div
                  className={cn(
                    "transition-all duration-200 overflow-hidden",
                    expandedMobileSection === dropdown.id
                      ? "max-h-[500px] opacity-100"
                      : "max-h-0 opacity-0"
                  )}
                >
                  <div className="px-4 py-3 border-t border-white/5">
                    {dropdown.columns.map((column) => (
                      <div key={column.title} className="mb-4 last:mb-0">
                        <h4 className="text-xs font-semibold text-text-tertiary uppercase tracking-wider mb-2">
                          {column.title}
                        </h4>
                        <div className="flex flex-col gap-1">
                          {column.items.map((item) => {
                            const isExternal = item.href.startsWith('http');
                            const isAnchor = item.href.startsWith('/#');

                            if (isExternal) {
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-sm text-text-secondary hover:text-text-primary py-1.5 transition-colors"
                                >
                                  {item.label}
                                </a>
                              );
                            }

                            if (isAnchor) {
                              return (
                                <a
                                  key={item.label}
                                  href={item.href}
                                  onClick={() => setMobileMenuOpen(false)}
                                  className="text-sm text-text-secondary hover:text-text-primary py-1.5 transition-colors"
                                >
                                  {item.label}
                                </a>
                              );
                            }

                            return (
                              <Link
                                key={item.label}
                                to={item.href}
                                onClick={() => setMobileMenuOpen(false)}
                                className="text-sm text-text-secondary hover:text-text-primary py-1.5 transition-colors"
                              >
                                {item.label}
                              </Link>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Direct Links */}
            {navDirectLinks.map((link) => {
              const isAnchor = link.href.startsWith('/#');

              if (isAnchor) {
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="font-medium text-text-secondary hover:text-text-primary px-4 py-3 border-b border-white/10 transition-colors duration-150 text-left"
                  >
                    {link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-medium px-4 py-3 border-b border-white/10 transition-colors duration-150 text-left",
                    isActive(link.href)
                      ? "text-primary"
                      : "text-text-secondary hover:text-text-primary"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}

            {/* CTA Button */}
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold bg-primary text-bg-primary px-4 py-3 rounded-sm uppercase tracking-wider text-sm transition-all duration-150 text-center mt-4 hover:bg-primary-dark"
            >
              Get Started
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
