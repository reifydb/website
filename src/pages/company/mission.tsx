import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';

export function MissionPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-4xl px-6 md:px-8">
          {/* Page Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Our Mission
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                Why?
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Statement */}
          <ScrollReveal delay={100}>
            <div className="bg-bg-tertiary border border-white/10 rounded-2xl p-8 sm:p-12 mb-12 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
              <h2 className="text-2xl font-bold mb-6">Mission Statement</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Modern software is constrained by infrastructure that treats application state as a storage problem.
                In reality, the challenge is understanding, evolving, and trusting that state as systems grow.
                ReifyDB is built on the belief that databases should optimize for reasoning - not just persistence.
              </p>
            </div>
          </ScrollReveal>

          {/* Origin Story */}
          <ScrollReveal delay={200}>
            <div className="bg-bg-tertiary border border-white/10 rounded-2xl p-8 sm:p-12 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_40px_rgba(99,102,241,0.15)]">
              <h2 className="text-2xl font-bold mb-6">The Origin Story</h2>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Founder Photo */}
                <div className="flex-shrink-0">
                  <img
                    src="/me.jpeg"
                    alt="Founder"
                    className="w-32 h-32 rounded-2xl object-cover border border-white/10"
                  />
                </div>

                {/* Story Content */}
                <div className="flex-1">
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    ReifyDB emerged from years spent building high-performance systems and repeatedly
                    encountering the same structural friction in modern data infrastructure. Developers
                    were forced to translate between their domain model and the database, manage
                    unnecessary layers of abstraction, and accept complexity as the cost of building
                    serious software.

                    ReifyDB was created on the belief that application state should be clear,
                    predictable, and aligned with how engineers naturally design systems.
                    Infrastructure should support ambitious software, not constrain it.
                  </p>

                  <h3 className="font-bold mb-4">What ReifyDB Reconsiders</h3>
                  <ul className="space-y-3 text-text-secondary">
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>The artificial divide between application logic and the data that defines it</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Translation layers that distort domain models and introduce accidental complexity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>State that is difficult to reason about, evolve, or trust under load</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Infrastructure that demands constant orchestration instead of providing clarity</span>
                    </li>
                    <li className="flex items-start gap-3">
                      <span className="text-primary mt-1">•</span>
                      <span>Systems that optimize storage but neglect how engineers actually build software</span>
                    </li>
                  </ul>

                  <p className="text-text-secondary mt-6 leading-relaxed">
                    Great software deserves infrastructure that is equally well designed.
                    ReifyDB exists to provide that foundation.
                  </p>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </main>

      <Footer />
    </>
  );
}
