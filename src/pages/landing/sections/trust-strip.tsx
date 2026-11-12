import { Star } from 'lucide-react';
import { useGitHubStars } from '@/hooks';
import { Container } from '@reifydb/ui';

const facts = [
  { label: 'Query language', value: 'RQL' },
  { label: 'Runs in this page', value: 'WASM engine' },
  { label: 'Round trips', value: '1 per transaction' },
  { label: 'Core', value: 'Rust, zero GC pauses' },
  { label: 'License', value: 'Apache-2.0' },
  { label: 'Deploys', value: 'Embedded or standalone' },
];

export function TrustStrip() {
  const { formatted, loading } = useGitHubStars();

  return (
    <div className="facts-band">
      <Container className="py-10">
        <dl className="grid grid-cols-2 gap-y-8 sm:grid-cols-3 lg:grid-cols-7">
          {facts.map((fact) => (
            <div key={fact.label} className="facts-band__fact">
              <dt className="facts-band__label">{fact.label}</dt>
              <dd className="facts-band__value">{fact.value}</dd>
            </div>
          ))}
          <div className="facts-band__fact">
            <dt className="facts-band__label">GitHub stars</dt>
            <dd className="facts-band__value">
              <a
                href="https://github.com/reifydb/reifydb"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 hover:text-accent-yellow transition-colors"
              >
                <Star size={16} className="fill-current" />
                {loading || !formatted ? 'GitHub' : formatted}
              </a>
            </dd>
          </div>
        </dl>
      </Container>
    </div>
  );
}
