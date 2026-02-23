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
        'Software should align with how engineers naturally think. Systems must reduce cognitive load, not increase it. Great infrastructure fades into the background, allowing builders to stay in flow and focus on what they are creating not on fighting their tools.',
  },
  {
    id: 'complexity-must-justify-itself',
    title: 'Complexity Must Justify Itself',
    description:
        'Every layer of abstraction carries a cost. Complexity is introduced only when it unlocks meaningful capability. If a feature requires ceremony, it is not finished. Powerful systems should feel inevitable, not complicated.',
  },
  {
    id: 'correctness-is-a-feature',
    title: 'Correctness Is a Feature',
    description:
        'Fast systems are impressive. Correct systems are trusted. ReifyDB is built for environments where mistakes compound: trading engines, workflows, and stateful applications. Where precision is not optional but foundational.',
  },
  {
    id: 'truth-over-theater',
    title: 'Truth Over Theater',
    description:
        'Not every workload belongs in ReifyDB. Clear boundaries build more trust than inflated claims. Honest software outlasts hype, and credibility is earned through transparency.',
  },
  {
    id: 'software-is-a-long-term-relationship',
    title: 'Software Is a Long-Term Relationship',
    description:
        "Infrastructure becomes part of a system's foundation. Stability, backward compatibility, and predictable evolution matter more than short-term novelty. Technology should improve with time, not decay under it.",
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
                    <div className="flex-shrink-0 w-20 h-20 sm:w-24 sm:h-24 rounded-2xl bg-bg-tertiary border border-white/10 flex items-center justify-center">
                      <span className="text-primary font-mono text-3xl sm:text-4xl font-bold">
                        {number}
                      </span>
                    </div>

                    {/* Content Card */}
                    <div className="flex-1 bg-bg-tertiary border border-white/10 rounded-2xl p-6 sm:p-8 transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]">
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
