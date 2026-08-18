import { Navbar, Footer } from '@/components/layout';
import { PageMeta } from '@/components/page-meta';
import {
  HeroSection,
  BuiltThisSection,
  ApologiesSection,
  FeatureTwiceSection,
  ProofSection,
  UseCasesSection,
  FaqSection,
  CloserSection,
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

        <BuiltThisSection />

        <ApologiesSection />

        <FeatureTwiceSection />

        <ProofSection />

        <UseCasesSection />

        <FaqSection />

        <CloserSection />
      </main>

      <Footer />
    </>
  );
}
