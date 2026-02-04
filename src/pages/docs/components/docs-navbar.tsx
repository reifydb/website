import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';

export function DocsNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/contact', label: 'Contact' },
    { href: '/support', label: 'Support' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-bg-primary/80 backdrop-blur-xl border-b border-white/10">
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
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-bg-secondary border-l border-white/10">
            {/* Close Button */}
            <div className="flex justify-end p-6 border-b border-white/10">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center border border-white/10 rounded-lg bg-bg-tertiary hover:bg-bg-elevated group transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-text-secondary group-hover:text-text-primary" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col p-6 gap-2">
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
