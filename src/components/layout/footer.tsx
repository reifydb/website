import { Link } from "react-router-dom";

const sections = [
  {
    title: "Product",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Support", to: "/support" },
      { label: "Book a Call", href: "https://cal.com/reifydb/30min" },
    ],
  },
  {
    title: "Community",
    links: [
      { label: "GitHub", href: "https://github.com/reifydb/reifydb" },
      { label: "X (Twitter)", href: "https://x.com/reifydb" },
      { label: "Discord", href: "https://discord.gg/HPBwUSPuUS" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-secondary border-t border-border-light py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {sections.map((section) => (
            <div key={section.title} className="glass-card p-0 overflow-hidden">
              <div className="px-4 py-3 border-b border-border-light">
                <span className="text-xs font-semibold uppercase tracking-wider text-text-secondary">
                  {section.title}
                </span>
              </div>
              <ul className="px-4 py-4 space-y-2.5">
                {section.links.map((link) => {
                  const className = "group flex items-center text-text-secondary hover:text-text-primary transition-colors";

                  return (
                    <li key={link.label}>
                      {"href" in link ? (
                        <a
                          href={link.href}
                          className={className}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className={className}>
                          {link.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 sm:mt-16 border-t border-border-light pt-8 sm:pt-10 text-xs text-text-muted flex flex-col items-center justify-between gap-4 md:flex-row">
          <div>
            &copy; {new Date().getFullYear()} ReifyDB. All Rights Reserved.
          </div>
          <a
            href="https://github.com/reifydb/reifydb/blob/main/license.md"
            className="hover:text-primary transition-colors"
            target="_blank"
            rel="noopener noreferrer"
          >
            License: Apache-2.0
          </a>
        </div>
      </div>
    </footer>
  );
}
