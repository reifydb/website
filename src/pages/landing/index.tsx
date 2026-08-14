import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { CtaSection } from '@/components/ui';
import {
  HeroSection,
  CapabilitiesSection,
  UseCasesSection,
  ReplacesSection,
  ProofSection,
  FaqSection,
} from './sections';

export function LandingPage() {
  return (
    <>
      <PageMeta
        title="ReifyDB"
        description="A database designed to manage live application state with transactional guarantees, incremental derived state, and embedded state transitions."
      />
      <Navbar />

      <main>
        <HeroSection />

        <CapabilitiesSection />

        <UseCasesSection />

        <ReplacesSection />

        <FaqSection />

        <ProofSection />

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
