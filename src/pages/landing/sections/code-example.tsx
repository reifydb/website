import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { ExecutableSnippet, ScrollReveal } from '@/components/ui';
import { cn } from '@/lib';
import { landingExamples } from '@/lib/examples';

const examples = landingExamples;

export function CodeExampleSection() {
  const [activeIndex, setActiveIndex] = useState(0);

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

        {/* Tab Bar */}
        <ScrollReveal delay={100}>
          <div className="flex flex-wrap gap-2 mb-6">
            {examples.map((example, index) => (
              <button
                key={example.title}
                onClick={() => setActiveIndex(index)}
                className={cn(
                  'px-4 py-2 text-sm font-medium rounded-lg transition-all duration-200',
                  index === activeIndex
                    ? 'bg-primary text-bg-primary'
                    : 'bg-bg-tertiary text-text-secondary hover:text-text-primary hover:bg-bg-elevated'
                )}
              >
                {example.title}
              </button>
            ))}
          </div>

          {/* Snippet */}
          <ExecutableSnippet
            key={examples[activeIndex].title}
            initialCode={examples[activeIndex].code}
            title={examples[activeIndex].title}
            description={examples[activeIndex].description}
          />

          {/* Explore all link */}
          <div className="mt-6 text-center">
            <Link
              to="/examples"
              className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary-light transition-colors"
            >
              Explore all examples
              <ArrowRight size={16} />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
