import { Link } from 'react-router-dom';
import { FaqRobot, ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';
import { EditorialSection } from './editorial-section';
import { FaqItem } from '@reifydb/ui';

export function FaqSection() {
  return (
    <EditorialSection
      tone="tint"
      id="faq"
      eyebrow="FAQ"
      title="Frequently Asked Questions"
      intro="Honest answers to the questions engineers actually ask"
    >
      <div className="border-b border-[#e3e5f4]">
        {faqs.slice(0, 3).map((faq, index) => (
          <ScrollReveal key={faq.question} delay={index * 75}>
            <FaqItem {...faq} portrait={<FaqRobot />} />
          </ScrollReveal>
        ))}
      </div>

      <ScrollReveal delay={225}>
        <div className="mt-8">
          <Link to="/faq" className="link-accent text-sm">
            View All FAQs &rarr;
          </Link>
          <p className="mt-3 text-sm text-text-muted">
            Still have questions?{' '}
            <a
              href="https://discord.gg/HPBwUSPuUS"
              target="_blank"
              rel="noopener noreferrer"
              className="link-accent"
            >
              Ask on Discord &rarr;
            </a>
          </p>
        </div>
      </ScrollReveal>
    </EditorialSection>
  );
}
