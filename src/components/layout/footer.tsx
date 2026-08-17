import { Link } from "react-router-dom";
import { Github } from "lucide-react";

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

const socialLinks = [
  {
    label: "Discord",
    href: "https://discord.gg/HPBwUSPuUS",
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: "https://github.com/reifydb/reifydb",
    icon: <Github className="h-[18px] w-[18px]" />,
  },
  {
    label: "X",
    href: "https://x.com/reifydb",
    icon: (
      <svg className="h-[18px] w-[18px]" viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
] as const;

export function Footer() {
  return (
    <footer className="relative z-10 bg-bg-secondary border-t border-primary py-12 sm:py-16 text-text-secondary">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] text-sm">
          <div className="sm:col-span-2 lg:col-span-1">
            <Link to="/" className="flex items-center gap-2">
              <img
                src="/assets/img/logo.png"
                alt="ReifyDB"
                className="h-7 w-auto"
              />
              <span className="font-bold text-lg tracking-tight text-text-primary">
                ReifyDB
              </span>
            </Link>
            <p className="mt-4 max-w-xs text-text-secondary">
              Application State Database
            </p>
            <div className="mt-5 flex items-center gap-1 -ml-2">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex items-center justify-center p-2 rounded-md text-text-secondary hover:text-primary hover:bg-bg-tertiary transition-colors"
                >
                  {social.icon}
                </a>
              ))}
            </div>
          </div>

          {sections.map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-text-secondary mb-3">
                {section.title}
              </h3>
              <ul className="space-y-2.5">
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
