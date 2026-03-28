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
                The Mission
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                Why?
              </p>
            </div>
          </ScrollReveal>

          {/* Mission Statement */}
          <ScrollReveal delay={100}>
            <div className="glass-card p-8 sm:p-12 mb-12 transition-all duration-300 hover:border-primary/50">
              <h2 className="text-2xl font-bold mb-6">Mission Statement</h2>
              <p className="text-text-secondary text-lg leading-relaxed">
                Most engineers have felt it, that moment where you're fighting your own infrastructure instead of
                building the thing you set out to build. Your database should work with you, not against you. ReifyDB
                exists because we believe the way you think about your data is the right way to store it, query it, and
                evolve it. No translation. No friction. Just building.
              </p>
            </div>
          </ScrollReveal>

          {/* Origin Story */}
          <ScrollReveal delay={200}>
            <div className="glass-card p-8 sm:p-12 transition-all duration-300 hover:border-primary/50">
              <h2 className="text-2xl font-bold mb-6">The Origin Story</h2>

              <div className="flex flex-col md:flex-row gap-8">
                {/* Founder Photo */}
                <div className="flex-shrink-0">
                  <img
                    src="/assets/img/me.jpeg"
                    alt="Founder"
                    className="w-32 h-32 object-cover border border-white/[0.08] rounded"
                  />
                </div>

                {/* Story Content */}
                <div className="flex-1">
                  <p className="text-text-secondary mb-6 leading-relaxed">
                    When Dominique's daughter was born, everything slowed down for a moment. For the
                    first time in years, he stepped back and asked a simple question: what actually
                    makes me happy? And maybe more importantly, what doesn't?
                  </p>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    The answer was painfully clear. Throughout his career building software, the most
                    frustrating part was always the same: working with data infrastructure. The endless
                    translation between how you think about your domain and how the database forces you
                    to store it. The layers of abstraction that nobody asked for. The friction that
                    quietly drains your energy, sprint after sprint, year after year. Every engineer
                    knows the feeling. You just learn to live with it.
                  </p>

                  <p className="text-text-secondary mb-6 leading-relaxed">
                    Dominique decided to stop living with it. ReifyDB started as a question: what if
                    the database actually worked the way engineers think? No translation layers, no
                    accidental complexity, just infrastructure that gets out of your way and lets you
                    build.
                  </p>

                  <p className="text-text-secondary font-bold leading-relaxed">
                    That's what ReifyDB is for.
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
