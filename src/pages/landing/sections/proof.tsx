import { useState } from 'react';
import { ScrollReveal } from '@/components/ui';

export function ProofSection() {
  const [rtt, setRtt] = useState(5);
  const [statements, setStatements] = useState(18);
  const traditionalMs = rtt * statements;

  return (
    <section id="proof" className="section-dark relative overflow-hidden py-24 sm:py-32">
      <div className="absolute inset-0 z-0 dot-grid-dark" />
      <div className="absolute inset-0 z-0 hero-glow opacity-70" />

      <div className="relative z-10 mx-auto max-w-6xl px-6 md:px-8">
        <ScrollReveal>
          <div className="text-center mb-12 sm:mb-16">
            <span className="inline-block rounded-pill border border-white/15 bg-white/5 px-3 py-1 text-xs label-uppercase text-white/70 mb-4">
              Proof
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white mb-4 text-balance">
              The network sets your speed limit.
            </h2>
            <p className="max-w-2xl mx-auto text-white/60 text-lg">
              Drag the sliders. Every statement in a round-trip architecture pays for the network again.
              ReifyDB pays once, for the whole transaction.
            </p>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={100}>
          <div className="rounded-xl border border-white/12 bg-white/[0.04] backdrop-blur-sm overflow-hidden">
            <div className="p-6 sm:p-8 border-b border-white/10 flex flex-col sm:flex-row gap-6 sm:gap-10">
              <div className="flex-1">
                <label className="flex justify-between text-sm text-white/60 mb-3">
                  <span>Network round trip</span>
                  <span className="text-primary font-bold" data-numeric>{rtt} ms</span>
                </label>
                <input
                  type="range"
                  min={1}
                  max={10}
                  step={1}
                  value={rtt}
                  onChange={(e) => setRtt(Number(e.target.value))}
                  className="proof-slider proof-slider-dark"
                />
              </div>
              <div className="flex-1">
                <label className="flex justify-between text-sm text-white/60 mb-3">
                  <span>Statements per transaction</span>
                  <span className="text-primary font-bold" data-numeric>{statements}</span>
                </label>
                <input
                  type="range"
                  min={2}
                  max={40}
                  step={1}
                  value={statements}
                  onChange={(e) => setStatements(Number(e.target.value))}
                  className="proof-slider proof-slider-dark"
                />
              </div>
            </div>

            <div className="grid sm:grid-cols-2 divide-y sm:divide-y-0 sm:divide-x divide-white/10">
              <div className="p-6 sm:p-8">
                <span className="inline-block rounded-md border border-white/15 px-2.5 py-1 text-xs label-uppercase text-white/50 mb-4">
                  Traditional
                </span>
                <p className="text-white/45 text-sm leading-relaxed mb-6 font-mono">
                  one round trip per statement, {statements} of them
                </p>
                <p className="text-4xl sm:text-5xl font-black text-white/70 mb-1" data-numeric>
                  {traditionalMs} ms
                </p>
                <p className="text-white/40 text-sm">spent on the network, per transaction</p>
              </div>
              <div className="p-6 sm:p-8 bg-primary/10">
                <span className="inline-block rounded-md border border-primary/50 bg-primary/15 px-2.5 py-1 text-xs label-uppercase text-primary mb-4">
                  ReifyDB
                </span>
                <p className="text-white/45 text-sm leading-relaxed mb-6 font-mono">
                  one round trip, the whole transaction
                </p>
                <p className="text-4xl sm:text-5xl font-black text-primary mb-1" data-numeric>
                  {rtt} ms
                </p>
                <p className="text-white/40 text-sm">spent on the network, per transaction</p>
              </div>
            </div>

            <div className="p-6 sm:p-8 border-t border-white/10 text-center">
              <p className="text-white/55 text-sm">
                <span className="text-white font-bold" data-numeric>{statements}&times;</span> the network time,
                before the database has done any work.
              </p>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
