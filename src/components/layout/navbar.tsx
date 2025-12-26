import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button, GitHubStars } from '@/components/ui';
import { cn } from '@/lib';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  const navLinks = [
    { href: "/#use-cases", label: "USE CASES" },
    { href: "/#capabilities", label: "CAPABILITIES" },
    { href: "/#replaces", label: "REPLACES" },
    { href: "/#faq", label: "FAQ" },
  ];

  const pageLinks = [
    { href: "/docs", label: "DOCS" },
    { href: "/contact", label: "CONTACT" },
    { href: "/support", label: "SUPPORT" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  const isHomePage = location.pathname === '/';

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b-2 border-border-default bg-white shadow-[0_2px_0px_0px_rgba(56,56,56,0.15)]">
        <div className="flex h-16 sm:h-20 w-full items-center justify-between px-4 sm:px-6 md:px-12">
          <Link to="/" className="flex items-center gap-4">
            <img src="/img/logo.png" alt="ReifyDB Logo" className="h-8 w-8 sm:h-10 sm:w-10"/>
            <span className="font-black text-xl sm:text-2xl tracking-tighter transform -skew-x-3">
              ReifyDB
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden gap-6 lg:flex text-sm items-center flex-1 justify-center">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={cn(
                  "font-bold uppercase tracking-wide px-3 py-2 border rounded transition-all duration-150 flex items-center",
                  isHomePage
                    ? "hover:bg-border-default hover:text-white border-transparent hover:border-border-default hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
                    : "hover:bg-border-default hover:text-white border-transparent hover:border-border-default hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
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
                  "font-bold uppercase tracking-wide px-3 py-2 border rounded transition-all duration-150 flex items-center",
                  isActive(link.href)
                    ? "bg-border-default text-white border-border-default shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
                    : "hover:bg-border-default hover:text-white border-transparent hover:border-border-default hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
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
              className="lg:hidden flex flex-col gap-1.5 w-10 h-10 items-center justify-center border-2 border-border-default rounded bg-white hover:bg-border-default group transition-colors"
              aria-label="Toggle menu"
            >
              <span
                className={`w-6 h-0.5 bg-border-default group-hover:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-border-default group-hover:bg-white transition-all duration-300 ${
                  mobileMenuOpen ? 'opacity-0' : ''
                }`}
              />
              <span
                className={`w-6 h-0.5 bg-border-default group-hover:bg-white transition-all duration-300 ${
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
          className="absolute inset-0 bg-border-default/50"
        />

        {/* Menu Panel */}
        <div
          className={`absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white border-l-2 border-border-default shadow-[-2px_0_0_0_rgba(56,56,56,0.15)] transform transition-transform duration-300 ${
            mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
          }`}
        >
          {/* Close Button */}
          <div className="flex justify-end p-6 border-b-2 border-border-default">
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="flex flex-col gap-1.5 w-10 h-10 items-center justify-center border-2 border-border-default rounded bg-white hover:bg-border-default group transition-colors"
              aria-label="Close menu"
            >
              <span className="w-6 h-0.5 bg-border-default group-hover:bg-white rotate-45 translate-y-2"/>
              <span className="w-6 h-0.5 bg-border-default group-hover:bg-white -rotate-45 -translate-y-2"/>
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col p-6 gap-2">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="font-bold uppercase tracking-wide hover:bg-border-default hover:text-white px-4 py-4 border-2 border-border-default rounded transition-all duration-150 hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)] text-center"
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
                  "font-bold uppercase tracking-wide px-4 py-4 border-2 border-border-default rounded transition-all duration-150 text-center",
                  isActive(link.href)
                    ? "bg-border-default text-white shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
                    : "hover:bg-border-default hover:text-white hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)]"
                )}
              >
                {link.label}
              </Link>
            ))}
            <Link
              to="/docs"
              onClick={() => setMobileMenuOpen(false)}
              className="font-bold uppercase tracking-wide bg-primary-color text-white px-4 py-4 border-2 border-border-default rounded transition-all duration-150 hover:shadow-[2px_2px_0px_0px_rgba(56,56,56,0.2)] text-center mt-4"
            >
              Read Documentation
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}
