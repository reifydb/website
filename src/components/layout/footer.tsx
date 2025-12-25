import { Github } from 'lucide-react';

export function Footer() {
  return (
    <footer className="border-t-2 border-border-default py-12 sm:py-16 text-text-primary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 sm:gap-10 md:grid-cols-4 md:gap-12 text-sm">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <img src="/img/logo.png" alt="ReifyDB Logo" className="h-8 w-8 sm:h-10 sm:w-10"/>
              <span className="font-black text-xl sm:text-2xl tracking-tight">ReifyDB</span>
            </div>
            <p className="font-bold leading-relaxed text-muted">
              Application State Database with transactional guarantees and incremental derived state.
            </p>
          </div>

          {/* Product */}
          <div>
            <div className="font-black text-base mb-4 text-text-primary uppercase tracking-wider">
              Product
            </div>
            <ul className="space-y-3 font-bold">
              <li>
                <a
                  href="/#use-cases"
                  className="hover:text-primary decoration-4 transition-colors text-muted"
                >
                  Use Cases
                </a>
              </li>
              <li>
                <a
                  href="/#capabilities"
                  className="hover:text-primary decoration-4 transition-colors text-muted"
                >
                  Capabilities
                </a>
              </li>
              <li>
                <a
                  href="/#faq"
                  className="hover:text-primary decoration-4 transition-colors text-muted"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="font-black text-base mb-4 text-text-primary uppercase tracking-wider">
              Resources
            </div>
            <ul className="space-y-3 font-bold">
              <li>
                <a
                  href="/contact"
                  className="hover:text-primary decoration-4 transition-colors text-muted"
                >
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="/support"
                  className="hover:text-primary decoration-4 transition-colors text-muted"
                >
                  Support
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/reifydb/30min"
                  className="hover:text-primary decoration-4 transition-colors text-muted"
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
            <div className="font-black text-base mb-4 text-text-primary uppercase tracking-wider">
              Community
            </div>
            <ul className="space-y-3 font-bold">
              <li>
                <a
                  href="https://github.com/reifydb/reifydb"
                  className="hover:text-primary decoration-4 transition-colors text-muted flex items-center gap-2"
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
                  className="hover:text-primary decoration-4 transition-colors text-muted flex items-center gap-2"
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
        <div className="mt-12 sm:mt-16 flex flex-col items-center justify-between gap-6 sm:gap-8 border-t-2 border-border-default pt-8 sm:pt-12 text-xs sm:text-sm font-bold md:flex-row">
          <div className="text-muted tracking-wide">
            © {new Date().getFullYear()} ReifyDB. All rights reserved.
          </div>
          <div className="flex gap-6 text-muted">
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
