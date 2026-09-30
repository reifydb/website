import { Link } from 'react-router-dom';
import { FaqItem, ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

export function FaqSection() {
  return (
    <section id="faq" className="section-elevated relative z-10 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-6 md:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="eyebrow-pixel mb-3">FAQ</p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
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
