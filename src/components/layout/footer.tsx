import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-secondary border-t border-white/10 py-12 sm:py-16 text-text-primary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 text-sm">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/logo.png" alt="ReifyDB Logo" className="h-8 sm:h-10 w-auto"/>
              <span className="font-display font-black text-xl sm:text-2xl tracking-tight">ReifyDB</span>
            </div>
            <p className="font-medium leading-relaxed text-text-muted">
              Application State Database with transactional guarantees and incremental derived state.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="font-display font-bold text-base mb-4 text-text-primary">
              Product
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="/docs"
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a
                  href="/blog"
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  Blog
                </a>
              </li>
              <li>
                <a
                  href="/faq"
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="font-display font-bold text-base mb-4 text-text-primary">
              Resources
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="/contact"
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="text-text-muted hover:text-primary transition-colors"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/reifydb/30min"
                  className="text-text-muted hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Book a Call
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <div className="font-display font-bold text-base mb-4 text-text-primary">
              Community
            </div>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://github.com/reifydb/reifydb"
                  className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 w-fit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-4 w-4" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/reifydb"
                  className="text-text-muted hover:text-primary transition-colors flex items-center gap-2 w-fit"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  X
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-6 sm:gap-8 border-t border-white/10 pt-8 sm:pt-12 text-xs sm:text-sm md:flex-row">
          <div className="text-text-muted">
            &copy; {new Date().getFullYear()} ReifyDB. All rights reserved.
          </div>
          <div className="flex gap-6 text-text-muted">
            <a
              href="https://github.com/reifydb/reifydb/blob/main/license.md"
              className="hover:text-primary transition-colors"
              target="_blank"
              rel="noopener noreferrer"
            >
              AGPL-3.0 License
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
