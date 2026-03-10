import { Link } from "react-router-dom";

const sections = [
  {
    title: "product",
    links: [
      { label: "Documentation", to: "/docs" },
      { label: "Blog", to: "/blog" },
      { label: "FAQ", to: "/faq" },
    ],
  },
  {
    title: "resources",
    links: [
      { label: "Contact", to: "/contact" },
      { label: "Support", to: "/support" },
      { label: "Book a Call", href: "https://cal.com/reifydb/30min" },
    ],
  },
  {
    title: "community",
    links: [
      { label: "GitHub", href: "https://github.com/reifydb/reifydb" },
      { label: "X (Twitter)", href: "https://x.com/reifydb" },
      { label: "Discord", href: "https://discord.gg/rQxDkSua" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 bg-code-bg border-t-2 border-dashed border-white/10 py-12 sm:py-16 text-white">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 text-sm">
          {sections.map((section) => (
            <div key={section.title} className="border border-dashed border-white/15">
              <div className="px-4 py-2.5 border-b border-dashed border-white/15">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">
                  # {section.title}
                </span>
              </div>
              <ul className="px-4 py-4 space-y-2.5">
                {section.links.map((link) => {
                  const className = "group flex items-center text-code-text/70 hover:text-code-text transition-colors";
                  const cursor = (
                    <span className="text-code-text-muted group-hover:text-primary group-hover:translate-x-0.5 transition-all duration-150 mr-2 inline-block">
                      &gt;
                    </span>
                  );

                  return (
                    <li key={link.label}>
                      {"href" in link ? (
                        <a
                          href={link.href}
                          className={className}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {cursor}
                          {link.label}
                        </a>
                      ) : (
                        <Link to={link.to} className={className}>
                          {cursor}
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
        <div className="mt-12 sm:mt-16 border-t border-dashed border-white/10 pt-8 sm:pt-10 text-xs text-code-text-muted flex flex-col items-center justify-between gap-4 md:flex-row">
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
