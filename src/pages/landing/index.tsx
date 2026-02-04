import { Navbar, Footer } from '@/components/layout';
import { CtaSection } from '@/components/ui';
import {
  HeroSection,
  FoundationSection,
  WhatIsStateSection,
  PhilosophySection,
  UseCasesSection,
  CapabilitiesSection,
  HowItWorksSection,
  CodeExampleSection,
  ReplacesSection,
  FaqSection,
} from './sections';

export function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <FoundationSection />

        <WhatIsStateSection />

        <PhilosophySection />

        <UseCasesSection />

        <CtaSection
          variant="split"
          title="Ready to explore ReifyDB?"
          description="Read the docs to understand how ReifyDB can simplify your application state."
          buttonText="Read the Docs →"
          buttonHref="/docs"
        />

        <CapabilitiesSection />

        <HowItWorksSection />

        <CodeExampleSection />

        <CtaSection
          variant="minimal"
          title="Want to see more examples?"
          description="Check out the documentation for more RQL queries and patterns."
          buttonText="View on GitHub →"
          buttonHref="https://github.com/reifydb/reifydb"
        />

        <ReplacesSection />

        <FaqSection />

        <CtaSection
          variant="banner"
          title="Still have questions?"
          description="Book a call and let's discuss how ReifyDB can help you."
        />
      </main>

      <Footer />
    </>
  );
}
