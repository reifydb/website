import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-dashed border-white/15 overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-text-primary pr-4">
          <span className="text-primary mr-2">&gt;</span>
          {question}
        </span>
        <span className="text-text-muted flex-shrink-0 text-sm">
          [{isOpen ? '-' : '+'}]
        </span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed border-t border-dashed border-white/10 pt-4 pl-10">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10 py-16 sm:py-24 bg-bg-tertiary">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-2">
              # faq
            </p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Common questions about ReifyDB
            </p>
          </div>
        </ScrollReveal>

        {/* FAQ List - Show only first 3 */}
        <div className="space-y-4">
          {faqs.slice(0, 3).map((faq, index) => (
            <ScrollReveal key={faq.question} delay={index * 75}>
              <FaqItem {...faq} />
            </ScrollReveal>
          ))}
        </div>

        {/* View All FAQs Link */}
        <ScrollReveal delay={225}>
          <div className="mt-8 text-center">
            <Link
              to="/faq"
              className="text-sm text-primary underline underline-offset-4 hover:text-primary-light transition-colors"
            >
              view all faqs --&gt;
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
