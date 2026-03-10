import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';
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
    color: 'text-primary',
  },
  {
    title: 'GitHub Issues',
    description: 'Report bugs, request features, or contribute to development.',
    icon: Github,
    href: 'https://github.com/reifydb/reifydb/issues',
    linkText: 'Open Issue',
    external: true,
    color: 'text-feature-purple',
  },
  {
    title: 'Book a Call',
    description: 'Schedule time to discuss your use case or get technical guidance.',
    icon: Calendar,
    href: 'https://cal.com/reifydb/30min',
    linkText: 'Schedule Call',
    external: true,
    color: 'text-feature-blue',
  },
  {
    title: 'GitHub Discussions',
    description: 'Ask questions, share ideas, and engage with the community.',
    icon: FileText,
    href: 'https://github.com/orgs/reifydb/discussions',
    linkText: 'Discussions',
    external: true,
    color: 'text-feature-green',
  },
];

export function SupportPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          {/* Page Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Support
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                Get help with ReifyDB through community channels or commercial support.
              </p>
            </div>
          </ScrollReveal>

          {/* Support Options Grid */}
          <div className="grid gap-6 sm:grid-cols-2">
            {supportOptions.map((option, index) => (
              <ScrollReveal key={option.title} delay={index * 75}>
                <a
                  href={option.href}
                  target={option.external ? '_blank' : undefined}
                  rel={option.external ? 'noopener noreferrer' : undefined}
                  className="border-2 border-dashed border-black/25 bg-white p-6 transition-all duration-300 hover:border-primary/50 group block h-full"
                >
                  <div className="flex items-start gap-4">
                    <option.icon className={`h-6 w-6 ${option.color} shrink-0`} strokeWidth={2} />
                    <div className="flex-1">
                      <h3 className="font-bold mb-1">{option.title}</h3>
                      <p className="text-text-muted text-sm mb-3 leading-relaxed">
                        {option.description}
                      </p>
                      <span className="text-primary font-semibold text-sm">
                        {option.linkText} --&gt;
                      </span>
                    </div>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>

          {/* Social Links */}
          <ScrollReveal delay={400}>
            <div className="mt-12 text-center">
              <h3 className="font-bold mb-4">Follow ReifyDB</h3>
              <div className="flex justify-center gap-4">
                <a
                  href="https://github.com/reifydb/reifydb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-dashed border-black/25 transition-all duration-300 hover:border-primary/50"
                >
                  <Github className="h-5 w-5" />
                </a>
                <a
                  href="https://x.com/reifydb"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-dashed border-black/25 transition-all duration-300 hover:border-primary/50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                </a>
                <a
                  href="https://discord.gg/rQxDkSua"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 border border-dashed border-black/25 transition-all duration-300 hover:border-primary/50"
                >
                  <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                  </svg>
                </a>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
