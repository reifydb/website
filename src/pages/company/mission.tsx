import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { GameButton, PageCloser, PageHero, PixelScene, ScrollReveal } from '@/components/ui';

export function MissionPage() {
  return (
    <>
      <PageMeta
        title="Mission | ReifyDB"
        description="Why ReifyDB exists: making live application state something you declare once instead of maintaining by hand."
      />
      <Navbar />

      <main>
        <PageHero
          eyebrow="Mission"
          title="The way you think about your data is the right way to store it"
          subtitle="No translation layer. No accidental complexity. Infrastructure that gets out of the way."
          scene={<PixelScene kind="build" />}
        />

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-8 text-balance">
                Most engineers have felt it.
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-6">
                That moment where you are fighting your own infrastructure instead of building the thing
                you set out to build. Your database should work with you, not against you.
              </p>
              <p className="text-text-secondary text-lg leading-relaxed">
                ReifyDB exists because we believe the way you think about your data is the right way to
                store it, query it, and evolve it. The argument about the problem itself is written down
                in{' '}
                <a href="/manifesto" className="text-[#4b52d6] hover:text-primary-dark underline underline-offset-2">
                  the manifesto
                </a>
                .
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="pb-20 sm:pb-28">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <ScrollReveal>
              <div className="dialog p-8 sm:p-12">
                <p className="pixel-label uppercase text-[#4b52d6] mb-8">Origin story</p>
                <div className="grid gap-8 sm:grid-cols-[auto_1fr] sm:gap-10 items-start">
                  <img
                    src="/assets/img/me.jpeg"
                    alt="Dominique Chuo"
                    className="w-32 h-32 object-cover border-2 border-[#4b52d6]"
                  />
                  <div>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      When Dominique's daughter was born, everything slowed down for a moment. For the first
                      time in years, he stepped back and asked a simple question: what actually makes me
                      happy? And maybe more importantly, what does not?
                    </p>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      The answer was painfully clear. Throughout his career building software, the most
                      frustrating part was always the same: working with data infrastructure. The endless
                      translation between how you think about your domain and how the database forces you to
                      store it. The friction that quietly drains your energy, sprint after sprint. Every
                      engineer knows the feeling. You just learn to live with it.
                    </p>
                    <p className="text-text-secondary leading-relaxed mb-6">
                      Dominique decided to stop living with it. ReifyDB started as a question: what if the
                      database actually worked the way engineers think?
                    </p>
                    <p className="text-text-primary text-lg font-bold leading-relaxed">
                      That is what ReifyDB is for.
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <PageCloser
          eyebrow="PLAY NOW"
          title="See what it looks like in practice"
          subtitle="The database compiles to WebAssembly, so you can run it in this browser tab without installing anything."
        >
          <GameButton href="/playground" size="lg">
            Open the playground
          </GameButton>
          <GameButton href="/company/values" variant="secondary" size="lg">
            Our values
          </GameButton>
        </PageCloser>
      </main>

      <Footer />
    </>
  );
}
