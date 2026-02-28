import { useState } from 'react';
import { cn } from '@/lib';
import { Navbar, Footer } from '@/components/layout';
import { ScrollReveal } from '@/components/ui';
import { faqs } from '@/data/faq-data';

function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-2 border-dashed border-white/15 overflow-hidden transition-all duration-300 hover:border-primary/50">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-6 text-left"
      >
        <span className="font-bold text-text-primary pr-4">
          <span className="text-primary mr-2">&gt;</span>
          {question}
        </span>
        <span className="text-text-muted text-sm">[{isOpen ? '-' : '+'}]</span>
      </button>
      <div
        className={cn(
          'overflow-hidden transition-all duration-200',
          isOpen ? 'max-h-96' : 'max-h-0'
        )}
      >
        <div className="px-6 pb-6 text-text-muted text-sm leading-relaxed border-t border-dashed border-white/10 pt-4">
          {answer}
        </div>
      </div>
    </div>
  );
}

export function FaqPage() {
  return (
    <>
      <Navbar />

      <main className="py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 md:px-8">
          {/* Page Header */}
          <ScrollReveal>
            <div className="text-center mb-12 sm:mb-16">
              <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4">
                Frequently Asked Questions
              </h1>
              <p className="max-w-2xl mx-auto text-text-secondary text-lg">
                Common questions about ReifyDB
              </p>
            </div>
          </ScrollReveal>

          {/* FAQ List */}
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <ScrollReveal key={faq.question} delay={index * 75}>
                <FaqItem {...faq} />
              </ScrollReveal>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
