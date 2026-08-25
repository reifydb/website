import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { Button, PageCloser, PageHero, ScrollReveal } from '@/components/ui';

interface Value {
  id: string;
  title: string;
  description: string;
}

const values: Value[] = [
  {
    id: 'respect-the-developers-mind',
    title: "Respect the Developer's Mind",
    description:
        'You already know how your data fits together. Your database should respect that, not force you to rethink it in a language it invented. The best infrastructure disappears. You stay in flow, building what matters, not wrestling with tooling.',
  },
  {
    id: 'complexity-must-justify-itself',
    title: 'Complexity Must Justify Itself',
    description:
        'If you need a tutorial just to insert a row, something went wrong. Every layer we add has to earn its place. If a feature feels complicated, we are not done building it yet. The right answer should feel obvious.',
  },
  {
    id: 'correctness-is-a-feature',
    title: 'Correctness Is a Feature',
    description:
        'Speed is great until your data is wrong. We build for the workloads where mistakes compound, where one bad write can cascade through an entire system. You should not have to choose between fast and correct. You get both.',
  },
  {
    id: 'truth-over-theater',
    title: 'Truth Over Theater',
    description:
        'Not every workload belongs in ReifyDB, and we will tell you that upfront. We would rather lose a sale than waste your time. Clear boundaries build more trust than big promises, and honest software outlasts hype every time.',
  },
  {
    id: 'software-is-a-long-term-relationship',
    title: 'Software Is a Long-Term Relationship',
    description:
        "You are going to build on top of ReifyDB for years. We take that seriously. Stability, backward compatibility, and predictable upgrades matter more than chasing the latest trend. Your infrastructure should get better with time, not rot under you.",
  },
];

const spans = ['md:col-span-3', 'md:col-span-3', 'md:col-span-2', 'md:col-span-2', 'md:col-span-2'];

export function ValuesPage() {
  return (
    <>
      <PageMeta
        title="Values | ReifyDB"
        description="The engineering values behind ReifyDB and how they shape the way the database is built."
      />
      <Navbar />

      <main>
        <PageHero
          eyebrow="Values"
          title="Five things we will not trade away"
          subtitle="Every database makes choices. These are ours, written down so you can hold us to them."
        />

        <section className="section-elevated py-20 sm:py-28">
          <div className="mx-auto max-w-5xl px-6 md:px-8">
            <div className="grid gap-5 md:grid-cols-6">
              {values.map((value, index) => (
                <ScrollReveal
                  key={value.id}
                  delay={index * 60}
                  className={spans[index] ?? 'md:col-span-2'}
                >
                  <div className="bento-tile lift-card h-full p-6 sm:p-8 flex flex-col">
                    <span className="font-mono text-3xl font-black text-primary/30 mb-5">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <h2 className="text-xl font-bold mb-3 text-balance">{value.title}</h2>
                    <p className="text-text-secondary text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>
        </section>

        <PageCloser
          title="The argument behind the values"
          subtitle="Why the Postgres + Redis + cron stack is a bug, not an architecture."
        >
          <Button href="/manifesto" size="lg">
            Read the manifesto
          </Button>
          <Button href="/company/mission" variant="secondary" size="lg">
            Our mission
          </Button>
        </PageCloser>
      </main>

      <Footer />
    </>
  );
}
