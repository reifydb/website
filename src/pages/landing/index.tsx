import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import { CtaSection } from '@/components/ui';
import {
  HeroSection,
  TrustBarSection,
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
        description="One database instead of Postgres + Redis + a queue + a cron job. Transactional live state, derived views that update themselves, logic next to the data."
      />
      <Navbar />

      <main>
        <HeroSection />

        <TrustBarSection />

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
