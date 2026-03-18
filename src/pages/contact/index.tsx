import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';
import { Mail, Github } from 'lucide-react';

export function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          {/* Page Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Get in Touch
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                Whether you have questions about ReifyDB or want to discuss your use case,
                I'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          {/* Primary CTA - Book a Call */}
          <ScrollReveal delay={100}>
            <div className="border-2 border-dashed border-black/25 bg-white p-8 sm:p-12 text-center mb-12 transition-all duration-300 hover:border-primary/50">
              <span className="text-primary text-2xl font-mono">[&gt;]</span>
              <h2 className="text-2xl font-bold mb-4 mt-4">Book a Call</h2>
              <p className="text-text-muted mb-6 max-w-md mx-auto">
                Schedule a 30-minute call to discuss ReifyDB, your use case, or explore how ReifyDB can help.
              </p>
              <a
                href="https://cal.com/reifydb/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-white px-4 py-2 transition-colors inline-block"
              >
                [&gt; schedule a call]
              </a>
            </div>
          </ScrollReveal>

          {/* Alternative Contact Methods */}
          <div className="grid gap-6 sm:grid-cols-3">
            {/* Email */}
            <ScrollReveal delay={200}>
              <a
                href="mailto:founder@reifydb.com"
                className="border-2 border-dashed border-black/25 bg-white p-6 transition-all duration-300 hover:border-primary/50 text-center group block h-full"
              >
                <Mail className="h-7 w-7 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">Email</h3>
                <p className="text-text-muted text-sm">founder@reifydb.com</p>
              </a>
            </ScrollReveal>

            {/* GitHub */}
            <ScrollReveal delay={275}>
              <a
                href="https://github.com/reifydb/reifydb"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-dashed border-black/25 bg-white p-6 transition-all duration-300 hover:border-primary/50 text-center group block h-full"
              >
                <Github className="h-7 w-7 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">GitHub</h3>
                <p className="text-text-muted text-sm">Open an issue</p>
              </a>
            </ScrollReveal>

            {/* Discord */}
            <ScrollReveal delay={350}>
              <a
                href="https://discord.gg/HPBwUSPuUS"
                target="_blank"
                rel="noopener noreferrer"
                className="border-2 border-dashed border-black/25 bg-white p-6 transition-all duration-300 hover:border-primary/50 text-center group block h-full"
              >
                <svg className="h-7 w-7 text-primary mx-auto mb-3" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994a.076.076 0 0 0-.041-.106 13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
                <h3 className="font-bold mb-2">Discord</h3>
                <p className="text-text-muted text-sm">Join the community</p>
              </a>
            </ScrollReveal>
          </div>

        </div>
      </main>

      <Footer />
    </>
  );
}
