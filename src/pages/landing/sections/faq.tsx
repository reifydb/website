import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib';
import { PixelIcon, ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

const ROBOT = [
  '...a...',
  '...l...',
  '...l...',
  'lwwwwwl',
  'lwpwpwl',
  'lwwwwwl',
  'leeeeel',
  '.kk.kk.',
  '.kk.kk.',
];

const ROBOT_COLORS: Record<string, string> = {
  a: '#ffe08a',
  l: '#c9c3dc',
  w: '#ffffff',
  p: '#7e85f2',
  e: '#e6e4f5',
  k: '#3f3b99',
};

const CHARACTERS_PER_TICK = 2;
const TICK_MS = 25;

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const [shown, setShown] = useState(0);
  const done = shown >= answer.length;

  useEffect(() => {
    if (!isOpen || done) return;
    const timer = window.setTimeout(() => setShown((n) => Math.min(answer.length, n + CHARACTERS_PER_TICK)), TICK_MS);
    return () => window.clearTimeout(timer);
  }, [isOpen, done, shown, answer.length]);

  return (
    <div className="dialog">
      <button
        onClick={() => {
          setIsOpen(!isOpen);
          setShown(0);
        }}
        className="dialog__question"
        aria-expanded={isOpen}
      >
        <svg
          viewBox="0 0 4 7"
          className={cn('h-3.5 w-2 shrink-0 text-[#4b52d6] transition-transform', isOpen && 'rotate-90')}
          shapeRendering="crispEdges"
          fill="currentColor"
          aria-hidden="true"
        >
          <rect x="0" y="0" width="1" height="7" />
          <rect x="1" y="1" width="1" height="5" />
          <rect x="2" y="2" width="1" height="3" />
          <rect x="3" y="3" width="1" height="1" />
        </svg>
        <span>{question}</span>
      </button>
      {isOpen && (
        <div className="dialog__answer" onClick={() => setShown(answer.length)}>
          <div className="dialog__portrait">
            <PixelIcon rows={ROBOT} colors={ROBOT_COLORS} className="h-9 w-7" />
          </div>
          <p className="text-text-secondary text-sm leading-relaxed">
            <span className="sr-only">{answer}</span>
            <span aria-hidden="true">
              {answer.slice(0, shown)}
              <span className="invisible">{answer.slice(shown)}</span>
              {done && <span className="dialog__next">▼</span>}
            </span>
          </p>
        </div>
      )}
    </div>
  );
}

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
