import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, GitHubStars } from '@/components/ui';
import { cn } from '@/lib';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/#use-cases", label: "Use Cases" },
    { href: "/#capabilities", label: "Capabilities" },
    { href: "/#replaces", label: "Replaces" },
    { href: "/#faq", label: "FAQ" },
  ];

  const pageLinks = [
    { href: "/docs", label: "Docs" },
    { href: "/contact", label: "Contact" },
    { href: "/support", label: "Support" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-bg-primary/80 backdrop-blur-xl border-b border-white/10">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-6 md:px-12">
          <Link to="/" className="flex items-center gap-3">
            <span className="font-display font-black text-xl sm:text-2xl tracking-tight text-text-primary">
              ReifyDB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-1 lg:flex text-sm items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "font-medium px-4 py-2 rounded-lg transition-all duration-150",
                  "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                {link.label}
              </a>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className={cn(
                  "font-medium px-4 py-2 rounded-lg transition-all duration-150",
                  isActive(link.href)
                    ? "text-primary"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            {/* Desktop GitHub + CTA */}
            <div className="hidden lg:flex items-center gap-3">
              <GitHubStars />
              <Button href="/docs" size="sm">
                Read Documentation
              </Button>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center border border-white/10 rounded-lg bg-bg-tertiary hover:bg-bg-elevated group transition-colors"
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
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-secondary border-l border-white/10 transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6 border-b border-white/10">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col gap-1.5 w-10 h-10 items-center justify-center border border-white/10 rounded-lg bg-bg-tertiary hover:bg-bg-elevated group transition-colors"
              aria-label="Close menu"
            >
              <span className="w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary rotate-45 translate-y-1"/>
              <span className="w-5 h-0.5 bg-text-secondary group-hover:bg-text-primary -rotate-45 -translate-y-1"/>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-medium text-text-secondary hover:text-text-primary px-4 py-3 border border-white/10 rounded-lg transition-all duration-150 hover:bg-white/5 text-center"
              >
                {link.label}
              </a>
            ))}
            {pageLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={cn(
                  "font-medium px-4 py-3 border border-white/10 rounded-lg transition-all duration-150 text-center",
                  isActive(link.href)
                    ? "text-primary border-primary/30"
                    : "text-text-secondary hover:text-text-primary hover:bg-white/5"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="font-semibold bg-gradient-to-r from-primary to-accent-warm text-white px-4 py-3 rounded-lg transition-all duration-150 text-center mt-4"
            >
              Read Documentation
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
