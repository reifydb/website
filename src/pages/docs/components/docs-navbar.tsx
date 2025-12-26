import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui';

export function DocsNavbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { href: '/', label: 'HOME' },
    { href: '/contact', label: 'CONTACT' },
    { href: '/support', label: 'SUPPORT' },
  ];

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-2 border-border-default bg-white shadow-[0_2px_0px_0px_rgba(56,56,56,0.15)]">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-6 md:px-12">
          <Link to="/" className="flex items-center gap-4">
            <img src="/img/logo.png" alt="ReifyDB Logo" className="h-8 w-8 sm:h-10 sm:w-10" />
            <span className="font-black text-xl sm:text-2xl tracking-tighter transform -skew-x-3">
              ReifyDB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 lg:flex text-sm items-center">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                to={link.href}
                className="font-bold uppercase tracking-wide px-3 py-2 border rounded transition-all duration-150 flex items-center hover:bg-border-default hover:text-white border-transparent hover:border-border-default hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
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
              className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center border-2 border-border-default rounded bg-white hover:bg-border-default group transition-colors"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5 text-border-default group-hover:text-white" />
              ) : (
                <Menu className="w-5 h-5 text-border-default group-hover:text-white" />
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
            className="absolute inset-0 bg-border-default/50"
          />

          {/* Menu Panel */}
          <div className="absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l-2 border-border-default shadow-[-2px_0_0_0_rgba(56,56,56,0.15)]">
            {/* Close Button */}
            <div className="flex justify-end p-6 border-b-2 border-border-default">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="w-10 h-10 flex items-center justify-center border-2 border-border-default rounded bg-white hover:bg-border-default group transition-colors"
                aria-label="Close menu"
              >
                <X className="w-5 h-5 text-border-default group-hover:text-white" />
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="flex flex-col p-6 gap-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-bold uppercase tracking-wide hover:bg-border-default hover:text-white px-4 py-4 border-2 border-border-default rounded transition-all duration-150 hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)] text-center"
                >
                  {link.label}
                </Link>
              ))}
              <a
                href="https://cal.com/reifydb/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold uppercase tracking-wide bg-primary-color text-white px-4 py-4 border-2 border-border-default rounded transition-all duration-150 hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)] text-center mt-4"
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
