import { useState } from 'react';
import { RaceScene, ScrollReveal } from '@/components/ui';
import { Container, Section } from '@reifydb/ui';

function fillOf(value: number) {
  return { '--fill': `calc(${(value - 1) / 9} * (100% - 18px) + 9px)` } as React.CSSProperties;
}

export function ProofSection() {
  const [rtt, setRtt] = useState(5);
  const [statements, setStatements] = useState(5);
  const traditionalMs = rtt * statements;

  return (
    <Section id="proof" tone="tint">
      <Container>
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <p className="eyebrow mb-3">PROOF</p>
            <h2 className="text-[clamp(26px,3.4vw,40px)] font-normal leading-[1.08] tracking-[-0.03em] text-text-primary mb-4 text-balance">
              The network sets your speed limit.
            </h2>
            <p className="max-w-2xl mx-auto text-text-secondary text-lg">
              Drag the sliders. Every statement in a round-trip architecture pays for the network again.
              ReifyDB pays once, for the whole transaction.
            </p>
          </div>
        </ScrollReveal>

        <div className="mx-auto max-w-3xl flex flex-col sm:flex-row gap-6 sm:gap-10">
          <div className="flex-1">
            <label className="flex justify-between text-sm text-text-secondary mb-3">
              <span>Network round trip</span>
              <span className="text-[#4b52d6] font-bold" data-numeric>{rtt} ms</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={rtt}
              onChange={(e) => setRtt(Number(e.target.value))}
              className="proof-slider"
              style={fillOf(rtt)}
            />
          </div>
          <div className="flex-1">
            <label className="flex justify-between text-sm text-text-secondary mb-3">
              <span>Statements per transaction</span>
              <span className="text-[#4b52d6] font-bold" data-numeric>{statements}</span>
            </label>
            <input
              type="range"
              min={1}
              max={10}
              step={1}
              value={statements}
              onChange={(e) => setStatements(Number(e.target.value))}
              className="proof-slider"
              style={fillOf(statements)}
            />
          </div>
        </div>
      </Container>

      <RaceScene rtt={rtt} statements={statements} className="my-12 sm:my-16" />

      <Container>
        <div className="grid sm:grid-cols-2 gap-10 sm:gap-0 sm:divide-x divide-border-light text-center">
          <div className="sm:px-8">
            <p className="label text-text-muted mb-4">TRADITIONAL</p>
            <p className="pixel-score pixel-score--lg text-text-muted mb-2" data-numeric>
              {traditionalMs} ms
            </p>
            <p className="text-text-muted text-sm font-mono">one round trip per statement, {statements} of them</p>
          </div>
          <div className="sm:px-8">
            <p className="label text-[#4b52d6] mb-4">REIFYDB</p>
            <p className="pixel-score pixel-score--lg text-[#4b52d6] mb-2" data-numeric>
              {rtt} ms
            </p>
            <p className="text-text-muted text-sm font-mono">one round trip, the whole transaction</p>
          </div>
        </div>

        <p className="mt-12 sm:mt-16 text-center text-text-secondary">
          <span className="text-text-primary font-bold" data-numeric>{statements}&times;</span> the network time,
          before the database has done any work.
        </p>
      </Container>
    </Section>
  );
}
