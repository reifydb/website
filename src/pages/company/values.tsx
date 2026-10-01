import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { GameButton, GEM, GEM_COLORS, PageCloser, PageHero, PixelIcon, PixelScene, ScrollReveal } from '@/components/ui';

interface Value {
  id: string;
  title: string;
  body: string[];
  practice: string[];
}

const values: Value[] = [
  {
    id: 'no-venture-capital-ever',
    title: 'No venture capital, ever',
    body: [
      'ReifyDB will never take venture capital. Venture money comes with a clock: a fund needs a big exit within about ten years, and when the clock runs down, the users pay. That is how licenses change, free tiers shrink, and good databases get sold to whoever pays most.',
      'We grow on what teams pay us for help, and at the pace that allows. That is slower, and we would rather say so. But no one outside the company can push us to break the other promises on this page.',
    ],
    practice: [
      'No venture capital, now or in the future',
      'The company runs on what customers pay for support',
      'No outside investor has a say over the license or the roadmap',
    ],
  },
  {
    id: 'say-what-it-doesnt-do',
    title: "Say what it doesn't do",
    body: [
      'Not every workload belongs in ReifyDB, and we will tell you that upfront. We would rather lose a sale than waste your time.',
      'If something else fits your workload better, we will say so and point you to it. A database is a long bet, and you should make it knowing where the edges are, not find them after you have built on top of them.',
    ],
    practice: [
      'Say "this is the wrong tool for you" when it is',
      'Point you to the tool that fits better',
      'Never promise a feature to close a deal',
    ],
  },
  {
    id: 'the-license-stays',
    title: 'The license stays',
    body: [
      'ReifyDB is Apache-2.0, and every future release will be too. Other databases changed the license on new versions once enough people depended on them, and left their users choosing between a frozen fork and new terms. We will not do that.',
      'ReifyDB takes no outside contributions, so nothing but our word stops a future change, and we would rather say that plainly. What backs our word: we make money from helping teams run ReifyDB, not from the license, and the promise is written in the repository, next to the license, where breaking it would be public.',
    ],
    practice: [
      'Every release, now and in the future, is Apache-2.0',
      'The promise is written in the repo, next to the license',
      'Revenue comes from support, never from license terms',
    ],
  },
  {
    id: 'no-paywall-on-the-essentials',
    title: 'No paywall on the essentials',
    body: [
      'What a database needs to be safe in production is in the Apache-2.0 build. Access control, policies, and durability are not held back for an enterprise edition.',
      'Open core is the quieter version of a license change: the free version stays free, but the parts you need in production move behind a contract. We sell help, not features. If you pay us, it is because you want the people who know the engine on call, not because something was switched off.',
    ],
    practice: [
      'One build, no enterprise edition',
      'Security and durability features are never paid add-ons',
      'Paid means support and consulting, not features',
    ],
  },
  {
    id: 'we-run-on-it-first',
    title: 'We run on it first',
    body: [
      'We build our own products on ReifyDB. Before a release reaches you, it has already carried our workloads, and the bugs it found were ours to fix.',
      'A database company that does not depend on its own database learns about problems from its users. We would rather learn from our own pager. When something breaks, we feel it first, and we fix it because we need it fixed too.',
    ],
    practice: [
      'Our own production systems run on ReifyDB',
      'New releases carry our workloads before they ship',
      'Bugs we hit are fixed before the release goes out',
    ],
  },
  {
    id: 'correct-first-then-measured',
    title: 'Correct first, then measured',
    body: [
      'A database that is fast and wrong is just wrong faster. Writes, rules, and views commit in one transaction, so what you read is what happened, not what a cache remembered.',
      'Speed matters, but it is easy to claim and hard to mean. When we talk about performance, we show the numbers, the machine, and the workload. If we have not measured it, we do not claim it.',
    ],
    practice: [
      'Writes, rules, and views commit together, or not at all',
      'Every performance number comes with its setup',
      'No speed claim we have not measured',
    ],
  },
  {
    id: 'the-builders-answer',
    title: 'The builders answer',
    body: [
      'When you ask a question, the people who design and build ReifyDB answer it. There is no script, no first-line queue, and no one reading from a knowledge base between you and the engine.',
      'If something is broken, you talk to someone who can fix it, not someone who files a ticket for someone else. That gets harder to keep as a company grows, which is why it is written here: so you can hold us to it when we are bigger.',
    ],
    practice: [
      'Issues and discussions are answered by the people building the engine',
      'Support calls are with the same people',
      'No first-line support tier',
    ],
  },
  {
    id: 'every-line-is-ours',
    title: 'Every line is ours',
    body: [
      'We build ReifyDB with the best tools we can find, and today that includes AI. It lets a small team build and test more than it could by hand, and we would rather say so than pretend otherwise.',
      'But a tool does not ship code, we do. Whatever wrote a line, it goes out under our name and is held to the same bar as the rest of the engine. When it is wrong, it is our bug, not the tool\'s. "The AI wrote it" is never an answer you will get from us.',
    ],
    practice: [
      'We use the best tools available, AI included',
      'Code is held to the same bar, whatever wrote it',
      'Every bug is ours, no matter which tool wrote the line',
    ],
  },
];

export function ValuesPage() {
  return (
    <>
      <PageMeta
        title="Values | ReifyDB"
        description="Eight promises ReifyDB makes to its users: no venture capital, a license that stays, no paywall on the essentials, written down so you can hold us to them."
      />
      <Navbar />

      <main>
        <PageHero
          eyebrow="Values"
          title="Eight things no one can buy"
          subtitle="Every database makes choices. These are ours, written down so you can hold us to them."
          scene={<PixelScene kind="trade" />}
        />

        <section className="pt-12 sm:pt-16 pb-24 sm:pb-32">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            {values.map((value, index) => {
              const color = GEM_COLORS[index];
              return (
                <ScrollReveal key={value.id} className="border-t border-[#c9c3dc] last:border-b">
                  <article className="grid gap-4 md:grid-cols-[minmax(190px,1fr)_minmax(0,60ch)] md:gap-[clamp(20px,4.5vw,68px)] py-[clamp(34px,4.4vw,54px)]">
                    <div className="self-start md:sticky md:top-[84px]">
                      <p className="pixel-label uppercase text-[#4b52d6] inline-flex items-center gap-2 mb-3">
                        <PixelIcon rows={GEM} colors={{ x: color }} className="h-3 w-3" />
                        Value {String(index + 1).padStart(2, '0')}
                      </p>
                      <h2 className="text-[clamp(21px,2.3vw,27px)] font-normal leading-[1.16] tracking-[-0.028em] text-text-primary text-balance">
                        {value.title}
                      </h2>
                    </div>
                    <div>
                      {value.body.map((paragraph) => (
                        <p key={paragraph} className="text-text-secondary leading-relaxed mb-4 last:mb-0">
                          {paragraph}
                        </p>
                      ))}
                      <div
                        className="mt-[clamp(22px,2.6vw,30px)] border-2 p-5"
                        style={{ borderColor: color, backgroundColor: `${color}1f` }}
                      >
                        <h3 className="pixel-label uppercase text-text-muted mb-3">In practice</h3>
                        <ul className="grid gap-2.5">
                          {value.practice.map((item) => (
                            <li
                              key={item}
                              className="grid grid-cols-[7px_minmax(0,1fr)] items-baseline gap-3 text-[14.5px] leading-normal text-text-primary"
                            >
                              <span className="h-[7px] w-[7px]" style={{ backgroundColor: color }} aria-hidden="true" />
                              {item}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </article>
                </ScrollReveal>
              );
            })}
          </div>
        </section>

        <PageCloser
          eyebrow="NEXT LEVEL"
          title="What we are building, and why"
          subtitle="Why the Postgres + Redis + cron stack is a bug, not an architecture."
        >
          <GameButton href="/manifesto" size="lg">
            Read the manifesto
          </GameButton>
          <GameButton href="/company/mission" variant="secondary" size="lg">
            Our mission
          </GameButton>
        </PageCloser>
      </main>

      <Footer />
    </>
  );
}
