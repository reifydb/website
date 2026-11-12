import { Footer, Navbar } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, PageCloser, PixelScene, ScrollReveal } from '@/components/ui';
import { Container, PageHero, Section } from '@reifydb/ui';

const APPLY_HREF = 'mailto:founder@reifydb.com?subject=Rust%20engineer';
const REPO_HREF = 'https://github.com/reifydb/reifydb';

const areas = [
  {
    title: 'Storage and transactions',
    body: 'Where rows live, how commits stay correct, how changes are captured, and how values are encoded.',
    crates: ['store-*', 'cdc', 'codec', 'column'],
  },
  {
    title: 'RQL and query execution',
    body: 'The query language from parser to plan, and the engine that runs it.',
    crates: ['rql', 'engine', 'evaluate', 'filter', 'routine'],
  },
  {
    title: 'Incremental views',
    body: 'Views that update as the data changes instead of re-running the query. The heart of ReifyDB.',
    crates: ['flow', 'flow-sync', 'flow-async', 'subscription'],
  },
  {
    title: 'Servers and wire protocols',
    body: 'The HTTP, WebSocket, and gRPC servers, telemetry, and the SDK that clients talk to.',
    crates: ['sub-server-*', 'sdk'],
  },
  {
    title: 'Testing and performance',
    body: 'Chaos tests, the test harness, benches, and the profiler. Finding the bug before a user does.',
    crates: ['testing-chaos', 'test-harness', 'benches', 'profiler'],
  },
];

const lists = [
  {
    title: 'You',
    items: [
      'You have shipped real Rust: a crate, a service, a tool people use.',
      'You measure before you optimize. A flame graph beats a hunch.',
      'You fix the bug, write the test that would have caught it, and move on.',
      'You open a pull request instead of a meeting.',
      'You do your best work with little process and a lot of trust.',
    ],
  },
  {
    title: 'Bonus points',
    items: [
      'You have worked on a database, a query engine, or a stream processor.',
      'You know your way around MVCC, LSM trees, or incremental view maintenance.',
      'You have run Rust under real load.',
      'You have broken systems on purpose with fuzzing or chaos tests.',
      'You have open source code we can read.',
    ],
  },
];

const deal = [
  {
    title: 'Full-time',
    body: 'You are part of the company, not a contractor on the side.',
  },
  {
    title: 'Remote',
    body: 'Work from wherever you get the most done.',
  },
  {
    title: 'Straight to the source',
    body: 'You work directly with the founder. No layers, no ticket relay.',
  },
  {
    title: 'No venture capital, ever',
    body: 'No board and no exit clock. The work answers to users and to the code, not to a fund.',
  },
  {
    title: 'In the open',
    body: 'The engine is public on GitHub. Your work ships under your name.',
  },
];

const steps = [
  {
    title: 'Read the code',
    body: 'Clone reifydb/reifydb, build it, and poke at it until something bugs you.',
  },
  {
    title: 'Show us something',
    body: 'A pull request to ReifyDB is the best application. A link to Rust you are proud of works too.',
  },
  {
    title: 'Send one email',
    body: 'To founder@reifydb.com: who you are, the link, and one thing in ReifyDB you would change.',
  },
];

export function JobsPage() {
  return (
    <>
      <PageMeta
        title="Jobs | ReifyDB"
        description="ReifyDB is hiring a full-time Rust engineer to build the database engine: storage, RQL, incremental views, servers, and the tests that keep them honest."
      />
      <Navbar />

      <main>
        <PageHero
          eyebrow="Jobs"
          title="You, press start"
          subtitle="We are hiring a full-time, remote Rust engineer to build the database engine with us. Hackers who ship, not ticket movers."
          scene={<PixelScene kind="arcade" />}
        >
          <Button href={APPLY_HREF} size="lg">
            Apply by email
          </Button>
          <Button href={REPO_HREF} variant="secondary" size="lg">
            Read the code
          </Button>
        </PageHero>

        <Section tone="plain">
          <Container width="narrow">
            <ScrollReveal>
              <div>
                <p className="label uppercase text-[#4b52d6] mb-6">The job</p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  ReifyDB is a database written in Rust. It keeps live application state in one place: tables,
                  incremental views, queues, and the logic around them, instead of Postgres plus Redis plus cron
                  plus glue.
                </p>
                <p className="text-text-secondary leading-relaxed mb-6">
                  We are looking for a full-time Rust engineer to build it with us. You work across the whole
                  engine, directly with the founder, and your code ships in the open.
                </p>
                <p className="text-text-primary text-lg font-bold leading-relaxed">
                  If you would rather ship a fix than write a proposal about it, read on.
                </p>
              </div>
            </ScrollReveal>
          </Container>
        </Section>

        <Section tone="tint">
          <Container>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-4 text-balance">
                What you will touch
              </h2>
              <p className="text-text-secondary text-lg leading-relaxed mb-10">
                One role, the whole engine. These are the areas, with the crates you will find them in.
              </p>
            </ScrollReveal>
            <div className="divide-y divide-[#e3e5f4] border-y border-[#e3e5f4]">
              {areas.map((area, index) => (
                <ScrollReveal key={area.title} delay={index * 75}>
                  <article className="py-7">
                    <h3 className="text-lg font-bold text-text-primary mb-2">{area.title}</h3>
                    <p className="text-text-muted text-sm leading-relaxed mb-3">{area.body}</p>
                    <p className="font-mono text-sm text-primary">{area.crates.join(', ')}</p>
                  </article>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

        <Section tone="plain">
          <Container className="grid gap-10 md:grid-cols-2">
            {lists.map((list, index) => {
              return (
                <ScrollReveal key={list.title} delay={index * 75}>
                  <div>
                    <h2 className="font-display text-xs font-semibold uppercase tracking-[0.06em] text-text-muted mb-3">
                      {list.title}
                    </h2>
                    <ul className="divide-y divide-[#e3e5f4] border-y border-[#e3e5f4]">
                      {list.items.map((item) => (
                        <li
                          key={item}
                          className="grid grid-cols-[7px_minmax(0,1fr)] items-baseline gap-3 py-3 leading-normal text-text-primary"
                        >
                          <span className="h-[7px] w-[7px] bg-[#4b52d6]" aria-hidden="true" />
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </ScrollReveal>
              );
            })}
          </Container>
        </Section>

        <Section tone="tint">
          <Container>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-10 text-balance">The deal</h2>
            </ScrollReveal>
            {deal.map((item) => (
              <ScrollReveal key={item.title} className="border-t border-[#e3e5f4] last:border-b">
                <div className="grid gap-2 md:grid-cols-[minmax(190px,1fr)_minmax(0,60ch)] md:gap-[clamp(20px,4.5vw,68px)] py-8">
                  <h3 className="text-[clamp(19px,2vw,23px)] font-normal leading-[1.16] tracking-[-0.028em] text-text-primary">
                    {item.title}
                  </h3>
                  <p className="text-text-secondary leading-relaxed">{item.body}</p>
                </div>
              </ScrollReveal>
            ))}
          </Container>
        </Section>

        <Section tone="plain">
          <Container>
            <ScrollReveal>
              <h2 className="text-3xl sm:text-4xl font-normal tracking-[-0.03em] mb-10 text-balance">
                How to apply
              </h2>
            </ScrollReveal>
            <div className="divide-y divide-[#e3e5f4] border-y border-[#e3e5f4]">
              {steps.map((step, index) => (
                <ScrollReveal key={step.title} delay={index * 75}>
                  <div className="grid grid-cols-[2rem_minmax(0,1fr)] items-baseline gap-4 py-7">
                    <span className="font-mono text-sm text-text-muted">{index + 1}</span>
                    <div>
                      <h3 className="text-lg font-bold text-text-primary mb-2">{step.title}</h3>
                      <p className="text-text-muted text-sm leading-relaxed">{step.body}</p>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </Container>
        </Section>

        <PageCloser
          eyebrow="INSERT COIN"
          title="Ready?"
          subtitle="Code you are proud of and one email. That is the whole application."
        >
          <Button href={APPLY_HREF} size="lg">
            Apply by email
          </Button>
          <Button href={REPO_HREF} variant="secondary" size="lg">
            Read the code
          </Button>
        </PageCloser>
      </main>

      <Footer />
    </>
  );
}
