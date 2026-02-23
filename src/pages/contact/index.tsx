import { Navbar, Footer } from '@/components/layout';
import { Button, ScrollReveal } from '@/components/ui';
import { Mail, Github, Calendar } from 'lucide-react';

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
            <div className="bg-bg-tertiary border border-white/10 rounded-2xl p-8 sm:p-12 text-center mb-12 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)]">
              <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-gradient-to-br from-primary/20 to-accent-warm/20 flex items-center justify-center">
                <Calendar className="h-8 w-8 text-primary" />
              </div>
              <h2 className="text-2xl font-bold mb-4">Book a Call</h2>
              <p className="text-text-muted mb-6 max-w-md mx-auto">
                Schedule a 30-minute call to discuss ReifyDB, your use case, or explore commercial options.
              </p>
              <Button href="https://cal.com/reifydb/30min" size="lg">
                Schedule a Call
              </Button>
            </div>
          </ScrollReveal>

          {/* Alternative Contact Methods */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Email */}
            <ScrollReveal delay={200}>
              <a
                href="mailto:founder@reifydb.com"
                className="bg-bg-tertiary border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] text-center group block h-full"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent-warm/20 flex items-center justify-center">
                  <Mail className="h-7 w-7 text-primary group-hover:text-primary-light transition-colors" />
                </div>
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
                className="bg-bg-tertiary border border-white/10 rounded-2xl p-6 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(245,158,11,0.15)] text-center group block h-full"
              >
                <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-gradient-to-br from-primary/20 to-accent-warm/20 flex items-center justify-center">
                  <Github className="h-7 w-7 text-primary group-hover:text-primary-light transition-colors" />
                </div>
                <h3 className="font-bold mb-2">GitHub</h3>
                <p className="text-text-muted text-sm">Open an issue</p>
              </a>
            </ScrollReveal>
          </div>

          {/* Commercial Licensing Note */}
          <ScrollReveal delay={350}>
            <div className="mt-12 p-6 bg-bg-secondary border border-white/10 rounded-2xl transition-all duration-300 hover:border-primary/40">
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
