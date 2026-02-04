import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ExecutableSnippet, ScrollReveal } from '@/components/ui';
import { cn } from '@/lib';

const examples = [
  {
    title: 'Inline Data',
    code: `from [
  {id: 1, name: "Alice", role: "admin"},
  {id: 2, name: "Bob", role: "user"}
]`,
    description: 'Query inline data directly. Great for prototyping and testing.',
  },
  {
    title: 'Filter + Aggregate',
    code: `from [
  {id: 1, region: "West", status: "completed", total: 250},
  {id: 2, region: "East", status: "pending", total: 180},
  {id: 3, region: "West", status: "completed", total: 320},
  {id: 4, region: "East", status: "completed", total: 410}
]
filter status == "completed"
aggregate math::sum(total) by region`,
    description: 'Filter, group, and aggregate in a single readable pipeline.',
  },
  {
    title: 'Sorting + Limiting',
    code: `from [
  {id: 1, name: "Alice", score: 95},
  {id: 2, name: "Bob", score: 87},
  {id: 3, name: "Carol", score: 92},
  {id: 4, name: "Dave", score: 78}
]
sort score desc
take 3`,
    description: 'Sort by any column and limit results with simple pipeline syntax.',
  },
];

export function CodeExampleSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const goToPrevious = () => {
    setActiveIndex((prev) => (prev === 0 ? examples.length - 1 : prev - 1));
  };

  const goToNext = () => {
    setActiveIndex((prev) => (prev === examples.length - 1 ? 0 : prev + 1));
  };

  return (
    <section id="code-example" className="relative z-10 py-16 sm:py-24 bg-bg-secondary">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              See RQL in Action
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              A query language designed for application state.
            </p>
          </div>
        </ScrollReveal>

        {/* Carousel */}
        <ScrollReveal delay={100}>
          <div className="relative">
            {/* Navigation Buttons */}
            <button
              onClick={goToPrevious}
              className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 sm:-translate-x-12 z-10 p-2 bg-bg-tertiary border border-white/10 rounded-lg hover:border-primary/50 hover:bg-bg-elevated transition-all"
              aria-label="Previous example"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={goToNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 sm:translate-x-12 z-10 p-2 bg-bg-tertiary border border-white/10 rounded-lg hover:border-primary/50 hover:bg-bg-elevated transition-all"
              aria-label="Next example"
            >
              <ChevronRight size={20} />
            </button>

            {/* Snippet */}
            <ExecutableSnippet
              key={examples[activeIndex].title}
              initialCode={examples[activeIndex].code}
              title={examples[activeIndex].title}
              description={examples[activeIndex].description}
            />
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {examples.map((example, index) => (
              <button
                key={example.title}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'w-3 h-3 rounded-full border border-white/20 transition-all',
                  index === activeIndex
                    ? 'bg-gradient-to-r from-primary to-accent-warm border-transparent'
                    : 'bg-bg-tertiary hover:bg-bg-elevated'
                )}
                aria-label={`Go to example ${index + 1}`}
              />
            ))}
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
