import type { ReactNode } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';
import { HEADLINE, apologies, tenets, StackDiagram, FeatureDiagram } from '@/components/manifesto';

function Prose({ children }: { children: ReactNode }) {
  return <p className="text-text-secondary text-lg leading-relaxed mb-6 last:mb-0">{children}</p>;
}

function SectionTitle({ children }: { children: ReactNode }) {
  return (
    <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-8 text-balance">{children}</h2>
  );
}

export function ManifestoPage() {
  return (
    <>
      <PageMeta
        title="Manifesto | ReifyDB"
        description="The Postgres + Redis + cron stack is a bug, not an architecture. Why live application state belongs in one database, and the beliefs ReifyDB is built on."
      />
      <Navbar />

      <main>
        <section className="relative overflow-hidden">
          <div className="absolute inset-0 z-0 dot-grid opacity-60" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 py-24 sm:py-32 lg:py-40 text-center">
            <ScrollReveal>
              <Badge variant="active" className="text-xs mb-6 uppercase tracking-[0.2em]">
                Manifesto
              </Badge>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black tracking-tight mb-8 text-balance">
                The Postgres + Redis + cron stack is a bug, not an architecture.
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg sm:text-xl leading-relaxed text-balance">
                Nobody designs it. Everybody ends up with it. This is why, and what should replace it.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <ScrollReveal>
              <SectionTitle>You have built this.</SectionTitle>
              <Prose>
                You have a database. It holds the truth. Then the product needed to be fast, so the hot rows got
                copied into Redis. Then a dashboard needed a total, so a cron job started recomputing it every five
                minutes. Then a rule had to run when an order changed, so it moved into a worker behind a queue. Then
                something had to know which cache key to delete when the row changed, so you wrote that too. And
                all of it connects to the database as one account, with one password, so the code in front decides on
                behalf of every user what they may see.
              </Prose>
              <Prose>
                None of these were mistakes. Each one was the reasonable next step. Look at the whole thing and it is
                five systems holding one application&apos;s state, held together by code whose only job is keeping
                them from disagreeing. When they do disagree, and they do, the database says one thing, the cache says
                another, the dashboard says a third, and all three carry a fresh timestamp.
              </Prose>
              <p className="text-text-primary text-xl sm:text-2xl font-bold leading-snug">
                You did not architect that. You accumulated it.
              </p>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-8 sm:py-12">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <StackDiagram />
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <div className="max-w-3xl">
                <SectionTitle>Every box is an apology.</SectionTitle>
                <Prose>
                  Each system in that stack exists because the database could not do one specific thing. Read them
                  as what they are: workarounds, each with a cost you pay every day.
                </Prose>
              </div>
            </ScrollReveal>
            <div className="glass-card overflow-hidden mt-10 grid md:grid-cols-2 divide-y md:divide-y-0 divide-border-light">
              {apologies.map((item, index) => (
                <ScrollReveal key={item.box} delay={index * 80}>
                  <div
                    className={`p-6 sm:p-8 h-full ${index === apologies.length - 1 && apologies.length % 2 === 1 ? 'md:col-span-2' : index % 2 === 0 ? 'md:border-r' : ''} ${index < Math.floor((apologies.length - 1) / 2) * 2 ? 'md:border-b' : ''} border-border-light`}
                  >
                    <div className="flex items-baseline gap-3 mb-3 flex-wrap">
                      <span className="font-mono text-xs label-uppercase text-primary whitespace-nowrap">[ {item.box} ]</span>
                      <span className="text-text-primary font-bold">{item.role}</span>
                    </div>
                    <p className="text-text-secondary leading-relaxed">{item.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-bg-elevated">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <ScrollReveal>
              <SectionTitle>How it got this way.</SectionTitle>
              <Prose>
                Databases were built to be systems of record. Write it down, get it back, keep it safe. That was the
                job, and they are very good at it.
              </Prose>
              <Prose>
                But the state an application reasons about on every request is not a record. It is a balance that
                moves with every trade. A player position that changes every tick. A workflow that is in exactly one
                step. A rate limit that is either exceeded or not. It is live, it is derived, and it is bound by
                rules. Nothing in the record model holds that, so it was pushed out of the database, one piece at a
                time, into the stack above.
              </Prose>
              <blockquote className="border-l-4 border-primary pl-6 sm:pl-8 my-12">
                <p className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-balance">
                  Databases became systems of record. Applications need systems of live state.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>

        <section className="py-16 sm:py-24">
          <div className="mx-auto max-w-4xl px-6 md:px-8">
            <ScrollReveal>
              <SectionTitle>What ReifyDB is built on.</SectionTitle>
            </ScrollReveal>
            <div className="glass-card overflow-hidden divide-y divide-border-light">
              {tenets.map((tenet, index) => (
                <ScrollReveal key={tenet.claim} delay={index * 80}>
                  <div className="p-6 sm:p-8 grid sm:grid-cols-[4rem_1fr] gap-4 sm:gap-8 items-start">
                    <span className="font-mono text-3xl sm:text-4xl font-bold text-primary leading-none">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="text-xl sm:text-2xl font-bold tracking-tight mb-3 text-balance">
                        {tenet.claim}
                      </h3>
                      <p className="text-text-secondary leading-relaxed">{tenet.text}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 sm:py-24 bg-bg-elevated">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <ScrollReveal>
              <SectionTitle>What ReifyDB is.</SectionTitle>
              <Prose>
                ReifyDB is one database for that state. Tables hold the rows. Views hold the derived numbers, and the
                write keeps them current; there is nothing to refresh. Rules are procedures and handlers: code you
                version and test inside the database, running inside the transaction that changes the data. Not a
                trigger someone forgot. Counters, queues, ring buffers, and histograms are built in, transactional,
                and one query away. Embed it in your process or run it as a server. Either way, the hot path has no
                network in it.
              </Prose>
              <Prose>
                It also knows who is asking. Clients authenticate to the database as themselves, over WebSocket or
                HTTP, and policies gate every read and write per user. There is nothing in front of it holding the
                one password or re-checking permissions: clients talk to ReifyDB, and the rules about who may do what
                live with the data, like every other rule.
              </Prose>
              <Prose>Same feature, two stacks. Alice places an order. First on today's stack, then on ReifyDB.</Prose>
              <div className="mt-10">
                <FeatureDiagram />
              </div>
              <div className="glass-card p-6 sm:p-8 mt-10 border-l-4 border-l-primary">
                <div className="text-xs font-mono label-uppercase text-primary mb-3">Status</div>
                <p className="text-text-primary font-bold mb-2">Version 0.9. Not production ready.</p>
                <p className="text-text-secondary leading-relaxed">
                  APIs and guarantees will change, and every page says so. What will not change is the list
                  above.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <section className="relative overflow-hidden py-24 sm:py-32">
          <div className="absolute inset-0 z-0 dot-grid opacity-60" />
          <div className="relative z-10 mx-auto max-w-4xl px-6 md:px-8 text-center">
            <ScrollReveal>
              <div className="max-w-2xl mx-auto mb-12">
                <Prose>
                  If you have written that cron job. If you have shipped a service whose entire job is knowing which
                  key to delete. If you have ever explained to someone why the dashboard and the database disagree.
                  Then you already agree with this page.
                </Prose>
                <p className="text-text-primary text-xl font-bold">Agree, and come build it. Disagree, and say so.</p>
              </div>
              <p className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-12 text-balance">
                {HEADLINE}
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Button href="mailto:dominique@reifydb.com?subject=Challenging%20the%20manifesto" size="lg">
                  Challenge me with your opinion
                </Button>
                <Button href="/docs" variant="secondary" size="lg">
                  Read the Docs
                </Button>
                <Button href="https://github.com/reifydb/reifydb" variant="secondary" size="lg">
                  Star on GitHub
                </Button>
              </div>
            </ScrollReveal>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
}
