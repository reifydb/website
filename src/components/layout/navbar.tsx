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
  const prevOpenDropdownRef = useRef<string | null>(null);

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

  // Compute switching flag during render
  const isSwitching = prevOpenDropdownRef.current !== null
    && openDropdown !== null
    && prevOpenDropdownRef.current !== openDropdown;

  // Update previous dropdown ref after render
  useEffect(() => {
    prevOpenDropdownRef.current = openDropdown;
  }, [openDropdown]);

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
      <header className="sticky top-0 z-40 w-full bg-[rgba(255,255,255,0.95)] border-b border-dashed border-black/25">
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
                instant={isSwitching}
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
                    [{link.label}]
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
                  [{active && '*'}{link.label}]
                </Link>
              );
            })}
          </nav>

          {/* CTAs */}
          <div className="flex items-center gap-3">
            {/* Desktop GitHub + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <a
                href="https://discord.gg/rQxDkSua"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center px-3 py-2 border-2 border-transparent rounded-sm hover:border-primary/60 hover:bg-bg-primary transition-all"
              >
                <svg className="h-[18px] w-[18px] text-text-secondary" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
              <GitHubStars />
              <Link
                to="/docs"
                className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-3 py-1 transition-colors duration-150"
              >
                [&gt; Start]
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
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-elevated border-l border-dashed border-black/25 transform transition-transform duration-300 overflow-y-auto ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6 border-b border-dashed border-black/25">
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
                <div key={dropdown.id} className="border-b border-dashed border-black/25 overflow-hidden">
                  <button
                    onClick={() => toggleMobileSection(dropdown.id)}
                    className={cn(
                      "w-full font-mono text-sm px-4 py-3 transition-colors duration-150 flex items-center justify-between",
                      expanded ? "text-text-primary" : "text-text-secondary hover:text-primary"
                    )}
                  >
                    {dropdown.label}
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
                    <div className="px-4 py-3 border-t border-dashed border-black/20">
                      {dropdown.columns.map((column) => (
                        <div key={column.title} className="mb-4 last:mb-0">
                          <div className="flex flex-col gap-1">
                            {column.items.map((item) => {
                              const isExternal = item.href.startsWith('http');
                              const isAnchor = item.href.startsWith('/#');

                              const content = (
                                <>
                                  <span className="text-text-muted">-- </span>
                                  <span className="text-text-secondary group-hover:text-primary transition-colors">{item.label}</span>
                                  {item.description && (
                                    <span className="block text-xs text-text-tertiary mt-0.5 pl-[1.5ch]">
                                      {item.description}
                                    </span>
                                  )}
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
                    className="font-mono text-sm px-4 py-3 border-b border-dashed border-black/25 transition-colors duration-150 text-left text-text-secondary hover:text-primary"
                  >
                    <span className="text-text-muted">&gt; </span>{link.label}
                  </a>
                );
              }

              return (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "font-mono text-sm px-4 py-3 border-b border-dashed border-black/25 transition-colors duration-150 text-left",
                    active
                      ? "text-primary"
                      : "text-text-secondary hover:text-primary"
                  )}
                >
                  <span className="text-text-muted">&gt; </span>{link.label}
                </Link>
              );
            })}

            {/* CTA Button */}
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-4 py-3 transition-colors duration-150 text-center mt-4"
            >
              [&gt; Get Started]
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
