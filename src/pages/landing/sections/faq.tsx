import { useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';
import { ChevronDown } from 'lucide-react';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="glass-card overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-text-primary pr-4">
          {question}
        </span>
        <ChevronDown
          size={16}
          className={cn(
            'text-text-muted flex-shrink-0 transition-transform duration-200',
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
        <div className="px-6 pb-6 text-text-secondary text-sm leading-relaxed border-t border-border-light pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FaqSection() {
  return (
    <section id="faq" className="relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="text-xs font-semibold tracking-[0.12em] uppercase text-primary mb-3">
              FAQ
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-4">
              Frequently Asked Questions
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Honest answers to the questions engineers actually ask
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
              className="text-sm text-primary hover:text-primary-light transition-colors"
            >
              View All FAQs &rarr;
            </Link>
            <p className="mt-3 text-sm text-text-muted">
              Still have questions?{' '}
              <a
                href="https://discord.gg/HPBwUSPuUS"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:text-primary-light transition-colors"
              >
                Ask on Discord &rarr;
              </a>
            </p>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
