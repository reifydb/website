import type { ReactNode } from 'react';
import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, PageCloser, PageHero, ScrollReveal } from '@/components/ui';
import { HEADLINE, apologies, tenets, StackDiagram, FeatureDiagram } from '@/components/manifesto';

const apologySpans = ['md:col-span-4', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];

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
        <PageHero
          eyebrow="Manifesto"
          title="The Postgres + Redis + cron stack is a bug, not an architecture."
          subtitle="Nobody designs it. Everybody ends up with it. This is why, and what should replace it."
        />

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <ScrollReveal>
              <SectionTitle>You have built this.</SectionTitle>
              <Prose>
                You have a database. It holds the truth. Then the product needed to be fast, so the hot rows got
                copied into Redis. Then a dashboard needed a total, so a cron job started recomputing it on a timer.
                Then a rule had to run when an order changed, so it moved into a worker behind a queue. And all of it
                connects as one account, with one password, so the code in front decides on behalf of every user
                what they may see.
              </Prose>
              <Prose>
                None of these were mistakes. Each one was the reasonable next step. Look at the whole thing and it is
                five systems holding one application&apos;s state, held together by code whose only job is keeping
                them from disagreeing. When they do disagree, and they do, all three answers carry a fresh timestamp.
              </Prose>
              <p className="text-text-primary text-xl sm:text-2xl font-bold leading-snug">
                You did not architect that. You accumulated it.
              </p>
            </ScrollReveal>
          </div>

          <div className="mx-auto max-w-5xl px-6 md:px-8 mt-14">
            <ScrollReveal>
              <StackDiagram />
            </ScrollReveal>
          </div>
        </section>

        <section className="section-elevated py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <div className="max-w-3xl mb-12">
                <SectionTitle>Every box is an apology.</SectionTitle>
                <Prose>
                  Each system in that stack exists because the database could not do one specific thing. Read them
                  as what they are: workarounds, each with a cost you pay every day.
                </Prose>
              </div>
            </ScrollReveal>

            <div className="grid gap-5 md:grid-cols-6">
              {apologies.map((item, index) => (
                <ScrollReveal
                  key={item.box}
                  delay={index * 60}
                  className={apologySpans[index] ?? 'md:col-span-2'}
                >
                  <div className="bento-tile lift-card h-full p-6 sm:p-8 flex flex-col">
                    <span className="font-mono text-xs label-uppercase text-primary mb-3">
                      [ {item.box} ]
                    </span>
                    <h3 className="text-text-primary font-bold text-lg mb-3">{item.role}</h3>
                    <p className="text-text-secondary leading-relaxed">{item.text}</p>
                    <span className="mt-5 pt-4 border-t border-border-light font-mono text-xs text-text-muted">
                      &rarr; {item.after}
                    </span>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-3xl px-6 md:px-8">
            <ScrollReveal>
              <SectionTitle>How it got this way.</SectionTitle>
              <Prose>
                Databases were built to be systems of record. Write it down, get it back, keep it safe. That was the
                job, and they are very good at it.
              </Prose>
              <Prose>
                But the state an application reasons about on every request is not a record. It is a balance that
                moves with every trade. A player position that changes every tick. A rate limit that is either
                exceeded or not. It is live, it is derived, and it is bound by rules. Nothing in the record model
                holds that, so it was pushed out of the database, one piece at a time, into the stack above.
              </Prose>
              <blockquote className="border-l-4 border-primary pl-6 sm:pl-8 my-12">
                <p className="text-2xl sm:text-3xl font-black tracking-tight leading-tight text-balance">
                  Databases became systems of record. Applications need systems of live state.
                </p>
              </blockquote>
            </ScrollReveal>
          </div>
        </section>

        <section className="section-elevated py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <ScrollReveal>
              <div className="max-w-3xl mb-12">
                <SectionTitle>What ReifyDB is built on.</SectionTitle>
              </div>
            </ScrollReveal>

            <div className="grid gap-5 md:grid-cols-2">
              {tenets.map((tenet, index) => (
                <ScrollReveal key={tenet.claim} delay={index * 60}>
                  <div className="bento-tile lift-card h-full p-6 sm:p-8 flex flex-col">
                    <span className="font-mono text-3xl font-black text-primary/30 mb-5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h3 className="text-xl font-bold tracking-tight mb-3 text-balance">{tenet.claim}</h3>
                    <p className="text-text-secondary text-sm leading-relaxed">{tenet.text}</p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <section className="py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="max-w-3xl">
              <ScrollReveal>
                <SectionTitle>What ReifyDB is.</SectionTitle>
                <Prose>
                  One database for that state. Tables hold the rows. Views hold the derived numbers, and the write
                  keeps them current; there is nothing to refresh. Rules are procedures and handlers you version and
                  test inside the database, running inside the transaction that changes the data. Counters, queues,
                  and ring buffers are built in, transactional, and one query away. Embed it in your process or run
                  it as a server. Either way, the hot path has no network in it.
                </Prose>
                <Prose>
                  It also knows who is asking. Clients authenticate as themselves, and policies gate every read and
                  write per user. Nothing in front holds the one password or re-checks permissions: the rules about
                  who may do what live with the data, like every other rule.
                </Prose>
                <Prose>
                  Same feature, two stacks. Alice places an order. First on today&apos;s stack, then on ReifyDB.
                </Prose>
              </ScrollReveal>
            </div>

            <ScrollReveal>
              <div className="mt-12">
                <FeatureDiagram />
              </div>
            </ScrollReveal>

            <ScrollReveal>
              <div className="bento-tile mt-12 max-w-3xl p-6 sm:p-8 border-l-4 border-l-primary">
                <div className="text-xs font-mono label-uppercase text-primary mb-3">Status</div>
                <p className="text-text-primary font-bold mb-2">Version 0.9. Not production ready.</p>
                <p className="text-text-secondary leading-relaxed">
                  APIs and guarantees will change, and every page says so. What will not change is the list above.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>

        <PageCloser
          title={HEADLINE}
          subtitle="If you have written that cron job, shipped a service whose entire job is knowing which key to delete, or explained why the dashboard and the database disagree, then you already agree with this page. Agree, and come build it. Disagree, and say so."
        >
          <Button href="mailto:dominique@reifydb.com?subject=Challenging%20the%20manifesto" size="lg">
            Challenge me with your opinion
          </Button>
          <Button href="/docs" variant="secondary" size="lg">
            Read the docs
          </Button>
        </PageCloser>
      </main>

      <Footer />
    </>
  );
}
