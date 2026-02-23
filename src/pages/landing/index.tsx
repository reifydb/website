import { Navbar, Footer } from '@/components/layout';
import { CtaSection } from '@/components/ui';
import {
  HeroSection,
  CapabilitiesSection,
  CodeExampleSection,
  UseCasesSection,
  HowItWorksSection,
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

        <CodeExampleSection />

        <UseCasesSection />

        <HowItWorksSection />

        <ReplacesSection />

        <FaqSection />

        <CtaSection
          variant="banner"
          title="Ready to explore ReifyDB?"
          description="Read the docs or book a call to learn how ReifyDB can simplify your application state."
        />
      </main>

      <Footer />
    </>
  );
}
