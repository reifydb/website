import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ExecutableSnippet, ScrollReveal } from '@/components/ui';
import { ChipGroup } from '@reifydb/ui';
import { landingExamples } from '@/lib/examples';

export function CodeExampleSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const chipOptions = landingExamples.map((example, index) => ({
    value: String(index),
    label: example.title,
  }));

  return (
    <section id="code-example" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-4xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3">
              Playground
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Query Pipelines
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Write queries the way you think about your data. No translation, no ceremony.
            </p>
          </div>
        </ScrollReveal>

        {/* Tab Bar */}
        <ScrollReveal delay={100}>
          <ChipGroup
            options={chipOptions}
            value={String(activeIndex)}
            onChange={(value) => setActiveIndex(Number(value))}
            className="flex-wrap mb-6"
          />

          {/* Snippet */}
          <ExecutableSnippet
            key={landingExamples[activeIndex].title}
            initialCode={landingExamples[activeIndex].code}
            title={landingExamples[activeIndex].title}
            description={landingExamples[activeIndex].description}
          />

          {/* Explore all link */}
          <div className="mt-8 text-center">
            <Link
              to="/examples"
              className="text-sm text-primary hover:text-primary-light transition-colors"
            >
              Explore All Examples &rarr;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
