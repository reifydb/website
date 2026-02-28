export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-secondary border-t border-dashed border-white/15 py-12 sm:py-16 text-text-primary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">

        {/* ASCII header */}
        <div className="mb-10 text-text-muted text-xs sm:text-sm">
          <pre className="leading-relaxed">{`┌─────────────────────────────────────────┐
│  reifydb — application state database   │
│  transactional · incremental · embedded │
└─────────────────────────────────────────┘`}</pre>
        </div>

        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {/* Product */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider mb-4 text-primary">
              # product
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/docs" className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors">
                  <span className="text-text-muted mr-2">├──</span>documentation
                </a>
              </li>
              <li>
                <a href="/blog" className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors">
                  <span className="text-text-muted mr-2">├──</span>blog
                </a>
              </li>
              <li>
                <a href="/faq" className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors">
                  <span className="text-text-muted mr-2">└──</span>faq
                </a>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider mb-4 text-primary">
              # resources
            </div>
            <ul className="space-y-2">
              <li>
                <a href="/contact" className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors">
                  <span className="text-text-muted mr-2">├──</span>contact
                </a>
              </li>
              <li>
                <a href="/support" className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors">
                  <span className="text-text-muted mr-2">├──</span>support
                </a>
              </li>
              <li>
                <a
                  href="https://cal.com/reifydb/30min"
                  className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-text-muted mr-2">└──</span>book a call
                </a>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <div className="font-bold text-xs uppercase tracking-wider mb-4 text-primary">
              # community
            </div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/reifydb/reifydb"
                  className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-text-muted mr-2">├──</span>github
                </a>
              </li>
              <li>
                <a
                  href="https://x.com/reifydb"
                  className="text-text-muted hover:text-text-primary hover:underline underline-offset-2 transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="text-text-muted mr-2">└──</span>x (twitter)
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 border-t border-dashed border-white/15 pt-8 sm:pt-10 text-xs text-text-muted flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            &copy; {new Date().getFullYear()} reifydb. all rights reserved.
          </div>
          <a
            href="https://github.com/reifydb/reifydb/blob/main/license.md"
            className="hover:text-primary hover:underline underline-offset-2 transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            license: AGPL-3.0
          </a>
        </div>
      </div>
    </footer>
  );
}
