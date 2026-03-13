import { useState } from 'react';

import type { PitchSlide } from './pitch-data';

/* ── Border strings (widths match other pitch slides: 104 chars full) ── */
const FULL    = '+' + '='.repeat(102) + '+';
const F_DASH  = '+' + '-'.repeat(102) + '+';
const P_TOP   = '+-- PARAMETERS ' + '-'.repeat(88) + '+';
const B_LEFT  = '+' + '-'.repeat(54) + '+';
const B_RIGHT = '+' + '-'.repeat(43) + '+';

function pad(text: string, width: number): string {
  const left = Math.floor((width - text.length) / 2);
  return ' '.repeat(left) + text + ' '.repeat(width - text.length - left);
}

function formatTps(n: number): string {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1000) return `${(n / 1000).toFixed(1)}k`;
  return String(Math.round(n));
}

function AmdahlSimulator() {
  const [rtt, setRtt] = useState(5);
  const [contention, setContention] = useState(10);

  const currentAmdahl = 100_000 / (rtt * contention);

  return (
    <div className="flex justify-center">
      <div className="font-mono text-[11px] sm:text-sm md:text-base w-full max-w-5xl">
        <style>{`
          .amdahl-slider {
            appearance: none;
            -webkit-appearance: none;
            width: 100%;
            height: 2px;
            background: rgba(0,0,0,0.15);
            outline: none;
            cursor: pointer;
          }
          .amdahl-slider::-webkit-slider-thumb {
            -webkit-appearance: none;
            width: 14px;
            height: 14px;
            background: #14B8A6;
            border-radius: 0;
            cursor: pointer;
          }
          .amdahl-slider::-moz-range-thumb {
            width: 14px;
            height: 14px;
            background: #14B8A6;
            border-radius: 0;
            border: none;
            cursor: pointer;
          }
        `}</style>

        {/* Title */}
        <div className="whitespace-pre leading-relaxed">
          <span className="text-text-muted">{FULL}</span>
          {'\n'}
          <span className="text-primary">{pad("AMDAHL'S LAW: THE NETWORK CEILING", 104)}</span>
          {'\n'}
          <span className="text-text-muted">{FULL}</span>
        </div>

        <div className="text-text-secondary text-center my-3 sm:my-4">
          Every database has a speed limit, set by the slowest step that can&#39;t run in parallel.
        </div>

        {/* Parameters */}
        <div>
          <div className="whitespace-pre text-text-muted">{P_TOP}</div>
          <div className="py-3 px-2 flex flex-col sm:flex-row gap-4 sm:gap-8">
            <div className="flex-1">
              <label className="text-text-secondary block mb-2">
                Network Round Trip Time: <span className="text-primary">{rtt} ms</span>
              </label>
              <input
                type="range"
                className="amdahl-slider"
                min={1}
                max={10}
                step={1}
                value={rtt}
                onChange={e => setRtt(Number(e.target.value))}
              />
              <div className="flex justify-between text-text-muted text-[10px] sm:text-xs mt-1">
                <span>1 ms</span>
                <span>10 ms</span>
              </div>
            </div>
            <div className="flex-1">
              <label className="text-text-secondary block mb-2">
                Contention: <span className="text-primary">{contention}%</span>
              </label>
              <input
                type="range"
                className="amdahl-slider"
                min={1}
                max={90}
                step={1}
                value={contention}
                onChange={e => setContention(Number(e.target.value))}
              />
              <div className="flex justify-between text-text-muted text-[10px] sm:text-xs mt-1">
                <span>1%</span>
                <span>90%</span>
              </div>
            </div>
          </div>
          <div className="whitespace-pre text-text-muted">{F_DASH}</div>
        </div>

        {/* Two-column comparison */}
        <div className="flex flex-col md:flex-row gap-4 md:gap-[3ch] mt-4">
          {/* Traditional */}
          <div className="whitespace-pre leading-relaxed">
            <span className="text-text-muted">{B_LEFT}</span>
            {'\n'}
            <span className="text-primary">{pad('TRADITIONAL', 56)}</span>
            {'\n'}
            <span className="text-text-muted">{B_LEFT}</span>
            {'\n\n'}
            <span className="text-text-secondary">{'  [ APP ] <-> [ DB ] <-> [ APP ] <-> [ DB ]'}</span>
            {'\n\n'}
            <span className="text-text-secondary">{'  Engine: 100,000 TPS'}</span>
            {'\n'}
            <span className="text-text-secondary">{'  Network ceiling:'}</span>
            {'\n'}
            <span className="text-text-secondary">{'  (1,000 / '}</span>
            <span className="text-primary">{rtt}</span>
            <span className="text-text-secondary">{') \u00D7 (1 / '}</span>
            <span className="text-primary">{contention}</span>
            <span className="text-text-secondary">{'%) = '}</span>
            <span className="text-primary">{formatTps(currentAmdahl)} TPS</span>
            {'\n\n'}
            <span className="text-text-muted">{B_LEFT}</span>
          </div>

          {/* ReifyDB */}
          <div className="whitespace-pre leading-relaxed">
            <span className="text-text-muted">{B_RIGHT}</span>
            {'\n'}
            <span className="text-primary">{pad('REIFYDB', 45)}</span>
            {'\n'}
            <span className="text-text-muted">{B_RIGHT}</span>
            {'\n\n'}
            <span className="text-text-secondary">{'  [ APP ] ---------> [ ONE ACID TX ]'}</span>
            {'\n\n'}
            <span className="text-text-secondary">{'  Engine: 100,000 TPS'}</span>
            {'\n'}
            <span className="text-text-secondary">{'  No round trips.'}</span>
            {'\n'}
            <span className="text-primary">{'  Actual: 100,000 TPS'}</span>
            {'\n\n'}
            <span className="text-text-muted">{B_RIGHT}</span>
          </div>
        </div>

        {/* Bottom callout */}
        <div className="whitespace-pre leading-relaxed mt-4">
          <span className="text-text-muted">{FULL}</span>
          {'\n'}
          <span className="text-primary">{"  The network is the hard limit. ReifyDB eliminates round trips from the hot path."}</span>
          {'\n'}
          <span className="text-primary">{"  Amdahl's ceiling does not apply."}</span>
          {'\n'}
          <span className="text-text-muted">{FULL}</span>
        </div>
      </div>
    </div>
  );
}

export const slideAmdahl: PitchSlide = {
  id: 'amdahl',
  content: <AmdahlSimulator />,
};
