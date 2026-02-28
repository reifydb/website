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
                Whether you have questions about ReifyDB, want to discuss your use case,
                or are interested in commercial licensing, I'd love to hear from you.
              </p>
            </div>
          </ScrollReveal>

          {/* Primary CTA - Book a Call */}
          <ScrollReveal delay={100}>
            <div className="border-2 border-dashed border-white/15 p-8 sm:p-12 text-center mb-12 transition-all duration-300 hover:border-primary/50">
              <span className="text-primary text-2xl font-mono">[&gt;]</span>
              <h2 className="text-2xl font-bold mb-4 mt-4">Book a Call</h2>
              <p className="text-text-muted mb-6 max-w-md mx-auto">
                Schedule a 30-minute call to discuss ReifyDB, your use case, or explore commercial options.
              </p>
              <a
                href="https://cal.com/reifydb/30min"
                target="_blank"
                rel="noopener noreferrer"
                className="font-mono text-sm border border-primary text-primary hover:bg-primary hover:text-bg-primary px-4 py-2 transition-colors inline-block"
              >
                [&gt; schedule a call]
              </a>
            </div>
          </ScrollReveal>

          {/* Alternative Contact Methods */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Email */}
            <ScrollReveal delay={200}>
              <a
                href="mailto:founder@reifydb.com"
                className="border-2 border-dashed border-white/15 p-6 transition-all duration-300 hover:border-primary/50 text-center group block h-full"
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
                className="border-2 border-dashed border-white/15 p-6 transition-all duration-300 hover:border-primary/50 text-center group block h-full"
              >
                <Github className="h-7 w-7 text-primary mx-auto mb-3" />
                <h3 className="font-bold mb-2">GitHub</h3>
                <p className="text-text-muted text-sm">Open an issue</p>
              </a>
            </ScrollReveal>
          </div>

          {/* Commercial Licensing Note */}
          <ScrollReveal delay={350}>
            <div className="mt-12 p-6 border-2 border-dashed border-white/15 transition-all duration-300 hover:border-primary/50">
              <h3 className="font-bold mb-2">Commercial Licensing</h3>
              <p className="text-text-muted text-sm leading-relaxed">
                If you want to use ReifyDB without AGPL obligations - embed it in proprietary applications,
                offer it as a hosted service, or avoid open-sourcing your modifications - contact me about
                commercial licensing options.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
