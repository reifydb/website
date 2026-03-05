export function Footer() {
  return (
    <footer className="relative z-10 bg-primary border-t border-dashed border-white/15 py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-8">

        {/* ASCII header */}
        <div className="mb-10 text-white/60 text-xs sm:text-sm">
          <pre className="leading-relaxed">{`┌─────────────────────────────────────────┐
│  reifydb — application state database   │
│  transactional · incremental · embedded │
└─────────────────────────────────────────┘`}</pre>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {/* Product */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider mb-4 text-white">
              # product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors">
                  <span className="text-white/40 mr-2">├──</span>Documentation
                </a>
              </li>
              <li>
                <a href="/blog" className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors">
                  <span className="text-white/40 mr-2">├──</span>Blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors">
                  <span className="text-white/40 mr-2">└──</span>FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider mb-4 text-white">
              # resources
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors">
                  <span className="text-white/40 mr-2">├──</span>Contact
                </a>
              </li>
              <li>
                <a href="/support" className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors">
                  <span className="text-white/40 mr-2">├──</span>Support
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/reifydb/30min"
                  className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-white/40 mr-2">└──</span>Book a Call
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider mb-4 text-white">
              # community
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/reifydb/reifydb"
                  className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-white/40 mr-2">├──</span>GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/reifydb"
                  className="text-white/60 hover:text-white hover:underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-white/40 mr-2">└──</span>X (Twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 border-t border-dashed border-white/15 pt-8 sm:pt-10 text-xs text-white/60 flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            &copy; {new Date().getFullYear()} ReifyDB. All Rights Reserved.
          </div>
          <a
            href="https://github.com/reifydb/reifydb/blob/main/license.md"
            className="hover:text-white hover:underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            License: AGPL-3.0
          </a>
        </div>
      </div>
    </footer>
  );
}
