import { Navbar, Footer } from '@/components/layout';
import { CtaSection } from '@/components/ui';
import {
  HeroSection,
  CapabilitiesSection,
  UseCasesSection,
  ReplacesSection,
  FaqSection,
} from './sections';

export function LandingPage() {
  return (
    <>
      <Navbar />

      <main>
        <HeroSection />

        <CapabilitiesSection />

        <UseCasesSection />

        <ReplacesSection />

        <FaqSection />

        <CtaSection
          variant="banner"
          title="Want to see if ReifyDB fits your workload?"
          description="Read the docs, try the examples, or book a call. We will be honest about whether ReifyDB is the right fit."
        />
      </main>

      <Footer />
    </>
  );
}
