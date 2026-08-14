import { useState } from 'react';
import { ScrollReveal } from '@/components/ui';
import { Badge } from '@reifydb/ui';

function formatTps(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

const REIFYDB_TPS = 100_000;

export function ProofSection() {
  const [rtt, setRtt] = useState(5);
  const [contention, setContention] = useState(10);
  const traditionalTps = REIFYDB_TPS / (rtt * contention);

  return (
    <section id="proof" className="py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <Badge variant="active" className="text-xs mb-3 uppercase tracking-[0.2em]">Proof</Badge>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
              The Network Sets Your Speed Limit
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Every database has a ceiling set by the slowest step that cannot run in parallel. Drag the sliders and watch a round-trip architecture hit its wall, while ReifyDB does not.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="glass-card overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-border-light flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="flex-1">
                <label className="flex justify-between text-sm text-text-secondary mb-2">
                  <span>Network round trip</span>
                  <span className="text-primary font-bold">{rtt} ms</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={rtt}
                  onChange={(e) => setRtt(Number(e.target.value))}
                  className="proof-slider"
                />
              </div>
              <div className="flex-1">
                <label className="flex justify-between text-sm text-text-secondary mb-2">
                  <span>Contention</span>
                  <span className="text-primary font-bold">{contention}%</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={90}
                  step={1}
                  value={contention}
                  onChange={(e) => setContention(Number(e.target.value))}
                  className="proof-slider"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-border-light">
              <div className="p-6 sm:p-8">
                <Badge variant="outline" className="mb-4">Traditional</Badge>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  ( [ App ] &rarr; [ DB ] &rarr; [ App ] ) &times; N, one round trip per statement.
                </p>
                <p className="text-3xl sm:text-4xl font-black text-primary mb-1">
                  {formatTps(traditionalTps)} TPS
                </p>
                <p className="text-text-muted text-sm">Ceiling, engine capped at {formatTps(REIFYDB_TPS)} TPS</p>
              </div>
              <div className="p-6 sm:p-8">
                <Badge variant="active" className="mb-4">ReifyDB</Badge>
                <p className="text-text-muted text-sm leading-relaxed mb-6">
                  [ App ] &rarr; [ N statements, one ACID transaction ] &rarr; [ ReifyDB ], no round trips.
                </p>
                <p className="text-3xl sm:text-4xl font-black text-primary mb-1">
                  {formatTps(REIFYDB_TPS)} TPS
                </p>
                <p className="text-text-muted text-sm">Actual, unaffected by round trips or contention</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-border-light text-center">
              <p className="text-text-secondary text-sm">
                The network is the hard limit. ReifyDB eliminates round trips from the hot path.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
