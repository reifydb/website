import { useState } from 'react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-bg-tertiary border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:border-primary/40 hover:shadow-[0_0_30px_rgba(99,102,241,0.1)]">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-text-primary pr-4">{question}</span>
        <ChevronDown
          className={cn(
            'h-5 w-5 text-text-muted flex-shrink-0 transition-transform duration-200',
            isOpen && 'rotate-180'
          )}
        />
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed border-t border-white/10 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="py-16 sm:py-24">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
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
              className="inline-flex items-center gap-2 text-primary hover:text-primary-light font-medium transition-colors group"
            >
              View all FAQs
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
