import { Navbar, Footer } from '@/components/layout';
import { Button } from '@/components/ui';
import { Mail, Github, Calendar } from 'lucide-react';

export function ContactPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          {/* Page Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
              Get in Touch
            </h1>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Whether you have questions about ReifyDB, want to discuss your use case,
              or are interested in commercial licensing, I'd love to hear from you.
            </p>
          </div>

          {/* Primary CTA - Book a Call */}
          <div className="bg-white border-2 border-border-default rounded-lg p-8 sm:p-12 text-center shadow-minimal mb-12">
            <Calendar className="h-12 w-12 mx-auto mb-4 text-primary" />
            <h2 className="text-2xl font-bold mb-4">Book a Call</h2>
            <p className="text-text-muted mb-6 max-w-md mx-auto">
              Schedule a 30-minute call to discuss ReifyDB, your use case, or explore commercial options.
            </p>
            <Button href="https://cal.com/reifydb/30min" size="lg">
              Schedule a Call →
            </Button>
          </div>

          {/* Alternative Contact Methods */}
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Email */}
            <a
              href="mailto:founder@reifydb.com"
              className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal hover:shadow-minimal-md transition-all text-center group"
            >
              <Mail className="h-8 w-8 mx-auto mb-3 text-text-primary group-hover:text-primary transition-colors" />
              <h3 className="font-bold mb-2">Email</h3>
              <p className="text-text-muted text-sm">founder@reifydb.com</p>
            </a>

            {/* GitHub */}
            <a
              href="https://github.com/reifydb/reifydb"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border-2 border-border-default rounded-lg p-6 shadow-minimal hover:shadow-minimal-md transition-all text-center group"
            >
              <Github className="h-8 w-8 mx-auto mb-3 text-text-primary group-hover:text-primary transition-colors" />
              <h3 className="font-bold mb-2">GitHub</h3>
              <p className="text-text-muted text-sm">Open an issue</p>
            </a>
          </div>

          {/* Commercial Licensing Note */}
          <div className="mt-12 p-6 bg-bg-tertiary border-2 border-border-default rounded-lg">
            <h3 className="font-bold mb-2">Commercial Licensing</h3>
            <p className="text-text-muted text-sm leading-relaxed">
              If you want to use ReifyDB without AGPL obligations - embed it in proprietary applications,
              offer it as a hosted service, or avoid open-sourcing your modifications - contact me about
              commercial licensing options.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
