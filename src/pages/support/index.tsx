import { Navbar, Footer } from '@/components/layout';
import {
  Briefcase,
  Github,
  Calendar,
  FileText,
} from 'lucide-react';

const supportOptions = [
  {
    title: 'Commercial Support',
    description: 'Enterprise support and consulting for production deployments.',
    icon: Briefcase,
    href: 'mailto:founder@reifydb.com',
    linkText: 'Contact Me',
    external: false,
  },
  {
    title: 'GitHub Issues',
    description: 'Report bugs, request features, or contribute to development.',
    icon: Github,
    href: 'https://github.com/reifydb/reifydb/issues',
    linkText: 'Open Issue',
    external: true,
  },
  {
    title: 'Book a Call',
    description: 'Schedule time to discuss your use case or get technical guidance.',
    icon: Calendar,
    href: 'https://cal.com/reifydb/30min',
    linkText: 'Schedule Call',
    external: true,
  },
  {
    title: 'GitHub Discussions',
    description: 'Ask questions, share ideas, and engage with the community.',
    icon: FileText,
    href: 'https://github.com/orgs/reifydb/discussions',
    linkText: 'Discussions',
    external: true,
  },
];

export function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Support
            </h1>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Get help with ReifyDB through community channels or commercial support.
            </p>
          </div>

          {/* Support Options Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {supportOptions.map((option) => (
              <a
                key={option.title}
                href={option.href}
                target={option.external ? '_blank' : undefined}
                rel={option.external ? 'noopener noreferrer' : undefined}
                className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal hover:shadow-minimal-md transition-all group"
              >
                <div className="flex items-start gap-4">
                  <div className="text-text-primary group-hover:text-primary transition-colors">
                    <option.icon className="h-8 w-8" strokeWidth={2} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-bold mb-1">{option.title}</h3>
                    <p className="text-text-muted text-sm mb-3 leading-relaxed">
                      {option.description}
                    </p>
                    <span className="text-primary font-bold text-sm">
                      {option.linkText} →
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>

          {/* Social Links */}
          <div className="mt-12 text-center">
            <h3 className="font-bold mb-4">Follow ReifyDB</h3>
            <div className="flex justify-center gap-4">
              <a
                href="https://github.com/reifydb/reifydb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-border-default rounded-lg hover:bg-border-default hover:text-white transition-all"
              >
                <Github className="h-5 w-5" />
              </a>
              <a
                href="https://x.com/reifydb"
                target="_blank"
                rel="noopener noreferrer"
                className="p-3 bg-white border-2 border-border-default rounded-lg hover:bg-border-default hover:text-white transition-all"
              >
                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
