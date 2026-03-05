import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';

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

export function ValuesPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-6xl px-6 md:px-8">
          {/* Page Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Values
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                The principles guiding ReifyDB
              </p>
            </div>
          </ScrollReveal>

          {/* Values Zig-Zag Layout */}
          <div className="flex flex-col gap-8 sm:gap-12">
            {values.map((value, index) => {
              const isEven = index % 2 === 1;
              const number = String(index + 1).padStart(2, '0');

              return (
                <ScrollReveal key={value.id} delay={100 + index * 50}>
                  <div
                    className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-8 ${
                      isEven ? 'sm:flex-row-reverse' : ''
                    }`}
                  >
                    {/* Number Badge */}
                    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 border-2 border-dashed border-black/25 flex items-center justify-center">
                      <span className="text-primary font-mono text-3xl sm:text-4xl font-bold">
                        {number}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 border-2 border-dashed border-black/25 bg-white p-6 sm:p-8 transition-all duration-300 hover:border-primary/50">
                      <h2 className="text-xl sm:text-2xl font-bold mb-3">
                        {value.title}
                      </h2>
                      <p className="text-text-secondary leading-relaxed">
                        {value.description}
                      </p>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
